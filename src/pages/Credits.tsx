import { useTranslation } from "react-i18next";
import klinvoIcon from "../assets/nounLanguage.svg";
import notePopup from "../assets/notePopup.svg";
import useTitle from "../hooks/useTitle";

function Credits() {
	const { t } = useTranslation();

	useTitle(t("credits.pageTitle"));

	return (
		<>
			<main>{t("credits.info")}</main>
			<p className="credits-p">
				<img alt="" src={klinvoIcon} width={32} height={32} className="d-inline-block align-text-top" />
				<span>
					Language by Liez Art from{" "}
					<a
						href="https://thenounproject.com/browse/icons/term/language/"
						target="_blank"
						rel="noopener noreferrer"
						title="Language Icons">
						Noun Project
					</a>
					(CC BY 3.0)
				</span>
			</p>
			<br />
			<p className="credits-p">
				<img alt="" src={notePopup} width={32} height={32} className="d-inline-block align-text-top" />
				<span>
					popup by Gregor Cresnar from
					<a
						href="https://thenounproject.com/browse/icons/term/popup/"
						target="_blank"
						rel="noopener noreferrer"
						title="popup Icons">
						Noun Project
					</a>{" "}
					(CC BY 3.0)
				</span>
			</p>
		</>
	);
}

export default Credits;
