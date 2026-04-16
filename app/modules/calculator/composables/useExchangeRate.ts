import { getExchangeRate } from "~/modules/calculator/services/get-exchange-rate.services";
import type { IExchangeRate } from "~/modules/calculator/types/exchange-rate.type";
import type { APIError } from "~/types";
import { useErrorStore } from "~/stores/error";

export const useExchangeRate = () => {
  const errorStore = useErrorStore();
  const data = ref<IExchangeRate | null>(null);
  const isLoading = ref(false);

  const handle = async (): Promise<void> => {
    isLoading.value = true;
    try {
      const response = await getExchangeRate();
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
          title: "Error de conexión",
          message: "No se pudo obtener el tipo de cambio. Intenta nuevamente.",
        });
      }
      data.value = null;
    } finally {
      isLoading.value = false;
    }
  };

  return { data, isLoading, handle };
};
