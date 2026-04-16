import { register } from "~/modules/onboarding/services/register.services";
import type { IRegisterPayload } from "~/modules/onboarding/types/register-payload.type";
import { useErrorStore } from "~/stores/error";
import type { APIError } from "~/types";

export const useRegister = () => {
  const data = ref<string | null>(null);
  const isLoading = ref(false);
  const errorStore = useErrorStore();

  const handle = async (payload: IRegisterPayload): Promise<void> => {
    isLoading.value = true;
    try {
      data.value = register({ payload });
    } catch (err) {
      const apiError = err as APIError;
      if (apiError?.data) {
        errorStore.setError({
          title: apiError.data.title,
          message: apiError.data.message,
        });
      }
      data.value = null;
    } finally {
      isLoading.value = false;
    }
  };

  return { data, isLoading, handle };
};
