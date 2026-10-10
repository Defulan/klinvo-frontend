import { useForm, type SubmitHandler } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";
import api from "../../lib/api";
import { useEffect, useState } from "react";
import { getErrorDetails } from "../../lib/errorDetails";
import { useNavigate } from "react-router-dom";

interface LanguageCreate {
	name: string;
}

function CreateLanguagePage() {
	const { user, isContextLoading } = useAuth();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LanguageCreate>();
	const { t } = useTranslation();
	const [errorText, setErrorText] = useState<string>("");
	const navigate = useNavigate();

	useEffect(() => {
		if (isContextLoading) return;

		if (!user) {
			navigate("/login");
		}
	}, [isContextLoading, user, navigate]);

	const onSubmit: SubmitHandler<LanguageCreate> = async (data) => {
		try {
			await api.post("/languages/", data);
		} catch (error) {
			console.log(error);
			setErrorText(getErrorDetails(error));
		}
	};

	return (
		<>
			{!isContextLoading && user && (
				<div className="col-lg-7 mx-auto">
					{errorText && <div>{errorText}</div>}
					<form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column text-center gap-4">
						<label className="fs-3" htmlFor="name">
							Назовите язык
						</label>
						{errors.name && <div className="error-form-text"> {errors.name.message}</div>}
						<input
							className="form-control w-75 mx-auto"
							type="text"
							id="name"
							autoComplete="off"
							{...register("name", {
								required: t("language.nameRequired"),
								minLength: {
									value: 1,
									message: t("language.nameShort"),
								},
								maxLength: {
									value: 255,
									message: t("language.nameLong"),
								},
							})}
						/>
						<button className="btn btn-outline-primary w-25 mx-auto" type="submit">
							Создать язык
						</button>
					</form>
				</div>
			)}
		</>
	);
}

export default CreateLanguagePage;
