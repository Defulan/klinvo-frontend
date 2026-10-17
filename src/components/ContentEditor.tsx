import { useTranslation } from "react-i18next";
import EditorBar from "./EditorBar";
import { useRef } from "react";
import { getSelected, getWrapValue, wrapSelectedText } from "../lib/textWrapping";
import type { UseFormRegisterReturn } from "react-hook-form";

interface ConcentEditorProps {
	handleCancel: () => void;
	registerProps: UseFormRegisterReturn;
}

function ContentEditor({ handleCancel, registerProps }: ConcentEditorProps) {
	const { t } = useTranslation();
	const textAreaRef = useRef<HTMLTextAreaElement>(null);

	const handleOnKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
		const textArea = textAreaRef.current;
		if (!textArea || !getSelected(textArea)) {
			return;
		}

		const wrapValue = getWrapValue(event.key);

		if (!wrapValue) {
			return;
		}

		event.preventDefault();

		if (Array.isArray(wrapValue)) {
			wrapSelectedText(textArea, ...wrapValue);
		} else {
			wrapSelectedText(textArea, wrapValue);
		}
	};

	const onWrapButtonClick = (wrapWith: string) => {
		if (!getSelected || !textAreaRef.current) {
			return;
		}

		wrapSelectedText(textAreaRef.current, wrapWith);
	};

	const { ref: registerRef, ...restRegister } = registerProps;

	return (
		<div className="mb-5">
			<EditorBar onWrapButtonClick={onWrapButtonClick} onEditingCancel={handleCancel} />
			<textarea
				placeholder={t("notePageEdit.contentPlaceholder")}
				{...restRegister}
				ref={(e) => {
					registerRef(e);
					textAreaRef.current = e;
				}}
				className="form-control note-content-edit"
				onKeyDown={handleOnKeyDown}
			/>
		</div>
	);
}

export default ContentEditor;
