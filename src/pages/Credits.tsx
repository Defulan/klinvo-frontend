import klinvoIcon from "../assets/nounLanguage.svg";

function Credits() {
	return (
		<>
			<main>Указание на использованные на сайте материалы</main>
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
		</>
	);
}

export default Credits;
