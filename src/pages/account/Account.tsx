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

	return (
		<>
			{!isLoading && user && (
				<>
					<div className="d-flex align-items-center gap-2">
						<h1>{user.name}</h1>
						<button className="btn btn-outline-dark btn-sm" type="button" onClick={() => navigate("/account-settings")}>
							Настройки
						</button>
					</div>
					{user.bio && <p>{user.bio}</p>}
					<hr />
				</>
			)}
		</>
	);
}

export default AccountPage;
