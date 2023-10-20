import { SimpleButton } from 'Views/shared';
import { CSSProperties } from 'react';
import { useTranslation } from 'react-i18next';
import { PostFormContainer } from '../postFormContainer';
import { usePostPageHeader } from './usePostPageHeader';

export const PostPageHeader = () => {
  const { t } = useTranslation();

  const { postFormProps, handleOpenModal } = usePostPageHeader();

  return (
    <>
      <div style={styles.header}>
        <h3 style={styles.title}>{t('post.list.title')}</h3>
        <SimpleButton label={t('common.add')} variant="success" onClick={handleOpenModal} />
      </div>

      <PostFormContainer {...postFormProps} />
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
