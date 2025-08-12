import URL from '@/shared/constants/URL';

import SplashPage from '@/pages/etc/SplashPage.vue';
import OnboardingPage from '@/pages/etc/OnboardingPage.vue';
import LoginPage from '@/pages/user/LoginPage.vue';
import SignUpPage from '@/pages/user/SignUpPage.vue';
import MainPage from '@/pages/etc/MainPage.vue';
import TestPage from '@/pages/etc/TestPage.vue';
import MapPage from '@/pages/map/MapPage.vue';
import ExchangeCheckPage from '@/pages/exchange/ExchangeCheckPage.vue';
import GroupPage from '@/pages/groupRemit/GroupPage.vue';
import GroupSignupPage from '@/pages/groupRemit/GroupSignupPage.vue';
import GroupCompletePage from '@/pages/groupRemit/GroupCompletePage.vue';
import LoadingPage from '@/pages/etc/LoadingPage.vue';
import ComingPage from '@/pages/etc/ComingPage.vue';
import RecommendationPage from '@/pages/recommendation/RecommendationPage.vue';
import HistoryPage from '@/pages/transaction/HistoryPage.vue';
import ChargePage from '@/pages/transaction/ChargePage.vue';
import AccountPage from '@/pages/user/AccountPage.vue';
import MyPage from '@/pages/user/MyPage.vue';
import ExchangeResultPage from '@/pages/exchange/ExchangeResultPage.vue';
import RemitSelectPage from '@/pages/transaction/RemitSelectPage.vue';
import RemitInputPage from '@/pages/transaction/RemitInputPage.vue';
import RemitAmountPage from '@/pages/transaction/RemitAmountPage.vue';
import RemitCompletePage from '@/pages/transaction/RemitCompletePage.vue';

export default [
  {
    path: URL.PAGE.SPLASH,
    name: 'splash',
    component: SplashPage,
    meta: { navBar: false },
  },
  {
    path: URL.PAGE.ONBOARDING,
    name: 'onboarding',
    component: OnboardingPage,
    meta: { navBar: false },
  },
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
    meta: { headerKey: 'common.header.map' },
  },
  {
    path: URL.PAGE.HISTORY,
    name: 'history',
    component: HistoryPage,
    meta: { headerKey: 'common.header.history' },
  },
  {
    path: URL.PAGE.CHARGE,
    name: 'charge',
    component: ChargePage,
    meta: { headerKey: 'common.header.charge' },
  },

  {
    path: URL.PAGE.ACCOUNT,
    name: 'account',
    component: AccountPage,
    meta: { headerKey: 'common.header.account', customBack: true },
  },

  {
    path: URL.PAGE.REMIT_SELECT,
    name: 'remit-select',
    component: RemitSelectPage,
    meta: { headerKey: 'common.header.remit' },
  },
  {
    path: URL.PAGE.REMIT_INPUT,
    name: 'remit-input',
    component: RemitInputPage,
    meta: { headerKey: 'common.header.remit' },
  },
  {
    path: URL.PAGE.REMIT_AMOUNT,
    name: 'remit-amount',
    component: RemitAmountPage,
    meta: { headerKey: 'common.header.remit' },
  },
  {
    path: URL.PAGE.REMIT_COMPLETE,
    name: 'remit-complete',
    component: RemitCompletePage,
    meta: { headerKey: 'common.header.remit' },
  },

  {
    path: URL.PAGE.RECOMMENDATION,
    name: 'recommendation',
    component: RecommendationPage,
    meta: { headerKey: 'common.header.recommendation' },
  },
  {
    path: URL.PAGE.MYPAGE,
    name: 'mypage',
    component: MyPage,
    meta: { headerKey: 'common.header.mypage' },
  },

  {
    path: URL.PAGE.GROUP,
    name: 'group',
    component: GroupPage,
    meta: { headerKey: 'common.header.group', bgColor: true, customBack: true },
  },
  {
    path: URL.PAGE.GROUP_SIGNUP,
    name: 'group-signup',
    component: GroupSignupPage,
    meta: { headerKey: 'common.header.groupSignup' },
  },
  {
    path: URL.PAGE.GROUP_COMPLETE,
    name: 'group-complete',
    component: GroupCompletePage,
    meta: { headerKey: 'common.header.groupSignup' },
  },

  {
    path: URL.PAGE.EXCHANGE_CHECK,
    name: 'exchange-check',
    component: ExchangeCheckPage,
    meta: { headerKey: 'common.header.exchangeCheck' },
  },
  {
    path: URL.PAGE.EXCHANGE_RESULT,
    name: 'exchange-result',
    component: ExchangeResultPage,
    meta: { headerKey: 'common.header.exchangeCheck' },
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
    meta: { headerKey: 'common.header.back' },
  },
  {
    path: URL.PAGE.TEST,
    name: 'test',
    component: TestPage,
    meta: { headerKey: 'common.header.test' },
  },
  {
    path: URL.PAGE.DUTCH,
    name: 'dutch',
    component: ComingPage,
    meta: { headerKey: 'common.header.back' },
  },
];
