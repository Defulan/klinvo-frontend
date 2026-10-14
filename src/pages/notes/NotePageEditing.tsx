import type React from "react";
import { useEffect, useRef } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { Note } from "../../lib/types/note";
import api from "../../lib/api";
import { useTranslation } from "react-i18next";

interface NoteEditForm {
	title: string | null;
	content: string | null;
}

interface NotePageEditingProps {
	note: Note;
	onChanges: () => void;
}

function NotePageEditingComponent({ note, onChanges }: NotePageEditingProps) {
	const { t } = useTranslation();
	const {
		register,
		handleSubmit,
		reset,
		setValue,
		formState: { errors },
	} = useForm<NoteEditForm>();
	const textAreaRef = useRef<HTMLTextAreaElement>(null);

	const onSubmit: SubmitHandler<NoteEditForm> = async (data) => {
		try {
			const response = await api.patch<Note>(`/notes/${note?.id}`, data);

			reset({
				title: response.data.title,
				content: response.data.content,
			});
			onChanges();
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		if (note) {
			reset({
				title: note.title,
				content: note.content,
			});
		}
	}, [reset, note]);

	const handleCancelEditing = () => {
		reset();
		onChanges();
	};

	const { ref: registerRef, ...contentRest } = register("content");

	const handleOnKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (event.key === "*") {
			event.preventDefault();
			const textArea = textAreaRef.current;
			if (!textArea) return;

			const start = textArea.selectionStart;
			const end = textArea.selectionEnd;

			let replacement: string;

			if (start === end) {
				replacement = "*";
			} else {
				const selectedText = textArea.value.substring(start, end);
				replacement = `*${selectedText}*`;
			}

			textArea.setRangeText(replacement, start, end, "preserve");
			setValue("content", textArea.value, { shouldDirty: true, shouldValidate: true });
		} else if (event.key === "(") {
			event.preventDefault();
			const textArea = textAreaRef.current;
			if (!textArea) return;

			const start = textArea.selectionStart;
			const end = textArea.selectionEnd;

			let replacement: string;

			if (start === end) {
				replacement = "(";
			} else {
				const selectedText = textArea.value.substring(start, end);
				replacement = `(${selectedText})`;
			}

			textArea.setRangeText(replacement, start, end, "preserve");
			setValue("content", textArea.value, { shouldDirty: true, shouldValidate: true });
		}
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
			<div className="d-flex gap-1">{editorButtons}</div>
		</form>
	);
}

export default NotePageEditingComponent;
