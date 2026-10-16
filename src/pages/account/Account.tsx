import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AccountLanguagesComponent from "./AccountLanguages";
import useTitle from "../../hooks/useTitle";
import EditableField, { type EditableFieldForm } from "../../components/EditableField";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useUpdateUser, useUser } from "../../hooks/useUser";

function AccountPage() {
	const { userId } = useParams<{ userId?: string }>();
	const { t } = useTranslation();
	const { user, isContextLoading } = useAuth();
	const navigate = useNavigate();

	const accountUserId = userId ? Number(userId) : user?.id;

	const {
		data: accountUser,
		isLoading: isAccountLoading,
		isError: isAccountError,
		error: accountError,
	} = useUser(Number(accountUserId));
	const userMutationPatch = useUpdateUser();

	const isLoading = isContextLoading || isAccountLoading;
	const isAccountOwner = Boolean(accountUserId && user && accountUserId === user.id);

	const loadedTitle = t("account.pageTitle", { name: user?.name });
	const unloadedTitle = t("account.unloadedPageTitle");

	useTitle(user?.name ? loadedTitle : unloadedTitle);

	useEffect(() => {
		if (isLoading) {
			return;
		}

		if (isAccountError) {
			console.error(accountError);
			navigate("/404");
			return;
		}

		if (!user) {
			navigate("/login");
			return;
		}
	}, [isLoading, isAccountError, accountError, user, navigate]);

	if (isLoading || !accountUser) {
		return;
	}

	const onNameChangeConfirm = async (data: EditableFieldForm) => {
		userMutationPatch.mutate(
			{ ...data },
			{
				onError: (error) => {
					console.error(error);
				},
			},
		);
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
