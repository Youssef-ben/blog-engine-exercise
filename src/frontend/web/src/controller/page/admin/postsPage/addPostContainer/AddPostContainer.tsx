import { CSSProperties } from 'react';
import { useTranslation } from 'react-i18next';
import { PostModal } from '../../../../../views/post/postModal';
import { SimpleButton } from '../../../../../views/shared';
import { useAddPostContainer } from './useAddPostContainer';

export const AddPostContainer = () => {
  const { t } = useTranslation();

  const { postModal, handleOpenModal } = useAddPostContainer();

  return (
    <div style={styles.header}>
      <h3 style={{ marginBottom: 0 }}>{t('post.list.title')}</h3>
      <SimpleButton label={t('common.add')} variant="secondary" onClick={handleOpenModal} />
      <PostModal {...postModal} />
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
