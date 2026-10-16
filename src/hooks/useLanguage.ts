import api from "../lib/api";
import type { Language } from "../lib/types/language";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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

export const useUpdateLanguage = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (updatedData: Partial<Language> & { languageId: number }) => {
			const { languageId, ...fieldToUpdate } = updatedData;
			return await api.patch(`/languages/${languageId}`, fieldToUpdate);
		},

		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({ queryKey: ["language", variables.languageId] });
		},
	});
};
