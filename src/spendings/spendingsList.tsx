import React, { FC } from 'react';
import { TSpending } from '../types';
import { Spending } from './spending';

export interface SpendingsListProps {
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
export const SpendingsList: FC<SpendingsListProps> = ({
  spendings,
  onUpdate,
  onDelete,
}) => {
  /*const yPos = useRef(0);
  const mOffset = useRef(0);
  const container = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (container !== null && container.current !== null) {
      mOffset.current = -1 * container.current.offsetHeight;
    }
  }, []);

  const [props, set] = useSpring(() => ({ y: 0 }));

  const bind = useDrag(
    ({ down, delta: [, yDelta], cancel = () => {} }) => {
      yPos.current += yDelta;

      if (yPos.current > 0 && !down) {
        cancel();
        yPos.current = 0;
      }

      if (yPos.current < mOffset.current && !down) {
        cancel();
        yPos.current = mOffset.current;
      }

      set({ y: yPos.current });
    },
    { lockDirection: true, axis: 'y' }
  );*/

  return (
    <div>
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
    </div>
  );
};
