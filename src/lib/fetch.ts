import api from "./api";
import type { User } from "./types/user";
import type { Language } from "./types/language";
import type { Note } from "./types/note";
import { useQuery } from "@tanstack/react-query";

export const fetchUser = async (userId: number): Promise<User | undefined> => {
	const response = await api.get(`/users/${userId}`);
	return response.data;
};

export const useUser = (userId: number) => {
	return useQuery({
		queryKey: ["user", userId],
		queryFn: () => fetchUser(userId),
	});
};

export const fetchLanguage = async (languageId: number): Promise<Language | undefined> => {
	const response = await api.get(`/languages/${languageId}`);
	return response.data;
};

export const useLanguage = (languageId: number) => {
	return useQuery({
		queryKey: ["language", languageId],
		queryFn: () => fetchLanguage(languageId),
	});
};

export const fetchNote = async (noteId: number): Promise<Note | undefined> => {
	const response = await api.get(`/notes/${noteId}`);
	return response.data;
};

export const useNote = (noteId: number) => {
	return useQuery({
		queryKey: ["note", noteId],
		queryFn: () => fetchNote(noteId),
	});
};
