import { useTranslation } from "react-i18next";
import klinvoIcon from "../assets/nounLanguage.svg";
import notePopover from "../assets/notePopover.svg";
import useTitle from "../hooks/useTitle";

function Credits() {
	const { t } = useTranslation();

	useTitle(t("about.pageTitle"));

	return (
		<>
			<section>{t("about.intro")}</section>

			<section>
				<div>{t("about.githubSection")}</div>
				<ul>
					<li>
						<a
							href="https://github.com/Defulan/klinvo-frontend"
							target="_blank"
							rel="noopener noreferrer"
							title="Frontend GitHub link">
							{t("about.githubFrontend")}
						</a>
					</li>
					<li>
						<a
							href="https://github.com/Defulan/klinvo-backend"
							target="_blank"
							rel="noopener noreferrer"
							title="Backend GitHub link">
							{t("about.githubBackend")}
						</a>
					</li>
					<li>
						<a href="https://github.com/Defulan" target="_blank" rel="noopener noreferrer" title="Author's GitHub">
							{t("about.githubAuthor")}
						</a>
					</li>
				</ul>
			</section>

			<main>{t("about.creditsHeader")}</main>
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
				<img alt="" src={notePopover} width={32} height={32} className="d-inline-block align-text-top" />
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
