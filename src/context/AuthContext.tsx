import { useState, useEffect, createContext, useContext, type ReactNode, useCallback } from "react";
import api from "../lib/api";
import type { User } from "../lib/types/user";

interface AuthContextType {
	isAuth: boolean | null;
	user: User | null;
	isContextLoading: boolean;
	fetchAuth: () => Promise<void>;
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
	const [user, setUser] = useState<User | null>(null);
	const [isContextLoading, setIsContextLoading] = useState<boolean>(true);

	const fetchAuth = useCallback(async (): Promise<void> => {
		try {
			const response = await api.get<{ isAuth: boolean; user: User | null }>("/auth/me");
			setIsAuth(response.data.isAuth);
			setUser(response.data.user);
		} catch (err) {
			console.error(err);
		} finally {
			setIsContextLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchAuth();
	}, [fetchAuth]);

	return <AuthContext.Provider value={{ isAuth, user, isContextLoading, fetchAuth }}>{children}</AuthContext.Provider>;
}
