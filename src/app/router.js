import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '@/pages/MainPage.vue';
import TestPage from '@/pages/TestPage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainPage,
    },
    {
      path: '/test',
      name: 'test',
      component: TestPage,
    },
  ],
});

export default router;
