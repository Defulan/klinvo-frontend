import { OverlayTrigger, Popover } from "react-bootstrap";
import notePopover from "../../assets/notePopover.svg";
import type { Note } from "../../../lib/types/note";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface NotePopoverButtonProps {
	note: Note;
}

function NotePopoverButton({ note }: NotePopoverButtonProps) {
	const popover = (
		<Popover id={`popover-${note.id}`}>
			<Popover.Header as="h3">{note.title}</Popover.Header>
			<Popover.Body className="markdown-body popover-overflow">
				<Markdown remarkPlugins={[remarkGfm]}>{note.content}</Markdown>
			</Popover.Body>
		</Popover>
	);

	return (
		<OverlayTrigger trigger="click" placement="left" overlay={popover} rootClose>
			<button type="button" className="btn p-0 border-0">
				<img alt="" src={notePopover} width={28} height={28} className="d-inline-block mx-1" />
			</button>
		</OverlayTrigger>
	);
}

export default NotePopoverButton;
