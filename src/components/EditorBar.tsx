import { useTranslation } from "react-i18next";

interface EditorBarProps {
	onWrapButtonClick: (wrapWith: string) => void;
	onEditingCancel: () => void;
}

function EditorBar({ onWrapButtonClick, onEditingCancel }: EditorBarProps) {
	const { t } = useTranslation();

	return (
		<div className="d-flex bg-body-secondary align-items-center justify-content-between border border-2">
			<div>
				<button type="button" className="btn border-0 fs-5" onClick={() => onWrapButtonClick("**")}>
					<i className="bi bi-type-bold"></i>
				</button>
				<button type="button" className="btn border-0 fs-5" onClick={() => onWrapButtonClick("_")}>
					<i className="bi bi-type-italic"></i>
				</button>
				<button type="button" className="btn border-0 fs-5" onClick={() => onWrapButtonClick("~~")}>
					<i className="bi bi-type-strikethrough"></i>
				</button>
			</div>
			<div className="d-flex gap-1 pe-2">
				<button className="btn btn-danger border-0 btn-sm" type="button" onClick={onEditingCancel}>
					{t("notePageEdit.cancelChanges")}
				</button>
				<button className="btn btn-dark border-0 btn-sm" type="submit">
					{t("notePageEdit.confirmChanges")}
				</button>
			</div>
		</div>
	);
}

export default EditorBar;
