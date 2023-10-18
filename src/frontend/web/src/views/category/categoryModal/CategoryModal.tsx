import { Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { TextInput } from '../../shared';
import { AppModal, AppModalProps } from '../../shared/appModal/AppModal';

export interface CategoryModalProps extends AppModalProps {
  value: string;
}

export const CategoryModal = ({ value, isLoading, ...props }: CategoryModalProps) => {
  const { t } = useTranslation();

  return (
    <AppModal {...props} isLoading={isLoading}>
      <Form>
        <Form.Group className="mb-3">
          <TextInput id="title" autoFocus label={t('category.form.title')} value={value} disabled={isLoading} />
        </Form.Group>
      </Form>
    </AppModal>
  );
};
