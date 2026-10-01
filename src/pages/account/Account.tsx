import { useEffect, useState } from "react";
import api from "../../lib/api";
import { useAuth } from "../../context/AuthContext";

function AccountPage() {
    const { isAuth, userId, isContextLoading } = useAuth();
    const [user, setUser] = useState({
        id: null,
        name: null,
        bio: null
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
            <h1>Страница пользователя {user.name}</h1>
            <p>ID: {user.id}</p>
            {user.bio && <p>{user.bio}</p>}
            <hr/>
            <button onClick={logout}>Выйти</button>
        </>}
    </>;
}

export default AccountPage;
