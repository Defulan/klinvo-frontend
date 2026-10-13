import { useForm, type SubmitHandler } from "react-hook-form";
import { useTranslation } from "react-i18next";
import api from "../../../lib/api";

interface NoteCreateForm {
	title: string;
}

interface NoteCreateItemProps {
	languageId: number;
	onClose: () => void;
	onCreation: () => void;
}

function LanguageNoteCreateItem({ languageId, onClose, onCreation }: NoteCreateItemProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<NoteCreateForm>();
	const { t } = useTranslation();

	const onSubmit: SubmitHandler<NoteCreateForm> = async (data) => {
		try {
			await api.post(`/notes/${languageId}`, data);
			onCreation();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<li className="list-group-item d-flex align-items-center">
			<form onSubmit={handleSubmit(onSubmit)}>
				<label>
					{errors.title && <div className="error-form-text"> {errors.title.message}</div>}
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
