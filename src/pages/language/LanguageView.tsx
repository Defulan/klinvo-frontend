import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";
import api from "../../lib/api";
import { useEffect, useState } from "react";
import { getErrorDetails } from "../../lib/errorDetails";
import { useNavigate, useParams } from "react-router-dom";
import type { Language } from "../../lib/types/language";
import type { User } from "../../lib/types/user";

function LanguageView() {
	const { languageId } = useParams<{ languageId?: string }>();
	const { user, isContextLoading } = useAuth();
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

export default LanguageView;
