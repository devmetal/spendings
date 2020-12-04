import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TMonth, TSpending } from '../../types';

type MonthsState = {
  months: {
    [id: string]: TMonth;
  };
  spendingsByMonths: {
    [id: string]: TSpending[];
  };
};

const initialState: MonthsState = {
  months: {},
  spendingsByMonths: {},
};

export const startCreateMonth = createAction('months/startCreateMonth');
export const createMonthFinish = createAction<{ success: boolean }>(
  'month/screateMonthFinish'
);

export const startRemoveMonth = createAction<{ id: string }>(
  'months/startRemoveMonth'
);
export const removeMonthFinish = createAction<{ success: boolean }>(
  'months/removeMonthFinish'
);

export const startCreateSpending = createAction<{
  monthId: string;
  spending: TSpending;
}>('months/startCreateSpending');
export const createSpendingFinish = createAction<{ success: boolean }>(
  'months/createSpendingFinish'
);

export const startUpdateSpending = createAction<{
  monthId: string;
  spending: TSpending;
}>('months/startUpdateSpending');
export const updateSpendingFinish = createAction<{ success: boolean }>(
  'months/updateSpendingFinish'
);

export const startRemoveSpending = createAction<{
  monthId: string;
  spendingId: string;
}>('months/startRemoveSpending');
export const removeSpendingFinish = createAction<{ success: boolean }>(
  'months/removeSpendingFinish'
);

const slice = createSlice({
  name: 'months',
  initialState,
  reducers: {
    createMonth(state, action: PayloadAction<TMonth>) {
      const { id } = action.payload;
      state.months[id] = action.payload;
      state.spendingsByMonths[id] = [];
    },
    removeMonth(state, action: PayloadAction<{ id: string }>) {
      const { id } = action.payload;
      delete state.months[id];
      delete state.spendingsByMonths[id];
    },
    addSpending(
      state,
      action: PayloadAction<{ monthId: string; s: TSpending }>
    ) {
      const { monthId, s } = action.payload;
      state.spendingsByMonths?.[monthId]?.push(s);
    },
    removeSpending(
      state,
      action: PayloadAction<{ monthId: string; spendingId: number }>
    ) {
      const { monthId, spendingId } = action.payload;

      const index = state.spendingsByMonths[monthId]?.findIndex(
        (sp) => sp.id === spendingId
      );

      if (index && index !== -1) {
        delete state.spendingsByMonths[monthId][index];
      }
    },
    updateSpending(
      state,
      action: PayloadAction<{ monthId: string; s: TSpending }>
    ) {
      const { monthId, s } = action.payload;

      const index = state.spendingsByMonths[monthId]?.findIndex(
        (sp) => sp.id === s.id
      );

      if (index && index !== -1) {
        state.spendingsByMonths[monthId][index] = s;
      }
    },
  },
});

export const {
  createMonth,
  removeMonth,
  addSpending,
  removeSpending,
  updateSpending,
} = slice.actions;

export default slice.reducer;
