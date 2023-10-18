import type { Meta, StoryFn } from '@storybook/react';
import { AppModal } from './AppModal';

export default {
  title: 'views/shared/appModal/AppModal',
  component: AppModal,
  tags: ['autodocs'],
} as Meta<typeof AppModal>;

const Template: StoryFn<typeof AppModal> = (args) => <AppModal {...args} />;

export const Default = Template.bind({});
Default.args = {
  isOpen: true,
  modalTitle: 'App Modal Title',
  primaryButtonLabel: 'Primary button',
};
