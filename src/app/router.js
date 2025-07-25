import { createRouter, createWebHistory } from 'vue-router';
import URL from '@/shared/constants/URL';
import LoginPage from '@/pages/LoginPage.vue';
import SignUpPage from '@/pages/SignUpPage.vue';
import MainPage from '@/pages/MainPage.vue';
import TestPage from '@/pages/TestPage.vue';
import MapPage from '@/pages/MapPage.vue';
import ExchangeCheckPage from '@/pages/ExchangeCheckPage.vue';
import GroupRemitPage from '@/pages/GroupRemitPage.vue';
import LoadingPage from '@/pages/LoadingPage.vue';
import ComingPage from '@/pages/ComingPage.vue';
import RecommendationPage from '@/pages/RecommendationPage.vue';
import TransactionPage from '@/pages/TransactionPage.vue';
import ChargePage from '@/pages/ChargePage.vue';
import RemitPage from '@/pages/RemitPage.vue';
import AccountPage from '@/pages/AccountPage.vue';
import MyPage from '@/pages/MyPage.vue';
import ExchangeCalculatorPage from '@/pages/ExchangeCalculatorPage.vue';

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
      meta: { exchangeHeader: true },
    },
    {
      path: URL.PAGE.MAP,
      name: 'map',
      component: MapPage,
      meta: { header: '스마트맵' },
    },
    {
      path: URL.PAGE.TRANSACTION,
      name: 'transaction',
      component: TransactionPage,
      meta: { header: '거래내역' },
    },
    {
      path: URL.PAGE.CHARGE,
      name: 'charge',
      component: ChargePage,
      meta: { header: '충전' },
    },
    {
      path: URL.PAGE.REMIT,
      name: 'remit',
      component: RemitPage,
      meta: { header: '송금' },
    },
    {
      path: URL.PAGE.ACCOUNT,
      name: 'account',
      component: AccountPage,
      meta: { header: '계좌등록' },
    },
    {
      path: URL.PAGE.RECOMMENDATION,
      name: 'recommendation',
      component: RecommendationPage,
      meta: { header: '상품추천' },
    },
    {
      path: URL.PAGE.MYPAGE,
      name: 'mypage',
      component: MyPage,
      meta: { header: '마이페이지' },
    },
    {
      path: URL.PAGE.GROUP_REMIT,
      name: 'group-remit',
      component: GroupRemitPage,
      meta: { header: '공동 송금' },
    },
    {
      path: URL.PAGE.EXCHANGE_CHECK,
      name: 'exchange-check',
      component: ExchangeCheckPage,
      meta: { header: '환율 조회' },
    },
    {
      path: URL.PAGE.EXCHANGE_CALCULATOR,
      name: 'exchange-calculator',
      component: ExchangeCalculatorPage,
      meta: { header: '환율 계산' },
    },
    {
      path: URL.PAGE.LOADING,
      name: 'loading',
      component: LoadingPage,
      meta: { navBar: false },
    },
    {
      path: URL.PAGE.COMING,
      name: 'coming',
      component: ComingPage,
      meta: { header: '뒤로가기' },
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
