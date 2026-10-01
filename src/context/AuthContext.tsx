import { ReactNode, useState, useEffect, createContext, useContext } from "react";
import api from "../lib/api";

interface AuthContextType {
    isAuth: boolean | null;
    userId: number | null;
    isLoading: boolean;
}

interface AuthContextProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | null>(null);


export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth outside of AuthContextProvider")
    }
    return context;
}


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

    return <AuthContext.Provider value={{isAuth, userId, isLoading}}>
        {children}
    </AuthContext.Provider>
}
