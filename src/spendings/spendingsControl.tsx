import React, { FC } from 'react';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Container';
import { TSpending } from '../types';
import { SpendingInput } from './spendingInput';
import { Spendings } from './spendings';

export interface SpendingsControlProps {
  spendings: Array<TSpending>;
  onDelete: (id: number) => void;
  onUpdate: (spending: TSpending) => void;
  onCreate: (spending: { amount: number; name: string }) => void;
}

export const SpendingsControl: FC<SpendingsControlProps> = ({
  spendings,
  onCreate,
  onDelete,
  onUpdate,
}) => {
  return (
    <Container>
      <Row>
        <Col>
          <SpendingInput onSave={onCreate} disabled={false} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Spendings
            spendings={spendings}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        </Col>
      </Row>
    </Container>
  );
};
