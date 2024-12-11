import type { Request, Response, NextFunction } from "express";
import fs from "fs/promises";
import { readFileSync } from "fs";
import path, { dirname } from "path";
import express from "express";
import compression from "compression";
import serveStatic from "serve-static";
import { createServer as createViteServer } from "vite";
import { fileURLToPath } from "url";
import crypto from "crypto";
import { getLlama, LlamaChatSession, LlamaContext, LlamaModel } from "node-llama-cpp";
import { v4 as uuidv4 } from 'uuid';

// slight polyfills
(global as any).window = {};
(global as any).document = {
	dispatchEvent: () => {},
};
(window as any).crypto = crypto;
(window as any).matchMedia = () => { };

const isTest = process.env.NODE_ENV === "test" || !!process.env.VITE_TEST_BUILD;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const resolve = (p: string) => path.resolve(__dirname, p);
const assetpath = resolve("public");
const modelsPath = resolve("models");
const resources = JSON.parse(readFileSync(path.join(assetpath, "resources.json")).toString());
const getStyleSheets = async () => {
	try {
		const files = await fs.readdir(assetpath);
		const cssAssets = files.filter(l => l.endsWith(".css"));
		const allContent = [];
		for (const asset of cssAssets) {
			const content = await fs.readFile(path.join(assetpath, asset), "utf-8");
			allContent.push(`<style type="text/css">${content}</style>`);
		}
		return allContent.join("\n");
	} catch {
		return "";
	}
};

const privacyName = process.env.PORTFOLIO_PRIVACY_NAME ?? "John";
const privacyFamilyName = process.env.PORTFOLIO_PRIVACY_FAMILY_NAME ?? "DOE";
const privacyLinkedinUrl = process.env.PORTFOLIO_PRIVACY_LINKEDIN_URL ?? "https://www.linkedin.com/in/johndoe";
const privacyUpworkUrl = process.env.PORTFOLIO_PRIVACY_UPWORK_URL ?? "";
const privacyMaltUrl = process.env.PORTFOLIO_PRIVACY_MALT_URL ?? "";
const privacyGhUrl = process.env.PORTFOLIO_PRIVACY_GITHUB_URL ?? "https://github.com/John/Doe";
const privacyMail = process.env.PORTFOLIO_PRIVACY_MAIL ?? "john.doe@gmail.com";
const meetingUrl = process.env.PORTFOLIO_PRIVACY_MEETING_URL ?? "";
const meetingUrlFr = process.env.PORTFOLIO_PRIVACY_MEETING_URL_FR ?? "";
const hotjarSiteId = process.env.HOTJAR_SITE_ID ?? "";
const gaSiteId = process.env.GA_SITE_ID ?? "";
const websiteUrl = process.env.WEBSITE_URL ?? "https://your-domain.com";

function injectPrivacyVariables(lang: string, html: string): string {
	const langResources = lang === "fr" ? resources.fr.translation : resources.en.translation;

	return html
		.replaceAll("[[LANG]]", lang)
		.replaceAll("[[TITLE]]", langResources.HTML_TITLE)
		.replaceAll("[[META]]", langResources.HTML_META)
		.replaceAll("[[PRIVACY_LINKEDIN_URL]]", privacyLinkedinUrl)
		.replaceAll("[[PRIVACY_UPWORK_URL]]", privacyUpworkUrl)
		.replaceAll("[[PRIVACY_MALT_URL]]", privacyMaltUrl)
		.replaceAll("[[WEBSITE_URL]]", websiteUrl)
		.replaceAll("[[PRIVACY_NAME]]", privacyName)
		.replaceAll("[[PRIVACY_VARIABLES]]",
			`<script>var PORTFOLIO = {
				NAME: '${privacyName}',
				FAMILY_NAME: '${privacyFamilyName}',
				LINKEDIN_URL: '${privacyLinkedinUrl}',
				UPWORK_URL: '${privacyUpworkUrl}',
				MALT_URL: '${privacyMaltUrl}',
				GITHUB_URL: '${privacyGhUrl}',
				MAIL: '${privacyMail}',
				MEETING_URL: '${meetingUrl}',
				MEETING_URL_FR: '${meetingUrlFr}',
				HOTJAR_SITE_ID: '${hotjarSiteId}',
				GA_SITE_ID: '${gaSiteId}'
			}</script>`);
}

const llama = await getLlama();
const model = await llama.loadModel({
    modelPath: path.join(modelsPath, "meta-llama-3.1-8b-instruct-q4_k_m.gguf"),
});

const baseEnglishPrompt = `You are an AI assistant for ${privacyName}, a Software Engineer & Cloud Architect. Be helpful, direct, and professional. Keep responses under 3 sentences unless asked for more detail.

Core Knowledge:
- Azure Cloud Architecture & AI Integration
- Full-Stack Development (.NET, React, Python)
- Enterprise Solutions (15+ Projects, 2000+ Business Units)
- Microsoft Stack (SharePoint, Power Platform, Azure AD)

Contact Information:
- Email: ${privacyMail}
- LinkedIn: ${privacyLinkedinUrl}
- Upwork: ${privacyUpworkUrl}
- Malt: ${privacyMaltUrl}

Response Style:
- Be clear and concise
- Provide practical solutions
- Use "${privacyName} can help with..." or "${privacyName} specializes in..."
- For complex queries, suggest booking a consultation

Important Rules:
- Never invent or assume facts about ${privacyName}'s experience
- If unsure about specific details, recommend contacting ${privacyName} directly
- Stick to the information provided above
- If the topics go beyond the professional sphere, answer that ${privacyName} is an expert in Cloud Architecture & AI

Remember: Keep responses brief and focused. For project specifics or pricing, recommend scheduling a meeting.`;

