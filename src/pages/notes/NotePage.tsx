import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../lib/api";
import type { Note } from "../../lib/types/note";
import dayjs from "../../lib/dayjs";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Language } from "../../lib/types/language";

interface NoteEditForm {
	title: string | null;
	content: string | null;
}

function NotePage() {
	const { t } = useTranslation();
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<NoteEditForm>();
	const { noteId } = useParams<{ noteId: string }>();
	const [note, setNote] = useState<Note | null>(null);
	const [language, setLanguage] = useState<Language | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isEditing, setIsEditing] = useState(false);
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
			reset({
				title: note.title,
				content: note.content,
			});
			fetchLanguage();
		}
	}, [reset, note]);

	const onSubmit: SubmitHandler<NoteEditForm> = async (data) => {
		try {
			const response = await api.patch<Note>(`/notes/${note?.id}`, data);

			reset({
				title: response.data.title,
				content: response.data.content,
			});
			setIsEditing(false);
			fetchNote();
		} catch (error) {
			console.error(error);
		}
	};

	const handleCancelEditing = () => {
		reset();
		setIsEditing(false);
	};

	const editorButtons = (
		<>
			<button className="btn btn-dark btn-sm" type="submit">
				{t("notePage.confirmChanges")}
			</button>
			<button className="btn btn-danger btn-sm" type="button" onClick={handleCancelEditing}>
				{t("notePage.cancelChanges")}
			</button>
		</>
	);
	const watchingButtons = (
		<>
			<button className="btn btn-dark btn-sm" type="button" onClick={() => setIsEditing(true)}>
				{t("notePage.editButton")}
			</button>
		</>
	);

	if (isLoading || !note) {
		return;
	}

	if (isEditing) {
		return (
			<form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column gap-2">
				<div>
					<label>
						<span>{t("notePage.titleLabel")}</span>
						{errors.title && <div className="error-form-text"> {errors.title.message}</div>}
						<input
							className="form-control"
							type="text"
							{...register("title", {
								required: t("notePage.titleRequired"),
								minLength: {
									value: 1,
									message: t("notePage.titleTooShort"),
								},
								maxLength: {
									value: 255,
									message: t("notePage.titleTooLong"),
								},
							})}
						/>
					</label>
				</div>
				<label>
					<textarea className="form-control note-content-edit" {...register("content")} />
				</label>
				<div>{editorButtons}</div>
			</form>
		);
	}

	return (
		<>
			<h1>{note.title}</h1>
			<ul>
				<li>{dayjs(note.createdAt).format("lll")}</li>
			</ul>
			{watchingButtons}

			<div className="markdown-body">
				<Markdown remarkPlugins={[remarkGfm]}>{note.content}</Markdown>
			</div>
		</>
	);
}

export default NotePage;
