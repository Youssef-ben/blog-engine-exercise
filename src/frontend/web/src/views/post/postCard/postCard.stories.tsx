import type { Meta, StoryFn } from '@storybook/react';
import { PostCard } from './PostCard';

export default {
  title: 'views/post/postCard/PostCard',
  component: PostCard,
  tags: ['autodocs'],
} as Meta<typeof PostCard>;

const Template: StoryFn<typeof PostCard> = (args) => <PostCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  id: 'uuid',
  title: 'Post Title',
  content:
    ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vitae arcu eget magna blandit varius quis ut metus. Curabitur sed neque eu dui dapibus blandit at vel dui. Aenean dignissim posuere neque ac maximus. Nam magna lacus, placerat todo here in ntoh whlod to adna apkd ;ajfa',
  category: 'Category',
  publicationDate: '2023-10-19',
};
