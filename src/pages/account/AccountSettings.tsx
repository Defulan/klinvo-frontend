import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import type { User } from "../../lib/types/user";
import api from "../../lib/api";
import { useForm, type SubmitHandler } from "react-hook-form";
import { getErrorDetails } from "../../lib/errorDetails";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface UserEditForm {
	name: string | null;
	bio: string | null;
}

function AccountSettings() {
	const { t } = useTranslation();
	const { isAuth, userId, isContextLoading } = useAuth();

	const [isLoading, setIsLoading] = useState(true);
	const [isEditing, setIsEditing] = useState(false);

	const [errorText, setErrorText] = useState("");
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<UserEditForm>();

	const navigate = useNavigate();

	useEffect(() => {
		if (isContextLoading) return;

		const fetchOperations = async (): Promise<void> => {
			try {
				const userResponse = await api.get<User>(`/users/${userId}`);
				reset(userResponse.data);
			} catch (err) {
				console.error(err);
			} finally {
				setIsLoading(false);
			}
		};

		switch (isAuth) {
			case null:
				return;
			case false:
				window.location.href = "/login";
				break;
			case true:
				fetchOperations();
				break;
		}
	}, [isContextLoading, userId, isAuth, reset]);

	const onSubmit: SubmitHandler<UserEditForm> = async (data) => {
		try {
			await api.patch("/users", data);
		} catch (error) {
			setErrorText(getErrorDetails(error));
		}
	};

	const handleCancel = () => {
		reset();
		setIsEditing(false);
	};

	const logout = async (event: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
		event.preventDefault();
		await api.post("/auth/logout");
		window.location.href = "/";
	};

	const editorButtons = (
		<>
			<button className="btn btn-dark btn-sm" type="submit">
				{t("accountSettings.confirm")}
			</button>
			<button className="btn btn-danger btn-sm" type="button" onClick={handleCancel}>
				{t("accountSettings.cancel")}
			</button>
		</>
	);
	const watchingButtons = (
		<>
			<button className="btn btn-dark btn-sm" type="button" onClick={() => setIsEditing(true)}>
				{t("accountSettings.edit")}
			</button>
		</>
	);

	return (
		<>
			{!isLoading && (
				<div>
					<div className="error-text">{errorText}</div>
					<div className="fs-4 d-flex align-items-end gap-2">
						<span>
							{t("accountSettings.id")}: {userId}
						</span>
						<button className="btn btn-outline-dark btn-sm" type="button" onClick={() => navigate("/account")}>
							<i className="bi bi-person"></i> {t("accountSettings.account")}
						</button>
						<button className="btn btn-danger btn-sm" type="button" onClick={logout}>
							<i className="bi bi-box-arrow-right"></i> {t("accountSettings.logout")}
						</button>
					</div>
					{isEditing && <div className="text-primary text-opacity-75">{t("accountSettings.editMode")}</div>}
					<form onSubmit={handleSubmit(onSubmit)}>
						{errors.name && <div className="error-form-text"> {errors.name.message}</div>}
						<div>
							<label>
								{t("accountSettings.username")}
								<input className="form-control" readOnly={!isEditing} type="text" {...register("name")} />
							</label>
						</div>

						<div>
							<label htmlFor="bio">{t("accountSettings.bio")}</label>
							<textarea
								id="bio"
								className="form-control"
								placeholder={t("accountSettings.bioPlaceholder")}
								readOnly={!isEditing}
								{...register("bio")}
							/>
						</div>

						<div className="d-flex gap-1 mt-2">{isEditing ? editorButtons : watchingButtons}</div>
					</form>
				</div>
			)}
		</>
	);
}

export default AccountSettings;
