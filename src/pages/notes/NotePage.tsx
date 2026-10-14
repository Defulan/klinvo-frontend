import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../lib/api";
import type { Note } from "../../lib/types/note";
import dayjs from "../../lib/dayjs";
import { useTranslation } from "react-i18next";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Language } from "../../lib/types/language";
import { useAuth } from "../../context/AuthContext";

function NotePage() {
	const { t } = useTranslation();
	const { user, isContextLoading } = useAuth();
	const { noteId } = useParams<{ noteId: string }>();
	const [note, setNote] = useState<Note | null>(null);
	const [language, setLanguage] = useState<Language | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isAuthor, setIsAuthor] = useState(false);
	const navigate = useNavigate();

	const fetchNote = useCallback(async () => {
		try {
			const response = await api.get<Note>(`/notes/${noteId}`);
			setNote(response.data);
		} catch (error) {
			console.error(error);
			navigate("/404");
		} finally {
			setIsLoading(false);
		}
	}, [noteId, navigate]);

	useEffect(() => {
		fetchNote();
	}, [fetchNote]);

	useEffect(() => {
		if (isContextLoading) return;

		if (user && user.id === language?.authorId) {
			setIsAuthor(true);
		}
	}, [isContextLoading, user, language]);

	useEffect(() => {
		const fetchLanguage = async () => {
			if (note) {
				try {
					const response = await api.get<Language>(`/languages/${note.languageId}`);
					setLanguage(response.data);
				} catch (error) {
					console.error(error);
				}
			}
		};
		if (note) {
			fetchLanguage();
		}
	}, [note]);

	const watchingButtons = (
		<>
			<button className="btn btn-dark btn-sm" type="button" onClick={() => navigate(`/notes/${noteId}/edit`)}>
				{t("notePage.editButton")}
			</button>
		</>
	);

	if (isContextLoading || isLoading || !note) {
		return;
	}

	return (
		<>
			<h1>{note.title}</h1>
			<ul>
				<li>
					{t("notePage.createdAtItem")} {dayjs(note.createdAt).format("lll")}
				</li>
				{language && (
					<li>
						<Link to={`/language/${language.id}`}>
							{t("notePage.languageItem")} {language.name}
						</Link>
					</li>
				)}
			</ul>
			{isAuthor && watchingButtons}
			<hr />
			<div className="markdown-body">
				<Markdown remarkPlugins={[remarkGfm]}>{note.content}</Markdown>
			</div>
		</>
	);
}

export default NotePage;
