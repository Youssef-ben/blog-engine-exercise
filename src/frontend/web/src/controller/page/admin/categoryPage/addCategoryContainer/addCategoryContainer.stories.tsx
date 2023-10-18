import type { Meta, StoryFn } from '@storybook/react';
import { AddCategoryContainer } from './AddCategoryContainer';

export default {
  title: 'controller/page/admin/categoryPage/addCategoryContainer/AddCategoryContainer',
  component: AddCategoryContainer,
  tags: ['autodocs'],
} as Meta<typeof AddCategoryContainer>;

const Template: StoryFn<typeof AddCategoryContainer> = () => <AddCategoryContainer />;

export const Default = Template.bind({});
