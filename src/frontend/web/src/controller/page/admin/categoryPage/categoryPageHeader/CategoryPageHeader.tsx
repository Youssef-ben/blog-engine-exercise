import { CSSProperties } from 'react';
import { useTranslation } from 'react-i18next';
import { SimpleButton } from '../../../../../views/shared';
import { CategoryFormContainer } from '../categoryFormContainer';
import { useCategoryPageHeader } from './useCategoryPageHeader';

export const CategoryPageHeader = () => {
  const { t } = useTranslation();

  const { postFormProps, handleOpenModal } = useCategoryPageHeader();

  return (
    <>
      <div style={styles.header}>
        <h3 style={styles.title}>{t('category.list.title')}</h3>
        <SimpleButton label={t('common.add')} variant="success" onClick={handleOpenModal} />
      </div>

      <CategoryFormContainer {...postFormProps} />
    </>
  );
};

interface ListStyles {
  header: CSSProperties;
  title: CSSProperties;
}

const styles: ListStyles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignContent: 'center',
    justifyItems: 'center',
    marginBottom: 16,
  },
  title: {
    marginBottom: 0,
  },
};
