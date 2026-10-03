import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../../lib/api";
import { getErrorDetails } from "../../lib/errorDetails";
import { SubmitHandler, useForm } from "react-hook-form";

interface LoginForm {
	id: number;
	password: string;
}

function Login() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginForm>();
	const [errorText, setErrorText] = useState("");
	const navigate = useNavigate();

	const onSubmit: SubmitHandler<LoginForm> = async (data) => {
		try {
			await api.post("/auth/login", data);
			navigate("/account");
		} catch (error) {
			setErrorText(getErrorDetails(error));
		}
	};

	return (
		<div>
			<div className="error-text">
				{errorText && "Произошла ошибка:"} {errorText}
			</div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div>
					{errors.id && <div className="error-form-text"> {errors.id.message}</div>}
					<label>
						ID пользователя:
						<input
							{...register("id", {
								required: "Введите ID",
								valueAsNumber: true,
								validate: (value) => !isNaN(value) || "ID является числом",
							})}
							autoComplete="off"
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
							autoComplete="current-password"
						/>
					</label>
				</div>

				<button type="submit">Войти</button>
			</form>
			<Link to="/registration">Нет аккаунта? Зарегистрироваться</Link>
		</div>
	);
}

export default Login;
