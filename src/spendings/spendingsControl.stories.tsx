import { Meta, Story } from '@storybook/react/types-6-0';
import { SpendingsControl, SpendingsControlProps } from './spendingsControl';

export default {
  title: 'Money/SpendingsControl',
  component: SpendingsControl,
} as Meta;

const Template: Story<SpendingsControlProps> = (args) => (
  <SpendingsControl {...args} />
);

export const Basic = Template.bind({});
Basic.args = {
  spendings: [
    { id: '1', name: 'Teszt', amount: 3000 },
    { id: '2', name: 'Teszt', amount: 3000 },
    { id: '3', name: 'Teszt', amount: 3000 },
    { id: '4', name: 'Teszt', amount: 3000 },
  ],
};
