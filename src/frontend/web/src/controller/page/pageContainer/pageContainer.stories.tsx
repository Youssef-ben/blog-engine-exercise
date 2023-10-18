import type { Meta, StoryFn } from '@storybook/react';
import { PageContainer } from './PageContainer';

export default {
  title: 'controller/page/pageContainer/PageContainer',
  component: PageContainer,
  tags: ['autodocs'],
} as Meta<typeof PageContainer>;

const Template: StoryFn<typeof PageContainer> = () => <PageContainer />;

export const Default = Template.bind({});
