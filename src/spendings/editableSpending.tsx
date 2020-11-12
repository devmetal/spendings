import React, { FC } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { TSpending } from '../types';
import { DeleteSpendingConfirmation } from './deleteSpendingConfirmation';
import { InlineSpendingEditor } from './inlineSpendingEditor';

interface EditableSpendingProps {
  id: number;
  name: string;
  amount: number;
  userEditing: boolean;
  userDeleting: boolean;
  onDelete: (id: number) => void;
  onUpdate: (spending: TSpending) => void;
  onStartUpdate: () => void;
  onCancelUpdate: () => void;
  onStartDelete: () => void;
  onCancelDelete: () => void;
}

export const EditableSpending: FC<EditableSpendingProps> = ({
  id,
  name,
  amount,
  onDelete,
  onUpdate,
  onStartUpdate,
  onCancelUpdate,
  onStartDelete,
  onCancelDelete,
  userEditing,
  userDeleting,
}) => {
  if (userEditing) {
    return (
      <InlineSpendingEditor
        id={id}
        name={name}
        amount={amount}
        onCancel={onCancelUpdate}
        onUpdate={onUpdate}
      />
    );
  }

  if (userDeleting) {
    return (
      <DeleteSpendingConfirmation
        onCancel={onCancelDelete}
        onDelete={() => onDelete(id)}
      />
    );
  }

  return (
    <ListGroup.Item>
      <ListGroup horizontal>
        <ListGroup.Item onClick={onStartUpdate}>{name}</ListGroup.Item>
        <ListGroup.Item onClick={onStartUpdate}>{amount}</ListGroup.Item>
        <ListGroup.Item variant="danger" onClick={onStartDelete}>
          Delete
        </ListGroup.Item>
      </ListGroup>
    </ListGroup.Item>
  );
};
