import { Link } from "react-router-dom";
import type { Note } from "../../lib/types/note";

interface NoteItemAuthorProps {
	note: Note;
	onDelete: () => void;
}

function NoteItemAuthor({ note, onDelete }: NoteItemAuthorProps) {
	const onDeleteClick = () => {
		onDelete();
	};

	return (
		<li className="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
			<Link to={`/notes/${note.id}`} className="fw-medium text-decoration-none text-break">
				{note.title}
			</Link>
			<button type="button" className="btn" onClick={onDeleteClick}>
				<i className="bi bi-trash-fill"></i>
			</button>
		</li>
	);
}

export default NoteItemAuthor;
