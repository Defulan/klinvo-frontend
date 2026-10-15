import api from "../../../lib/api";
import type { Language } from "../../../lib/types/language";

interface LanguagePrivacyButtonProps {
	language: Language;
	fetchLanguage: () => Promise<void>;
}

function LanguagePrivacyButton({ language, fetchLanguage }: LanguagePrivacyButtonProps) {
	const onClick = async () => {
		try {
			await api.patch<Language>(`/languages/${language.id}`, {
				isPrivate: !language.isPrivate,
			});

			await fetchLanguage();
		} catch (error) {
			console.error(error);
		}
	};

	const privateIcon = <i className="bi bi-lock-fill"></i>;

	const publicIcon = <i className="bi bi-unlock"></i>;

	return (
		<button type="button" className="btn border-0 fs-5" onClick={onClick}>
			{language.isPrivate ? privateIcon : publicIcon}
		</button>
	);
}

export default LanguagePrivacyButton;
