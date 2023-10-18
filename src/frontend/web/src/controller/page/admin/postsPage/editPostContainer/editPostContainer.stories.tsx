import type { Meta, StoryFn } from '@storybook/react';
import { EditPostContainer } from './EditPostContainer';

export default {
  title: 'controller/page/admin/postsPage/editPostContainer/EditPostContainer',
  component: EditPostContainer,
  tags: ['autodocs'],
} as Meta<typeof EditPostContainer>;

const Template: StoryFn<typeof EditPostContainer> = () => <EditPostContainer />;

export const Default = Template.bind({});
