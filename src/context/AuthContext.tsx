import { useState } from "react";
import { createContext, useEffect } from "react";
import api from "../lib/api";

export const authContext = createContext();

export function AuthContextProvider({ children }) {
    const [isAuth, setIsAuth] = useState(null);
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

    return <authContext.Provider value={{isAuth, userId, isLoading}}>
        {children}
    </authContext.Provider>
}
