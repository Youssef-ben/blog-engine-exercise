import type { Meta, StoryFn } from '@storybook/react';
import { PostItem } from './PostItem';
import { postItemMocks } from './postItem.mocks';

export default {
  title: 'views/post/postItem/PostItem',
  component: PostItem,
  tags: ['autodocs'],
} as Meta<typeof PostItem>;

const Template: StoryFn<typeof PostItem> = (args) => <PostItem {...args} />;

export const Default = Template.bind({});
Default.args = postItemMocks.defaultProps;
