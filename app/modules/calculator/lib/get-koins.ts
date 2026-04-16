export const getKoins = (
  amount: number,
  isCompra: boolean,
  rate: number,
): number => {
  if (!amount || !rate) return 0;
  return isCompra ? Math.floor(amount) : Math.floor(amount / rate);
};
