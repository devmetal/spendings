export type TSpending = {
  id: string;
  name: string;
  amount: number;
  createdAt?: Date;
};

export type TMonth = {
  id: string;
  startedAt: Date;
  endedAt?: Date;
};
