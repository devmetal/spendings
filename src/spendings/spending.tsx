import React, { FC, useState } from 'react';
import {
  Card,
  CardActions,
  CardContent,
  createStyles,
  Fab,
  makeStyles,
  Typography,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { TSpending } from '../types';
import { SpendingInput } from './spendingInput';
import { DeleteSpendingFab } from './deleteSpendingFab';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
      marginBottom: '1rem',
    },
    name: {
      fontSize: 16,
    },
    amount: {
      fontSize: 14,
    },
  })
);

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
  const classes = useStyles();
  const [editing, setEditing] = useState<boolean>(false);

  const startUpdate = () => setEditing(true);

  const cancelUpdate = () => setEditing(false);

  const doUpdate = ({ name, amount }: { name: string; amount: number }) => {
    setEditing(false);
    onUpdate({ name, amount, id });
  };

  const doDelete = () => {
    onDelete(id);
  };

  if (editing) {
    return (
      <div className={classes.root}>
        <Card>
          <CardContent>
            <SpendingInput
              id={id}
              name={name}
              amount={amount}
              onCancel={cancelUpdate}
              onSave={doUpdate}
              disabled={false}
            />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <Card>
        <CardContent>
          <Typography className={classes.name}>{name}</Typography>
          <Typography className={classes.amount}>{amount} HUF</Typography>
        </CardContent>
        <CardActions>
          <Fab
            aria-label="update"
            role="update-item"
            size="small"
            color="primary"
            onClick={startUpdate}
          >
            <EditIcon />
          </Fab>
          <DeleteSpendingFab onDelete={doDelete} />
        </CardActions>
      </Card>
    </div>
  );
};
