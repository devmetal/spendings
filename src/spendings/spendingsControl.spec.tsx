import { fireEvent, render, screen, wait } from '@testing-library/react';
import React from 'react';
import { SpendingsControl } from './spendingsControl';

const props = {
  onCreate: jest.fn(),
  onUpdate: jest.fn(),
  onDelete: jest.fn(),
  spendings: [
    { id: 1, amount: 100, name: 'Teszt' },
    { id: 2, amount: 101, name: 'Teszt1' },
    { id: 3, amount: 102, name: 'Teszt2' },
  ],
};

test('Sanity snapshot test', () => {
  const { container } = render(<SpendingsControl {...props} />);
  expect(container).toMatchSnapshot();
});

describe('Interaction test', () => {
  test('update a spending', async () => {
    const { getByText, queryByText, getAllByText, getAllByTestId } = render(
      <SpendingsControl {...props} />
    );
    fireEvent.click(getByText('Teszt'));

    /**
     * Wait for form is visible
     */
    await wait(() => expect(getByText('Cancel')).toBeVisible());

    fireEvent.change(getAllByTestId('name')[1], {
      target: { value: 'Updated' },
    });
    fireEvent.change(getAllByTestId('amount')[1], {
      target: { value: '500' },
    });
    fireEvent.click(getAllByText('Save')[1]);

    /**
     * Form has to be dissapear
     */
    await wait(() => expect(queryByText('Cancel')).toBeNull());

    expect(props.onUpdate).toBeCalledWith({
      id: 1,
      amount: 500,
      name: 'Updated',
    });
  });
});
