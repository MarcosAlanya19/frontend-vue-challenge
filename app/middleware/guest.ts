export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore();

  if (import.meta.client && authStore.isAuthenticated) {
    if (to.path !== "/") {
      return navigateTo("/", { replace: true });
    }
  }
});
