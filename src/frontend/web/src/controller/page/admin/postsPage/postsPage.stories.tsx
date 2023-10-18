import type { Meta, StoryFn } from '@storybook/react';
import { PostsPage } from './PostsPage';

export default {
  title: 'controller/page/admin/postsPage/PostsPage',
  component: PostsPage,
  tags: ['autodocs'],
} as Meta<typeof PostsPage>;

const Template: StoryFn<typeof PostsPage> = () => <PostsPage />;

export const Default = Template.bind({});
