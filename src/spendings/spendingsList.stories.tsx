import { Meta, Story } from '@storybook/react/types-6-0';
import { SpendingsListProps, SpendingsList } from './spendingsList';

export default {
  title: 'Money/SpendingsList',
  component: SpendingsList,
} as Meta;

const Template: Story<SpendingsListProps> = (args) => <SpendingsList {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  spendings: [
    { id: 1, name: 'Teszt', amount: 3000 },
    { id: 2, name: 'Teszt', amount: 3000 },
    { id: 3, name: 'Teszt', amount: 3000 },
    { id: 4, name: 'Teszt', amount: 3000 },
  ],
};
