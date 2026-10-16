import { isAxiosError } from "axios";
import api from "../lib/api";
import type { User } from "../lib/types/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const fetchUser = async (userId: number): Promise<User> => {
	const response = await api.get(`/users/${userId}`);
	return response.data;
};

export const useUser = (userId: number) => {
	return useQuery({
		queryKey: ["user", userId],
		queryFn: () => fetchUser(userId),
		retry: (failureCount, error: unknown) => {
			if (isAxiosError(error) && error.response?.status === 404) {
				return false;
			}
			return failureCount < 3;
		},
	});
};

export const useUpdateUser = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (updatedData: Partial<User>) => {
			const fieldToUpdate = updatedData;
			const response = await api.patch(`/users/`, fieldToUpdate);
			return response.data;
		},

		onSuccess: (_) => {
			queryClient.invalidateQueries({ queryKey: ["user"] });
		},
	});
};
