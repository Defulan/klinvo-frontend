import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../lib/api";
import type { Language } from "../../lib/types/language";
import type { User } from "../../lib/types/user";
import { useTranslation } from "react-i18next";

interface LanguageCardProps {
	language: Language;
}

function LanguageCard({ language }: LanguageCardProps) {
	const [authorName, setAuthorName] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const { t } = useTranslation();

	useEffect(() => {
		const fetchAuthorName = async () => {
			try {
				const response = await api.get<User>(`/users/${language.authorId}`);
				setAuthorName(response.data.name);
			} catch (error) {
				console.error(error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchAuthorName();
	}, [language]);

	if (isLoading) {
		return;
	}

	return (
		<div className="card">
			<div className="card-body">
				<div className="card-title fs-4">{language.name}</div>
				<div className="card-subtitle">
					{t("languageCard.author")} {authorName}
				</div>
				<Link className="card-link text-decoration-none" to={`/language/${language.id}`}>
					{t("languageCard.toLanguagePage")}
				</Link>
			</div>
		</div>
	);
}

export default LanguageCard;
