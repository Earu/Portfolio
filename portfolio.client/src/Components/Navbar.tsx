import { useTranslation } from "react-i18next";
import { getPrivacyVariable } from "../privacy";
import "./Navbar.css";
import SlantedBox from "./SlantedBox";

export default function Navbar(): JSX.Element {
	const { t } = useTranslation();
	const onBurger = () => {
		if (window.innerWidth > 600) return;

		let nav = document.getElementsByTagName("nav")[0];
		let isHidden = nav.style.overflowY === "hidden" || nav.style.overflowY === "";

		nav.style.overflow = isHidden ? "visible" : "hidden";
		nav.style.height = isHidden ? "auto" : "40px";
	}

	return <nav onClick={onBurger}>
		<img src="/img/burger_menu.webp" alt="menu"/>
		<SlantedBox href="/">
			{getPrivacyVariable("NAME")} {getPrivacyVariable("FAMILY_NAME")}
		</SlantedBox>

		<a href="#services">{t("NAV_SERVICES_LABEL")}</a>
		<a href="#about-me">{t("NAV_ABOUT_ME_LABEL")}</a>
		<a href="#projects">{t("NAV_PROJECTS_LABEL")}</a>
		<a href="#schedule">{t("NAV_SCHEDULE_LABEL")}</a>
	</nav>
}