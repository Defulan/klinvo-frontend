import { useTranslation } from "react-i18next";
import klinvoIcon from "../assets/nounLanguage.svg";
import { useAuth } from "../context/AuthContext";

function Navbar() {
	const { t, i18n } = useTranslation();

	const { user, isContextLoading } = useAuth();

	const authItemLink = user ? "/account" : "/login";
	const authItemText = user ? t("navbar.account") : t("navbar.login");

	return (
		<nav className="navbar navbar-expand-lg bg-body-tertiary">
			<div className="container-fluid">
				<a className="navbar-brand" href="/">
					<img alt="" src={klinvoIcon} width={32} height={32} className="d-inline-block align-text-top" />
					Klinvo
				</a>
				<ul className="navbar-nav me-auto mb-2 mb-lg-0">
					<li className="nav-item">
						{!isContextLoading && (
							<a className="nav-link" href={authItemLink}>
								{authItemText}
							</a>
						)}
					</li>
					<li className="nav-item dropdown">
						<button
							className="nav-link dropdown-toggle"
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
					</li>
				</ul>
			</div>
		</nav>
	);
}

export default Navbar;
