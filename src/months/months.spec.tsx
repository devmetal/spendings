import { render, screen } from '@testing-library/react';
import subDays from 'date-fns/subDays';
import { Months } from './months';

const startDate = new Date('2020.10.30');

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

test('Sanity snapshot test', () => {
  const container = render(<Months {...props} />);
  expect(container).toMatchSnapshot();
});

test('Sanity snapshot test with 0 elements', () => {
  const container = render(<Months months={[]} />);
  expect(container).toMatchSnapshot();
});

describe('Starting element', () => {
  describe('when it has 1 month', () => {
    const testProps = {
      months: [props.months[3]],
    };

    it('the actual one avaibale month is visible', async () => {
      render(<Months {...testProps} />);
      const months = screen.getAllByTestId('month');
      expect(months[0].style.transform).toBe('translate3d(0px,0,0)');
    });
  });

  describe('when it has 2 month', () => {
    const testProps = {
      months: [props.months[2], props.months[3]],
    };

    it('the first element is visible', () => {
      render(<Months {...testProps} />);
      const months = screen.getAllByTestId('month');
      expect(months[0].style.transform).toBe('translate3d(0px,0,0)');
    });
  });

  describe('when it has 3 or more month', () => {
    it('the last active period visible', async () => {
      render(<Months {...props} />);
      const months = screen.getAllByTestId('month');
      expect(months[props.months.length - 2].style.transform).toBe(
        'translate3d(0px,0,0)'
      );
    });
  });
});
