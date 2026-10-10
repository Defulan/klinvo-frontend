import { useTranslation } from "react-i18next";
import api from "../../lib/api";
import { useEffect, useState } from "react";
import { getErrorDetails } from "../../lib/errorDetails";
import type { Language } from "../../lib/types/language";
import { useForm, type SubmitHandler } from "react-hook-form";

interface LanguageEditProps {
	language: Language;
}

interface LanguageEditForm {
	name: string | null;
	isPrivate: boolean | null;
}

function LanguageEditComponent({ language }: LanguageEditProps) {
	const { t } = useTranslation();
	const [errorText, setErrorText] = useState<string>("");
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<LanguageEditForm>();

	useEffect(() => {
		reset({
			name: language.name,
			isPrivate: language.isPrivate,
		});
	}, [language, reset]);

	const onSubmit: SubmitHandler<LanguageEditForm> = async (data) => {
		try {
			await api.patch(`/languages/${language.id}`, data);
		} catch (error) {
			console.error(error);
			setErrorText(getErrorDetails(error));
		}
	};

	return (
		<>
			<div className="fs-5">{t("languageEdit.title")}</div>
			<div className="error-text">{errorText}</div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div>
					<label>
						{t("languageEdit.nameLabel")}
						{errors.name && <div className="error-form-text"> {errors.name.message}</div>}
						<input
							type="text"
							{...register("name", {
								required: t("languageEdit.nameRequired"),
							})}
						/>
					</label>
				</div>
				<div>
					{errors.isPrivate && <div className="error-form-text"> {errors.isPrivate.message}</div>}
					<label>
						<input type="checkbox" {...register("isPrivate")} />
						{t("languageEdit.privateLabel")}
					</label>
				</div>
				<button className="btn btn-outline-dark btn-sm" type="submit">
					{t("languageEdit.submitLanguageEdit")}
				</button>
			</form>
		</>
	);
}

export default LanguageEditComponent;
