import React, { FC } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { SpendingsControl } from '../spendings/spendingsControl';
import { TSpending } from '../types';

export interface MonthProps {
  startedAt?: Date;
  endedAt?: Date;
  spendings: Array<TSpending>;
}

export const Month: FC<MonthProps> = ({ startedAt, endedAt, spendings }) => (
  <Card>
    <Card.Header>
      {(startedAt && (
        <React.Fragment>
          Started: {startedAt.toLocaleDateString()}
        </React.Fragment>
      )) || <React.Fragment>Start a new period</React.Fragment>}
      {endedAt && (
        <React.Fragment>Ended: {endedAt.toLocaleDateString()}</React.Fragment>
      )}
    </Card.Header>
    <SpendingsControl
      spendings={spendings}
      onCreate={() => {}}
      onDelete={() => {}}
      onUpdate={() => {}}
    />
    <Card.Body>
      {(endedAt && (
        <React.Fragment>
          Ended: {endedAt.toLocaleDateString()}
          <Button>See the results</Button>
        </React.Fragment>
      )) || (
        <React.Fragment>
          {(startedAt && <Button>End this period</Button>) || (
            <Button>Start this period</Button>
          )}
        </React.Fragment>
      )}
    </Card.Body>
  </Card>
);
