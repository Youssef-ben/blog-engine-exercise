import type { Meta, StoryFn } from '@storybook/react';
import { PostForm } from './PostForm';
import { postFormMocks } from './postForm.mocks';

export default {
  title: 'views/post/postForm/PostForm',
  component: PostForm,
  tags: ['autodocs'],
} as Meta<typeof PostForm>;

const Template: StoryFn<typeof PostForm> = (args) => <PostForm {...args} />;

export const Default = Template.bind({});
Default.args = postFormMocks.defaultProps;

export const WithValues = Template.bind({});
WithValues.args = postFormMocks.withValues;

export const WithFormLoading = Template.bind({});
WithFormLoading.args = postFormMocks.withFormLoading;
