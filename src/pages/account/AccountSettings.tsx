import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../lib/api";
import { useForm, type SubmitHandler } from "react-hook-form";
import { getErrorDetails } from "../../lib/errorDetails";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useTitle from "../../hooks/useTitle";
import type { User } from "../../lib/types/user";
import ContentEditor from "../../components/ContentEditor";
import { useUpdateUser } from "../../hooks/useUser";

interface UserEditForm {
	bio: string | null;
}

function AccountSettings() {
	const { t } = useTranslation();
	const { user, isContextLoading, fetchAuth } = useAuth();

	const [isLoading, setIsLoading] = useState(true);

	const [errorText, setErrorText] = useState("");
	const [editInfoText, setEditInfoText] = useState<string | null>(null);
	const { register, handleSubmit, reset } = useForm<UserEditForm>();

	const userMutationPatch = useUpdateUser();

	const navigate = useNavigate();

	const loadedTitle = t("accountSettings.pageTitle", { name: user?.name });
	const unloadedTitle = t("accountSettings.unloadedPageTitle");

	useTitle(user?.name ? loadedTitle : unloadedTitle);

	useEffect(() => {
		if (isContextLoading) return;

		if (user) {
			reset({
				bio: user.bio,
			});
			setIsLoading(false);
		} else {
			window.location.href = "/login";
		}
	}, [isContextLoading, user, reset]);

	const onSubmit: SubmitHandler<UserEditForm> = async (data) => {
		userMutationPatch.mutate(
			{ ...data },
			{
				onSuccess: (data: User) => {
					reset({
						bio: data.bio,
					});
					fetchAuth();
					setEditInfoText(t("accountSettings.changesAccepted"));
				},
				onError: (error) => {
					console.error(error);
					setErrorText(t(getErrorDetails(error)));
				},
			},
		);
	};

	const handleCancel = () => {
		reset();
		setEditInfoText(t("accountSettings.changesCanceled"));
	};

	const logout = async (event: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
		event.preventDefault();
		await api.post("/auth/logout");
		window.location.href = "/";
	};

	if (isLoading || !user) {
		return;
	}

	return (
		<div className="d-flex flex-column gap-3">
			<div className="fs-3 d-flex align-items-end justify-content-between gap-2">
				<span>
					{t("accountSettings.id")}: {user.id}
				</span>
				<div className="d-flex align-items-end gap-2">
					<button className="btn btn-outline-danger" type="button" onClick={logout}>
						<i className="bi bi-box-arrow-right"></i> {t("accountSettings.logout")}
					</button>
					<button className="btn btn-dark d-flex gap-1" type="button" onClick={() => navigate("/account")}>
						<i className="bi bi-arrow-return-right"></i>
					</button>
				</div>
			</div>

			{errorText && <div className="error-text">{errorText}</div>}
			{editInfoText && <div className="edit-info">{editInfoText}</div>}

			<form onSubmit={handleSubmit(onSubmit)}>
				<ContentEditor handleCancel={handleCancel} registerProps={register("bio")} />
			</form>
		</div>
	);
}

export default AccountSettings;
