import { AppLoaderProps } from './AppLoader';

const defaultProps: AppLoaderProps = {
  variant: 'primary',
  small: undefined,
};

const withSmallLoader: AppLoaderProps = {
  ...defaultProps,
  small: true,
};

const withVariant: AppLoaderProps = {
  small: false,
  variant: 'secondary',
};

export const appLoaderMocks = {
  defaultProps,
  withSmallLoader,
  withVariant,
};
