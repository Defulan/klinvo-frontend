import { useEffect, useState } from "react";
import api from "../../lib/api";
import { useAuth } from "../../context/AuthContext";
import type { User } from "../../lib/types/user";
import { useNavigate } from "react-router-dom";

function AccountPage() {
	const { isAuth, userId, isContextLoading } = useAuth();
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate();

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
				navigate("/login");
				break;
			case true:
				fetchOperations();
				break;
		}
	}, [isContextLoading, userId, isAuth, navigate]);

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
					<button type="button" onClick={() => navigate("/account-settings")}>
						Настройки
					</button>
					<button type="button" onClick={logout}>
						Выйти
					</button>
				</>
			)}
		</>
	);
}

export default AccountPage;
