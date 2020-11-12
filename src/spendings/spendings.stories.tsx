import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { SpendingsProps, Spendings } from './spendings';

export default {
  title: 'Money/SpendingsList',
  component: Spendings,
} as Meta;

const Template: Story<SpendingsProps> = (args) => <Spendings {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  spendings: [
    { id: 1, name: 'Teszt', amount: 3000 },
    { id: 2, name: 'Teszt', amount: 3000 },
    { id: 3, name: 'Teszt', amount: 3000 },
    { id: 4, name: 'Teszt', amount: 3000 },
  ],
};
