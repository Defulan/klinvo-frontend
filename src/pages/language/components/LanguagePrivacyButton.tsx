import { useUpdateLanguage } from "../../../hooks/useLanguage";
import type { Language } from "../../../lib/types/language";

interface LanguagePrivacyButtonProps {
	language: Language;
}

function LanguagePrivacyButton({ language }: LanguagePrivacyButtonProps) {
	const languageMutationPatch = useUpdateLanguage();

	const onClick = async () => {
		languageMutationPatch.mutate(
			{ languageId: language.id, isPrivate: !language.isPrivate },
			{
				onError: (error) => {
					console.error(error);
				},
			},
		);
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
