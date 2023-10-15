import { TextInputProps } from './TextInput';

const defaultProps: TextInputProps = {
  label: 'Text input Label',
};

const withValueProps: TextInputProps = {
  ...defaultProps,
  value: 'Text input value',
};

const withTextAreaProps: TextInputProps = {
  ...defaultProps,
  label: 'Text Area label',
  value:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque at eros lobortis, vehicula neque eget, tempor mauris. Sed eleifend commodo mi, at rhoncus urna lobortis id. Morbi nunc enim, fringilla et viverra ac, hendrerit non dolor. Ut rutrum elit eget tellus semper mollis. Cras nulla augue, condimentum eget viverra ac, volutpat eget nisi. Phasellus sodales, magna quis mattis tempus, sem libero lacinia tortor, non finibus justo mauris vel turpis. Duis a neque vehicula, laoreet mauris quis, sagittis magna.',
  isTextArea: true,
};

export const textInputMocks = {
  defaultProps,
  withValueProps,
  withTextAreaProps,
};
