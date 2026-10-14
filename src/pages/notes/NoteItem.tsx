import { Link } from "react-router-dom";
import type { Note } from "../../lib/types/note";
import NotePopoverButton from "./NotePopoverButton";

interface NoteItemProps {
	note: Note;
}

function NoteItem({ note }: NoteItemProps) {
	return (
		<li className="list-group-item list-group-item-action">
			<NotePopoverButton note={note} />
			<Link to={`/notes/${note.id}`} className="fw-medium text-decoration-none text-break">
				{note.title}
			</Link>
		</li>
	);
}

export default NoteItem;
