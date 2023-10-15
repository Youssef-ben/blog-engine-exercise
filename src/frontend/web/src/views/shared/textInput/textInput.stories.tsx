import type { Meta, StoryFn } from '@storybook/react';

import { TextInput } from './TextInput';
import { textInputMocks } from './textInput.mocks';

export default {
  title: 'views/shared/textInput/TextInput',
  component: TextInput,
  tags: ['autodocs'],
} as Meta<typeof TextInput>;

const Template: StoryFn<typeof TextInput> = (args) => <TextInput {...args} />;

export const Default = Template.bind({});
Default.args = textInputMocks.defaultProps;

export const WithValue = Template.bind({});
WithValue.args = textInputMocks.withValueProps;

export const WithTextArea = Template.bind({});
WithTextArea.args = textInputMocks.withTextAreaProps;
