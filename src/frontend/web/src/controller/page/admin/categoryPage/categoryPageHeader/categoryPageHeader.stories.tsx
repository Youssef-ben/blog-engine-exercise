import type { Meta, StoryFn } from '@storybook/react';
import { CategoryPageHeader } from './CategoryPageHeader';

export default {
  title: 'controller/page/admin/categoriesPage/categoryPageHeader/CategoryPageHeader',
  component: CategoryPageHeader,
  tags: ['autodocs'],
} as Meta<typeof CategoryPageHeader>;

const Template: StoryFn<typeof CategoryPageHeader> = () => <CategoryPageHeader />;

export const Default = Template.bind({});
