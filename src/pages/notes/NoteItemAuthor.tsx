import { Link } from "react-router-dom";
import type { Note } from "../../lib/types/note";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface NoteItemAuthorProps {
	note: Note;
	onDelete: () => void;
}

function NoteItemAuthor({ note, onDelete }: NoteItemAuthorProps) {
	const [isDeletionClicked, setIsDeletionClicked] = useState(false);
	const { t } = useTranslation();

	const onDeleteClick = () => {
		if (!isDeletionClicked) {
			setIsDeletionClicked(true);
			return;
		}

		onDelete();
	};

	return (
		<li className="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
			<Link to={`/notes/${note.id}`} className="fw-medium text-decoration-none text-break flex-grow-1">
				{note.title}
			</Link>
			{isDeletionClicked && <div>{t("noteItemAuthor.onDeletion")}</div>}
			<button type="button" className="btn" onClick={onDeleteClick}>
				<i className="bi bi-trash-fill"></i>
			</button>
		</li>
	);
}

export default NoteItemAuthor;
