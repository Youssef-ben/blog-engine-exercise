import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { default as Backend, default as HttpApi } from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import { DEFAULT_LANGUAGE } from '../constants';

i18n
  .use(HttpApi)
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: DEFAULT_LANGUAGE,
    supportedLngs: ['en', 'fr'],
    debug: false,

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
