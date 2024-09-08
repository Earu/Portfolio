import "./i18n";
import React from "react";
import ReactDOMServer from "react-dom/server";
import App from "./App";
import "./index.css";
import ConsoleLoading from "./Components/ConsoleLoading";

export function render() {
	return ReactDOMServer.renderToString(
		<React.StrictMode>
			<App />
			<ConsoleLoading />
		</React.StrictMode>
	);
}