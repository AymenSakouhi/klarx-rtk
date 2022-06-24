export interface Data {
  query: {
    from: string;
    to: string;
    amount: number;
  };
  info: {
    rate: number;
  };
}
