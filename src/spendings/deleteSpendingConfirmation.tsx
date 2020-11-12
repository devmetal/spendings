import React, { FC } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

interface DeleteSpendingConfirmationProps {
  onCancel: () => void;
  onDelete: () => void;
  label?: string;
}

export const DeleteSpendingConfirmation: FC<DeleteSpendingConfirmationProps> = ({
  onCancel,
  onDelete,
  label = 'Are you sure?',
}) => (
  <ListGroup.Item>
    <ListGroup horizontal>
      <ListGroup.Item>{label}</ListGroup.Item>
      <ListGroup.Item variant="primary" onClick={onCancel}>
        No
      </ListGroup.Item>
      <ListGroup.Item variant="danger" onClick={onDelete}>
        Yes
      </ListGroup.Item>
    </ListGroup>
  </ListGroup.Item>
);
