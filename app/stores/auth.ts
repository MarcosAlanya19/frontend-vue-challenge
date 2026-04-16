import { defineStore } from "pinia";
import type { IAuthUser } from "~/modules/auth/types/auth-user.type";
import { saveSession } from "~/modules/auth/services/save-session.services";
import { clearSession } from "~/modules/auth/services/clear-session.services";

export const useAuthStore = defineStore("auth", () => {
  const user = ref<IAuthUser | null>(null);
  const isAuthenticated = computed(() => !!user.value);

  const setUser = (userData: IAuthUser) => {
    user.value = userData;
    saveSession(userData);
  };

  const logout = () => {
    user.value = null;
    clearSession();
  };

  return {
    user,
    isAuthenticated,
    setUser,
    logout,
  };
});
