import { createRouter, createWebHistory } from 'vue-router';
import URL from '@/shared/constants/URL';
import LoginPage from '@/pages/LoginPage.vue';
import SignUpPage from '@/pages/SignUpPage.vue';
import MainPage from '@/pages/MainPage.vue';
import TestPage from '@/pages/TestPage.vue';
import MapPage from '@/pages/MapPage.vue';
import ExchangeRateCheckPage from '@/pages/ExchangeRateCheckPage.vue';
import GroupRemitPage from '@/pages/GroupRemitPage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: URL.PAGE.LOGIN,
      name: 'login',
      component: LoginPage,
      meta: { navBar: false },
    },
    {
      path: URL.PAGE.SIGNUP,
      name: 'signup',
      component: SignUpPage,
      meta: { navBar: false },
    },
    {
      path: URL.PAGE.MAIN,
      name: 'main',
      component: MainPage,
    },
    {
      path: URL.PAGE.MAP,
      name: 'map',
      component: MapPage,
      meta: { header: '스마트맵' },
    },
    {
      path: URL.PAGE.EXCHANGE_RATE_CHECK,
      name: 'exchange-rate-check',
      component: ExchangeRateCheckPage,
      meta: { header: '환율 조회' },
    },
    {
      path: URL.PAGE.GROUP_REMITTANCE,
      name: 'group-remit',
      component: GroupRemitPage,
      meta: { header: '공동 송금' },
    },
    {
      path: URL.PAGE.TEST,
      name: 'test',
      component: TestPage,
      meta: { header: '테스트' },
    },
  ],
});

export default router;
