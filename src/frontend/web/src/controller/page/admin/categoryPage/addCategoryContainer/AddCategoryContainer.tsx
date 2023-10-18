import { CSSProperties } from 'react';
import { useTranslation } from 'react-i18next';
import { CategoryModal } from '../../../../../views/category';
import { SimpleButton } from '../../../../../views/shared';
import { useAddCategoryContainer } from './useAddCategoryContainer';

export const AddCategoryContainer = () => {
  const { t } = useTranslation();

  const { categoryModal, handleOpenModal } = useAddCategoryContainer();

  return (
    <div style={styles.header}>
      <h3 style={{ marginBottom: 0 }}>{t('category.list.title')}</h3>
      <SimpleButton label={t('common.add')} variant="secondary" onClick={handleOpenModal} />
      <CategoryModal {...categoryModal} />
    </div>
  );
};

interface ListStyles {
  header: CSSProperties;
}

const styles: ListStyles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignContent: 'center',
    justifyItems: 'center',
    marginBottom: 16,
  },
};
