import type { Meta, StoryFn } from '@storybook/react';
import { CategoryModal } from './CategoryModal';
import { categoryModalMocks } from './categoryModal.mocks';

export default {
  title: 'views/category/categoryModal/categoryModal',
  component: CategoryModal,
} as Meta<typeof CategoryModal>;

const Template: StoryFn<typeof CategoryModal> = (args) => <CategoryModal {...args} />;

export const Default = Template.bind({});
Default.args = categoryModalMocks.defaultProps;

export const Loading = Template.bind({});
Loading.args = categoryModalMocks.loadingProps;
