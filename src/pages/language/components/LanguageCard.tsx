import { Link } from "react-router-dom";
import type { Language } from "../../../lib/types/language";
import { useTranslation } from "react-i18next";
import { useUser } from "../../../hooks/useUser";

interface LanguageCardProps {
	language: Language;
}

function LanguageCard({ language }: LanguageCardProps) {
	const { t } = useTranslation();

	const { data: user, isLoading, isError, error } = useUser(language.authorId);

	if (isLoading) {
		return;
	}

	if (isError) {
		console.error(error);
		return;
	}

	return (
		<div className="card">
			<div className="card-body">
				<div className="card-title fs-4">{language.name}</div>
				<div className="card-subtitle">
					{t("languageCard.author")} {user?.name}
				</div>
				<Link className="card-link text-decoration-none" to={`/language/${language.id}`}>
					{t("languageCard.toLanguagePage")}
				</Link>
			</div>
		</div>
	);
}

export default LanguageCard;
