import React from 'react';
import { fireEvent, render, RenderResult } from '@testing-library/react';
import { SpendingInput } from './spendingInput';

test('Sanity snapshot test', () => {
  const { container } = render(
    <SpendingInput disabled={false} onSave={jest.fn()} />
  );
  expect(container).toMatchSnapshot();
});

test('Pre filles values', () => {
  const { container } = render(
    <SpendingInput
      disabled={false}
      id={1}
      amount={500}
      name="Hello"
      onSave={jest.fn()}
    />
  );
  expect(container).toMatchSnapshot();
});

describe('onSave callback', () => {
  let amount: HTMLElement;
  let name: HTMLElement;
  let saveBtn: HTMLElement;
  let onSave: () => {};

  beforeEach(() => {
    onSave = jest.fn();

    const { getByTestId, getByText } = render(
      <SpendingInput onSave={onSave} disabled={false} />
    );

    amount = getByTestId('amount');
    name = getByTestId('name');
    saveBtn = getByText('Save');
  });

  it('wont fires when name is empty', () => {
    fireEvent.change(amount, { target: { value: '100' } });
    fireEvent.click(saveBtn);
    expect(onSave).not.toBeCalled();
  });

  it('wont fires when amount is empty', () => {
    fireEvent.change(name, { target: { value: 'valami' } });
    fireEvent.click(saveBtn);
    expect(onSave).not.toBeCalled();
  });

  it('wont fires when amount is invalid', () => {
    fireEvent.change(amount, { target: { value: '-100' } });
    fireEvent.change(name, 'valami');
    fireEvent.click(saveBtn);
    expect(onSave).not.toBeCalled();
  });

  it('fires when amount and name filled and valid', () => {
    fireEvent.change(amount, { target: { value: '100' } });
    fireEvent.change(name, { target: { value: 'valami' } });
    fireEvent.click(saveBtn);
    expect(onSave).toBeCalledWith({ name: 'valami', amount: 100 });
  });
});
