import type { Meta, StoryFn } from '@storybook/react';
import { CategoriesList } from './CategoriesList';
import { categoriesListMocks } from './categoriesList.mocks';

export default {
  title: 'views/category/categoriesList/CategoriesList',
  component: CategoriesList,
  tags: ['autodocs'],
} as Meta<typeof CategoriesList>;

const Template: StoryFn<typeof CategoriesList> = (args) => <CategoriesList {...args} />;

export const Default = Template.bind({});
Default.args = categoriesListMocks.defaultProps;
