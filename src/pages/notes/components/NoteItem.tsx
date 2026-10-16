import { Link } from "react-router-dom";
import type { Note } from "../../../lib/types/note";
import NotePopoverButton from "./NotePopoverButton";

interface NoteItemProps {
	note: Note;
}

function NoteItem({ note }: NoteItemProps) {
	return (
		<li className="list-group-item list-group-item-action d-flex align-items-center justify-content-between px-2 py-2 gap-1">
			<NotePopoverButton note={note} />
			<Link to={`/notes/${note.id}`} className="fw-medium text-decoration-none text-break flex-grow-1">
				{note.title}
			</Link>
		</li>
	);
}

export default NoteItem;
