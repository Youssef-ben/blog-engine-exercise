import { CSSProperties } from 'react';
import { Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { SimpleButton, TextInput } from '../../shared';

export interface CategoryFormProps {
  title: string;
  value: string;
  isLoading: boolean;
  onClick?: () => void;
}

export const CategoryForm = ({ title, value, isLoading, onClick }: CategoryFormProps) => {
  const { t } = useTranslation();

  return (
    <Form>
      <h3 style={styles.title}>{title}</h3>

      <Form.Group className="mb-3">
        <TextInput id="title" autoFocus label={t('category.form.title')} value={value} disabled={isLoading} />
      </Form.Group>

      <Form.Group controlId="formFileLg" className="mb-3">
        <SimpleButton label={t('common.save')} isLoading={isLoading} isDisabled={isLoading} onClick={onClick} />
      </Form.Group>
    </Form>
  );
};

interface CategoryFormStyles {
  title: CSSProperties;
}

const styles: CategoryFormStyles = {
  title: {
    marginBottom: '24px',
  },
};
