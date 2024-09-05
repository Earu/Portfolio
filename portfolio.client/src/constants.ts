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

if (!window.hasOwnProperty('PORTFOLIO')) {
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

const NAME = PORTFOLIO.NAME;
const FAMILY_NAME = PORTFOLIO.FAMILY_NAME;
const LINKEDIN_URL = PORTFOLIO.LINKEDIN_URL;
const GITHUB_URL = PORTFOLIO.GITHUB_URL;
const MAIL = PORTFOLIO.MAIL;
const MEETING_URL = PORTFOLIO.MEETING_URL;
const MEETING_URL_FR = PORTFOLIO.MEETING_URL_FR;

export { NAME, FAMILY_NAME, LINKEDIN_URL, GITHUB_URL, MAIL, MEETING_URL, MEETING_URL_FR };