import { put, all, takeEvery, call, take } from 'redux-saga/effects';
import { TMonth, TSpending } from '../../types';
import * as db from '../../localdb/months.db';
import {
  createMonth,
  addMonth,
  monthStored,
  monthStoreFailed,
  startRemoveMonth,
  createSpending,
  addSpending,
  spendingStored,
  spendingStoreFailed,
} from './months.slice';

function* createMonthSaga() {
  const month: TMonth = yield call(db.createNewMonth);
  yield put(addMonth(month));
  yield call(addMonthToDatabase, month);
}

function* addMonthToDatabase(month: TMonth) {
  try {
    yield call(db.addMonth, month);
    yield put(monthStored({ month }));
  } catch {
    yield put(monthStoreFailed({ month }));
  }
}

function* removeMonthSaga(action: ReturnType<typeof startRemoveMonth>) {}

function* createSpendingSaga(action: ReturnType<typeof createSpending>) {
  const { payload } = action;
  let monthId: string;

  if (!payload.monthId) {
    yield put(createMonth());

    const {
      payload: { id },
    } = yield take(addMonth.type);

    monthId = id;
  } else {
    monthId = payload.monthId;
  }

  yield put(addSpending({ monthId, s: payload.spending }));
  yield call(addSpendingToDatabase, monthId, payload.spending);
}

function* addSpendingToDatabase(monthId: string, spending: TSpending) {
  try {
    yield call(db.addSpending, monthId, spending);
    yield put(spendingStored({ spending }));
  } catch (e) {
    yield put(spendingStoreFailed({ spending }));
  }
}

export default function* monthsSaga() {
  yield all([
    takeEvery(createMonth, createMonthSaga),
    takeEvery(startRemoveMonth, removeMonthSaga),
    takeEvery(createSpending, createSpendingSaga),
  ]);
}
