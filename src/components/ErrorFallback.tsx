import type { FallbackProps } from "react-error-boundary";
import { useNavigate } from "react-router-dom";
import { getErrorDetails } from "../lib/errorDetails";
import { useTranslation } from "react-i18next";

export function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
	const { t } = useTranslation();
	const navigate = useNavigate();

	return (
		<div className="container text-center mt-5">
			<h1>{t("errorFallback.title")}</h1>
			<p>{getErrorDetails(error)}</p>
			<div className="d-flex justify-content-center gap-2">
				<button type="button" className="btn" onClick={() => navigate("/")}>
					{t("errorFallback.home")}
				</button>
				<button type="button" className="btn" onClick={resetErrorBoundary}>
					{t("errorFallback.reset")}
				</button>
			</div>
		</div>
	);
}
