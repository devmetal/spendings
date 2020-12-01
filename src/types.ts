export type TSpending = {
  id: number;
  name: string;
  amount: number;
};

export type TMonth = {
  id: string;
  num: number;
  startedAt: Date;
  endedAt?: Date;
  spendings: TSpending[];
};
