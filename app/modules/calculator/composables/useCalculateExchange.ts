import { calculateExchange } from "~/modules/calculator/services/calculate-exchange.services";
import type { ICalculate } from "~/modules/calculator/types/calculate.type";
import type { ICalculateParams } from "~/modules/calculator/types/calculate-params.type";

export const useCalculateExchange = () => {
  const data = ref<ICalculate | null>(null);
  const isLoading = ref(false);

  const handle = async (params: ICalculateParams): Promise<void> => {
    if (!params.amount) return;
    isLoading.value = true;
    try {
      const response = await calculateExchange({ params });
      data.value = response.data;
    } catch {
      data.value = null;
    } finally {
      isLoading.value = false;
    }
  };

  return { data, isLoading, handle };
};
