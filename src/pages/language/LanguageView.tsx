import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";
import api from "../../lib/api";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "../../lib/dayjs";
import type { Language } from "../../lib/types/language";
import type { User } from "../../lib/types/user";
import LanguageEditComponent from "./LanguageEdit";

function LanguageView() {
	const { languageId } = useParams<{ languageId: string }>();
	const { user, isContextLoading } = useAuth();
	const { t } = useTranslation();
	const navigate = useNavigate();
	const [language, setLanguage] = useState<Language | null>(null);
	const [author, setAuthor] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isAuthor, setIsAuthor] = useState(false);

	const fetchLanguageData = useCallback(async () => {
		try {
			const languageResponse = await api.get<Language>(`/languages/${languageId}`);
			const authorResponse = await api.get<User>(`/users/${languageResponse.data.authorId}`);

			const languageData = languageResponse.data;

			if (languageData.authorId === user?.id) {
				setIsAuthor(true);
			} else if (languageData.isPrivate) {
				navigate("/404");
				return;
			}

			setLanguage(languageResponse.data);
			setAuthor(authorResponse.data);
		} catch {
			navigate("/404");
		} finally {
			setIsLoading(false);
		}
	}, [languageId, user, navigate]);

	useEffect(() => {
		if (isContextLoading) return;

		fetchLanguageData();
	}, [isContextLoading, fetchLanguageData]);

	if (isLoading || !language || !author) {
		return;
	}

	return (
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
			{isAuthor && (
				<>
					<hr />
					<LanguageEditComponent language={language} onSuccess={fetchLanguageData} />
				</>
			)}
			<hr />
		</>
	);
}

export default LanguageView;
