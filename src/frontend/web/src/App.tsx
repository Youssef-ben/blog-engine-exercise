import { useTranslation } from 'react-i18next';

const App = () => {
  const { t } = useTranslation();
  return <>Hello World - {t('common.save')}</>;
};

export default App;
