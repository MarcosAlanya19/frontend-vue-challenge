export interface ICalculate {
  rate: number;
  exchange: number;
  tc: { bid: number; ask: number };
  data: { operate: boolean; msg: string };
  savings: { amount: string; currency: string };
}
