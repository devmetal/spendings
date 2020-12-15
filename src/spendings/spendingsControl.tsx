import { createStyles, Grid, makeStyles } from '@material-ui/core';
import { FC } from 'react';
import { TSpending } from '../types';
import { SpendingInput } from './spendingInput';
import { SpendingsList } from './spendingsList';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
    },
  })
);

export interface SpendingsControlProps {
  spendings: Array<TSpending>;
  onDelete: (id: string) => void;
  onUpdate: (spending: TSpending) => void;
  onCreate: (spending: { amount: number; name: string }) => void;
}

export const SpendingsControl: FC<SpendingsControlProps> = ({
  spendings,
  onCreate,
  onDelete,
  onUpdate,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <SpendingInput
            saveLabel="Add spending"
            onSave={onCreate}
            disabled={false}
          />
        </Grid>
        <Grid item xs={12}>
          <SpendingsList
            spendings={spendings}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        </Grid>
      </Grid>
    </div>
  );
};
