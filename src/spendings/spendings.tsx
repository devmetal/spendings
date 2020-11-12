import React, { FC } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { TSpending } from '../types';
import { Spending } from './spending';

export interface SpendingsProps {
  /**
   * List of user spendings
   */
  spendings: Array<TSpending>;
  /**
   * User start update
   */
  onUpdate: (spending: TSpending) => void;
  /**
   * User start delete
   */
  onDelete: (id: number) => void;
}

/**
 * Spendings is a basic list of represent user spendings
 */
export const Spendings: FC<SpendingsProps> = ({
  spendings,
  onUpdate,
  onDelete,
}) => (
  <ListGroup>
    {spendings.map((spending) => (
      <Spending
        key={spending.id}
        id={spending.id}
        name={spending.name}
        amount={spending.amount}
        onUpdate={onUpdate}
        onDelete={onDelete}
      />
    ))}
  </ListGroup>
);
