import { Alert, FloatingLabel, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';
import { AppDatePicker } from '../../shared';
import { AppModal, AppModalProps } from '../../shared/appModal/AppModal';

export interface CategoryModalError {
  messages: string[];
}

export interface PostCategoryOption {
  value: string;
  label: string;
}

export interface PostModalCategories {
  selected?: PostCategoryOption;
  categories: PostCategoryOption[];
}

export interface PostModalProps extends AppModalProps {
  title: string;
  content: string;
  publicationDate: Date;
  categoriesOptions: PostModalCategories;
  error: CategoryModalError;
  handleChange: (value: any) => void;
}

export const PostModal = ({ isLoading, error, title, content, publicationDate, categoriesOptions, handleChange, ...props }: PostModalProps) => {
  const { t } = useTranslation();
  const isDisabled = error?.messages?.length > 0 || !title || !content || !categoriesOptions.selected;

  return (
    <AppModal {...props} isLoading={isLoading} isDisabled={isDisabled}>
      <Form>
        <Form.Group className="mb-3">
          <FloatingLabel label={t('post.form.title')} className="mb-3">
            <Form.Control
              autoFocus
              required
              type="text"
              name="title"
              disabled={isLoading}
              onChange={handleChange}
              style={{
                minHeight: '58px',
              }}
            />
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-3">
          <Select
            isSearchable
            name="categoryId"
            isDisabled={isLoading}
            placeholder={t('post.form.categories')}
            noOptionsMessage={() => t('noData.title')}
            value={categoriesOptions?.selected}
            options={categoriesOptions?.categories}
            onChange={(option: any) => {
              handleChange({
                target: {
                  name: 'categoryId',
                  value: option.value,
                },
              });
            }}
          />
        </Form.Group>

        <Form.Group className="mb-2">
          <AppDatePicker
            name="publicationDate"
            value={publicationDate}
            isDisabled={isLoading}
            label={t('post.form.publicationDate')}
            onDateChange={(date: Date) => {
              handleChange({
                target: {
                  name: 'publicationDate',
                  value: date,
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
              style={{
                minHeight: '150px',
              }}
            />
          </FloatingLabel>
        </Form.Group>
        {error && error.messages.length > 0 && (
          <Alert variant="danger" style={{ marginBottom: 0 }}>
            <ul style={{ marginBottom: 0 }}>
              {error.messages.map((message, index) => (
                <li key={message + index}>{message}</li>
              ))}
            </ul>
          </Alert>
        )}
      </Form>
    </AppModal>
  );
};
