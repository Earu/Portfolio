import { useTranslation } from "react-i18next";
import { getPrivacyVariable } from "../privacy";
import "./Navbar.css";
import { useState, useEffect } from "react";

export default function Navbar(): JSX.Element {
	const { t } = useTranslation();
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'unset';
		}

		return () => {
			document.body.style.overflow = 'unset';
		};
	}, [isOpen]);

	const toggleMenu = () => {
		if (window.innerWidth > 600) return;
		setIsOpen(!isOpen);
	};

	return (
		<nav className={isOpen ? 'open' : ''}>
			<div className="nav-header">
				<a href="/" className="brand">
					{getPrivacyVariable("NAME")} {getPrivacyVariable("FAMILY_NAME")[0].toUpperCase()}.
				</a>
				<div className="nav-links">
					<a href="#pricing" onClick={toggleMenu}>{t("NAV_SERVICES_LABEL")}</a>
					<a href="#projects" onClick={toggleMenu}>{t("NAV_PROJECTS_LABEL")}</a>
					<a href="#about-me" onClick={toggleMenu}>{t("NAV_ABOUT_ME_LABEL")}</a>
					<a href="#schedule" onClick={toggleMenu}>{t("NAV_SCHEDULE_LABEL")}</a>
				</div>
				<button 
					className={`hamburger ${isOpen ? 'active' : ''}`}
					onClick={toggleMenu}
					aria-label="Toggle menu"
				>
					<span></span>
					<span></span>
					<span></span>
				</button>
			</div>
			{isOpen && <div className="nav-overlay" onClick={toggleMenu} />}
		</nav>
	);
}