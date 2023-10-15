import { useTranslation } from 'react-i18next';
import { CategoryForm } from './views/category/categoryForm/CategoryForm';
import { SimpleButton } from './views/shared';

const App = () => {
  const { t, i18n } = useTranslation();
  console.log(t('app.title'));
  return (
    <>
      Hello World - {t('common.save')}
      <CategoryForm title="Add Catego" value="" isLoading={false} />
      <SimpleButton
        label="Language"
        isLoading={false}
        isDisabled={false}
        onClick={() => {
          i18n.changeLanguage(i18n.language === 'en' ? 'fr' : 'en');
        }}
      />
    </>
  );
};

export default App;
