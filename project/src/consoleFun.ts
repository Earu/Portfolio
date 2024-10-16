import i18next from './i18n'
import { getPrivacyVariable } from './privacy';

document.addEventListener("TranslationsLoaded", () => {
	const { t } = i18next;

	console.log(`%c${t("CONSOLE_FUN_HEADER")}`, "color: #FF0000; -webkit-text-stroke: 2px black; font-size: 72px; font-weight: bold;");
	console.log(`%c${t("CONSOLE_FUN_TEXT")}\n`, "font-size: 17px;");
	console.info(t("CONSOLE_FUN_INFO", { GITHUB_URL: getPrivacyVariable("GITHUB_URL") }));
});

export {};