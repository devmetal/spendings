import React, { FC, useRef } from 'react';
import { useSprings, animated } from 'react-spring';
import { useGesture } from 'react-use-gesture';
import clamp from 'lodash/clamp';
import { Month, MonthProps } from './month';
import styles from './months.module.css';

export interface MonthsProps {
  months: Array<MonthProps>;
}

export const Months: FC<MonthsProps> = ({ months = [] }) => {
  const index = useRef(Math.max(months.length - 2, 0));

  const [props, set] = useSprings(months.length, (i) => ({
    x: (i - index.current) * window.innerWidth,
    display: i >= index.current - 1 && i <= index.current + 1,
  }));

  const bind = useGesture(
    {
      onDrag: ({
        down,
        movement: [xDelta],
        direction: [xDir],
        cancel = () => {},
      }) => {
        if (down && Math.abs(xDelta) > window.innerWidth * 0.25) {
          cancel();
          index.current = clamp(
            index.current + (xDir > 0 ? -1 : 1),
            0,
            months.length - 1
          );
        }

        set((i: number) => {
          if (i < index.current - 1 || i > index.current + 1) {
            return { display: false };
          }
          const x =
            (i - index.current) * window.innerWidth + (down ? xDelta : 0);
          return { x, display: true };
        });
      },
    },
    {
      drag: {
        lockDirection: true,
        filterTaps: true,
        axis: 'x',
      },
    }
  );

  return (
    <div className={styles.Container}>
      {props.map((item, index) => (
        <animated.div
          data-testid="month"
          key={index}
          style={{
            display: item.display.to((v) => (v ? 'block' : 'none')),
            transform: item.x.to((x) => `translate3d(${x}px,0,0)`),
          }}
          {...bind()}
        >
          <Month {...months[index]} />
        </animated.div>
      ))}
    </div>
  );
};
