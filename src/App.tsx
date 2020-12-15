import { FC } from 'react';
import subDays from 'date-fns/subDays';
import { Months } from './months/months';

const startDate = new Date();

const props = {
  months: [
    {
      startedAt: subDays(startDate, 4),
      endedAt: subDays(startDate, 3),
      spendings: [
        { id: '7', name: 'Teszt', amount: 500 },
        { id: '8', name: 'Teszt', amount: 500 },
      ],
    },
    {
      startedAt: subDays(startDate, 3),
      endedAt: subDays(startDate, 2),
      spendings: [
        { id: '1', name: 'Teszt', amount: 500 },
        { id: '2', name: 'Teszt', amount: 500 },
        { id: '11', name: 'Teszt', amount: 500 },
        { id: '22', name: 'Teszt', amount: 500 },
        { id: '33', name: 'Teszt', amount: 500 },
        { id: '44', name: 'Teszt', amount: 500 },
        { id: '55', name: 'Teszt', amount: 500 },
        { id: '66', name: 'Teszt', amount: 500 },
      ],
    },
    {
      startedAt: subDays(startDate, 2),
      endedAt: subDays(startDate, 1),
      spendings: [
        { id: '3', name: 'Teszt', amount: 500 },
        { id: '4', name: 'Teszt', amount: 500 },
      ],
    },
    {
      spendings: [],
    },
  ],
};

const App: FC = () => <Months {...props} />;

export default App;
