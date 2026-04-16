import type { IAuthUser } from "~/modules/auth/types/auth-user.type";
import type { ILoginPayload } from "~/modules/auth/types/login-payload.type";
import { login } from "~/modules/auth/services/login.services";

export const useLogin = () => {
  const authStore = useAuthStore();
  const data = ref<IAuthUser | null>(null);
  const isLoading = ref(false);

  const handle = async (payload: ILoginPayload): Promise<void> => {
    isLoading.value = true;
    try {
      const user = login({ payload });
      data.value = user;
      if (user) authStore.setUser(user);
    } finally {
      isLoading.value = false;
    }
  };

  return { data, isLoading, handle };
};
