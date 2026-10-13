import { useEffect, useState } from "react";
import type { Language } from "../../lib/types/language";
import type { Note } from "../../lib/types/note";
import api from "../../lib/api";
import { useTranslation } from "react-i18next";
import NoteItemCreate from "./NoteItemCreate";
import NoteItem from "./NoteItem";

interface NotesListProps {
	language: Language;
	isAuthor: boolean;
}

function NotesListComponent({ language, isAuthor }: NotesListProps) {
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

	const toCreateItem = (
		<li onMouseDown={() => setIsCreatingActive(true)} className="list-group-item list-group-item-action">
			<i className="bi bi-plus-square"> {t("notesList.toCreate")}</i>
		</li>
	);

	if (isLoading || !notes) {
		return;
	}

	return (
		<>
			<div className="fs-4 fw-medium">{t("notesList.title")}</div>
			<ul className="list-group">
				{notes.map((note) => (
					<NoteItem key={note.id} note={note} />
				))}
				{isAuthor && isCreatingActive && (
					<NoteItemCreate
						languageId={language.id}
						onClose={() => setIsCreatingActive(false)}
						onCreation={() => setIsCreatingActive(false)}
					/>
				)}
				{isAuthor && !isCreatingActive && toCreateItem}
			</ul>
		</>
	);
}

export default NotesListComponent;
