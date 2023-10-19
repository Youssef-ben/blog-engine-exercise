import type { Meta, StoryFn } from '@storybook/react';
import { CategoryFormContainer } from './CategoryFormContainer';

export default {
  title: 'controller/page/admin/categoriesPage/categoryFormContainer/CategoryFormContainer',
  component: CategoryFormContainer,
} as Meta<typeof CategoryFormContainer>;

const Template: StoryFn<typeof CategoryFormContainer> = (args) => (
  <CategoryFormContainer {...args} />
);

export const Default = Template.bind({});
Default.args = {
  isModalOpen: true,
};

export const EditPost = Template.bind({});
EditPost.args = {
  isModalOpen: true,
  categoryId: '17bd4667-30ab-4dfc-9fea-caa9ee4af889',
};
