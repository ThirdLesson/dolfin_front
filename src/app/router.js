import { createRouter, createWebHistory } from 'vue-router';
import URL from '@/shared/constants/URL';
import LoginPage from '@/pages/LoginPage.vue';
import MainPage from '@/pages/MainPage.vue';
import TestPage from '@/pages/TestPage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: URL.PAGE.LOGIN,
      name: 'login',
      component: LoginPage,
    },
    {
      path: URL.PAGE.MAIN,
      name: 'main',
      component: MainPage,
    },
    {
      path: URL.PAGE.TEST,
      name: 'test',
      component: TestPage,
    },
  ],
});

export default router;
