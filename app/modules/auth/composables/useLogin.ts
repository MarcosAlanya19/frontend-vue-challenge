import type { IAuthUser } from "~/modules/auth/types/auth-user.type";
import type { ILoginPayload } from "~/modules/auth/types/login-payload.type";
import type { APIError } from "~/types";
import { useErrorStore } from "~/stores/error";
import { login } from "~/modules/auth/services/login.services";

export const useLogin = () => {
  const authStore = useAuthStore();
  const errorStore = useErrorStore();
  const data = ref<IAuthUser | null>(null);
  const isLoading = ref(false);

  const handle = async (payload: ILoginPayload): Promise<void> => {
    isLoading.value = true;
    try {
      const user = login({ payload });
      data.value = user;
      authStore.setUser(user);
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
