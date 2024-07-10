export default defineNuxtRouteMiddleware((to) => {
  const userStore = useUserStore();

  if (!to.path.includes("/login")) {
    if (!userStore.checkAuth()) return navigateTo("/login");
  }
});
