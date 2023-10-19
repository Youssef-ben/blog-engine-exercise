import type { Meta, StoryFn } from '@storybook/react';
import { PostFormContainer } from './PostFormContainer';

export default {
  title: 'controller/page/admin/postsPage/postFormContainer/PostFormContainer',
  component: PostFormContainer,
} as Meta<typeof PostFormContainer>;

const Template: StoryFn<typeof PostFormContainer> = (args) => <PostFormContainer {...args} />;

export const Default = Template.bind({});
Default.args = {
  isModalOpen: true,
};

export const EditPost = Template.bind({});
EditPost.args = {
  isModalOpen: true,
  postId: 'd230d76a-c7db-41c9-afde-a9c843048e7a',
};
