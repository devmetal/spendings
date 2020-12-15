import PouchDb from 'pouchdb';
import { TMonth } from '../types';

const db = new PouchDb('spendings');

export const addMonth = async (month: TMonth) => {
  const doc = await db.put({ ...month, _id: month.id });
  return doc;
};
