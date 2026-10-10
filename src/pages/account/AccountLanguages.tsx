import { useEffect, useState } from "react";
import api from "../../lib/api";
import type { Language } from "../../lib/types/language";
import LanguageCard from "../language/LanguageCard";

interface AccountLanguagesProps {
	userId: number;
}

function AccountLanguagesComponent({ userId }: AccountLanguagesProps) {
	const [isLoading, setIsLoading] = useState(true);
	const [languages, setLanguages] = useState<Language[] | null>(null);

	useEffect(() => {
		let isMouted = true;

		const fetchLanguages = async () => {
			try {
				const response = await api.get<Language[]>(`/users/${userId}/languages`);
				if (isMouted) {
					setLanguages(response.data);
				}
			} catch (error) {
				console.error(error);
			} finally {
				if (isMouted) {
					setIsLoading(false);
				}
			}
		};

		fetchLanguages();

		return () => {
			isMouted = false;
		};
	}, [userId]);

	if (isLoading || !languages) return;

	return (
		<div className="d-flex flex-column gap-2">
			{languages.map((language) => (
				<LanguageCard key={language.id} language={language} />
			))}
		</div>
	);
}

export default AccountLanguagesComponent;
