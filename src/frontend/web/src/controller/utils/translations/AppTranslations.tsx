import type { LanguageDetectorModule } from 'i18next';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { enTranslation } from './resources/en';
import { frTranslation } from './resources/fr';

export const setAppTranslation = async (languageDetector: LanguageDetectorModule) => {
  await i18n
    .use(languageDetector)
    .use(initReactI18next)
    .init({
      compatibilityJSON: 'v3',

      fallbackLng: 'en',

      interpolation: {
        escapeValue: false,
      },

      resources: {
        enTranslation,
        frTranslation,
      },
    });

  return i18n;
};

export default i18n;
