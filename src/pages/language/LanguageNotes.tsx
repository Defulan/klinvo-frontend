import { useEffect, useState } from "react";
import type { Language } from "../../lib/types/language";
import type { Note } from "../../lib/types/note";
import api from "../../lib/api";
import { useTranslation } from "react-i18next";

interface LanguageNotesProps {
	language: Language;
}

function LanguageNotesComponent({ language }: LanguageNotesProps) {
	const { t } = useTranslation();
	const [notes, setNotes] = useState<Note[] | null>();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchNotes = async () => {
			try {
				const response = await api.get<Note[]>(`/languages/${language.id}/notes`);
				setNotes(response.data);
			} catch (error) {
				console.error(error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchNotes();
	}, [language]);

	if (isLoading) {
		return;
	}

	return (
		<>
			<div className="fs-4 fw-medium">{t("languageView.notesTitle")}</div>
			<ul className="list-group">
				<li className="list-group-item">
					<i className="bi bi-plus-square"> {t("languageView.noteCreate")}</i>
				</li>
			</ul>
		</>
	);
}

export default LanguageNotesComponent;
