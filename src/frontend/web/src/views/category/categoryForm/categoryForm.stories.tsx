import type { Meta, StoryFn } from '@storybook/react';
import { CategoryForm } from './CategoryForm';
import { categoryFormMocks } from './categoryForm.mocks';

export default {
  title: 'views/category/categoryForm/CategoryForm',
  component: CategoryForm,
  tags: ['autodocs'],
} as Meta<typeof CategoryForm>;

const Template: StoryFn<typeof CategoryForm> = (args) => <CategoryForm {...args} />;

export const Default = Template.bind({});
Default.args = categoryFormMocks.defaultProps;

export const WithGivenValue = Template.bind({});
WithGivenValue.args = categoryFormMocks.withGivenValueProps;

export const WithLoading = Template.bind({});
WithLoading.args = categoryFormMocks.withLoadingProps;
