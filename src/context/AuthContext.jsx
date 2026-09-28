import { useState } from "react";
import { createContext, useEffect } from "react";
import api from "../lib/api";

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
    const [isAuth, setIsAuth] = useState(false);
    const [userId, setUserId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    async function fetchOperations() {
        try {
            const response = await api.get("/auth/me");
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

    return <AuthContext.Provider value={{isAuth, userId, isLoading, fetchOperations}}>
        {children}
    </AuthContext.Provider>
}
