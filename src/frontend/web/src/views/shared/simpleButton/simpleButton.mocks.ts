import { SimpleButtonProps } from './SimpleButton';

const defaultProps: SimpleButtonProps = {
  label: 'Button Label',
  isLoading: false,
  isDisabled: false,
};

const loadingProps: SimpleButtonProps = {
  ...defaultProps,
  isLoading: true,
};

const disabledProps: SimpleButtonProps = {
  ...defaultProps,
  isDisabled: true,
};

const secondaryVariantProps: SimpleButtonProps = {
  ...defaultProps,
  variant: 'secondary',
};

export const simpleButtonMocks = {
  defaultProps,
  loadingProps,
  disabledProps,
  secondaryVariantProps,
};
