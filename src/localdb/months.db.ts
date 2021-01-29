import { uuid } from 'uuidv4';
import PouchDb from 'pouchdb';
import PouchDbFind from 'pouchdb-find';
import { TMonth, TSpending } from '../types';

PouchDb.plugin(PouchDbFind);

type MonthData =
  | {
      createdAt: Date;
      kind: 'month';
      data: TMonth;
    }
  | {
      createdAt: Date;
      kind: 'spending';
      data: TSpending;
      monthId: string;
    };

export const db = new PouchDb<MonthData>(process.env.REACT_APP_DB_NAME, {
  adapter: process.env.REACT_APP_DB_ADAPTER,
});

export const addMonth = (month: TMonth) =>
  db.put({
    kind: 'month',
    createdAt: month.startedAt,
    data: month,
    _id: month.id,
  });

export const updateMonth = async (month: TMonth) => {
  const doc = await db.get(month.id);
  if (doc.kind === 'month') {
    doc.data = month;
  }
  return db.put(doc);
};

export const removeMonth = async (id: string) => {
  const doc = await db.get(id);
  if (doc.kind === 'month') {
    return db.remove(doc);
  }
};

export const addSpending = async (monthId: string, spending: TSpending) =>
  db.put({
    createdAt: spending?.createdAt ?? new Date(),
    _id: spending.id,
    kind: 'spending',
    data: spending,
    monthId,
  });

export const updateSpending = async (spending: TSpending) => {
  const doc = await db.get(spending.id);
  if (doc.kind === 'spending') {
    doc.data = spending;
    return db.put(doc);
  }
};

export const removeSpending = async (spendingId: string) => {
  const doc = await db.get(spendingId);
  if (doc.kind === 'spending') {
    db.remove(doc);
  }
};

export const createIndex = () =>
  db.createIndex({
    index: { fields: ['createdAt', 'kind', 'monthid'] },
  });

export const getMonths = async (): Promise<TMonth[]> => {
  const result = await db.find({
    selector: {
      kind: 'month',
    },
  });

  return result.docs.map((doc) => doc.data) as TMonth[];
};

export const getSpendings = async (monthId: number): Promise<TSpending[]> => {
  const result = await db.find({
    selector: {
      kind: 'spending',
      monthId,
    },
  });

  return result.docs.map((doc) => doc.data) as TSpending[];
};

export const createNewMonth = (): TMonth => ({
  startedAt: new Date(),
  id: uuid(),
});
