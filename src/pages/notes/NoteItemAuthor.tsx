import { Link } from "react-router-dom";
import type { Note } from "../../lib/types/note";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useTimeout } from "usehooks-ts";
import notePopover from "../../assets/notePopover.svg";
import api from "../../lib/api";

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

	const deleteNote = async () => {
		try {
			await api.delete(`/notes/${note.id}`);
		} catch (error) {
			console.error(error);
		}
	};

	const onDeleteClick = () => {
		if (isDisabled) return;

		if (!isDeletionClicked) {
			setIsDisabled(true);
			setIsDeletionClicked(true);
			setTimeoutDelay(2000);
			return;
		}

		deleteNote();
		onDelete();
	};

	const disabledDeleteButton = (
		<button type="button" className="btn border-0" onClick={onDeleteClick} disabled={true}>
			<i className="bi bi-trash"></i>
		</button>
	);

	const deleteButton = (
		<button type="button" className="btn" onClick={onDeleteClick}>
			<i className="bi bi-trash-fill"></i>
		</button>
	);

	const popupButton = (
		<button type="button" className="btn p-0 border-0">
			<img alt="" src={notePopover} width={28} height={28} className="d-inline-block mx-1" />
		</button>
	);

	return (
		<li className="list-group-item list-group-item-action d-flex align-items-center justify-content-between px-2 gap-1">
			{popupButton}
			<Link to={`/notes/${note.id}`} className="fw-medium text-decoration-none text-break flex-grow-1">
				{note.title}
			</Link>
			{isDeletionClicked && <div>{t("noteItemAuthor.onDeletion")}</div>}
			{isDisabled ? disabledDeleteButton : deleteButton}
		</li>
	);
}

export default NoteItemAuthor;
