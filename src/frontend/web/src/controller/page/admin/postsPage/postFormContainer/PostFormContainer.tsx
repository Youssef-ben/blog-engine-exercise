import { convertDateToString, convertStringToDate } from 'Controller/utils';
import { AppDatePicker } from 'Views/shared';
import { AppModal } from 'Views/shared/appModal/AppModal';
import { FloatingLabel, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';
import { usePostFormContainer } from './usePostFormContainer';

export interface PostFormContainerProps {
  postId?: string;
  isModalOpen: boolean;
  handleIsModalOpen: () => void;
}

export const PostFormContainer = ({
  postId,
  isModalOpen,
  handleIsModalOpen,
}: PostFormContainerProps) => {
  const { t } = useTranslation();

  const { isLoading, formProps, appModalProps, selectOptionProps } = usePostFormContainer({
    postId,
    isModalOpen,
    handleIsModalOpen,
  });

  const { values, errors, handleChange } = formProps;

  return (
    <Form>
      <AppModal {...appModalProps}>
        <Form.Group className="mb-3">
          <FloatingLabel label={t('post.form.title')} className="mb-3">
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

        <Form.Group className="mb-3">
          <Select
            isSearchable
            name="categoryId"
            isDisabled={isLoading}
            value={selectOptionProps.selected}
            options={selectOptionProps.categories}
            placeholder={t('post.form.categories')}
            noOptionsMessage={() => t('noData.title')}
            onChange={(option: any) => {
              handleChange({
                target: {
                  name: 'categoryId',
                  value: option.value,
                },
              });
            }}
          />
          {errors.categoryId && <div style={styles.invalidInputLabel}>{errors.categoryId}</div>}
        </Form.Group>

        <Form.Group className="mb-2">
          <AppDatePicker
            name="publicationDate"
            value={convertStringToDate(values.publicationDate)}
            isDisabled={isLoading}
            label={t('post.form.publicationDate')}
            onDateChange={(date: Date) => {
              handleChange({
                target: {
                  name: 'publicationDate',
                  value: convertDateToString(date),
                },
              });
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <FloatingLabel label={t('post.form.content')} className="mb-3">
            <Form.Control
              required
              type="text"
              as="textarea"
              name="content"
              disabled={isLoading}
              onChange={handleChange}
              defaultValue={values.content}
              style={{ minHeight: '150px' }}
            />
            {errors.content && <div style={styles.invalidInputLabel}>{errors.content}</div>}
          </FloatingLabel>
        </Form.Group>
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
