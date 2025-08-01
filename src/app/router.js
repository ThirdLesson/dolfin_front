import { createRouter, createWebHistory } from 'vue-router';
import URL from '@/shared/constants/URL';
import LoginPage from '@/pages/user/LoginPage.vue';
import SignUpPage from '@/pages/user/SignUpPage.vue';
import MainPage from '@/pages/etc/MainPage.vue';
import TestPage from '@/pages/etc/TestPage.vue';
import MapPage from '@/pages/map/MapPage.vue';
import ExchangeCheckPage from '@/pages/exchange/ExchangeCheckPage.vue';
import GroupRemitPage from '@/pages/groupRemit/GroupRemitPage.vue';
import LoadingPage from '@/pages/etc/LoadingPage.vue';
import ComingPage from '@/pages/etc/ComingPage.vue';
import RecommendationPage from '@/pages/recommendation/RecommendationPage.vue';
import HistoryPage from '@/pages/transaction/HistoryPage.vue';
import ChargePage from '@/pages/transaction/ChargePage.vue';
import AccountPage from '@/pages/user/AccountPage.vue';
import MyPage from '@/pages/user/MyPage.vue';
import ExchangeCalculatorPage from '@/pages/exchange/ExchangeCalculatorPage.vue';
import ExchangeResultPage from '@/pages/exchange/ExchangeResultPage.vue';
import RemitSelectPage from '@/pages/transaction/RemitSelectPage.vue';
import RemitInputPage from '@/pages/transaction/RemitInputPage.vue';
import RemitAmountPage from '@/pages/transaction/RemitAmountPage.vue';
import RemitCompletePage from '@/pages/transaction/RemitCompletePage.vue';

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
      path: URL.PAGE.HISTORY,
      name: 'history',
      component: HistoryPage,
      meta: { header: '거래내역' },
    },
    {
      path: URL.PAGE.CHARGE,
      name: 'charge',
      component: ChargePage,
      meta: { header: '충전하기' },
    },
    {
      path: URL.PAGE.ACCOUNT,
      name: 'account',
      component: AccountPage,
      meta: {
        header: '계좌등록',
        customBack: true,
      },
    },
    {
      path: URL.PAGE.REMIT_SELECT,
      name: 'remit-select',
      component: RemitSelectPage,
      meta: { header: '송금하기' },
    },
    {
      path: URL.PAGE.REMIT_INPUT,
      name: 'remit-input',
      component: RemitInputPage,
      meta: { header: '송금하기' },
    },
    {
      path: URL.PAGE.REMIT_AMOUNT,
      name: 'remit-amount',
      component: RemitAmountPage,
      meta: { header: '송금하기' },
    },
    {
      path: URL.PAGE.REMIT_COMPLETE,
      name: 'remit-complete',
      component: RemitCompletePage,
      meta: { header: '송금하기' },
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
      path: URL.PAGE.EXCHANGE_RESULT,
      name: 'exchange-result',
      component: ExchangeResultPage,
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
    {
      path: URL.PAGE.DUTCH,
      name: 'dutch',
      component: ComingPage,
      meta: { header: '뒤로가기' },
    },
  ],
});

export default router;
