import type { Meta, StoryFn } from '@storybook/react';
import { AppDatePicker } from './AppDatePicker';
import { appDatePickerMocks } from './appDatePicker.mocks';

export default {
  title: 'views/shared/appDatePicker/AppDatePicker',
  component: AppDatePicker,
  tags: ['autodocs'],
} as Meta<typeof AppDatePicker>;

const Template: StoryFn<typeof AppDatePicker> = (args) => <AppDatePicker {...args} />;

export const Default = Template.bind({});
Default.args = appDatePickerMocks.defaultProps;
