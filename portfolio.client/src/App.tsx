/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react';
import './App.css';
import ServiceCard from './Components/ServiceCard';
import ServiceCardRow from './Components/ServiceCardRow';
import Navbar from './Components/Navbar';
import Section from './Components/Section';
import ShootingStars from './Components/ShootingStars';
import Clock from './Components/Clock';
import { GITHUB_URL, LINKEDIN_URL, MAIL, NAME } from './constants';
import { Trans, useTranslation } from 'react-i18next';
import MobileScrollDown from './Components/MobileScrollDown';
import FooterColumn from './Components/FooterColumn';
import ProjectTimeline from './Components/ProjectTimeline';

export default function App() {
	const { t } = useTranslation();

	function onSchedule(ev: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>): void {
		window.open(t("SCHEDULE_URL"), t("SCHEDULE_WINDOW_TITLE"), "width=800,height=600");
		ev.preventDefault();
	}

	return (
		<div className="App">
			<header className="App-header">
				<Navbar />
				<div className="slogan">
					<h1>
						<Trans
							i18nKey="HEADER_HERO_TEXT"
							values={{ NAME: NAME }}
							components={[
								<span/>, <span/>, <span/>, <span/>
							]}
						/>
					</h1>
					<div className="cta-btns">
						<a href={`mailto:${MAIL}`}>{t("HEADER_HERO_CTA")}</a>
						<a id="linkedin" href={`${LINKEDIN_URL}?locale=en_US`}>LINKEDIN</a>
					</div>
				</div>
				<ShootingStars />
			</header>
			<MobileScrollDown />
			<Section id='services' title={t("SERVICES_TITLE")}>
				<ServiceCardRow>
					<ServiceCard
						tagline={t("SERVICES_1_TAGLINE")}
						description={t("SERVICES_1_DESCRIPTION")}
						image="/img/azure.webp"
					/>
					<ServiceCard
						tagline={t("SERVICES_2_TAGLINE")}
						description={t("SERVICES_2_DESCRIPTION")}
						image="/img/soft_performances.webp"
					/>
					<ServiceCard
						tagline={t("SERVICES_3_TAGLINE")}
						description={t("SERVICES_3_DESCRIPTION")}
						image="/img/vsc.webp"
					/>
				</ServiceCardRow>
			</Section>
			<Section id='about-me' title={t("ABOUT_ME_TITLE")}>
				<div className="about-me-content">
					<div className='professional-me'>
						<img src="/img/at_work.webp" alt={`${NAME} at work`} />
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
					},
					{
						title: t("PROJECTS_6_TITLE"),
						company: "AGILITIC",
						relevantUrl: "https://www.societe.com/societe/agilitic-811184001.html",
						description: t("PROJECTS_4_DESCRIPTION"),
						image: '/img/logo_agilitic.webp',
						alt: 'AGILITIC',
						startDate: new Date(2018, 8, 1),
						endDate: new Date(2019, 2, 30),
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
					["GitHub", GITHUB_URL],
					["Linkedin", LINKEDIN_URL]
				]} />
				<FooterColumn title={t("FOOTER_COLUMN_2_TITLE")} list={[
					["Mail", `mailto:${MAIL}`],
					[t("FOOTER_COLUMN_2_MEETING_LABEL"), t("SCHEDULE_URL")]
				]} />
			</footer>
		</div>
	);
}