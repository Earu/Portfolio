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
import Shader from './Components/Shader';
import Techs from './Components/Techs';

// GLSL Shaders
const fragmentShaderSource = `
precision mediump float;

uniform vec2 iResolution;
uniform float iTime;

const int MAXITER = 10;

vec3 field(vec3 p) {
	p *= .1;
	float f = .1;
	for (int i = 0; i < 3; i++) {
		p = p.yzx; //*mat3(.8,.6,0,-.6,.8,0,0,0,1);
//		p += vec3(.123,.456,.789)*float(i);
		p = abs(fract(p)-.5);
		p *= 3.0;
		f *= 3.0;
	}
	p *= p;
	return sqrt(p+p.yzx)/f-.05;
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
	vec3 dir = normalize(vec3((fragCoord-iResolution*.5)/iResolution.x,1.));
	float a = iTime * 0.1;
	vec3 pos = vec3(0.0,iTime*0.1,0.0);
	dir *= mat3(1,0,0,0,cos(a),-sin(a),0,sin(a),cos(a));
	dir *= mat3(cos(a),0,-sin(a),0,1,0,sin(a),0,cos(a));
	vec3 color = vec3(0);
	for (int i = 0; i < MAXITER; i++) {
		vec3 f2 = field(pos);
		float f = min(min(f2.x,f2.y),f2.z);

		pos += dir*f;
		color += float(MAXITER-i)/(f2+.01);
	}
	vec3 color3 = vec3(1.-1./(1.+color*(.09/float(MAXITER*MAXITER))));
	color3 *= color3;
	fragColor = vec4(vec3(color3.r+color3.g+color3.b),1.);
}

void main() {
	mainImage(gl_FragColor, gl_FragCoord.xy);
}
`;

export default function App() {
	const { t } = useTranslation();

	const meetingUrl = i18n.language == "fr" ? getPrivacyVariable("MEETING_URL_FR") : getPrivacyVariable("MEETING_URL");
	function onSchedule(ev: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>): void {
		window.open(meetingUrl, t("SCHEDULE_WINDOW_TITLE"), "width=800,height=600");
		ev.preventDefault();
	}

	return (
		<div className="App">
			<header className="App-header">
				<Shader fragmentShader={fragmentShaderSource} />
				<div id="gradient-overlay"></div>
				<Navbar />
				<div className="slogan">
					<h1>
						<Trans
							i18nKey="HEADER_HERO_TEXT"
							values={{ NAME: getPrivacyVariable("NAME") }}
							components={[
								<span/>, <span/>, <span/>, <span/>
							]}
						/>
					</h1>
					<div className="cta-btns">
						<a href={`mailto:${getPrivacyVariable("MAIL")}`}>{t("HEADER_HERO_CTA")}</a>
						<a id="linkedin" href={`${getPrivacyVariable("LINKEDIN_URL")}?locale=en_US`}>LINKEDIN</a>
					</div>
				</div>
			</header>
			<MobileScrollDown />
			<Section id='services' title={t("SERVICES_TITLE")}>
				<ServiceCardRow>
					<ServiceCard
						tagline={t("SERVICES_1_TAGLINE")}
						description={t("SERVICES_1_DESCRIPTION")}
						image="/img/azure.webp" alt="Azure logo"
					/>
					<ServiceCard
						tagline={t("SERVICES_2_TAGLINE")}
						description={t("SERVICES_2_DESCRIPTION")}
						image="/img/logo_microsoft.svg" alt="Performance"
					/>
					<ServiceCard
						tagline={t("SERVICES_3_TAGLINE")}
						description={t("SERVICES_3_DESCRIPTION")}
						image="/img/vsc.webp" alt='Visual Studio Code logo'
					/>
				</ServiceCardRow>
			</Section>
			<Section id='about-me' title={t("ABOUT_ME_TITLE")}>
				<div className="tech-stack">
					<h3>{t("ABOUT_ME_PART_5_TITLE")}</h3>
					<Techs techs={[
						{ name: ".NET", image: "/img/dotnet_logo.svg", url: "https://dotnet.microsoft.com/en-us/" },
						{ name: "C#", image: "/img/csharp_logo.svg", url: "https://learn.microsoft.com/en-us/dotnet/csharp/" },
						{ name: "Azure", image: "/img/azure.webp", url: "https://azure.microsoft.com/en-us" },
						{ name: "React.js", image: "/img/reactjs_logo.svg", url: "https://react.dev/" },
						{ name: "Typescript", image: "/img/typescript_logo.svg", url: "https://www.typescriptlang.org/" },
						{ name: "Python", image: "/img/python_logo.svg", url: "https://www.python.org/" },
						{ name: "AI", image: "/img/tensorflow_logo.svg", url: "https://www.tensorflow.org/" },
					]} size={Math.min(100, window.innerWidth / 7 / 2)} showTitle={window.innerWidth > 600} />
				</div>
				<div className="about-me-content">
					<div>
						<img src="/img/at_work.webp" alt={`${getPrivacyVariable("NAME")} at work`} />
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