const baseFrenchPrompt = `Tu es l'assistant IA de ${privacyName}, Développeur Full-Stack & Architecte Cloud. Tu es là pour aider de manière directe et professionnelle. Tu gardes tes réponses concises sauf si on te demande plus de détails.

Connaissances de base:
- Architecture Cloud Azure & Intégration IA
- Développement Full-Stack (.NET, React, Python)
- Solutions Entreprise (15+ Projets, 2000+ Business Units)
- Stack Microsoft (SharePoint, Power Platform, Azure AD)

Informations de contact:
- Email: ${privacyMail}
- LinkedIn: ${privacyLinkedinUrl}
- Upwork: ${privacyUpworkUrl}
- Malt: ${privacyMaltUrl}

Style de réponse:
- Être clair et concis
- Fournir des solutions pratiques
- Utiliser "${privacyName} peut vous aider avec..." ou "${privacyName} est spécialisé en..."
- Pour les demandes complexes, suggérer un rendez-vous

Règles importantes:
- Ne jamais inventer ou supposer des faits sur l'expérience de ${privacyName}
- En cas de doute, recommander de contacter ${privacyName} directement
- S'en tenir aux informations fournies ci-dessus
- Si les sujets sortent de la sphere professionnelle, répondre que ${privacyName} est un expert en Architecture Cloud & IA

Important: Garder les réponses brèves et concentrées. Pour les détails de projet ou les tarifs, recommander de planifier une réunion.`;

// Add chat endpoint
const chatSessions = new Map<string, LlamaChatSession>();

// Cleanup old sessions periodically (optional)
setInterval(() => {
	const now = Date.now();
	for (const [sessionId, session] of chatSessions.entries()) {
		if (now - (session as any).lastAccessed > 30 * 60 * 1000) { // 30 minutes
			chatSessions.delete(sessionId);
		}
	}
}, 5 * 60 * 1000); // Check every 5 minutes

function createChatEndpoint(app: express.Application) {
	app.post('/api/chat', express.json(), async (req, res) => {
		try {
			const { message, sessionId, lang = 'en' } = req.body;

			// Set headers for streaming
			res.setHeader('Content-Type', 'text/event-stream');
			res.setHeader('Cache-Control', 'no-cache');
			res.setHeader('Connection', 'keep-alive');

			let session: LlamaChatSession;
			if (sessionId && chatSessions.has(sessionId)) {
				session = chatSessions.get(sessionId)!;
			} else {
				const context = await model.createContext();
				session = new LlamaChatSession({
					contextSequence: context.getSequence(),
					systemPrompt: lang === 'en' ? baseEnglishPrompt : baseFrenchPrompt
				});
				const newSessionId = uuidv4();
				chatSessions.set(newSessionId, session);
				res.setHeader('X-Session-Id', newSessionId);
			}

			// Update last accessed time
			(session as any).lastAccessed = Date.now();

			// Stream response from Llama
			const stream = await session.prompt(message, {
				temperature: 0.7,
				maxTokens: 800,
				onToken: (chunk) => {
					const text = model.detokenize(chunk);
					res.write(`data: ${JSON.stringify({ chunk: text })}\n\n`);
					// Force flush the response
					if (res.flush) res.flush();
				}
			});

			res.end();
		} catch (error) {
			console.error('Chat error:', error);
			res.status(500).json({ error: 'Failed to process chat message' });
		}
	});
}

async function createServer(isProd = process.env.NODE_ENV === "production") {
	const app = express();
	const vite = await createViteServer({
		server: { middlewareMode: true, hmr: false },
		appType: "custom",
		logLevel: isTest ? "error" : "info",
		root: isProd ? "dist" : "",
		optimizeDeps: { include: [] },
	});

	const assetsDir = resolve("public");
	const requestHandler = express.static(assetsDir);

	app.use(vite.middlewares);
	app.use(requestHandler);
	app.use("/public", requestHandler);

	if (isProd) {
		app.use(compression());
		app.use(
			serveStatic(resolve("./"), {
				index: false,
			}),
		);
	}

	const stylesheets = getStyleSheets();
	const baseTemplate = await fs.readFile(isProd ? resolve("client/index.html") : resolve("index.html"), "utf-8");
	const productionBuildPath = path.join(__dirname, "./server/server-index.js");
	const devBuildPath = path.join(__dirname, "./src/server-index.tsx");
	const buildModule = isProd ? productionBuildPath : devBuildPath;
	const { render } = await vite.ssrLoadModule(buildModule);
	async function processRequest(lang: string, req: Request, res: Response, next: NextFunction) {
		const url = req.originalUrl;

		try {
			const template = injectPrivacyVariables(lang, baseTemplate);
			const appHtml = render(url);
			const cssAssets = await stylesheets;
			const html = template.replace("[[APP]]", appHtml).replace("[[STYLES]]", cssAssets);

			res.status(200).set({ "Content-Type": "text/html" }).end(html);
		} catch (e: any) {
			if (!isProd) {
				vite.ssrFixStacktrace(e);
			}

			console.error(e.stack);
			next(e);
		}
	}

	createChatEndpoint(app);
	app.get("/", async (req: Request, res: Response, next: NextFunction) => processRequest("en", req, res, next));
	app.get("/fr", async (req: Request, res: Response, next: NextFunction) => processRequest("fr", req, res, next));
	app.get("/en", async (req: Request, res: Response, next: NextFunction) => processRequest("en", req, res, next));
	app.use(async (req: Request, res: Response, next: NextFunction) => processRequest("en", req, res, next));

	const port = 8080;
	app.listen(Number(port), "0.0.0.0", () => {
		console.info(`App is listening on http://localhost:${port}`);
	});
}

createServer();