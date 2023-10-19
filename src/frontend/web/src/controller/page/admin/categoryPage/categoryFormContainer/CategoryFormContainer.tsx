import { AppModal } from 'Views/shared';
import { Alert, FloatingLabel } from 'react-bootstrap';
import Form from 'react-bootstrap/esm/Form';
import { useTranslation } from 'react-i18next';
import { useCategoryFormContainer } from './useCategoryFormContainer';

export interface CategoryFormContainerProps {
  categoryId?: string;
  isModalOpen: boolean;
  handleIsModalOpen: () => void;
}

export const CategoryFormContainer = ({
  isModalOpen,
  categoryId,
  handleIsModalOpen,
}: CategoryFormContainerProps) => {
  const { t } = useTranslation();

  const { isLoading, formProps, appModalProps } = useCategoryFormContainer({
    isModalOpen,
    categoryId,
    handleIsModalOpen,
  });

  const { values, errors, apiError, handleChange } = formProps;

  return (
    <Form>
      <AppModal {...appModalProps}>
        <Form.Group className="mb-3">
          <FloatingLabel label={t('category.form.title')} className="mb-3">
            <Form.Control
              type="text"
              name="title"
              autoFocus
              required
              disabled={isLoading}
              onChange={handleChange}
              defaultValue={values.title}
              style={{ minHeight: '58px' }}
            />
            {errors.title && <div style={styles.invalidInputLabel}>{errors.title}</div>}
          </FloatingLabel>
        </Form.Group>
        {apiError && (
          <Alert variant="danger" style={{ marginBottom: 0, padding: '5px 8px 5px 8px' }}>
            <h6>{t('api.err.title')}</h6>
            <ul style={{ marginBottom: 0, fontSize: '0.9rem' }}>
              <li>{apiError}</li>
            </ul>
          </Alert>
        )}
      </AppModal>
    </Form>
  );
};

const styles = {
  invalidInputLabel: {
    width: '100%',
    marginTop: '0.25rem',
    fontSize: '.875em',
    color: 'var(--bs-form-invalid-color)',
  },
};
