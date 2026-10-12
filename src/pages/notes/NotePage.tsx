import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../lib/api";
import type { Note } from "../../lib/types/note";
import dayjs from "../../lib/dayjs";

function NotePage() {
	const { noteId } = useParams<{ noteId: string }>();
	const [note, setNote] = useState<Note | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchNote = async () => {
			try {
				const response = await api.get<Note>(`/notes/${noteId}`);
				setNote(response.data);
			} catch (error) {
				console.error(error);
				navigate("/404");
			} finally {
				setIsLoading(false);
			}
		};

		fetchNote();
	}, [noteId, navigate]);

	if (isLoading || !note) {
		return;
	}

	return (
		<>
			<h1>{note.title}</h1>
			<ul>
				<li>{dayjs(note.createdAt).format("lll")}</li>
			</ul>
			<div>{note.content}</div>
		</>
	);
}

export default NotePage;
