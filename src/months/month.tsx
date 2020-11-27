import React, { FC } from 'react';
import { Card, CardContent, CardHeader, IconButton } from '@material-ui/core';
import SpeedIcon from '@material-ui/icons/Speed';
import CloseIcon from '@material-ui/icons/Close';
import { SpendingsControl } from '../spendings/spendingsControl';
import { TSpending } from '../types';

export interface MonthProps {
  startedAt?: Date;
  endedAt?: Date;
  spendings: Array<TSpending>;
}

const Action = ({
  onClose,
  onReport,
  isStarted,
  isEnded,
}: {
  onClose: () => void;
  onReport: () => void;
  isStarted: boolean;
  isEnded: boolean;
}) => {
  if (isEnded) {
    return (
      <IconButton onClick={onReport}>
        <SpeedIcon />
      </IconButton>
    );
  }

  if (isStarted) {
    return (
      <IconButton onClick={onClose}>
        <CloseIcon />
      </IconButton>
    );
  }

  return null;
};

export const Month: FC<MonthProps> = ({ startedAt, endedAt, spendings }) => (
  <Card>
    <CardHeader
      title={startedAt ? startedAt.toLocaleDateString() : 'Start a new period'}
      subheader={
        endedAt ? `Period closed ${endedAt.toLocaleDateString()}` : undefined
      }
      action={
        <Action
          isStarted={Boolean(startedAt)}
          isEnded={Boolean(endedAt)}
          onClose={() => {}}
          onReport={() => {}}
        />
      }
    />
    <CardContent>
      <SpendingsControl
        spendings={spendings}
        onCreate={() => {}}
        onDelete={() => {}}
        onUpdate={() => {}}
      />
    </CardContent>
  </Card>
);
