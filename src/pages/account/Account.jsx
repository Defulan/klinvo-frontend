import { useEffect, useContext, useState } from "react";
import api from "../../lib/api";
import { authContext } from "../../context/AuthContext";

function AccountPage() {
    const { isAuth, userId, isContextLoading } = useContext(authContext);
    const [user, setUser] = useState({
        id: null,
        name: null
    })
    const [isLoading, setIsLoading] = useState(true);

    async function fetchOperations() {
        try {
            const userResponse = await api.get(`/users/${userId}`);
            setUser(userResponse.data);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (isContextLoading) return;
        
        switch (isAuth) {
            case null:
                return;
            case false:
                window.location.href = "/login"
                break;
            case true:
                fetchOperations();
                break;
        }
    }, [isContextLoading, userId, isAuth]);

    const logout = async (event) => {
        event.preventDefault();
        await api.post("/auth/logout");
        window.location.href = "/";
    }

    return <>
        {!isLoading && <>
            <h1>You're {user.name} with {user.id}</h1>
            <button onClick={logout}>Выйти</button>
        </>}
    </>;
}

export default AccountPage;
