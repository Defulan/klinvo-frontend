import { useEffect, useState } from "react";
import api from "../../lib/api";
import type { Language } from "../../lib/types/language";
import LanguageCard from "./LanguageCard";
import { useTranslation } from "react-i18next";

function LanguagesPage() {
	const [languages, setLanguages] = useState<Language[] | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const { t } = useTranslation();

	useEffect(() => {
		const fetchLanguagesGet = async () => {
			try {
				const response = await api.get<Language[]>("/languages/");
				setLanguages(response.data);
			} catch (error) {
				console.error(error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchLanguagesGet();
	}, []);

	if (isLoading || !languages) {
		return;
	}

	return (
		<>
			<h1>{t("languagesPage.title")}</h1>
			{languages.map((language) => (
				<LanguageCard key={language.id} language={language} />
			))}
		</>
	);
}

export default LanguagesPage;
