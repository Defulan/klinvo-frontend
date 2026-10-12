import { useEffect, useState } from "react";
import type { Language } from "../../lib/types/language";
import type { Note } from "../../lib/types/note";
import api from "../../lib/api";
import { useTranslation } from "react-i18next";
import LanguageNoteCreateItem from "./LanguageNoteCreate";
import { Link } from "react-router-dom";

interface LanguageNotesProps {
	language: Language;
	isAuthor: boolean;
}

function LanguageNotesComponent({ language, isAuthor }: LanguageNotesProps) {
	const { t } = useTranslation();
	const [notes, setNotes] = useState<Note[] | null>();
	const [isLoading, setIsLoading] = useState(true);
	const [isCreatingActive, setIsCreatingActive] = useState(false);

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

	const createLanguage = (
		<li onMouseDown={() => setIsCreatingActive(true)} className="list-group-item list-group-item-action">
			<i className="bi bi-plus-square"> {t("languageNotes.create")}</i>
		</li>
	);

	if (isLoading || !notes) {
		return;
	}

	return (
		<>
			<div className="fs-4 fw-medium">{t("languageNotes.title")}</div>
			<ul className="list-group">
				{notes.map((note) => (
					<li key={note.id} className="list-group-item list-group-item-action">
						<Link to={`/notes/${note.id}`} className="fw-medium text-decoration-none">
							{note.title}
						</Link>
					</li>
				))}
				{isAuthor && isCreatingActive && (
					<LanguageNoteCreateItem
						languageId={language.id}
						onClose={() => setIsCreatingActive(false)}
						onCreation={() => setIsCreatingActive(false)}
					/>
				)}
				{isAuthor && !isCreatingActive && createLanguage}
			</ul>
		</>
	);
}

export default LanguageNotesComponent;
