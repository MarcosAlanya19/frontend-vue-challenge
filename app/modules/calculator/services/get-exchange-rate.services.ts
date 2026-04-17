import type { IExchangeRate } from "~/modules/calculator/types/exchange-rate.type";

export const getExchangeRate = () => {
  const { $api } = useNuxtApp();

  return $api.get<IExchangeRate>("/exchange/kambista/current");
};
