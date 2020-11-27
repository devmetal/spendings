import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { DeleteSpendingFab } from './deleteSpendingFab';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

test('Sanity snapshot test', () => {
  const { container } = render(<DeleteSpendingFab onDelete={jest.fn()} />);
  expect(container).toMatchSnapshot();
});

test('Holding down 1500ms fire the onDelete event', async () => {
  const onDelete = jest.fn();

  render(<DeleteSpendingFab onDelete={onDelete} />);

  const evt = document.createEvent('MouseEvents');
  evt.initEvent('mousedown', true, true);

  fireEvent(screen.getByRole('delete-item'), evt);
  await delay(1600);
  expect(onDelete).toBeCalled();
});

test('Holding down and release have to reset the delete counter', async () => {
  const onDelete = jest.fn();

  render(<DeleteSpendingFab onDelete={onDelete} />);

  const down = document.createEvent('MouseEvents');
  const up = document.createEvent('MouseEvents');
  down.initEvent('mousedown', true, true);
  up.initEvent('mouseup', true, true);

  const button = screen.getByRole('delete-item');
  fireEvent(button, down);
  await delay(1000);

  fireEvent(button, up);
  expect(onDelete).not.toBeCalled();

  fireEvent(button, down);
  await delay(1600);
  expect(onDelete).toBeCalledTimes(1);
});
