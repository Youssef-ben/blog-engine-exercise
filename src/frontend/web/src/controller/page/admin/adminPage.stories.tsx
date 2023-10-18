import type { Meta, StoryFn } from '@storybook/react';
import { AdminPage } from './AdminPage';
import { aminPageMocks } from './adminPage.mocks';

export default {
  title: 'controller/page/admin/AdminPage',
  component: AdminPage,
  tags: ['autodocs'],
} as Meta<typeof AdminPage>;

const Template: StoryFn<typeof AdminPage> = (args) => <AdminPage {...args} />;

export const Default = Template.bind({});
Default.args = aminPageMocks.defaultProps;
