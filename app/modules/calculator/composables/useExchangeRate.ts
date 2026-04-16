import { getExchangeRate } from "~/modules/calculator/services/get-exchange-rate.services";
import type { IExchangeRate } from "~/modules/calculator/types/exchange-rate.type";

export const useExchangeRate = () => {
  const data = ref<IExchangeRate | null>(null);
  const isLoading = ref(false);

  const handle = async (): Promise<void> => {
    isLoading.value = true;
    try {
      const response = await getExchangeRate();
      data.value = response.data;
    } catch {
      data.value = null;
    } finally {
      isLoading.value = false;
    }
  };

  return { data, isLoading, handle };
};
