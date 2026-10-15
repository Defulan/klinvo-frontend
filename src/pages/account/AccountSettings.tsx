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

interface UserEditForm {
	bio: string | null;
}

function AccountSettings() {
	const { t } = useTranslation();
	const { user, isContextLoading, fetchAuth } = useAuth();

	const [isLoading, setIsLoading] = useState(true);

	const [errorText, setErrorText] = useState("");
	const { register, handleSubmit, reset } = useForm<UserEditForm>();

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
		try {
			const response = await api.patch<User>("/users/", data);
			await fetchAuth();

			reset({
				bio: response.data.bio,
			});
		} catch (error) {
			setErrorText(t(getErrorDetails(error)));
		}
	};

	const handleCancel = () => {
		reset();
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
		<div>
			<div className="error-text">{errorText}</div>
			<div className="fs-4 d-flex align-items-end gap-2">
				<span>
					{t("accountSettings.id")}: {user.id}
				</span>
				<button className="btn btn-outline-dark btn-sm" type="button" onClick={() => navigate("/account")}>
					<i className="bi bi-person"></i> {t("accountSettings.account")}
				</button>
				<button className="btn btn-danger btn-sm" type="button" onClick={logout}>
					<i className="bi bi-box-arrow-right"></i> {t("accountSettings.logout")}
				</button>
			</div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<ContentEditor handleCancel={handleCancel} registerProps={register("bio")} />
			</form>
		</div>
	);
}

export default AccountSettings;
