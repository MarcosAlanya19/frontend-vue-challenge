import { defineStore } from "pinia";
import type { IAuthUser } from "~/modules/auth/types/auth-user.type";
import { saveSession } from "~/modules/auth/services/save-session.services";
import { clearSession } from "~/modules/auth/services/clear-session.services";
import { SESSION_KEY } from "~/modules/auth/constants";

export const useAuthStore = defineStore("auth", () => {
  const sessionCookie = useCookie<IAuthUser | null>(SESSION_KEY, {
    maxAge: 60 * 60 * 24 * 7,
    sameSite: "strict",
    default: () => null,
  });

  const user = ref<IAuthUser | null>(sessionCookie.value);
  const isAuthenticated = computed(() => !!user.value);

  const setUser = (userData: IAuthUser) => {
    user.value = userData;
    sessionCookie.value = userData;
    saveSession(userData);
  };

  const logout = () => {
    user.value = null;
    sessionCookie.value = null;
    clearSession();
  };

  return {
    user,
    isAuthenticated,
    setUser,
    logout,
  };
});
