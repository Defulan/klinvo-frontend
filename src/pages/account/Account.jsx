import { useEffect, useContext, useState } from "react";
import api from "../../lib/api";

function AccountPage() {
    const { isAuth, userId } = useContext(authContext);
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
        fetchOperations();
    }, []);

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
