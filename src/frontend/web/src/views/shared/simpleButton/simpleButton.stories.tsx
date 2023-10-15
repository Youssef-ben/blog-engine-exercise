import type { Meta, StoryFn } from '@storybook/react';

import { SimpleButton } from './SimpleButton';
import { simpleButtonMocks } from './simpleButton.mocks';

export default {
  title: 'views/shared/simpleButton/SimpleButton',
  component: SimpleButton,
  tags: ['autodocs'],
} as Meta<typeof SimpleButton>;

const Template: StoryFn<typeof SimpleButton> = (args) => <SimpleButton {...args} />;

export const Default = Template.bind({});
Default.args = simpleButtonMocks.defaultProps;

export const Loading = Template.bind({});
Loading.args = simpleButtonMocks.loadingProps;

export const Disabled = Template.bind({});
Disabled.args = simpleButtonMocks.disabledProps;

export const SecondaryVariant = Template.bind({});
SecondaryVariant.args = simpleButtonMocks.secondaryVariantProps;
