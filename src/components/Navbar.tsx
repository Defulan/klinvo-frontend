import { useTranslation } from "react-i18next";
import klinvoIcon from "../assets/nounLanguage.svg";
import { useAuth } from "../context/AuthContext";

function Navbar() {
	const { t, i18n } = useTranslation();

	const { user, isContextLoading } = useAuth();

	const authItemLink = user ? "/account" : "/login";
	const authItemText = user ? t("navbar.account") : t("navbar.login");

	return (
		<nav className="navbar navbar-expand-lg bg-black bg-opacity-75">
			<div className="container-fluid container d-flex align-items-center">
				<a className="navbar-brand text-white d-flex gap-2" href="/">
					<img alt="" src={klinvoIcon} width={32} height={32} className="d-inline-block" />
					<span className="align-text-center">Klinvo</span>
				</a>
				<ul className="navbar-nav mx-auto mb-2 mb-lg-0">
					<li className="nav-item">
						{!isContextLoading && (
							<a className="nav-link text-white" href={authItemLink}>
								{authItemText}
							</a>
						)}
					</li>
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
					<ul className="dropdown-menu">
						<li>
							<button
								className={`dropdown-item ${i18n.language === "en" ? "active" : ""}`}
								type="button"
								onClick={() => i18n.changeLanguage("en")}>
								English
							</button>
						</li>
						<li>
							<button
								className={`dropdown-item ${i18n.language === "ru" ? "active" : ""}`}
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
