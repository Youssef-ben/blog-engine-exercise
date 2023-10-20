import type { Meta, StoryFn } from '@storybook/react';
import { UserPage } from './UserPage';

export default {
  title: 'controller/page/user/UserPage',
  component: UserPage,
  tags: ['autodocs'],
} as Meta<typeof UserPage>;

const Template: StoryFn<typeof UserPage> = () => <UserPage />;

export const Default = Template.bind({});
