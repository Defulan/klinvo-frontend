import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function AccountPage() {
	const { t } = useTranslation();
	const { user, isContextLoading } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (isContextLoading) return;

		if (!user) navigate("/login");
	}, [isContextLoading, user, navigate]);

	return (
		<>
			{!isContextLoading && user && (
				<>
					<div className="d-flex align-items-center gap-2">
						<h1>{user.name}</h1>
						<button className="btn btn-outline-dark btn-sm" type="button" onClick={() => navigate("/account-settings")}>
							<i className="bi bi-gear"></i> {t("account.settings")}
						</button>
					</div>
					{user.bio && <p>{user.bio}</p>}
					<hr />
				</>
			)}
		</>
	);
}

export default AccountPage;
