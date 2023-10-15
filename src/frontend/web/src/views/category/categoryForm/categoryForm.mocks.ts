import { CategoryFormProps } from './CategoryForm';

const defaultProps: CategoryFormProps = {
  title: 'Add Category',
  value: '',
  isLoading: false,
};

const withGivenValueProps: CategoryFormProps = {
  ...defaultProps,
  value: 'Given value',
};

const withLoadingProps: CategoryFormProps = {
  ...withGivenValueProps,
  isLoading: true,
};

export const categoryFormMocks = {
  defaultProps,
  withGivenValueProps,
  withLoadingProps,
};
