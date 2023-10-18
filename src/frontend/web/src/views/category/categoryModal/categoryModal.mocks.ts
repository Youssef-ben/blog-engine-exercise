import { CategoryModalProps } from '.';

const defaultProps: Partial<CategoryModalProps> = {
  isOpen: true,
  value: '',
  isLoading: false,
  modalTitle: 'Add Category',
  primaryButtonLabel: 'Save',
};

const loadingProps: Partial<CategoryModalProps> = {
  ...defaultProps,
  isLoading: true,
  modalTitle: 'Edit Category',
};

export const categoryModalMocks = {
  defaultProps,
  loadingProps,
};
