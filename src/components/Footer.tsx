import { Link } from "react-router-dom";

function Footer() {
	return (
		<div className="footer">
			<div>Klinvo</div>
			<Link to="/credits">Credits</Link>
		</div>
	);
}

export default Footer;
