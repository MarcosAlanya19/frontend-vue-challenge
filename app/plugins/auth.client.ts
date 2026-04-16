import { restoreSession } from "~/modules/auth/services/restore-session.services";

export default defineNuxtPlugin(() => {
  const authStore = useAuthStore();
  const session = restoreSession();
  if (session) {
    authStore.setUser(session);
  }
});
