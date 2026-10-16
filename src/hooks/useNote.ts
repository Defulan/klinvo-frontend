import { isAxiosError } from "axios";
import api from "../lib/api";
import type { Note } from "../lib/types/note";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const fetchNote = async (noteId: number): Promise<Note> => {
	const response = await api.get(`/notes/${noteId}`);
	return response.data;
};

export const useNote = (noteId: number) => {
	return useQuery({
		queryKey: ["note", noteId],
		queryFn: () => fetchNote(noteId),
		retry: (failureCount, error: unknown) => {
			if (isAxiosError(error) && error.response?.status === 404) {
				return false;
			}
			return failureCount < 3;
		},
	});
};

export const useUpdateNote = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (updatedData: Partial<Note> & { noteId: number }) => {
			const { noteId, ...fieldToUpdate } = updatedData;
			return await api.patch(`/notes/${noteId}`, fieldToUpdate);
		},

		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({ queryKey: ["note", variables.noteId] });
		},
	});
};
