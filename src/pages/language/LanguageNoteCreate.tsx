import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface NoteCreateForm {
	title: string;
}

interface NoteCreateItemProps {
	onClose: () => void;
	onCreation: () => void;
}

function LanguageNoteCreateItem({ onClose, onCreation }: NoteCreateItemProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<NoteCreateForm>();
	const { t } = useTranslation();

	const onSubmit = () => {
		onCreation();
	};

	return (
		<li className="list-group-item d-flex align-items-center">
			<form onSubmit={handleSubmit(onSubmit)}>
				<label>
					{t("noteCreateItem.titleLabel")}
					<input
						type="text"
						{...register("title", {
							required: t("noteCreateItem.titleRequired"),
						})}
					/>
				</label>
				<button type="submit" className="btn">
					<i className="bi bi-plus-circle"></i>
				</button>
			</form>
			<button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
		</li>
	);
}

export default LanguageNoteCreateItem;
