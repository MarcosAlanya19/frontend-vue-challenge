import { api } from "~/lib/api";
import type { IExchangeRate } from "~/modules/calculator/types/exchange-rate.type";

export const getExchangeRate = () =>
  api.get<IExchangeRate>("/exchange/kambista/current");
