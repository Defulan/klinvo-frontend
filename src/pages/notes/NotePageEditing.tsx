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

	const editorBar = (
		<div className="container bg-body-secondary">
			<div className="row">
				<div className="col">
					<button type="button" className="btn border-0" onClick={() => onWrapKeyDown("**")}>
						<i className="bi bi-type-bold"></i>
					</button>
				</div>
			</div>
		</div>
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
			<div className="d-flex gap-1">{editorButtons}</div>
		</form>
	);
}

export default NotePageEditingComponent;
