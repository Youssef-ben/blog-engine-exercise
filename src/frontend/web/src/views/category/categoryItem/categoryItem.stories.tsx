import type { Meta, StoryFn } from '@storybook/react';
import { CategoryItem } from './CategoryItem';
import { categoryItemMocks } from './categoryItem.mocks';

export default {
  title: 'views/category/categoryItem/CategoryItem',
  component: CategoryItem,
  tags: ['autodocs'],
} as Meta<typeof CategoryItem>;

const Template: StoryFn<typeof CategoryItem> = (args) => <CategoryItem {...args} />;

export const Default = Template.bind({});
Default.args = categoryItemMocks.defaultProps;
