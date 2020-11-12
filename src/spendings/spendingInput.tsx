import React, { ChangeEvent, FC, useState, useEffect } from 'react';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

export interface SpendingInputProps {
  id?: number;
  amount?: number;
  name?: string;
  disabled: boolean;
  onCancel?: () => void;
  onSave: (spending: { id?: number; amount: number; name: string }) => void;
}

export const SpendingInput: FC<SpendingInputProps> = ({
  id,
  amount,
  name,
  onSave,
  disabled,
}) => {
  const [amountVal, setAmountVal] = useState<string>(() => `${amount ?? ''}`);
  const [nameVal, setNameVal] = useState<string>(() => `${name ?? ''}`);

  useEffect(() => {
    setAmountVal(`${amount ?? ''}`);
  }, [amount]);

  useEffect(() => {
    setNameVal(`${name ?? ''}`);
  }, [name]);

  const handleSave = () => {
    if (!nameVal) {
      return;
    }

    if (!amountVal) {
      return;
    }

    const amountNum = Number(amountVal);
    if (amountNum < 1) {
      return;
    }

    onSave({
      id,
      name: nameVal,
      amount: Number(amountVal),
    });
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNameVal(e.target.value);
  };

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAmountVal(e.target.value);
  };

  return (
    <InputGroup className="mb-3">
      <InputGroup.Prepend>
        <InputGroup.Text>Name</InputGroup.Text>
      </InputGroup.Prepend>
      <FormControl
        data-testid="name"
        disabled={disabled}
        type="text"
        value={nameVal}
        onChange={handleNameChange}
      />
      <InputGroup.Prepend>
        <InputGroup.Text>Amount</InputGroup.Text>
      </InputGroup.Prepend>
      <FormControl
        data-testid="amount"
        disabled={disabled}
        type="number"
        min="1"
        value={amountVal}
        onChange={handleAmountChange}
      />
      <InputGroup.Prepend>
        <Button
          disabled={disabled}
          onClick={handleSave}
          variant="outline-primary"
        >
          Save
        </Button>
      </InputGroup.Prepend>
    </InputGroup>
  );
};
