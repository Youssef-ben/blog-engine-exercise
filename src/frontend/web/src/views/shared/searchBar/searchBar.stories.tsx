import type { Meta, StoryFn } from '@storybook/react';
import { SearchBar } from './SearchBar';

export default {
  title: 'views/shared/searchBar/SearchBar',
  component: SearchBar,
  tags: ['autodocs'],
} as Meta<typeof SearchBar>;

const Template: StoryFn<typeof SearchBar> = (args) => <SearchBar {...args} />;

export const Default = Template.bind({});
