import { Meta, Story } from '@storybook/react/types-6-0';
import { Month, MonthProps } from './month';

export default {
  title: 'money/Month',
  component: Month,
} as Meta;

const Template: Story<MonthProps> = (args) => <Month {...args} />;

export const BasicStarted = Template.bind({});
BasicStarted.args = {
  startedAt: new Date(),
  spendings: [
    { id: '1', name: 'Tesz', amount: 500 },
    { id: '2', name: 'Tesz', amount: 500 },
    { id: '3', name: 'Tesz', amount: 500 },
    { id: '4', name: 'Tesz', amount: 500 },
  ],
};

export const BasicEnded = Template.bind({});
BasicEnded.args = {
  startedAt: new Date(),
  endedAt: new Date(),
  spendings: [
    { id: '1', name: 'Tesz', amount: 500 },
    { id: '2', name: 'Tesz', amount: 500 },
    { id: '3', name: 'Tesz', amount: 500 },
    { id: '4', name: 'Tesz', amount: 500 },
  ],
};

export const Basic = Template.bind({});
Basic.args = {
  spendings: [],
};
