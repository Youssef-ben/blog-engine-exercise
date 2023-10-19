import type { Meta, StoryFn } from '@storybook/react';
import { CategoryPage } from './CategoryPage';

export default {
  title: 'controller/page/admin/categoriesPage/CategoryPage',
  component: CategoryPage,
  tags: ['autodocs'],
} as Meta<typeof CategoryPage>;

const Template: StoryFn<typeof CategoryPage> = () => <CategoryPage />;

export const Default = Template.bind({});
