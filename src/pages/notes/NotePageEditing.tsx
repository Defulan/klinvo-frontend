import type React from "react";
import { useEffect, useRef, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { Note } from "../../lib/types/note";
import api from "../../lib/api";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import type { Language } from "../../lib/types/language";

interface NoteEditForm {
	title: string | null;
	content: string | null;
}

function NotePageEditing() {
	const { noteId } = useParams<{ noteId: string }>();
	const [note, setNote] = useState<Note | null>(null);
	const [language, setLanguage] = useState<Language | null>(null);
	const { user, isContextLoading } = useAuth();
	const { t } = useTranslation();
	const {
		register,
		handleSubmit,
		reset,
		setValue,
		formState: { errors },
	} = useForm<NoteEditForm>();
	const textAreaRef = useRef<HTMLTextAreaElement>(null);
	const [isAuthor, setIsAuthor] = useState(false);
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
			}
		};

		fetchNote();
	}, [noteId, navigate]);

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
			reset({
				title: note.title,
				content: note.content,
			});
		}
	}, [note, reset]);

	useEffect(() => {
		if (isContextLoading || !language) return;

		if (user && user.id === language.authorId) {
			setIsAuthor(true);
		}
		setIsLoading(false);
	}, [isContextLoading, user, language]);

	const onSubmit: SubmitHandler<NoteEditForm> = async (data) => {
		try {
			const response = await api.patch<Note>(`/notes/${note?.id}`, data);

			reset({
				title: response.data.title,
				content: response.data.content,
			});
			navigate(`/notes/${response.data.id}`);
		} catch (error) {
			console.error(error);
		}
	};

	const handleCancelEditing = () => {
		reset();
		navigate(`/notes/${noteId}`);
	};

	const { ref: registerRef, ...contentRest } = register("content");

	const onWrapKeyDown = (key: string, before: string | null = null, after: string | null = null) => {
		if (!before) before = key;
		if (!after) after = before;

		const textArea = textAreaRef.current;
		if (!textArea) return;

		const start = textArea.selectionStart;
		const end = textArea.selectionEnd;

		let replacement: string;
		let cursorPositionStartAdd: number = 0;
		let cursorPositionEndAdd: number;

		if (start === end) {
			replacement = key;

			cursorPositionStartAdd = key.length;
			cursorPositionEndAdd = key.length;
		} else {
			const selectedText = textArea.value.substring(start, end);
			replacement = `${before}${selectedText}${after}`;

			cursorPositionEndAdd = before.length + after.length;
		}

		textArea.setRangeText(replacement, start, end, "preserve");
		setValue("content", textArea.value, { shouldDirty: true, shouldValidate: true });

		setTimeout(() => {
			textArea.focus();
			textArea.setSelectionRange(start + cursorPositionStartAdd, end + cursorPositionEndAdd);
		});
	};

	const handleOnKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (event.shiftKey) {
			switch (event.code) {
				case "BracketLeft":
					event.preventDefault();
					onWrapKeyDown("{", "{", "}");
					break;

				case "Comma":
					event.preventDefault();
					onWrapKeyDown("<", "<", ">");
					break;
			}
		} else {
			switch (event.code) {
				case "BracketLeft":
					event.preventDefault();
					onWrapKeyDown("[", "[", "]");
					break;

				case "Comma":
					event.preventDefault();
					onWrapKeyDown("<", "<", ">");
					break;
			}
		}

		switch (event.key) {
			case "*":
				event.preventDefault();
				onWrapKeyDown("*");
				break;

			case "_":
				event.preventDefault();
				onWrapKeyDown("_");
				break;

			case "`":
				event.preventDefault();
				onWrapKeyDown("`");
				break;

			case "'":
				event.preventDefault();
				onWrapKeyDown("'");
				break;

			case '"':
				event.preventDefault();
				onWrapKeyDown('"');
				break;

			case "~":
				event.preventDefault();
				onWrapKeyDown("~");
				break;

			case "(":
				event.preventDefault();
				onWrapKeyDown("(", "(", ")");
				break;
		}
	};

	const editorBar = (
		<div className="d-flex bg-body-secondary align-items-center justify-content-between border border-2">
			<div>
				<button type="button" className="btn border-0 fs-5" onClick={() => onWrapKeyDown("**")}>
					<i className="bi bi-type-bold"></i>
				</button>
				<button type="button" className="btn border-0 fs-5" onClick={() => onWrapKeyDown("_")}>
					<i className="bi bi-type-italic"></i>
				</button>
				<button type="button" className="btn border-0 fs-5" onClick={() => onWrapKeyDown("~~")}>
					<i className="bi bi-type-strikethrough"></i>
				</button>
			</div>
			<div className="d-flex gap-1 pe-2">
				<button className="btn btn-danger border-0 btn-sm" type="button" onClick={handleCancelEditing}>
					{t("notePage.cancelChanges")}
				</button>
				<button className="btn btn-dark border-0 btn-sm" type="submit">
					{t("notePage.confirmChanges")}
				</button>
			</div>
		</div>
	);

	if (isContextLoading || isLoading) {
		return;
	}

	if (!isAuthor) {
		navigate(`/notes/${noteId}`);
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column gap-2">
			<div>
				<label className="w-100">
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
				{editorBar}
				<textarea
					{...contentRest}
					ref={(e) => {
						registerRef(e);
						textAreaRef.current = e;
					}}
					className="form-control note-content-edit"
					onKeyDown={handleOnKeyDown}
				/>
			</label>
		</form>
	);
}

export default NotePageEditing;
