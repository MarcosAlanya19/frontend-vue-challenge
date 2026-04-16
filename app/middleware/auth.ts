import { ROUTES } from "~/constants/routes";

export default defineNuxtRouteMiddleware(() => {
  const { isAuthenticated } = useAuthStore();
  if (!isAuthenticated) {
    return navigateTo(ROUTES.login, { replace: true });
  }
});
