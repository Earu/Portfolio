/* eslint-disable jsx-a11y/anchor-has-content */
import React, { useState, useEffect } from 'react';
import './App.css';
import PricingTable from './Components/PricingTable';
import Navbar from './Components/Navbar';
import Section from './Components/Section';
import Clock from './Components/Clock';
import { getPrivacyVariable } from './privacy';
import { Trans, useTranslation } from 'react-i18next';
import MobileScrollDown from './Components/MobileScrollDown';
import FooterColumn from './Components/FooterColumn';
import ProjectDrawer from './Components/ProjectDrawer';
import i18n from './i18n';
import Techs from './Components/Techs';
import SocialProfiles from './Components/SocialProfiles';

const AnimatedSubtitle: React.FC = () => {
	const { t } = useTranslation();
	const initText = t("HEADER_HERO_SUBTITLE");
	const [displayText, setDisplayText] = useState(initText);
	const [isDeleting, setIsDeleting] = useState(false);
	const [loopNum, setLoopNum] = useState(0);
	const [isAnimating, setIsAnimating] = useState(false);

	const technologies = [
		"MACHINE LEARNING",
		"ARTIFICIAL INTELLIGENCE",
		"SOFTWARE ENGINEERING",
		"COMPUTER VISION",
		"GENAI APPLICATIONS",
		"DATA SCIENCE",
		"CLOUD ARCHITECTURE",
	];

	const baseText = t("HEADER_HERO_SUBTITLE_BASE");
	const period = 3000;
	const deletingSpeed = 75;
	const typingSpeed = 150;

	// Set initial text immediately
	useEffect(() => {
		setDisplayText(baseText + " " + technologies[0]);
	}, [baseText]);

	// Start animation after page load
	useEffect(() => {
		const timer = setTimeout(() => {
			setIsAnimating(true);
			setIsDeleting(true);
		}, 10000); // Wait 10 seconds after load before starting animation

		return () => clearTimeout(timer);
	}, []);

	useEffect(() => {
		if (!isAnimating) return;

		let ticker = setInterval(() => {
			const i = loopNum % technologies.length;
			const fullText = baseText + " " + technologies[i];

			if (isDeleting) {
				if (displayText.length > baseText.length + 1) {
					setDisplayText(fullText.substring(0, displayText.length - 1));
				} else {
					setIsDeleting(false);
					setLoopNum(loopNum + 1);
				}
			} else {
				setDisplayText(fullText.substring(0, displayText.length + 1));
				if (displayText.length === fullText.length) {
					setTimeout(() => setIsDeleting(true), period);
				}
			}
		}, isDeleting ? deletingSpeed : typingSpeed);

		return () => clearInterval(ticker);
	}, [displayText, isDeleting, loopNum, baseText, isAnimating]);

	return (
		<h2>
			{displayText}
			<span className="typing"></span>
		</h2>
	);
};

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
						<AnimatedSubtitle />
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
			<Section id='pricing' title={t("PRICING.TITLE")}>
				<PricingTable meetingUrl={meetingUrl} />
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
			<section>
				<SocialProfiles />
			</section>
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
										<a href="https://chanel.com/"/>,
										<a href="https://www.vinci.com"/>,
									]}
								/>
							</p>

							<span>{t("ABOUT_ME_PART_3_TITLE")}</span>
							<p>
								<Trans
									i18nKey="ABOUT_ME_PART_3_CONTENT"
									components={[
										<a href="https://connect.3kv.in"/>
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
				<ProjectDrawer projects={[
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
					{
						title: t("PROJECTS_7_TITLE"),
						company: "CHANEL",
						relevantUrl: "https://chanel.com/",
						description: t("PROJECTS_7_DESCRIPTION"),
						image: '/img/logo_chanel.svg',
						alt: 'CHANEL',
						startDate: new Date(2024, 10, 27),
						endDate: new Date(2025, 1, 31),
						techs: [
							{ name: "Python", image: "/img/python_logo.svg", url: "https://www.python.org/" },
							{ name: "AI", image: "/img/pytorch_logo.png", url: "https://pytorch.org/" },
							{ name: "Azure", image: "/img/azure.webp", url: "https://azure.microsoft.com/en-us" },
							{ name: "React.js", image: "/img/reactjs_logo.svg", url: "https://react.dev/" },
							{ name: "Javascript", image: "/img/javascript_logo.svg", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
						]
					},
					{
						title: t("PROJECTS_8_TITLE"),
						company: "CHANEL",
						relevantUrl: "https://chanel.com/",
						description: t("PROJECTS_8_DESCRIPTION"),
						image: '/img/logo_chanel.svg',
						alt: 'CHANEL',
						startDate: new Date(2024, 10, 27),
						endDate: new Date(2025, 1, 31),
						techs: [
							{ name: "Python", image: "/img/python_logo.svg", url: "https://www.python.org/" },
							{ name: "AI", image: "/img/pytorch_logo.png", url: "https://pytorch.org/" },
							{ name: "Azure", image: "/img/azure.webp", url: "https://azure.microsoft.com/en-us" },
							{ name: "React.js", image: "/img/reactjs_logo.svg", url: "https://react.dev/" },
							{ name: "Javascript", image: "/img/javascript_logo.svg", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
						]
					},
					{
						title: t("PROJECTS_9_TITLE"),
						company: "CHANEL",
						relevantUrl: "https://chanel.com/",
						description: t("PROJECTS_9_DESCRIPTION"),
						image: '/img/logo_chanel.svg',
						alt: 'CHANEL',
						startDate: new Date(2024, 10, 27),
						endDate: new Date(2025, 1, 31),
						techs: [
							{ name: "Python", image: "/img/python_logo.svg", url: "https://www.python.org/" },
							{ name: "AI", image: "/img/pytorch_logo.png", url: "https://pytorch.org/" },
							{ name: "Azure", image: "/img/azure.webp", url: "https://azure.microsoft.com/en-us" },
							{ name: "React.js", image: "/img/reactjs_logo.svg", url: "https://react.dev/" },
							{ name: "Javascript", image: "/img/javascript_logo.svg", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
						]
					},
					{
						title: t("PROJECTS_10_TITLE"),
						company: "CHANEL",
						relevantUrl: "https://chanel.com/",
						description: t("PROJECTS_10_DESCRIPTION"),
						image: '/img/logo_chanel.svg',
						alt: 'CHANEL',
						startDate: new Date(2024, 10, 27),
						endDate: new Date(2025, 1, 31),
						techs: [
							{ name: "Python", image: "/img/python_logo.svg", url: "https://www.python.org/" },
							{ name: "AI", image: "/img/pytorch_logo.png", url: "https://pytorch.org/" },
							{ name: "Azure", image: "/img/azure.webp", url: "https://azure.microsoft.com/en-us" },
							{ name: "React.js", image: "/img/reactjs_logo.svg", url: "https://react.dev/" },
							{ name: "Javascript", image: "/img/javascript_logo.svg", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
						]
					},
				]} />
			</Section>
			<section id='schedule' className='schedule'>
				<div>
					<div className='tagline'>{t("SCHEDULE_HERO_TEXT")}</div>
					<button onClick={onSchedule} className='schedule-cta'>{t("SCHEDULE_HERO_CTA")}</button>

					<Clock />
				</div>
			</section>
			<footer>
				<FooterColumn title={t("FOOTER_COLUMN_1_TITLE")} list={[
					["GitHub", getPrivacyVariable("GITHUB_URL")],
					["Linkedin", getPrivacyVariable("LINKEDIN_URL")],
					["Malt", getPrivacyVariable("MALT_URL")],
				]} />
				<FooterColumn title={t("FOOTER_COLUMN_2_TITLE")} list={[
					["Mail", `mailto:${getPrivacyVariable("MAIL")}`],
					[t("FOOTER_COLUMN_2_MEETING_LABEL"), meetingUrl]
				]} />
			</footer>
		</div>
	);
}