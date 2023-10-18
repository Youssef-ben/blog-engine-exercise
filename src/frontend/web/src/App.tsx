import { useTranslation } from 'react-i18next';

const App = () => {
  const { t } = useTranslation();
  console.log(t('app.title'));
  return <>Hello World - {t('common.save')}</>;
};

export default App;
