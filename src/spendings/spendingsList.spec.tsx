import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { SpendingsList } from './spendingsList';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const props = {
  onDelete: jest.fn(),
  onUpdate: jest.fn(),
  spendings: [
    {
      id: '0',
      amount: 10,
      name: 'test',
    },
  ],
};

test('Sanity snapshot testing', () => {
  const { container } = render(<SpendingsList {...props} />);
  expect(container).toMatchSnapshot();
});

describe('interactions', () => {
  let updateBtn: HTMLElement;
  let deleteBtn: HTMLElement;

  beforeEach(() => {
    const { getByRole } = render(<SpendingsList {...props} />);
    updateBtn = getByRole('update-item');
    deleteBtn = getByRole('delete-item');
  });

  test('update interaction show update ui', async () => {
    fireEvent.click(updateBtn);
    await waitFor(() => expect(screen.getByText('Cancel')).toBeVisible());
  });

  test('hold delete button more than 1500ms should call onDelete', async () => {
    const evt = document.createEvent('MouseEvents');
    evt.initEvent('mousedown', true, true);
    fireEvent(deleteBtn, evt);
    await delay(1800);
    expect(props.onDelete).toBeCalled();
  });
});
