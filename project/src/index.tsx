import i18n from "./i18n";
import "./consoleFun";
import React from 'react';
import './index.css';
import App from './App';
import ConsoleLoading from './Components/ConsoleLoading';
import { createRoot } from 'react-dom/client';

const pathChunks = window.location.pathname.substring(1).split('/');
if (pathChunks[0] && pathChunks[0].toLowerCase() === "fr") {
	i18n.changeLanguage("fr");
} else {
	//if (navigator.language.split("-")[0] === "fr") {
	//	window.location.href = "./fr"; // force switch to french page in case we have a french browser
	//} else {
		i18n.changeLanguage("en");
	//}
}

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(<React.StrictMode>
	<App />
	<ConsoleLoading />
</React.StrictMode>);