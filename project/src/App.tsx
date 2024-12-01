/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react';
import './App.css';
import ServiceCard from './Components/ServiceCard';
import ServiceCardRow from './Components/ServiceCardRow';
import Navbar from './Components/Navbar';
import Section from './Components/Section';
import Clock from './Components/Clock';
import { getPrivacyVariable } from './privacy';
import { Trans, useTranslation } from 'react-i18next';
import MobileScrollDown from './Components/MobileScrollDown';
import FooterColumn from './Components/FooterColumn';
import ProjectTimeline from './Components/ProjectTimeline';
import i18n from './i18n';
import Techs from './Components/Techs';

export default function App() {
	const { t } = useTranslation();

	const meetingUrl = i18n.language == "fr" ? getPrivacyVariable("MEETING_URL_FR") : getPrivacyVariable("MEETING_URL");
	function onSchedule(ev: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>): void {
		window.open(meetingUrl, t("SCHEDULE_WINDOW_TITLE"), "width=800,height=600");
		ev.preventDefault();
	}

	return (
		<div className="App">
			<Navbar />
			<header className="App-header">
				<div id="gradient-overlay"></div>
				<div className="hero-content">
					<div className="hero-main">
						<h1>{t("HEADER_HERO_TITLE")}</h1>
						<h2>{t("HEADER_HERO_SUBTITLE")}</h2>
						<div className="social-proof">
							{(t("HEADER_HERO_PROOFS", { returnObjects: true }) as string[]).map((proof, index) => (
								<span key={index}>{proof}</span>
							))}
						</div>
					</div>
					<div className="cta-btns">
						<a href={`mailto:${getPrivacyVariable("MAIL")}`} className="primary-cta">
							{t("HEADER_HERO_CTA")}
						</a>
						<a href="#projects" className="secondary-cta">
							{t("HEADER_HERO_SECONDARY_CTA")}
						</a>
					</div>
				</div>
			</header>
			<MobileScrollDown />
			<Section id='services' title={t("SERVICES_TITLE")}>
				<ServiceCardRow>
					<ServiceCard
							tagline={t("SERVICES_1_TAGLINE")}
							description={t("SERVICES_1_DESCRIPTION")}
							image="/img/azure.webp"
							alt="Azure & AI Solutions"
							technologies={t("SERVICES_1_TECH", { returnObjects: true })}
					/>
					<ServiceCard
							tagline={t("SERVICES_2_TAGLINE")}
							description={t("SERVICES_2_DESCRIPTION")}
							image="/img/logo_microsoft.svg"
							alt="Microsoft Integration"
							technologies={t("SERVICES_2_TECH", { returnObjects: true })}
					/>
					<ServiceCard
							tagline={t("SERVICES_3_TAGLINE")}
							description={t("SERVICES_3_DESCRIPTION")}
							image="/img/vsc.webp"
							alt="Full-Stack Development"
							technologies={t("SERVICES_3_TECH", { returnObjects: true })}
					/>
				</ServiceCardRow>
			</Section>
			<Section id='tech-stack' title={t("TECH_STACK_TITLE")}>
				<Techs techs={[
					{ name: ".NET", image: "/img/dotnet_logo.svg", url: "https://dotnet.microsoft.com/en-us/" },
					{ name: "C#", image: "/img/csharp_logo.svg", url: "https://learn.microsoft.com/en-us/dotnet/csharp/" },
					{ name: "Azure", image: "/img/azure.webp", url: "https://azure.microsoft.com/en-us" },
					{ name: "React.js", image: "/img/reactjs_logo.svg", url: "https://react.dev/" },
					{ name: "Typescript", image: "/img/typescript_logo.svg", url: "https://www.typescriptlang.org/" },
					{ name: "Python", image: "/img/python_logo.svg", url: "https://www.python.org/" },
					{ name: "AI", image: "/img/tensorflow_logo.svg", url: "https://www.tensorflow.org/" },
				]} size={Math.min(100, window.innerWidth / 7 / 2)} showTitle={window.innerWidth > 600} />
			</Section>
			<Section id='about-me' title={t("ABOUT_ME_TITLE")}>
				<div className="about-me-content">
					<div>
						<img src="/img/at_work.jpg" alt={`${getPrivacyVariable("NAME")} at work`} />
						<div>
							<span>{t("ABOUT_ME_PART_1_TITLE")}</span>
							<p>{t("ABOUT_ME_PART_1_CONTENT")}</p>

							<span>{t("ABOUT_ME_PART_2_TITLE")}</span>
							<p>
								<Trans
									i18nKey="ABOUT_ME_PART_2_CONTENT"
									components={[
										<a href="https://www.lua.org/"/>,
										<a href="https://en.wikipedia.org/wiki/C%2B%2B"/>,
										<a href="https://en.wikipedia.org/wiki/C_(programming_language)"/>,
										<a href="https://en.wikipedia.org/wiki/.NET"/>,
										<a href="https://en.wikipedia.org/wiki/C_Sharp_(programming_language)"/>,
										<a href="https://www.vinci.com"/>,
										<a href="https://www.vinci-energies.com/"/>
									]}
								/>
							</p>

							<span>{t("ABOUT_ME_PART_3_TITLE")}</span>
							<p>
								<Trans
									i18nKey="ABOUT_ME_PART_3_CONTENT"
									components={[
										<a href="https://en.wikipedia.org/wiki/Software_as_a_service"/>
									]}
								/>
							</p>

							<span>{t("ABOUT_ME_PART_4_TITLE")}</span>
							<p>{t("ABOUT_ME_PART_4_CONTENT")}</p>
						</div>
					</div>
				</div>
			</Section>
			<Section id='projects' title={t("PROJECTS_TITLE")}>
				<ProjectTimeline projects={[
					{
						title: t("PROJECTS_1_TITLE"),
						company: "VINCI Energies",
						relevantUrl: "https://www.vinci-energies.com/",
						description: t("PROJECTS_1_DESCRIPTION"),
						image: '/img/logo_vinci_energies.svg',
						alt: 'VINCI Energies',
						startDate: new Date(2020, 8, 1),
						endDate: new Date(2023, 1, 1),
						techs: [
							{ name: "C#", image: "/img/csharp_logo.svg", url: "https://learn.microsoft.com/en-us/dotnet/csharp/" },
							{ name: "Azure", image: "/img/azure.webp", url: "https://azure.microsoft.com/en-us" },
							{ name: "SharePoint", image: "/img/sharepoint_logo.svg", url: "https://www.microsoft.com/en-us/microsoft-365/sharepoint/collaboration" },
							{ name: "SAP", image: "/img/sap_logo.svg", url: "https://www.sap.com/france/index.html" },
							{ name: "Matomo", image: "/img/matomo_logo.svg", url: "https://fr.matomo.org/" },
						]
					},
					{
						title: t("PROJECTS_2_TITLE"),
						company: "VINCI Energies",
						relevantUrl: "https://www.vinci-energies.com/",
						description: t("PROJECTS_2_DESCRIPTION"),
						image: '/img/logo_vinci_energies.svg',
						alt: 'VINCI Energies',
						startDate: new Date(2022, 5, 1),
						endDate: new Date(2023, 1, 1),
						techs: [
							{ name: "C#", image: "/img/csharp_logo.svg", url: "https://learn.microsoft.com/en-us/dotnet/csharp/" },
							{ name: "Azure", image: "/img/azure.webp", url: "https://azure.microsoft.com/en-us" },
							{ name: "React.js", image: "/img/reactjs_logo.svg", url: "https://react.dev/" },
							{ name: "Typescript", image: "/img/typescript_logo.svg", url: "https://www.typescriptlang.org/" },
							{ name: "SAP", image: "/img/sap_logo.svg", url: "https://www.sap.com/france/index.html" },
						]
					},
					{
						title: t("PROJECTS_3_TITLE"),
						company: "VINCI Energies",
						relevantUrl: "https://www.vinci-energies.com/",
						description: t("PROJECTS_3_DESCRIPTION"),
						image: '/img/logo_vinci_energies.svg',
						alt: 'VINCI Energies',
						startDate: new Date(2020, 8, 1),
						endDate: new Date(2022, 7, 1),
						techs: [
							{ name: "C#", image: "/img/csharp_logo.svg", url: "https://learn.microsoft.com/en-us/dotnet/csharp/" },
							{ name: "C++", image: "/img/cpp_logo.svg", url: "https://learn.microsoft.com/en-us/cpp/cpp/?view=msvc-170" },
							{ name: "Azure", image: "/img/azure.webp", url: "https://azure.microsoft.com/en-us" },
							{ name: "SAP", image: "/img/sap_logo.svg", url: "https://www.sap.com/france/index.html" },
							{ name: "Windows", image: "/img/windows_logo.svg", url: "https://www.microsoft.com/en-us/windows" },
						]
					},
					{
						title: t("PROJECTS_4_TITLE"),
						company: "VINCI Energies",
						relevantUrl: "https://www.vinci-energies.com/",
						description: t("PROJECTS_4_DESCRIPTION"),
						image: '/img/logo_vinci_energies.svg',
						alt: 'VINCI Energies',
						startDate: new Date(2023, 1, 1),
						endDate: new Date(2024, 4, 20),
						techs: [
							{ name: "C#", image: "/img/csharp_logo.svg", url: "https://learn.microsoft.com/en-us/dotnet/csharp/" },
							{ name: "Azure", image: "/img/azure.webp", url: "https://azure.microsoft.com/en-us" },
							{ name: "React.js", image: "/img/reactjs_logo.svg", url: "https://react.dev/" },
							{ name: "Typescript", image: "/img/typescript_logo.svg", url: "https://www.typescriptlang.org/" },
							{ name: "Python", image: "/img/python_logo.svg", url: "https://www.python.org/" },
							{ name: "AI", image: "/img/tensorflow_logo.svg", url: "https://www.tensorflow.org/" },
						]
					},
					{
						title: t("PROJECTS_5_TITLE"),
						company: "VINCI Energies",
						relevantUrl: "https://www.vinci-energies.com/",
						description: t("PROJECTS_5_DESCRIPTION"),
						image: '/img/logo_vinci_energies.svg',
						alt: 'VINCI Energies',
						startDate: new Date(2023, 1, 1),
						endDate: new Date(2024, 4, 20),
						techs: [
							{ name: "C#", image: "/img/csharp_logo.svg", url: "https://learn.microsoft.com/en-us/dotnet/csharp/" },
							{ name: "Azure", image: "/img/azure.webp", url: "https://azure.microsoft.com/en-us" },
							{ name: "React.js", image: "/img/reactjs_logo.svg", url: "https://react.dev/" },
							{ name: "Typescript", image: "/img/typescript_logo.svg", url: "https://www.typescriptlang.org/" },
							{ name: "Matomo", image: "/img/matomo_logo.svg", url: "https://fr.matomo.org/" },
							{ name: "SAP", image: "/img/sap_logo.svg", url: "https://www.sap.com/france/index.html" },
						]
					},
					{
						title: t("PROJECTS_6_TITLE"),
						company: "AGILITIC",
						relevantUrl: "https://www.societe.com/societe/agilitic-811184001.html",
						description: t("PROJECTS_6_DESCRIPTION"),
						image: '/img/logo_agilitic.webp',
						alt: 'AGILITIC',
						startDate: new Date(2018, 8, 1),
						endDate: new Date(2019, 2, 30),
						techs: [
							{ name: "C#", image: "/img/csharp_logo.svg", url: "https://learn.microsoft.com/en-us/dotnet/csharp/" },
							{ name: "F#", image: "/img/fsharp_logo.png", url: "https://learn.microsoft.com/en-us/dotnet/fsharp/" },
							{ name: "Javascript", image: "/img/javascript_logo.svg", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
							{ name: "Elixir", image: "/img/elixir_logo.svg", url: "https://elixir-lang.org/" },
							{ name: "Xamarin", image: "/img/xamarin_logo.svg", url: "https://learn.microsoft.com/en-us/previous-versions/xamarin/get-started/what-is-xamarin" },
						]
					},
				]} />
			</Section>
			<Section id='schedule' title={t("SCHEDULE_TITLE")}>
				<div>
					<div className='tagline'>{t("SCHEDULE_HERO_TEXT")}</div>
					<button onClick={onSchedule} className='schedule-cta'>{t("SCHEDULE_HERO_CTA")}</button>

					<Clock />
				</div>
			</Section>
			<footer>
				<FooterColumn title={t("FOOTER_COLUMN_1_TITLE")} list={[
					["GitHub", getPrivacyVariable("GITHUB_URL")],
					["Linkedin", getPrivacyVariable("LINKEDIN_URL")]
				]} />
				<FooterColumn title={t("FOOTER_COLUMN_2_TITLE")} list={[
					["Mail", `mailto:${getPrivacyVariable("MAIL")}`],
					[t("FOOTER_COLUMN_2_MEETING_LABEL"), meetingUrl]
				]} />
			</footer>
		</div>
	);
}