import { useForm, type SubmitHandler } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";
import api from "../../lib/api";
import { useEffect, useState } from "react";
import { getErrorDetails } from "../../lib/errorDetails";
import { useNavigate, useParams } from "react-router-dom";
import type { Language } from "../../lib/types/language";
import type { User } from "../../lib/types/user";

interface LanguageCreate {
	name: string;
}

function LanguagePage() {
	const { languageId } = useParams<{ languageId?: string }>();
	const { user, isContextLoading } = useAuth();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LanguageCreate>();
	const { t } = useTranslation();
	const [errorText, setErrorText] = useState<string>("");
	const navigate = useNavigate();
	const [language, setLanguage] = useState<Language | null>(null);
	const [author, setAuthor] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchLanguageGet = async () => {
			try {
				const languageResponse = await api.get<Language>(`/languages/${languageId}`);
				const authorResponse = await api.get<User>(`/users/${languageResponse.data.authorId}`);
				setLanguage(languageResponse.data);
				setAuthor(authorResponse.data);
			} catch (error) {
				console.error(error);
			} finally {
				setIsLoading(false);
			}
		};

		if (!languageId) {
			if (isContextLoading) return;

			if (!user) {
				navigate("/");
			}
		} else {
			fetchLanguageGet();
		}
	}, [isContextLoading, user, navigate, languageId]);

	const onSubmit: SubmitHandler<LanguageCreate> = async (data) => {
		try {
			await api.post("/languages/", data);
		} catch (error) {
			console.log(error);
			setErrorText(getErrorDetails(error));
		}
	};

	if (!languageId) {
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
	} else {
		return (
			<>
				{!isLoading && language && author && !language.isPrivate && (
					<>
						<h1>Название языка: {language.name}</h1>
						<div>Создан {author.name}</div>
					</>
				)}
			</>
		);
	}
}

export default LanguagePage;
