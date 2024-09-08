import i18n from "./i18n";
import "./consoleFun";
import React from 'react';
import './index.css';
import App from './App';
import ConsoleLoading from './Components/ConsoleLoading';
import { hydrateRoot, createRoot } from 'react-dom/client';

function renderRoot(container: HTMLElement, content: JSX.Element) {
	const root = createRoot(container);
	root.render(content);
}

const pathChunks = window.location.pathname.substring(1).split('/');
if (pathChunks[0] && pathChunks[0].toLowerCase() === "fr") {
	i18n.changeLanguage("fr");
} else {
	i18n.changeLanguage("en");
}

const container = document.getElementById('root') as HTMLElement;
const tsx = <React.StrictMode>
	<App />
	<ConsoleLoading />
</React.StrictMode>;

if (container.hasChildNodes()) {
	hydrateRoot(container, tsx);
} else {
	renderRoot(container, tsx);
}
