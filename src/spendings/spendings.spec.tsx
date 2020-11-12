import React from 'react';
import { fireEvent, render, screen, wait } from '@testing-library/react';
import { Spendings } from './spendings';

const props = {
  onDelete: jest.fn(),
  onUpdate: jest.fn(),
  spendings: [
    {
      id: 0,
      amount: 10,
      name: 'test',
    },
  ],
};

test('Sanity snapshot testing', () => {
  const { container } = render(<Spendings {...props} />);
  expect(container).toMatchSnapshot();
});

describe('interactions', () => {
  let name: HTMLElement;
  let delBtn: HTMLElement;

  beforeEach(() => {
    const { getByText } = render(<Spendings {...props} />);
    name = getByText('test');
    delBtn = getByText('Delete');
  });

  test('delete interaction should show confirm ui', async () => {
    fireEvent.click(delBtn);
    await wait(() => expect(screen.getByText('Yes')).toBeVisible());
  });

  test('update interaction show update ui', async () => {
    fireEvent.click(name);
    await wait(() => expect(screen.getByText('Cancel')).toBeVisible());
  });
});
