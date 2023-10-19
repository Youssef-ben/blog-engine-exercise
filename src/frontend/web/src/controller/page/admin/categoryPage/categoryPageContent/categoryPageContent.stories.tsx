import type { Meta, StoryFn } from '@storybook/react';
import { CategoryPageContent } from './CategoryPageContent';

export default {
  title: 'controller/page/admin/categoriesPage/categoryPageContent/CategoryPageContent',
  component: CategoryPageContent,
  tags: ['autodocs'],
} as Meta<typeof CategoryPageContent>;

const Template: StoryFn<typeof CategoryPageContent> = () => <CategoryPageContent />;

export const Default = Template.bind({});
