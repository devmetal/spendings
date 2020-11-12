import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { SpendingInput, SpendingInputProps } from './spendingInput';

export default {
  title: 'Money/SpendingsInput',
  component: SpendingInput,
} as Meta;

const Template: Story<SpendingInputProps> = (args) => (
  <SpendingInput {...args} />
);

export const Basic = Template.bind({});
Basic.args = {};
