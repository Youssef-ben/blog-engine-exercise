import { CSSProperties } from 'react';
import { Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Category } from '../../../models/categoryDto';
import { AppDatePicker, SimpleButton, TextInput } from '../../shared';

export interface PostFormCategories {
  selectedCategory?: Category;
  categories: Category[];
}

export interface PostFormProps {
  formTitle: string;
  title?: string;
  publicationDate?: Date;
  content?: string;
  postCategories?: PostFormCategories;
  isLoading?: boolean;
  onSave: () => void;
  onDateChange: (date: Date) => void;
}

export const PostForm = ({ formTitle, title, publicationDate, content, isLoading, postCategories, onSave, onDateChange }: PostFormProps) => {
  const { t } = useTranslation();

  return (
    <Form>
      <h3 style={styles.title}>{formTitle}</h3>

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

      <Form.Group controlId="formFileLg" className="mb-3">
        <SimpleButton label={t('common.save')} isLoading={isLoading} isDisabled={isLoading} onClick={onSave} />
      </Form.Group>
    </Form>
  );
};

interface PostFormStyles {
  title: CSSProperties;
}

const styles: PostFormStyles = {
  title: {
    marginBottom: '24px',
  },
};
