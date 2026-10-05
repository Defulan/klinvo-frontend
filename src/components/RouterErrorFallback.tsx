import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export function RouterErrorFallback() {
	const { t } = useTranslation();

	const navigate = useNavigate();

	return (
		<div className="container text-center mt-5">
			<h1>{t("routerErrorFallback.title")}</h1>
			<p>{t("routerErrorFallback.info")}</p>
			<div className="d-flex justify-content-center gap-2">
				<button type="button" className="btn" onClick={() => navigate("/")}>
					{t("routerErrorFallback.home")}
				</button>
				<button type="button" className="btn" onClick={() => navigate(0)}>
					{t("routerErrorFallback.reset")}
				</button>
			</div>
		</div>
	);
}
