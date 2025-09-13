import i18n from "./i18n";
import React from 'react';
import './index.css';
import App from './App';
import { createRoot } from 'react-dom/client';
import Hotjar from '@hotjar/browser';
import ReactGA from 'react-ga';
import { getPrivacyVariable } from "./privacy";

const pathChunks = window.location.pathname.substring(1).split('/');
if (pathChunks[0] && pathChunks[0].toLowerCase() === "fr") {
	i18n.changeLanguage("fr");
} else {
	if (navigator.language.split("-")[0] === "fr") {
		window.location.href = "./fr"; // force switch to french page in case we have a french browser
	} else {
		i18n.changeLanguage("en");
	}
}

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(<App />);

const hotjarSiteId = parseInt(getPrivacyVariable("HOTJAR_SITE_ID"));
if (hotjarSiteId != null && !isNaN(hotjarSiteId)) {
	const hotjarVersion = 6;
	Hotjar.init(hotjarSiteId, hotjarVersion);
}

const gaSiteId = getPrivacyVariable("GA_SITE_ID");
ReactGA.initialize(gaSiteId);
ReactGA.pageview(window.location.pathname + window.location.search);