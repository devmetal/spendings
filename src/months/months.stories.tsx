import { Meta, Story } from '@storybook/react/types-6-0';
import subDays from 'date-fns/subDays';
import { Months, MonthsProps } from './months';

export default {
  title: 'money/Months',
  component: Months,
} as Meta;

const Template: Story<MonthsProps> = (args) => <Months {...args} />;

export const Basic = Template.bind({});

const startDate = new Date();

Basic.args = {
  months: [
    {
      startedAt: subDays(startDate, 4),
      endedAt: subDays(startDate, 3),
      spendings: [
        { id: 7, name: 'Teszt', amount: 500 },
        { id: 8, name: 'Teszt', amount: 500 },
      ],
    },
    {
      startedAt: subDays(startDate, 3),
      endedAt: subDays(startDate, 2),
      spendings: [
        { id: 1, name: 'Teszt', amount: 500 },
        { id: 2, name: 'Teszt', amount: 500 },
      ],
    },
    {
      startedAt: subDays(startDate, 2),
      endedAt: subDays(startDate, 1),
      spendings: [
        { id: 3, name: 'Teszt', amount: 500 },
        { id: 4, name: 'Teszt', amount: 500 },
      ],
    },
    {
      spendings: [],
    },
  ],
};
