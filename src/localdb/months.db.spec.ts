import subDays from 'date-fns/subDays';
import addDays from 'date-fns/addDays';
import { TMonth } from '../types';
import {
  db,
  createIndex,
  addMonth,
  updateMonth,
  removeMonth,
  getMonths,
} from './months.db';

const origo = new Date('2021-01-08');

describe('months', () => {
  const months: TMonth[] = [
    subDays(origo, 2),
    subDays(origo, 1),
    subDays(origo, 3),
  ].map((d, i) => ({
    startedAt: d,
    id: `id_${i}`,
  }));

  beforeAll(async () => {
    await createIndex();
    await addMonth(months[0]);
    await addMonth(months[1]);
    await addMonth(months[2]);
  });

  it('can be find months', async () => {
    const dbMonths = await getMonths();
    expect(dbMonths).toMatchInlineSnapshot(`
      Array [
        Object {
          "id": "id_0",
          "startedAt": "2021-01-06T00:00:00.000Z",
        },
        Object {
          "id": "id_1",
          "startedAt": "2021-01-07T00:00:00.000Z",
        },
        Object {
          "id": "id_2",
          "startedAt": "2021-01-05T00:00:00.000Z",
        },
      ]
    `);
  });

  it('can be update months', async () => {
    const dbMonths = await getMonths();
    dbMonths[0].endedAt = addDays(origo, 1);

    await updateMonth(dbMonths[0]);
    const updated: TMonth = await db.get(dbMonths[0].id);

    expect(updated).toMatchInlineSnapshot(`
      Object {
        "_id": "id_0",
        "_rev": "2-fd5c63cbd9cf7b1f2eff8e771322958c",
        "createdAt": "2021-01-06T00:00:00.000Z",
        "data": Object {
          "endedAt": "2021-01-09T00:00:00.000Z",
          "id": "id_0",
          "startedAt": "2021-01-06T00:00:00.000Z",
        },
        "kind": "month",
      }
    `);
  });

  it('can de remove months', async () => {
    const dbMonths = await getMonths();
    await removeMonth(dbMonths[0].id);
    expect(await getMonths()).toMatchInlineSnapshot(`
      Array [
        Object {
          "id": "id_1",
          "startedAt": "2021-01-07T00:00:00.000Z",
        },
        Object {
          "id": "id_2",
          "startedAt": "2021-01-05T00:00:00.000Z",
        },
      ]
    `);
  });
});
