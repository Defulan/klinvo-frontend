import { Link } from "react-router-dom";
import type { Note } from "../../lib/types/note";

interface NoteItemProps {
	note: Note;
}

function NoteItem({ note }: NoteItemProps) {
	return (
		<li className="list-group-item list-group-item-action">
			<Link to={`/notes/${note.id}`} className="fw-medium text-decoration-none">
				{note.title}
			</Link>
		</li>
	);
}

export default NoteItem;
