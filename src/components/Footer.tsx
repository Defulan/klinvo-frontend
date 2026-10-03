import { Link } from "react-router-dom";

function Footer() {
	return (
		<footer className="footer">
			<div>
				<Link className="credits-link" to="/credits">
					Credits
				</Link>
			</div>
			<div>Klinvo. 2026</div>
		</footer>
	);
}

export default Footer;
