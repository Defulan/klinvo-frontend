import { useForm, type SubmitHandler } from "react-hook-form";
import { useTranslation } from "react-i18next";
import api from "../../lib/api";

interface NoteCreateForm {
	title: string;
}

interface NoteItemCreateProps {
	languageId: number;
	onCancel: () => void;
	onCreation: () => void;
}

function NoteItemCreate({ languageId, onCancel, onCreation }: NoteItemCreateProps) {
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
			<form onSubmit={handleSubmit(onSubmit)} className="d-flex align-items-center justify-content-between flex-grow-1">
				<label className="flex-grow-1">
					<input
						className="form-control form-control-sm"
						placeholder={t("noteItemCreate.titleLabel")}
						type="text"
						{...register("title", {
							required: t("noteItemCreate.titleRequired"),
							minLength: {
								value: 1,
								message: t("noteItemCreate.titleTooShort"),
							},
							maxLength: {
								value: 255,
								message: t("noteItemCreate.titleTooLong"),
							},
						})}
					/>
				</label>
				<button type="submit" className="btn">
					<i className="bi bi-plus-circle"></i>
				</button>
			</form>
			<button type="button" className="btn-close" aria-label="Close" onClick={onCancel}></button>
		</li>
	);
}

export default NoteItemCreate;
