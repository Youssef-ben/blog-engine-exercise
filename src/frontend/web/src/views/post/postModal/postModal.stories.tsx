import type { Meta, StoryFn } from '@storybook/react';
import { PostModal } from './PostModal';
import { postModalMocks } from './postModal.mocks';

export default {
  title: 'views/post/postModal/PostModal',
  component: PostModal,
} as Meta<typeof PostModal>;

const Template: StoryFn<typeof PostModal> = (args) => <PostModal {...args} />;

export const Default = Template.bind({});
Default.args = postModalMocks.defaultProps;

export const Loading = Template.bind({});
Loading.args = postModalMocks.loadingProps;
