import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AccountLanguagesComponent from "./AccountLanguages";
import api from "../../lib/api";
import type { User } from "../../lib/types/user";
import useTitle from "../../hooks/useTitle";
import EditableField, { type EditableFieldForm } from "../../components/EditableField";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

function AccountPage() {
	const { userId } = useParams<{ userId?: string }>();
	const { t } = useTranslation();
	const { user, isContextLoading, fetchAuth } = useAuth();
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(true);
	const [accountUser, setAccountUser] = useState<User | null>(null);
	const [isAccountOwner, setIsAccountOwner] = useState(false);

	const loadedTitle = t("account.pageTitle", { name: user?.name });
	const unloadedTitle = t("account.unloadedPageTitle");

	useTitle(user?.name ? loadedTitle : unloadedTitle);

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

	const onNameChangeConfirm = async (data: EditableFieldForm) => {
		try {
			await api.patch<User>(`/users/`, data);
			await fetchAuth();
		} catch (error) {
			console.error(error);
		}
	};

	if (isAccountOwner) {
		return (
			<>
				<div className="d-flex align-items-center justify-content-between gap-2">
					<h1>
						<EditableField value={accountUser.name} fieldName="name" onConfirmChanges={onNameChangeConfirm} />
					</h1>

					<div className="d-flex gap-2">
						<button
							type="button"
							className="btn btn-outline-primary d-flex gap-2"
							onClick={() => navigate("/language")}>
							{t("account.toCreateLanguage")}
							<i className="bi bi-plus-lg"></i>
						</button>
						<button className="btn btn-dark" type="button" onClick={() => navigate("/account/settings")}>
							<i className="bi bi-gear"></i>
						</button>
					</div>
				</div>
				{accountUser.bio && (
					<p>
						<Markdown remarkPlugins={[remarkGfm]}>{accountUser.bio}</Markdown>
					</p>
				)}
				<hr />
				<AccountLanguagesComponent userId={accountUser.id} />
			</>
		);
	}

	return (
		<>
			<div className="d-flex align-items-center justify-content-between gap-2">
				<h1>{accountUser.name}</h1>
			</div>
			{accountUser.bio && (
				<p>
					<Markdown remarkPlugins={[remarkGfm]}>{accountUser.bio}</Markdown>
				</p>
			)}
			<hr />
			<AccountLanguagesComponent userId={accountUser.id} />
		</>
	);
}

export default AccountPage;
