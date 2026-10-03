import { useState, useEffect, createContext, useContext, type ReactNode, useCallback } from "react";
import api from "../lib/api";

interface AuthContextType {
	isAuth: boolean | null;
	userId: number | null;
	isContextLoading: boolean;
}

interface AuthContextProviderProps {
	children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth outside of AuthContextProvider");
	}
	return context;
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
	const [isAuth, setIsAuth] = useState<boolean | null>(null);
	const [userId, setUserId] = useState<number | null>(null);
	const [isContextLoading, setIsContextLoading] = useState<boolean>(true);

	const fetchAuth = useCallback(async (): Promise<void> => {
		try {
			const response = await api.get<{ isAuth: boolean; userId: number | null }>("/auth/me");
			setIsAuth(response.data.isAuth);
			setUserId(response.data.userId);
		} catch (err) {
			console.error(err);
		} finally {
			setIsContextLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchAuth();
	}, [fetchAuth]);

	return <AuthContext.Provider value={{ isAuth, userId, isContextLoading }}>{children}</AuthContext.Provider>;
}
