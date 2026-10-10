import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../../lib/api";
import { getErrorDetails } from "../../lib/errorDetails";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";

interface LoginForm {
	id: number;
	password: string;
}

function Login() {
	const { t } = useTranslation();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginForm>();
	const [errorText, setErrorText] = useState("");
	const navigate = useNavigate();
	const { fetchAuth } = useAuth();

	const onSubmit: SubmitHandler<LoginForm> = async (data) => {
		try {
			await api.post("/auth/login", data);
			await fetchAuth();
			navigate("/account");
		} catch (error) {
			setErrorText(t(getErrorDetails(error)));
		}
	};

	return (
		<div className="col-lg-6 mx-auto d-flex flex-column">
			<div className="fs-3">{t("login.title")}</div>
			{errorText && <div className="error-text">{`${t("login.errorText")}: ${errorText}`}</div>}
			<form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column gap-1">
				<div>
					{errors.id && <div className="error-form-text"> {errors.id.message}</div>}
					<input
						className="form-control"
						placeholder={t("login.id")}
						{...register("id", {
							required: t("login.idRequired"),
							valueAsNumber: true,
							validate: (value) => !Number.isNaN(value) || t("login.idValidate"),
						})}
						autoComplete="off"
					/>
				</div>

				<div>
					{errors.password && <div className="error-form-text"> {errors.password.message}</div>}
					<input
						className="form-control"
						placeholder={t("login.password")}
						{...register("password", {
							required: t("login.passwordRequired"),
						})}
						type="password"
						autoComplete="current-password"
					/>
				</div>

				<button type="submit" className="btn btn-dark mt-2">
					{t("login.submit")}
				</button>
			</form>
			<button type="button" className="btn btn-link text-decoration-none" onClick={() => navigate("/registration")}>
				{t("login.toRegistration")}
			</button>
		</div>
	);
}

export default Login;
