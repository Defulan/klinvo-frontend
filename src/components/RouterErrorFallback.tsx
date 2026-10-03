import { useNavigate } from "react-router-dom";

export function RouterErrorFallback() {
	const navigate = useNavigate();

	return (
		<div className="container text-center mt-5">
			<h1>Произошла ошибка</h1>
			<p>Во время работы страницы где-то произошла ошибка</p>
			<div className="d-flex justify-content-center gap-2">
				<button type="button" className="btn" onClick={() => navigate("/")}>
					На заглавную
				</button>
				<button type="button" className="btn" onClick={() => navigate(0)}>
					Перезайти на страницу
				</button>
			</div>
		</div>
	);
}
