import { useTranslation } from "react-i18next";

function Home() {
	const { t } = useTranslation();

	return <main>{t("home.main")}</main>;
}

export default Home;
