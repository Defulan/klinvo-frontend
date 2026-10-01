import { ReactNode, useState, useEffect, createContext } from "react";
import api from "../lib/api";

interface AuthContextType {
    isAuth: boolean | null;
    userId: number | null;
    isLoading: boolean;
}

interface AuthContextProviderProps {
    children: ReactNode;
}

export const authContext = createContext<AuthContextType | null>(null);


export function AuthContextProvider({ children }: AuthContextProviderProps) {
    const [isAuth, setIsAuth] = useState<boolean | null>(null);
    const [userId, setUserId] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    async function fetchOperations(): Promise<void> {
        try {
            const response = await api.get<{isAuth: boolean; userId: number | null}>("/auth/me");
            setIsAuth(response.data.isAuth);
            setUserId(response.data.userId);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchOperations();
    }, []);

    return <authContext.Provider value={{isAuth, userId, isLoading}}>
        {children}
    </authContext.Provider>
}
