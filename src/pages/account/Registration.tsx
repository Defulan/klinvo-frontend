import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../../lib/api";
import { useForm, type SubmitHandler } from "react-hook-form";
import { getErrorDetails } from "../../lib/errorDetails";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";

interface RegistrationForm {
	name: string;
	password: string;
	repassword: string;
}

function Registration() {
	const { t } = useTranslation();
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<RegistrationForm>();
	const [errorText, setErrorText] = useState("");
	const navigate = useNavigate();
	const password = watch("password");
	const { fetchAuth } = useAuth();

	const onSubmit: SubmitHandler<RegistrationForm> = async (data) => {
		try {
			await api.post("/users/", data);
			await fetchAuth();
			navigate("/account");
		} catch (error) {
			console.error(error);
			setErrorText(t(getErrorDetails(error)));
		}
	};

	return (
		<div className="col-lg-6 mx-auto d-flex flex-column">
			<div className="fs-3">{t("registration.title")}</div>
			{errorText && <div className="error-text">{errorText}</div>}

			<form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column gap-1">
				<div>
					{errors.name && <div className="error-form-text"> {errors.name.message}</div>}
					<input
						className="form-control w-50"
						placeholder={t("registration.name")}
						{...register("name", {
							required: t("registration.nameRequired"),
						})}
						autoComplete="username"
					/>
				</div>

				<div>
					{errors.password && <div className="error-form-text"> {errors.password.message}</div>}
					<input
						className="form-control w-50"
						placeholder={t("registration.password")}
						{...register("password", {
							required: t("registration.passwordRequired"),
						})}
						type="password"
						autoComplete="new-password"
					/>
				</div>

				<div>
					{errors.repassword && <div className="error-form-text"> {errors.repassword.message}</div>}
					<input
						className="form-control w-50"
						placeholder={t("registration.repassword")}
						{...register("repassword", {
							required: t("registration.repasswordRequired"),
							validate: (value) => value === password || t("registration.repasswordValidate"),
						})}
						type="password"
						autoComplete="new-password"
					/>
				</div>

				<button className="btn btn-dark mt-2" type="submit">
					{t("registration.submit")}
				</button>
			</form>
			<button type="button" className="btn btn-link text-decoration-none" onClick={() => navigate("/login")}>
				{t("registration.toLogin")}
			</button>
		</div>
	);
}

export default Registration;
