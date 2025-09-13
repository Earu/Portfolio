import i18n from "./i18n";
import ReactDOMServer from "react-dom/server";
import App from "./App";
import "./index.css";
export function render(path: string) {
	// for SEO purposes, we want to render the site page in french at /fr
	const pathChunks = path.substring(1).split('/');
	if (pathChunks[0] && pathChunks[0].toLowerCase() === "fr") {
		i18n.changeLanguage("fr");
	} else {
		i18n.changeLanguage("en");
	}

	return ReactDOMServer.renderToString(<App />);
}