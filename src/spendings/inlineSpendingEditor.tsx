import React, { FC } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { TSpending } from '../types';
import { SpendingInput } from './spendingInput';

interface InlineSpendingEditorProps {
  id: number;
  name: string;
  amount: number;
  onUpdate: (spending: TSpending) => void;
  onCancel: () => void;
}

export const InlineSpendingEditor: FC<InlineSpendingEditorProps> = ({
  id,
  name,
  amount,
  onUpdate,
  onCancel,
}) => {
  const handleUpdate = ({ amount, name }: { amount: number; name: string }) =>
    onUpdate({ id, name, amount });

  return (
    <ListGroup.Item>
      <Row>
        <Col>
          <SpendingInput
            id={id}
            name={name}
            amount={amount}
            onSave={handleUpdate}
            disabled={false}
          />
        </Col>
        <Col>
          <Button onClick={onCancel}>Cancel</Button>
        </Col>
      </Row>
    </ListGroup.Item>
  );
};
