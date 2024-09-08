// these constants are useful to keep some privacy when asking for feedback online

type PortfolioVariables = {
    NAME: string;
    FAMILY_NAME: string;
    LINKEDIN_URL: string;
    GITHUB_URL: string;
    MAIL: string;
    MEETING_URL: string;
    MEETING_URL_FR: string;
};

function tryGetEnvVar(name: string, fallback: string): string {
    if (globalThis.hasOwnProperty("process")) {
        return process.env[name] ?? fallback;
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

    globalContext.PORTFOLIO = {
        NAME: privacyName,
        FAMILY_NAME: privacyFamilyName,
        LINKEDIN_URL: privacyLinkedinUrl,
        GITHUB_URL: privacyGhUrl,
        MAIL: privacyMail,
        MEETING_URL: meetingUrl,
        MEETING_URL_FR: meetingUrlFr,
    };
}

export function getPrivacyVariable(key: keyof PortfolioVariables): string {
    return globalContext.PORTFOLIO[key];
}