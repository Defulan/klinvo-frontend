import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AccountLanguagesComponent from "./AccountLanguages";
import api from "../../lib/api";
import type { User } from "../../lib/types/user";

function AccountPage() {
	const { userId } = useParams<{ userId?: string }>();
	const { t } = useTranslation();
	const { user, isContextLoading } = useAuth();
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(true);
	const [accountUser, setAccountUser] = useState<User | null>(null);
	const [isAccountOwner, setIsAccountOwner] = useState(false);

	useEffect(() => {
		if (!userId) {
			if (isContextLoading) return;

			if (!user) navigate("/login");
			setAccountUser(user);
			setIsAccountOwner(true);
			setIsLoading(false);
		} else {
			const fetchUser = async () => {
				try {
					const response = await api.get<User>(`/users/${userId}`);
					setAccountUser(response.data);
					setIsAccountOwner(response.data.id === user?.id);
				} catch (error) {
					console.error(error);
					navigate("/account");
				} finally {
					setIsLoading(false);
				}
			};
			fetchUser();
		}
	}, [isContextLoading, user, userId, navigate]);

	if (isContextLoading || isLoading || !accountUser) {
		return;
	}

	return (
		<>
			<div className="d-flex align-items-center gap-2">
				<h1>{accountUser.name}</h1>
				{isAccountOwner && (
					<button className="btn btn-outline-dark btn-sm" type="button" onClick={() => navigate("/account-settings")}>
						<i className="bi bi-gear"></i> {t("account.settings")}
					</button>
				)}
			</div>
			{accountUser.bio && <p>{accountUser.bio}</p>}
			{isAccountOwner && (
				<Link to="/language" className="text-decoration-none fw-medium">
					Создать язык
				</Link>
			)}
			<hr />
			<AccountLanguagesComponent userId={accountUser.id} />
		</>
	);
}

export default AccountPage;
