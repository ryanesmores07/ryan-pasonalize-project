import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "./locales/en/translation.json";
import jpTranslation from "./locales/jp/translation.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: enTranslation },
    jp: { translation: jpTranslation },
  },
  lng: "en", // default language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
