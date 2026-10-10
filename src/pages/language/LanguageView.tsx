import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";
import api from "../../lib/api";
import { useEffect, useState } from "react";
import { getErrorDetails } from "../../lib/errorDetails";
import { Link, useNavigate, useParams } from "react-router-dom";
import dayjs from "../../lib/dayjs";
import type { Language } from "../../lib/types/language";
import type { User } from "../../lib/types/user";

function LanguageView() {
	const { languageId } = useParams<{ languageId: string }>();
	const { user, isContextLoading } = useAuth();
	const { t } = useTranslation();
	const [errorText, setErrorText] = useState<string>("");
	const navigate = useNavigate();
	const [language, setLanguage] = useState<Language | null>(null);
	const [author, setAuthor] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		let isMounted = true;

		const fetchLanguageGet = async () => {
			try {
				const languageResponse = await api.get<Language>(`/languages/${languageId}`);
				const authorResponse = await api.get<User>(`/users/${languageResponse.data.authorId}`);

				if (isMounted) {
					setLanguage(languageResponse.data);
					setAuthor(authorResponse.data);
				}
			} catch (error) {
				console.error(error);
			} finally {
				if (isMounted) {
					setIsLoading(false);
				}
			}
		};
		fetchLanguageGet();

		if (!isLoading) {
			if (!language || language.isPrivate) {
				navigate("/404");
			}
		}

		return () => {
			isMounted = false;
		};
	}, [isLoading, language, navigate, languageId]);

	return (
		<>
			{!isLoading && language && author && !language.isPrivate && (
				<>
					<h1>{language.name}</h1>
					<ul>
						<li>
							{t("languageView.createdBy")} {author.name}
						</li>
						<li>
							{t("languageView.createdAt")} {dayjs(language.createdAt).format("lll")}
						</li>
						{language.isPrivate && <li>{t("languageView.itsPrivate")}</li>}
					</ul>
					<hr />
				</>
			)}
		</>
	);
}

export default LanguageView;
