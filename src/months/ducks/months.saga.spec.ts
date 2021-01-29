import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import * as db from '../../localdb/months.db';
import monthsSaga from './months.saga';
import reducer, {
  addMonth,
  monthStored,
  monthStoreFailed,
  createMonth,
  createSpending,
  addSpending,
  spendingStored,
  spendingStoreFailed,
} from './months.slice';
import { TMonth, TSpending } from '../../types';

describe('months saga', () => {
  it('can add payment periods and save in database', () => {
    const fakeMonth: TMonth = {
      id: '12345',
      startedAt: new Date('2021.01.21'),
    };

    return expectSaga(monthsSaga)
      .withReducer(reducer)
      .provide([[call(db.createNewMonth), fakeMonth]])
      .put(addMonth(fakeMonth))
      .put(monthStored({ month: fakeMonth }))
      .dispatch(createMonth())
      .hasFinalState({
        months: {
          [fakeMonth.id]: fakeMonth,
        },
        spendingsByMonths: {
          [fakeMonth.id]: [],
        },
        stored: [fakeMonth.id],
      })
      .silentRun();
  });

  it('can handle database errors', () => {
    const fakeMonth: TMonth = {
      id: '12345',
      startedAt: new Date('2021.01.21'),
    };

    return expectSaga(monthsSaga)
      .withReducer(reducer)
      .provide([
        [call(db.createNewMonth), fakeMonth],
        [call(db.addMonth, fakeMonth), throwError()],
      ])
      .put(addMonth(fakeMonth))
      .put(monthStoreFailed({ month: fakeMonth }))
      .dispatch(createMonth())
      .hasFinalState({
        months: {
          [fakeMonth.id]: fakeMonth,
        },
        spendingsByMonths: {
          [fakeMonth.id]: [],
        },
        stored: [],
      })
      .silentRun();
  });

  describe('spendings', () => {
    describe('without month', () => {
      it('can create a month and add a spending', () => {
        const fakeMonth: TMonth = {
          id: '12345',
          startedAt: new Date('2021.01.21'),
        };

        const spending: TSpending = {
          id: '678',
          name: 'foo',
          amount: 500,
          createdAt: new Date('2021.01.21'),
        };

        return expectSaga(monthsSaga)
          .withReducer(reducer)
          .provide([[call(db.createNewMonth), fakeMonth]])
          .put(createMonth())
          .put(addMonth(fakeMonth))
          .put(
            addSpending({
              monthId: fakeMonth.id,
              s: spending,
            })
          )
          .put(spendingStored({ spending }))
          .dispatch(createSpending({ spending }))
          .hasFinalState({
            months: {
              [fakeMonth.id]: fakeMonth,
            },
            spendingsByMonths: {
              [fakeMonth.id]: [spending],
            },
            stored: [spending.id],
          })
          .silentRun();
      });

      it('can handle database errors when add spending', () => {
        const fakeMonth: TMonth = {
          id: '12345',
          startedAt: new Date('2021.01.21'),
        };

        const spending: TSpending = {
          id: '678',
          name: 'foo',
          amount: 500,
          createdAt: new Date('2021.01.21'),
        };

        return expectSaga(monthsSaga)
          .withReducer(reducer)
          .provide([
            [call(db.createNewMonth), fakeMonth],
            [call(db.addSpending, fakeMonth.id, spending), throwError()],
          ])
          .put(createMonth())
          .put(addMonth(fakeMonth))
          .put(
            addSpending({
              monthId: fakeMonth.id,
              s: spending,
            })
          )
          .put(spendingStoreFailed({ spending }))
          .dispatch(createSpending({ spending }))
          .hasFinalState({
            months: {
              [fakeMonth.id]: fakeMonth,
            },
            spendingsByMonths: {
              [fakeMonth.id]: [spending],
            },
            stored: [],
          })
          .silentRun();
      });

      it('can handle database errors when add spending and add month', () => {
        const fakeMonth: TMonth = {
          id: '12345',
          startedAt: new Date('2021.01.21'),
        };

        const spending: TSpending = {
          id: '678',
          name: 'foo',
          amount: 500,
          createdAt: new Date('2021.01.21'),
        };

        return expectSaga(monthsSaga)
          .withReducer(reducer)
          .provide([
            [call(db.createNewMonth), fakeMonth],
            [call(db.addMonth, fakeMonth), throwError()],
            [call(db.addSpending, fakeMonth.id, spending), throwError()],
          ])
          .put(createMonth())
          .put(addMonth(fakeMonth))
          .put(monthStoreFailed({ month: fakeMonth }))
          .put(
            addSpending({
              monthId: fakeMonth.id,
              s: spending,
            })
          )
          .put(spendingStoreFailed({ spending }))
          .dispatch(createSpending({ spending }))
          .hasFinalState({
            months: {
              [fakeMonth.id]: fakeMonth,
            },
            spendingsByMonths: {
              [fakeMonth.id]: [spending],
            },
            stored: [],
          })
          .silentRun();
      });
    });

    describe('with an existing month', () => {
      it('can create a spending to a month', () => {
        const fakeMonth: TMonth = {
          id: '12345',
          startedAt: new Date('2021.01.21'),
        };

        const spending: TSpending = {
          id: '6789',
          name: 'foo',
          amount: 500,
          createdAt: new Date('2021.01.21'),
        };

        return expectSaga(monthsSaga)
          .withReducer(reducer)
          .withState({
            months: {
              [fakeMonth.id]: fakeMonth,
            },
            spendingsByMonths: {
              [fakeMonth.id]: [],
            },
            stored: [fakeMonth.id],
          })
          .put(
            addSpending({
              monthId: fakeMonth.id,
              s: spending,
            })
          )
          .put(spendingStored({ spending }))
          .dispatch(createSpending({ spending, monthId: fakeMonth.id }))
          .hasFinalState({
            months: {
              [fakeMonth.id]: fakeMonth,
            },
            spendingsByMonths: {
              [fakeMonth.id]: [spending],
            },
            stored: [fakeMonth.id, spending.id],
          })
          .silentRun();
      });
    });
  });
});
