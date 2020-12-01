import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TMonth } from '../../types';

type MonthsState = {
  months: TMonth[];
};

const initialState: MonthsState = {
  months: [],
};

const slice = createSlice({
  name: 'months',
  initialState,
  reducers: {
    createMonth(state, action: PayloadAction<TMonth>) {
      state.months.push(action.payload);
    },
  },
});
