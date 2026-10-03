import { Link } from "react-router-dom";

function Footer() {
	return (
		<footer className="footer">
			<div>
				<Link className="credits-link" to="/credits">
					Использованные материалы
				</Link>
			</div>
			<div className="footer-klinvo">Klinvo. 2026</div>
		</footer>
	);
}

export default Footer;
