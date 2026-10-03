import type { FallbackProps } from "react-error-boundary";
import { useNavigate } from "react-router-dom";
import { getErrorDetails } from "../lib/errorDetails";

export function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
	const navigate = useNavigate();

	return (
		<div className="container text-center mt-5">
			<h1>Произошла ошибка</h1>
			<p>{getErrorDetails(error)}</p>
			<div className="d-flex justify-content-center gap-2">
				<button type="button" className="btn" onClick={() => navigate("/")}>
					На заглавную
				</button>
				<button type="button" className="btn" onClick={resetErrorBoundary}>
					Перезайти на страницу
				</button>
			</div>
		</div>
	);
}
