import React, { FC, useState } from 'react';
import { TSpending } from '../types';
import { EditableSpending } from './editableSpending';

export interface SpendingProps {
  id: number;
  name: string;
  amount: number;
  onDelete: (id: number) => void;
  onUpdate: (spending: TSpending) => void;
}

export const Spending: FC<SpendingProps> = ({
  id,
  name,
  amount,
  onDelete,
  onUpdate,
}) => {
  const [editing, setEditing] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);

  const handleStartUpdate = () => setEditing(true);

  const handleCancelUpdate = () => setEditing(false);

  const handleStartDelete = () => setDeleting(true);

  const handleCancelDelete = () => setDeleting(false);

  const handleUpdate = (spending: TSpending) => {
    setEditing(false);
    onUpdate(spending);
  };

  const handleDelete = (id: number) => {
    setDeleting(false);
    onDelete(id);
  };

  return (
    <EditableSpending
      id={id}
      name={name}
      amount={amount}
      onDelete={handleDelete}
      onUpdate={handleUpdate}
      onStartUpdate={handleStartUpdate}
      onCancelUpdate={handleCancelUpdate}
      onStartDelete={handleStartDelete}
      onCancelDelete={handleCancelDelete}
      userDeleting={deleting}
      userEditing={editing}
    />
  );
};
