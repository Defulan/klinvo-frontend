import { useTranslation } from "react-i18next";

function NotFoundPage() {
	const { t } = useTranslation();

	return (
		<div className="text-center">
			<h1>{t("notFoundPage.main")}</h1>
			<p>{t("notFoundPage.info")}</p>
		</div>
	);
}

export default NotFoundPage;
