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
		<div>
			<div className="error-text">
				{errorText && t("login.errorText")}: {errorText}
			</div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div>
					{errors.id && <div className="error-form-text"> {errors.id.message}</div>}
					<label>
						{t("login.id")}
						<input
							{...register("id", {
								required: t("login.idRequired"),
								valueAsNumber: true,
								validate: (value) => !Number.isNaN(value) || t("login.idValidate"),
							})}
							autoComplete="off"
						/>
					</label>
				</div>

				<div>
					{errors.password && <div className="error-form-text"> {errors.password.message}</div>}
					<label>
						{t("login.password")}
						<input
							{...register("password", {
								required: t("login.passwordRequired"),
							})}
							type="password"
							autoComplete="current-password"
						/>
					</label>
				</div>

				<button type="submit">{t("login.submit")}</button>
			</form>
			<Link to="/registration">{t("login.toRegistration")}</Link>
		</div>
	);
}

export default Login;
