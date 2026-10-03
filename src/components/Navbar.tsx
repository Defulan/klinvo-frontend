import klinvoIcon from "../assets/nounLanguage.svg";
import { useAuth } from "../context/AuthContext";

function Navbar() {
	const { isAuth, isContextLoading } = useAuth();

	const authItemLink = isAuth ? "/account" : "/login";
	const authItemText = isAuth ? "Аккаунт" : "Вход";

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
				</ul>
			</div>
		</nav>
	);
}

export default Navbar;
