import api from "./api";
import type { User } from "./types/user";
import type { Language } from "./types/language";
import type { Note } from "./types/note";

export const fetchUser = async (userId: number): Promise<User | undefined> => {
	const response = await api.get(`/users/${userId}`);
	return response.data;
};

export const fetchLanguage = async (languageId: number): Promise<Language | undefined> => {
	const response = await api.get(`/languages/${languageId}`);
	return response.data;
};

export const fetchNote = async (noteId: number): Promise<Note | undefined> => {
	const response = await api.get(`/notes/${noteId}`);
	return response.data;
};
