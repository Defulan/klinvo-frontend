import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

export type EditableFieldForm = Record<string, string>;

interface EditableFieldProps {
	value: string;
	fieldName: string;
	onConfirmChanges: (data: EditableFieldForm) => void;
}

function EditableField({ value, fieldName, onConfirmChanges }: EditableFieldProps) {
	const [isEditing, setIsEditing] = useState(false);
	const { register, handleSubmit, reset } = useForm<EditableFieldForm>();

	const onSubmit: SubmitHandler<EditableFieldForm> = async (data) => {
		onConfirmChanges(data);
		setIsEditing(false);
	};

	const onEditClick = () => {
		reset({ [fieldName]: value });
		setIsEditing(true);
	};

	if (isEditing) {
		return (
			<form className="d-flex align-items-end gap-1" onSubmit={handleSubmit(onSubmit)}>
				<label>
					<input type="text" className="form-control" {...register(fieldName)} />
				</label>
				<button type="submit" className="btn border-0 fs-5">
					<i className="bi bi-check-square"></i>
				</button>
			</form>
		);
	}
	return (
		<div className="d-flex align-items-end gap-1">
			<span>{value}</span>
			<button type="button" className="btn border-0 fs-5" onClick={onEditClick}>
				<i className="bi bi-pencil"></i>
			</button>
		</div>
	);
}

export default EditableField;
