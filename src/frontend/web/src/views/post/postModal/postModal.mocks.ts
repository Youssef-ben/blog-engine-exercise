import { PostModalProps } from '.';

const defaultProps: Partial<PostModalProps> = {
  isOpen: true,
  modalTitle: 'Add Post',
  primaryButtonLabel: 'Save',
  isLoading: false,
};

const loadingProps: Partial<PostModalProps> = {
  ...defaultProps,
  modalTitle: 'Edit post',
  isLoading: true,
};

export const postModalMocks = {
  defaultProps,
  loadingProps,
};
