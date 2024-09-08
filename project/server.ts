import type { Request, Response, NextFunction } from "express";
import fs from "fs/promises";
import path, { dirname } from "path";
import express from "express";
import compression from "compression";
import serveStatic from "serve-static";
import { createServer as createViteServer } from "vite";
import { fileURLToPath } from "url";
import crypto from "crypto";

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
const getStyleSheets = async () => {
	try {
		const assetpath = resolve("public");
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

function injectPrivacyVariables(html: string): string {
	const privacyName = process.env.PORTFOLIO_PRIVACY_NAME ?? "John";
	const privacyFamilyName = process.env.PORTFOLIO_PRIVACY_FAMILY_NAME ?? "DOE";
	const privacyLinkedinUrl = process.env.PORTFOLIO_PRIVACY_LINKEDIN_URL ?? "https://www.linkedin.com/in/johndoe";
	const privacyGhUrl = process.env.PORTFOLIO_PRIVACY_GITHUB_URL ?? "https://github.com/John/Doe";
	const privacyMail = process.env.PORTFOLIO_PRIVACY_MAIL ?? "john.doe@gmail.com";
	const meetingUrl = process.env.PORTFOLIO_PRIVACY_MEETING_URL ?? "";
	const meetingUrlFr = process.env.PORTFOLIO_PRIVACY_MEETING_URL_FR ?? "";

	return html
		.replaceAll("[[PRIVACY_NAME]]", privacyName)
		.replace("[[PRIVACY_VARIABLES]]",
			`<script>var PORTFOLIO = {
				NAME: '${privacyName}',
				FAMILY_NAME: '${privacyFamilyName}',
				LINKEDIN_URL: '${privacyLinkedinUrl}',
				GITHUB_URL: '${privacyGhUrl}',
				MAIL: '${privacyMail}',
				MEETING_URL: '${meetingUrl}',
				MEETING_URL_FR: '${meetingUrlFr}',
			}</script>`);
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
	app.use("*", async (req: Request, res: Response, next: NextFunction) => {
		const url = req.originalUrl;

		try {
			const template = await vite.transformIndexHtml(url, injectPrivacyVariables(baseTemplate));
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
	});

	const port = 8080;
	app.listen(Number(port), "0.0.0.0", () => {
		console.info(`App is listening on http://localhost:${port}`);
	});
}

createServer();