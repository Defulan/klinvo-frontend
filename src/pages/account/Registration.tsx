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
			await api.post("/users", data);
			await fetchAuth();
			navigate("/account");
		} catch (error) {
			console.error(error);
			setErrorText(getErrorDetails(error));
		}
	};

	return (
		<div>
			{errorText && <div className="error-text">{errorText}</div>}

			<form onSubmit={handleSubmit(onSubmit)}>
				<div>
					{errors.name && <div className="error-form-text"> {errors.name.message}</div>}
					<label>
						{t("registration.name")}
						<input
							{...register("name", {
								required: t("registration.nameRequired"),
							})}
							autoComplete="username"
						/>
					</label>
				</div>

				<div>
					{errors.password && <div className="error-form-text"> {errors.password.message}</div>}
					<label>
						{t("registartion.password")}
						<input
							{...register("password", {
								required: t("registration.passwordRequired"),
							})}
							type="password"
							autoComplete="new-password"
						/>
					</label>
				</div>

				<div>
					{errors.repassword && <div className="error-form-text"> {errors.repassword.message}</div>}
					<label>
						{t("registration.repassword")}:
						<input
							{...register("repassword", {
								required: t("registration.repasswordRequired"),
								validate: (value) => value === password || t("registration.repasswordValidate"),
							})}
							type="password"
							autoComplete="new-password"
						/>
					</label>
				</div>

				<button type="submit">t("registration.submit")</button>
			</form>
			<Link to="/login">t("registration.repasswordRequired")</Link>
		</div>
	);
}

export default Registration;
