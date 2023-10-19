import type { Meta, StoryFn } from '@storybook/react';

import { NoDataFound } from './NoDataFound';

export default {
  title: 'views/shared/noDataFound/NoDataFound',
  component: NoDataFound,
  tags: ['autodocs'],
} as Meta<typeof NoDataFound>;

const Template: StoryFn<typeof NoDataFound> = () => <NoDataFound />;

export const Default = Template.bind({});
