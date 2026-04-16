import { calculateExchange } from "~/modules/calculator/services/calculate-exchange.services";
import type { ICalculate } from "~/modules/calculator/types/calculate.type";
import type { ICalculateParams } from "~/modules/calculator/types/calculate-params.type";
import type { APIError } from "~/types";
import { useErrorStore } from "~/stores/error";

export const useCalculateExchange = () => {
  const errorStore = useErrorStore();
  const data = ref<ICalculate | null>(null);
  const isLoading = ref(false);

  const handle = async (params: ICalculateParams): Promise<void> => {
    if (!params.amount) return;
    isLoading.value = true;
    try {
      const response = await calculateExchange({ params });
      data.value = response.data;
    } catch (err) {
      const apiError = err as APIError;
      if (apiError?.data) {
        errorStore.setError({
          title: apiError.data.title,
          message: apiError.data.message,
        });
      } else {
        errorStore.setError({
          title: "Error de cálculo",
          message: "No se pudo calcular el cambio. Intenta nuevamente.",
        });
      }
      data.value = null;
    } finally {
      isLoading.value = false;
    }
  };

  return { data, isLoading, handle };
};
