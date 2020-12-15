export type TSpending = {
  id: string;
  name: string;
  amount: number;
};

export type TMonth = {
  id: string;
  startedAt: Date;
  endedAt?: Date;
};
