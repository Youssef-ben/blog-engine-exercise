import type { Meta, StoryFn } from '@storybook/react';
import { PostsList } from './PostsList';
import { postsListMocks } from './postsList.mocks';

export default {
  title: 'views/post/postsList/PostsList',
  component: PostsList,
  tags: ['autodocs'],
} as Meta<typeof PostsList>;

const Template: StoryFn<typeof PostsList> = (args) => <PostsList {...args} />;

export const Default = Template.bind({});
Default.args = postsListMocks.defaultProps;
