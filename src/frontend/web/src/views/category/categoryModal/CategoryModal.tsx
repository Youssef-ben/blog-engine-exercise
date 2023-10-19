import { Alert, FloatingLabel, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { AppModal, AppModalProps } from '../../shared/appModal/AppModal';

export interface CategoryModalError {
  message: string;
}

export interface CategoryModalProps extends AppModalProps {
  value: string;
  error?: CategoryModalError;
  onValueChanged?: (value: string) => void;
}

export const CategoryModal = ({
  value,
  isLoading,
  error,
  onValueChanged,
  ...props
}: CategoryModalProps) => {
  const { t } = useTranslation();

  return (
    <AppModal {...props} isLoading={isLoading}>
      <Form onSubmit={undefined}>
        <Form.Group className="mb-3">
          <FloatingLabel label={t('post.form.title')} className="mb-3">
            <Form.Control
              type="text"
              name="title"
              autoFocus
              required
              disabled={isLoading}
              defaultValue={value}
              style={{ minHeight: '58px' }}
              onChange={({ target }) => {
                onValueChanged && onValueChanged(target.value);
              }}
            />
          </FloatingLabel>
        </Form.Group>

        {error && (
          <Alert variant="danger" style={{ marginBottom: 0 }}>
            <ul style={{ marginBottom: 0 }}>
              <li>{error.message}</li>
            </ul>
          </Alert>
        )}
      </Form>
    </AppModal>
  );
};
