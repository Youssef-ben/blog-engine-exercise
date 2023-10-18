import type { Meta, StoryFn } from '@storybook/react';
import { AminPage } from './AminPage';
import { aminPageMocks } from './aminPage.mocks';

export default {
  title: 'controller/page/admin/AdminPage',
  component: AminPage,
  tags: ['autodocs'],
} as Meta<typeof AminPage>;

const Template: StoryFn<typeof AminPage> = (args) => <AminPage {...args} />;

export const Default = Template.bind({});
Default.args = aminPageMocks.defaultProps;
