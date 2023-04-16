import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../localization/translations/en.json";

i18next.use(initReactI18next).init({
  fallbackLng: "sv",
  debug: false,
  lng: "en",
  resources: {
    en: en,
  },
});

export default i18next;
