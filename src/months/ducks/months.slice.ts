import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TMonth, TSpending } from '../../types';

type MonthsState = {
  months: {
    [id: string]: TMonth;
  };
  spendingsByMonths: {
    [id: string]: TSpending[];
  };
  stored: string[];
};

const initialState: MonthsState = {
  stored: [],
  months: {},
  spendingsByMonths: {},
};

export const createMonth = createAction('months/startCreateMonth');

export const monthStored = createAction<{
  month: TMonth;
}>('month/monthStored');

export const monthStoreFailed = createAction<{ month?: TMonth }>(
  'month/monthStoreFailed'
);

export const startRemoveMonth = createAction<{ id: string }>(
  'months/startRemoveMonth'
);

export const removeMonthFinish = createAction<{ success: boolean }>(
  'months/removeMonthFinish'
);

export const createSpending = createAction<{
  monthId?: string;
  spending: TSpending;
}>('months/createSpending');

export const spendingStored = createAction<{ spending: TSpending }>(
  'months/spendingStored'
);

export const spendingStoreFailed = createAction<{ spending: TSpending }>(
  'months/storeSpendingFailed'
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
    addMonth(state, action: PayloadAction<TMonth>) {
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
      action: PayloadAction<{ monthId: string; spendingId: string }>
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
  extraReducers: (builder) => {
    builder
      .addCase(monthStored, (state, action) => {
        state.stored.push(action.payload.month.id);
      })
      .addCase(spendingStored, (state, action) => {
        state.stored.push(action.payload.spending.id);
      });
  },
});

export const {
  addMonth,
  removeMonth,
  addSpending,
  removeSpending,
  updateSpending,
} = slice.actions;

export default slice.reducer;
