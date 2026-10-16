import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "../../lib/dayjs";
import useTitle from "../../hooks/useTitle";
import NotesListComponent from "../notes/components/NotesList";
import EditableField, { type EditableFieldForm } from "../../components/EditableField";
import LanguagePrivacyButton from "./components/LanguagePrivacyButton";
import { useLanguage, useUpdateLanguage } from "../../hooks/useLanguage";
import { useUser } from "../../hooks/useUser";

function ViewLanguagePage() {
	const { languageId } = useParams<{ languageId: string }>();
	const { user, isContextLoading } = useAuth();
	const { t } = useTranslation();
	const navigate = useNavigate();

	const {
		data: language,
		isLoading: isLanguageLoading,
		isError: isLanguageError,
		error: languageError,
	} = useLanguage(Number(languageId));
	const languageMutationPatch = useUpdateLanguage();

	const {
		data: author,
		isLoading: isAuthorLoading,
		isError: isAuthorError,
		error: authorError,
	} = useUser(language?.authorId ?? -1);

	const isAuthor = Boolean(language && user && language?.authorId === user?.id);

	useTitle(t("languageView.pageTitle", { name: language?.name || "Klinvo" }));

	useEffect(() => {
		if (isLanguageLoading || isContextLoading || isAuthorLoading) {
			return;
		}

		if (isLanguageError) {
			console.error(languageError);
			navigate("/404");
		}

		if (isAuthorError) {
			console.error(authorError);
			navigate("/404");
		}

		if (!language || !author) {
			navigate("/404");
			return;
		}

		if (!isAuthor && language.isPrivate) {
			navigate("/404");
			return;
		}
	}, [
		isLanguageLoading,
		isAuthorLoading,
		isContextLoading,
		author,
		navigate,
		isLanguageError,
		isAuthorError,
		languageError,
		authorError,
		language,
		isAuthor,
	]);

	if (isLanguageLoading || isContextLoading || isAuthorLoading) {
		return;
	}

	if (!language || !author) {
		return;
	}

	const onConfirmChanges = async (data: EditableFieldForm) => {
		languageMutationPatch.mutate(
			{ languageId: language.id, ...data },
			{
				onError: (error) => {
					console.error(error);
				},
			},
		);
	};

	return (
		<>
			<h1 className="d-flex align-items-end">
				{isAuthor ? (
					<>
						<EditableField value={language.name} fieldName="name" onConfirmChanges={onConfirmChanges} />
						<LanguagePrivacyButton language={language} />
					</>
				) : (
					language.name
				)}
			</h1>
			<ul>
				<li>
					{t("languageView.createdBy")} {author.name}
				</li>
				<li>
					{t("languageView.createdAt")} {dayjs(language.createdAt).format("lll")}
				</li>
				{language.isPrivate && <li>{t("languageView.itsPrivate")}</li>}
			</ul>
			<hr />
			<NotesListComponent language={language} isAuthor={isAuthor} />
		</>
	);
}

export default ViewLanguagePage;
