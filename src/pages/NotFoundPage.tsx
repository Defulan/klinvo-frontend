import { useTranslation } from "react-i18next";
import useTitle from "../hooks/useTitle";

function NotFoundPage() {
	const { t } = useTranslation();

	useTitle(t("notFoundPage.pageTitle"));

	return (
		<div className="text-center">
			<h1>{t("notFoundPage.title")}</h1>
			<p>{t("notFoundPage.info")}</p>
		</div>
	);
}

export default NotFoundPage;
