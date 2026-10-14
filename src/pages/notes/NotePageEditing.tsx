import type React from "react";
import { useEffect, useRef, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { Note } from "../../lib/types/note";
import api from "../../lib/api";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import type { Language } from "../../lib/types/language";
import EditorBar from "../../components/EditorBar";

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

	const getSelected = (textArea: HTMLTextAreaElement) => {
		const start = textArea.selectionStart;
		const end = textArea.selectionEnd;

		return textArea.value.substring(start, end);
	};

	const wrapSelectedText = (
		textArea: HTMLTextAreaElement,
		key: string,
		before: string | null = null,
		after: string | null = null,
	) => {
		if (!before) before = key;
		if (!after) after = before;

		const start = textArea.selectionStart;
		const end = textArea.selectionEnd;
		const selected = getSelected(textArea);

		const replacement = `${before}${selected}${after}`;
		const cursorPositionEndAdd = before.length + after.length;

		textArea.setRangeText(replacement, start, end, "preserve");

		setTimeout(() => {
			textArea.focus();
			textArea.setSelectionRange(start, end + cursorPositionEndAdd);
		});
	};

	const wrapKeysAndValues: Record<string, string | [string, string, string]> = {
		"(": ["(", "(", ")"],
		"{": ["{", "{", "}"],
		"<": ["<", "<", ">"],
		"[": ["[", "[", "]"],
		"*": "*",
		_: "_",
		"`": "`",
		"'": "'",
		'"': '"',
		"~": "~",
	};

	const handleOnKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
		const textArea = textAreaRef.current;
		if (!textArea || !getSelected(textArea)) return;

		const wrapValue = wrapKeysAndValues[event.key];

		if (!wrapValue) {
			return;
		}

		event.preventDefault();

		if (Array.isArray(wrapValue)) {
			wrapSelectedText(textArea, ...wrapValue);
		} else {
			wrapSelectedText(textArea, wrapValue);
		}
		setValue("content", textArea.value, { shouldDirty: true, shouldValidate: true });
	};

	const onWrapButtonClick = (wrapWith: string) => {
		if (!getSelected || !textAreaRef.current) {
			return;
		}

		wrapSelectedText(textAreaRef.current, wrapWith);
		setValue("content", textAreaRef.current.value, { shouldDirty: true, shouldValidate: true });
	};

	if (isContextLoading || isLoading) {
		return;
	}

	if (!isAuthor) {
		navigate(`/notes/${noteId}`);
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column gap-3">
			<div>
				<label className="w-100">
					<span>{t("notePageEdit.titleLabel")}</span>
					{errors.title && <div className="error-form-text"> {errors.title.message}</div>}
					<input
						className="form-control"
						type="text"
						{...register("title", {
							required: t("notePageEdit.titleRequired"),
							minLength: {
								value: 1,
								message: t("notePageEdit.titleTooShort"),
							},
							maxLength: {
								value: 255,
								message: t("notePageEdit.titleTooLong"),
							},
						})}
					/>
				</label>
			</div>
			<label>
				<EditorBar onWrapButtonClick={onWrapButtonClick} onEditingCancel={handleCancelEditing} />
				<textarea
					placeholder={t("notePageEdit.contentPlaceholder")}
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
