import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../../lib/api";
import { SubmitHandler, useForm } from "react-hook-form";
import { getErrorDetails } from "../../lib/errorDetails";

interface RegistrationForm {
	name: string;
	password: string;
	repassword: string;
}

function Registration() {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<RegistrationForm>();
	const [errorText, setErrorText] = useState("");
	const navigate = useNavigate();
	const password = watch("password");

	const onSubmit: SubmitHandler<RegistrationForm> = async (data) => {
		try {
			await api.post("/users", data);
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
						Имя пользователя:
						<input
							{...register("name", {
								required: "Введите имя",
							})}
							autoComplete="username"
						/>
					</label>
				</div>

				<div>
					{errors.password && <div className="error-form-text"> {errors.password.message}</div>}
					<label>
						Пароль:
						<input
							{...register("password", {
								required: "Введите пароль",
							})}
							type="password"
							autoComplete="new-password"
						/>
					</label>
				</div>

				<div>
					{errors.repassword && <div className="error-form-text"> {errors.repassword.message}</div>}
					<label>
						Повторите пароль:
						<input
							{...register("repassword", {
								required: "Повторите пароль",
								validate: (value) => value === password || "Пароли не совпадают",
							})}
							type="password"
							autoComplete="new-password"
						/>
					</label>
				</div>

				<button type="submit">Зарегистрироваться</button>
			</form>
			<Link to="/login">Уже есть аккаунт? (Войти)</Link>
		</div>
	);
}

export default Registration;
