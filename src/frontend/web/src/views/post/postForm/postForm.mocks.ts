import { PostFormCategories, PostFormProps } from '.';

const postCategories: PostFormCategories = {
  categories: [
    {
      id: 'uuid-1',
      title: 'Category 1',
    },
    {
      id: 'uuid-2',
      title: 'Category 2',
    },
  ],
};

const defaultProps: Partial<PostFormProps> = {
  formTitle: 'Add Post',
  postCategories,
};

const withValues: Partial<PostFormProps> = {
  ...defaultProps,
  title: 'Post 1',
  publicationDate: new Date(),
  content:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque at eros lobortis, vehicula neque eget, tempor mauris. Sed eleifend commodo mi, at rhoncus urna lobortis id.',
  postCategories: {
    ...postCategories,
    selectedCategory: {
      id: 'uuid-1',
      title: 'Category 1',
    },
  },
};

const withFormLoading: Partial<PostFormProps> = {
  ...withValues,
  isLoading: true,
};
export const postFormMocks = {
  defaultProps,
  withValues,
  withFormLoading,
};
