import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function Footer() {
	const { t } = useTranslation();

	return (
		<footer className="footer">
			<div>
				<Link className="credits-link" to="/about">
					{t("footer.about")}
				</Link>
			</div>
			<div className="footer-klinvo">{t("footer.copyright", { year: "2026" })}</div>
		</footer>
	);
}

export default Footer;
