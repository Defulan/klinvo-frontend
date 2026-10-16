import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import dayjs from "../../lib/dayjs";
import { useTranslation } from "react-i18next";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useAuth } from "../../context/AuthContext";
import EditableField, { type EditableFieldForm } from "../../components/EditableField";
import { useNote, useUpdateNote } from "../../hooks/useNote";
import { useLanguage } from "../../hooks/useLanguage";

function NotePage() {
	const { t } = useTranslation();
	const { user, isContextLoading } = useAuth();
	const { noteId } = useParams<{ noteId: string }>();
	const navigate = useNavigate();

	const { data: note, isLoading: isNoteLoading, isError: isNoteError, error: noteError } = useNote(Number(noteId));
	const noteMutationPatch = useUpdateNote();

	const {
		data: language,
		isLoading: isLanguageLoading,
		isError: isLanguageError,
		error: languageError,
	} = useLanguage(note?.languageId ?? -1);

	const isLoading = isContextLoading || isNoteLoading || isLanguageLoading;
	const isAuthor = Boolean(language && user && language?.authorId === user?.id);

	useEffect(() => {
		if (isLoading) {
			return;
		}

		if (isNoteError || isLanguageError) {
			if (isNoteError) console.error(noteError);
			if (isLanguageError) console.error(languageError);
			navigate("/404");
		}
	}, [isLoading, isNoteError, isLanguageError, noteError, languageError, navigate]);

	if (isLoading || !note || !language) {
		return;
	}

	const watchingButtons = (
		<>
			<button className="btn btn-dark btn-sm" type="button" onClick={() => navigate(`/notes/${noteId}/edit`)}>
				{t("notePage.editButton")}
			</button>
		</>
	);

	const onTitleConfirmChanges = async (data: EditableFieldForm) => {
		noteMutationPatch.mutate(
			{ noteId: note.id, ...data },
			{
				onError: (error) => {
					console.error(error);
				},
			},
		);
	};

	return (
		<>
			<h1 className="text-break">
				{isAuthor ? (
					<EditableField value={note.title} fieldName="title" onConfirmChanges={onTitleConfirmChanges} />
				) : (
					note.title
				)}
			</h1>
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
