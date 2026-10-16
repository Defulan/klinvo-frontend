import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import dayjs from "../lib/dayjs";
import en from "./locales/en.json";
import ru from "./locales/ru.json";

i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		resources: {
			en: { translation: en },
			ru: { translation: ru },
		},
		fallbackLng: "en",
		supportedLngs: ["en", "ru"],
		interpolation: {
			escapeValue: false,
		},
		detection: {
			order: ["localStorage", "navigator"],
			caches: ["localStorage"],
		},
	});

dayjs.locale(i18n.language);

i18n.on("languageChanged", (lng) => {
	dayjs.locale(lng);
});

export default i18n;
