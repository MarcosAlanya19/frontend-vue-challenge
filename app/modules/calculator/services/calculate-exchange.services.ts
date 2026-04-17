import type { ICalculate } from "~/modules/calculator/types/calculate.type";
import type { ICalculateParams } from "~/modules/calculator/types/calculate-params.type";

interface ICalculateExchange {
  params: ICalculateParams;
}

export const calculateExchange = ({ params }: ICalculateExchange) => {
  const { $api } = useNuxtApp();

  return $api.get<ICalculate>("/exchange/calculates", {
    params: { ...params, active: "S" },
  });
};
