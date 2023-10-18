import { Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { CategoryItemProps } from '../../category';
import { AppDatePicker, TextInput } from '../../shared';
import { AppModal, AppModalProps } from '../../shared/appModal/AppModal';

export interface PostModalCategories {
  selectedCategory?: CategoryItemProps;
  categories: CategoryItemProps[];
}

export interface PostModalProps extends AppModalProps {
  title?: string;
  publicationDate?: Date;
  content?: string;
  postCategories?: PostModalCategories;
  onDateChange: (date: Date) => void;
}

export const PostModal = ({ isLoading, title, publicationDate, content, postCategories, onDateChange, ...props }: PostModalProps) => {
  const { t } = useTranslation();

  return (
    <AppModal {...props} isLoading={isLoading}>
      <Form>
        <Form.Group className="mb-3">
          <TextInput id="title" autoFocus label={t('post.form.title')} value={title} disabled={isLoading} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Select aria-label="Category select" disabled={isLoading}>
            <option>{t('post.form.categories')}</option>
            {postCategories &&
              postCategories.categories.map((category) => {
                return (
                  <option value={category.id} selected={postCategories.selectedCategory?.id === category.id}>
                    {category.title}
                  </option>
                );
              })}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-2">
          <AppDatePicker
            id="publicationDate"
            label={t('post.form.publicationDate')}
            value={publicationDate}
            onDateChange={onDateChange}
            isDisabled={isLoading}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <TextInput isTextArea id="content" label={t('post.form.content')} value={content} disabled={isLoading} />
        </Form.Group>
      </Form>
    </AppModal>
  );
};
