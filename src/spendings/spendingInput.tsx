import { ChangeEvent, FC, useState, useEffect } from 'react';
import {
  TextField,
  Button,
  makeStyles,
  createStyles,
  Grid,
} from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    input: {
      width: '100%',
    },
    button: {
      width: '100%',
    },
  })
);

export interface SpendingInputProps {
  id?: number;
  amount?: number;
  name?: string;
  saveLabel?: string;
  disabled: boolean;
  onCancel?: () => void;
  onSave: (spending: { id?: number; amount: number; name: string }) => void;
}

export const SpendingInput: FC<SpendingInputProps> = ({
  id,
  amount,
  name,
  onSave,
  onCancel,
  disabled,
  saveLabel = 'Save',
}) => {
  const classes = useStyles();

  const [amountVal, setAmountVal] = useState<string>(() => `${amount ?? ''}`);
  const [nameVal, setNameVal] = useState<string>(() => `${name ?? ''}`);

  useEffect(() => {
    setAmountVal(`${amount ?? ''}`);
  }, [amount]);

  useEffect(() => {
    setNameVal(`${name ?? ''}`);
  }, [name]);

  const handleSave = () => {
    if (!nameVal) {
      return;
    }

    if (!amountVal) {
      return;
    }

    const amountNum = Number(amountVal);
    if (amountNum < 1) {
      return;
    }

    onSave({
      id,
      name: nameVal,
      amount: Number(amountVal),
    });
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNameVal(e.target.value);
  };

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAmountVal(e.target.value);
  };

  return (
    <div className={classes.root}>
      <form noValidate autoComplete="off">
        <Grid container spacing={1}>
          <Grid item sm={4} xs={12}>
            <TextField
              className={classes.input}
              variant="outlined"
              label="Name of the item"
              size="small"
              disabled={disabled}
              value={nameVal}
              onChange={handleNameChange}
              InputProps={{
                inputProps: {
                  'data-testid': 'name',
                },
              }}
              required
            />
          </Grid>
          <Grid item sm={4} xs={12}>
            <TextField
              className={classes.input}
              variant="outlined"
              label="Amount of the item"
              size="small"
              disabled={disabled}
              value={amountVal}
              onChange={handleAmountChange}
              type="number"
              InputProps={{
                inputProps: {
                  'data-testid': 'amount',
                },
              }}
              required
            />
          </Grid>
          <Grid item xs>
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              disabled={disabled}
              onClick={handleSave}
            >
              {saveLabel}
            </Button>
          </Grid>
          {onCancel && (
            <Grid item xs>
              <Button
                className={classes.button}
                variant="contained"
                color="secondary"
                disabled={disabled}
                onClick={onCancel}
              >
                Cancel
              </Button>
            </Grid>
          )}
        </Grid>
      </form>
    </div>
  );
};
