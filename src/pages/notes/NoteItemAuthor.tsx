import { Link } from "react-router-dom";
import type { Note } from "../../lib/types/note";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useTimeout } from "usehooks-ts";

interface NoteItemAuthorProps {
	note: Note;
	onDelete: () => void;
}

function NoteItemAuthor({ note, onDelete }: NoteItemAuthorProps) {
	const [isDeletionClicked, setIsDeletionClicked] = useState(false);
	const [isDisabled, setIsDisabled] = useState(false);
	const [timeoutDelay, setTimeoutDelay] = useState<number | null>(null);
	const { t } = useTranslation();

	useTimeout(() => {
		setIsDisabled(false);
		setTimeoutDelay(null);
	}, timeoutDelay);

	const onDeleteClick = () => {
		if (isDisabled) return;

		if (!isDeletionClicked) {
			setIsDisabled(true);
			setIsDeletionClicked(true);
			setTimeoutDelay(2000);
		}

		onDelete();
	};

	return (
		<li className="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
			<Link to={`/notes/${note.id}`} className="fw-medium text-decoration-none text-break flex-grow-1">
				{note.title}
			</Link>
			{isDeletionClicked && <div>{t("noteItemAuthor.onDeletion")}</div>}
			<button type="button" className="btn" onClick={onDeleteClick} disabled={isDisabled}>
				<i className="bi bi-trash-fill"></i>
			</button>
		</li>
	);
}

export default NoteItemAuthor;
