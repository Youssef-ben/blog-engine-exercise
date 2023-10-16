import { AppDatePickerProps } from './AppDatePicker';

type StorybookAppDatePicker = Omit<AppDatePickerProps, 'onDateChange'>;

const defaultProps: StorybookAppDatePicker = {
  label: 'Publication Date',
};

export const appDatePickerMocks = {
  defaultProps,
};
