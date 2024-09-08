import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import resources from "../public/resources.json";

i18n
	.use(initReactI18next)
	.init({
		fallbackLng: "en",
		supportedLngs: [ "fr", "en" ],
		interpolation: {
			escapeValue: false,
		},
		resources: resources,
	}).then(() => document.dispatchEvent(new Event("TranslationsLoaded")))
	.catch(console.error);

export default i18n;
