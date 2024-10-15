// these constants are useful to keep some privacy when asking for feedback online

type PortfolioVariables = {
    NAME: string;
    FAMILY_NAME: string;
    LINKEDIN_URL: string;
    GITHUB_URL: string;
    MAIL: string;
    MEETING_URL: string;
    MEETING_URL_FR: string;
    HOTJAR_SITE_ID: string;
    GA_SITE_ID: string;
};

function tryGetEnvVar(name: string, fallback: string): string {
    if (globalThis.hasOwnProperty("process")) {
        const value = process.env[name] ?? fallback;
        return value.toString();
    }

    return fallback;
}

const globalContext = (globalThis as any);
if (!globalThis.hasOwnProperty("PORTFOLIO")) {
    // these are necessary for SSR
    const privacyName = tryGetEnvVar("PORTFOLIO_PRIVACY_NAME", "John");
	const privacyFamilyName = tryGetEnvVar("PORTFOLIO_PRIVACY_FAMILY_NAME", "DOE");
	const privacyLinkedinUrl = tryGetEnvVar("PORTFOLIO_PRIVACY_LINKEDIN_URL", "https://www.linkedin.com/in/johndoe");
	const privacyGhUrl = tryGetEnvVar("PORTFOLIO_PRIVACY_GITHUB_URL", "https://github.com/John/Doe");
	const privacyMail = tryGetEnvVar("PORTFOLIO_PRIVACY_MAIL", "john.doe@gmail.com");
	const meetingUrl = tryGetEnvVar("PORTFOLIO_PRIVACY_MEETING_URL", "");
	const meetingUrlFr = tryGetEnvVar("PORTFOLIO_PRIVACY_MEETING_URL_FR", "");
    const hotjarSiteId = tryGetEnvVar("HOTJAR_SITE_ID", "");
    const gaSiteId = tryGetEnvVar("GA_SITE_ID", "");

    globalContext.PORTFOLIO = {
        NAME: privacyName,
        FAMILY_NAME: privacyFamilyName,
        LINKEDIN_URL: privacyLinkedinUrl,
        GITHUB_URL: privacyGhUrl,
        MAIL: privacyMail,
        MEETING_URL: meetingUrl,
        MEETING_URL_FR: meetingUrlFr,
        HOTJAR_SITE_ID: hotjarSiteId,
        GA_SITE_ID: gaSiteId,
    };
}

export function getPrivacyVariable(key: keyof PortfolioVariables): string {
    return globalContext.PORTFOLIO[key];
}