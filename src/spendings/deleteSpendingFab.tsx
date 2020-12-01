import { FC, useState } from 'react';
import {
  CircularProgress,
  createStyles,
  Fab,
  makeStyles,
  Theme,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { animated, useSpring } from 'react-spring';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      //transition: '1.5s ease-in transform',
      position: 'relative',
      margin: theme.spacing(1),
      zIndex: 1,
    },
    fabProgress: {
      color: red[600],
      position: 'absolute',
      top: -5,
      left: -5,
      zIndex: 1,
    },
  })
);

export interface DeleteSpendingFabProps {
  onDelete: () => void;
}

const AnimatedProgress = animated(
  ({ step, className }: { step: number; className: string }) => (
    <CircularProgress
      size={50}
      variant="determinate"
      className={className}
      value={step}
    />
  )
);

export const DeleteSpendingFab: FC<DeleteSpendingFabProps> = ({ onDelete }) => {
  const classes = useStyles();
  const [down, setIsDown] = useState(false);

  const { step } = useSpring({
    config: { duration: 1700, precision: 0.1 },
    step: down ? 5 : 1,
    immediate: !down,
    onRest: () => {
      if (down) {
        onDelete();
      }
    },
  });

  return (
    <div
      className={classes.wrapper}
      onTouchStart={(e) => {
        e.stopPropagation();
        setIsDown(true);
      }}
      onTouchEnd={(e) => {
        e.stopPropagation();
        setIsDown(false);
      }}
      onMouseDown={(e) => {
        e.stopPropagation();
        setIsDown(true);
      }}
      onMouseUp={(e) => {
        e.stopPropagation();
        setIsDown(false);
      }}
      onMouseOut={() => {
        setIsDown(false);
      }}
      style={down ? { transform: 'scale(3.0)' } : undefined}
    >
      <Fab
        size="small"
        aria-label="delete"
        role="delete-item"
        color="secondary"
      >
        <DeleteIcon />
      </Fab>
      <AnimatedProgress
        className={classes.fabProgress}
        step={step
          .to((s) => Math.floor(s))
          .to({
            range: [1, 2, 3, 4, 5],
            output: [0, 25, 50, 75, 100],
          })}
      />
    </div>
  );
};
