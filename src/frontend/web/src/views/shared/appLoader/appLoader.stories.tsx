import type { Meta, StoryFn } from '@storybook/react';
import { AppLoader } from './AppLoader';
import { appLoaderMocks } from './appLoader.mocks';

export default {
  title: 'views/shared/appLoader/AppLoader',
  component: AppLoader,
  tags: ['autodocs'],
} as Meta<typeof AppLoader>;

const Template: StoryFn<typeof AppLoader> = (args) => <AppLoader {...args} />;

export const Default = Template.bind({});
Default.args = appLoaderMocks.defaultProps;

export const WithSmallLoader = Template.bind({});
WithSmallLoader.args = appLoaderMocks.withSmallLoader;

export const WithColor = Template.bind({});
WithColor.args = appLoaderMocks.withVariant;
