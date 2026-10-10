import { useTranslation } from "react-i18next";

function Home() {
	const { t } = useTranslation();

	return (
		<div className="text-center">
			<h1>Klinvo</h1>
			<main className="fs-5 mb-4">{t("home.main")}</main>

			<div className="col-lg-7 mx-auto d-flex flex-column gap-4">
				<p>{t("home.firstSection")}</p>
				<p>{t("home.secondSection")}</p>
			</div>
		</div>
	);
}

export default Home;
