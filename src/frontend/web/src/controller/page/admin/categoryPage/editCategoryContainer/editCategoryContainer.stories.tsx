import type { Meta, StoryFn } from '@storybook/react';
import { EditCategoryContainer } from './EditCategoryContainer';

export default {
  title: 'controller/page/admin/categoryPage/editCategoryContainer/EditCategoryContainer',
  component: EditCategoryContainer,
  tags: ['autodocs'],
} as Meta<typeof EditCategoryContainer>;

const Template: StoryFn<typeof EditCategoryContainer> = () => <EditCategoryContainer />;

export const Default = Template.bind({});
