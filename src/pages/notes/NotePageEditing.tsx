import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { Note } from "../../lib/types/note";
import api from "../../lib/api";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ContentEditor from "../../components/ContentEditor";
import { useNote, useUpdateNote } from "../../hooks/useNote";
import { useLanguage } from "../../hooks/useLanguage";

interface NoteEditForm {
	content: string | null;
}

function NotePageEditing() {
	const { noteId } = useParams<{ noteId: string }>();
	const { user, isContextLoading } = useAuth();
	const { register, handleSubmit, reset } = useForm<NoteEditForm>();
	const navigate = useNavigate();

	const { data: note, isLoading: isNoteLoading, isError: isNoteError, error: noteError } = useNote(Number(noteId));
	const noteMutationPatch = useUpdateNote();

	const {
		data: language,
		isLoading: isLanguageLoading,
		isError: isLanguageError,
		error: languageError,
	} = useLanguage(note?.languageId ?? -1);

	const isLoading = isContextLoading || isNoteLoading || isLanguageLoading;
	const isAuthor = Boolean(language && user && language?.authorId === user?.id);

	useEffect(() => {
		if (isLoading) {
			return;
		}

		if (isNoteError || isLanguageError) {
			if (isNoteError) console.error(noteError);
			if (isLanguageError) console.error(languageError);
			navigate("/404");
		}
	}, [isLoading, isNoteError, isLanguageError, noteError, languageError, navigate]);

	useEffect(() => {
		if (note) {
			reset({
				content: note.content,
			});
		}
	}, [note, reset]);

	if (isLoading || !note || !language) {
		return;
	}

	const onSubmit: SubmitHandler<NoteEditForm> = async (data) => {
		noteMutationPatch.mutate(
			{ noteId: note.id, ...data },
			{
				onSuccess: (data: Note) => {
					reset({ content: data.content });
				},
				onError: (error) => {
					console.error(error);
				},
			},
		);
		try {
			const response = await api.patch<Note>(`/notes/${note?.id}`, data);

			reset({
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

	if (!isAuthor) {
		navigate(`/notes/${noteId}`);
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column gap-3">
			<ContentEditor handleCancel={handleCancelEditing} registerProps={register("content")} />
		</form>
	);
}

export default NotePageEditing;
