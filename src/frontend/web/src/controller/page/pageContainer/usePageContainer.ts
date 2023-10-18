import { useTranslation } from 'react-i18next';

export interface UsePageContainerData {
  language: string;
  onLanguageChange: () => void;
}

export const usePageContainer = (): UsePageContainerData => {
  const { i18n } = useTranslation();

  const getLanguage = () => {
    return i18n.language === 'en' ? 'fr' : 'en';
  };

  const handleOnLanguageChange = () => {
    i18n.changeLanguage(getLanguage());
  };

  return {
    language: getLanguage(),
    onLanguageChange: handleOnLanguageChange,
  };
};
