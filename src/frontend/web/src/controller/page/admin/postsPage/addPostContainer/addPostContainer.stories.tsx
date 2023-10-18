import type { Meta, StoryFn } from '@storybook/react';
import { AddPostContainer } from './AddPostContainer';

export default {
  title: 'controller/page/admin/postsPage/addPostContainer/AddPostContainer',
  component: AddPostContainer,
  tags: ['autodocs'],
} as Meta<typeof AddPostContainer>;

const Template: StoryFn<typeof AddPostContainer> = () => <AddPostContainer />;

export const Default = Template.bind({});
