import { uuid } from 'uuidv4';
import { put, all, takeEvery } from 'redux-saga/effects';
import { TMonth } from '../../types';
import { startCreateMonth, createMonth } from './months.slice';

function* createMonthSaga() {
  const startedAt = new Date();
  const id = uuid();

  const month: TMonth = {
    startedAt,
    id,
  };

  yield put(createMonth(month));
}

export default function* monthsSaga() {
  yield all([takeEvery(startCreateMonth, createMonthSaga)]);
}
