import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';
import { useUserStore } from '@/entities/user/user.store';
import URL from '@/shared/constants/URL';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();

  const publicPages = [
    URL.PAGE.LOGIN,
    URL.PAGE.SIGNUP,
    URL.PAGE.SPLASH,
    URL.PAGE.ONBOARDING,
    URL.PAGE.COMING,
  ];
  const authRequired = !publicPages.includes(to.path);

  const hasToken = !!localStorage.getItem('accessToken');
  const isLoggedIn = userStore.isLoggedIn || hasToken;

  if (!isLoggedIn && authRequired) {
    next(URL.PAGE.LOGIN);
  } else if (isLoggedIn && to.path === URL.PAGE.LOGIN) {
    next(URL.PAGE.MAIN);
  } else {
    next();
  }
});

export default router;
