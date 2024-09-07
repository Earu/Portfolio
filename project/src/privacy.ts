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

declare var PORTFOLIO: PortfolioVariables;

if (!globalThis.hasOwnProperty('PORTFOLIO')) {
    (globalThis as any).PORTFOLIO = {
        NAME: "John",
        FAMILY_NAME: "Doe",
        LINKEDIN_URL: "https://www.linkedin.com/in/johndoe",
        GITHUB_URL: "https://github.com/John/Doe",
        MAIL: "john.doe@gmail.com",
        MEETING_URL: "",
        MEETING_URL_FR: "",
    };
}

export function getPrivacyVariable(key: keyof PortfolioVariables): string {
    return PORTFOLIO[key];
}