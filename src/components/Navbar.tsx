import { useTranslation } from "react-i18next";
import klinvoIcon from "../assets/nounLanguageWhite.svg";
import { useAuth } from "../context/AuthContext";

function Navbar() {
	const { t, i18n } = useTranslation();

	const { user, isContextLoading } = useAuth();

	const authItemLink = user ? "/account" : "/login";
	const authItemText = user ? t("navbar.account") : t("navbar.login");

	const authItem = (
		<a className="nav-link text-white" href={authItemLink}>
			{authItemText}
		</a>
	);

	const authItemSpinner = (
		<div className="spinner-grow spinner-grow-sm text-light" role="status">
			<span className="visually-hidden">Loading...</span>
		</div>
	);

	return (
		<nav className="navbar navbar-expand-lg navbar-color">
			<div className="container-fluid container d-flex align-items-center position-relative">
				<a className="navbar-brand text-white d-flex gap-2" href="/">
					<img alt="" src={klinvoIcon} width={32} height={32} className="d-inline-block" />
					<span className="align-text-center">Klinvo</span>
				</a>
				<ul className="navbar-nav mx-auto position-absolute start-50 translate-middle-x">
					<li className="nav-item">{!isContextLoading ? authItem : authItemSpinner}</li>
				</ul>
				<div className="nav-item dropdown">
					<button
						className="nav-link dropdown-toggle text-white"
						type="button"
						data-bs-toggle="dropdown"
						data-bs-auto-close="outside"
						aria-expanded="false">
						<i className="bi bi-translate"></i>
					</button>
					<ul className="dropdown-menu bg-dark">
						<li>
							<button
								className={`dropdown-item text-white navbar-button-colors ${i18n.language === "en" ? "active" : ""}`}
								type="button"
								onClick={() => i18n.changeLanguage("en")}>
								English
							</button>
						</li>
						<li>
							<button
								className={`dropdown-item text-white navbar-button-colors ${i18n.language === "ru" ? "active" : ""}`}
								type="button"
								onClick={() => i18n.changeLanguage("ru")}>
								Русский
							</button>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
