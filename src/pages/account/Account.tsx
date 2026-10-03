import { useEffect, useState } from "react";
import api from "../../lib/api";
import { useAuth } from "../../context/AuthContext";

interface User {
	id: number;
	name: string;
	bio: string | null;
}

function AccountPage() {
	const { isAuth, userId, isContextLoading } = useAuth();
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (isContextLoading) return;

		const fetchOperations = async (): Promise<void> => {
			try {
				const userResponse = await api.get<User>(`/users/${userId}`);
				setUser(userResponse.data);
			} catch (err) {
				console.error(err);
			} finally {
				setIsLoading(false);
			}
		};

		switch (isAuth) {
			case null:
				return;
			case false:
				window.location.href = "/login";
				break;
			case true:
				fetchOperations();
				break;
		}
	}, [isContextLoading, userId, isAuth]);

	const logout = async (event: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
		event.preventDefault();
		await api.post("/auth/logout");
		window.location.href = "/";
	};

	return (
		<>
			{!isLoading && user && (
				<>
					<h1>Страница пользователя {user.name}</h1>
					<p>ID: {user.id}</p>
					{user.bio && <p>{user.bio}</p>}
					<hr />
					<button type="button" onClick={logout}>
						Выйти
					</button>
				</>
			)}
		</>
	);
}

export default AccountPage;
