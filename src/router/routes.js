import URL from '@/shared/constants/URL';

export default [
  {
    path: URL.PAGE.SPLASH,
    name: 'splash',
    component: () => import('@/pages/etc/SplashPage.vue'),
    meta: { navBar: false },
  },
  {
    path: URL.PAGE.ONBOARDING,
    name: 'onboarding',
    component: () => import('@/pages/etc/OnboardingPage.vue'),
    meta: { navBar: false },
  },
  {
    path: URL.PAGE.LOGIN,
    name: 'login',
    component: () => import('@/pages/user/LoginPage.vue'),
    meta: { navBar: false },
  },
  {
    path: URL.PAGE.SIGNUP,
    name: 'signup',
    component: () => import('@/pages/user/SignUpPage.vue'),
    meta: { navBar: false },
  },
  {
    path: URL.PAGE.MAIN,
    name: 'main',
    component: () => import('@/pages/etc/MainPage.vue'),
    meta: { exchangeHeader: true },
  },
  {
    path: URL.PAGE.MAP,
    name: 'map',
    component: () => import('@/pages/map/MapPage.vue'),
    meta: { headerKey: 'common.header.map' },
  },
  {
    path: URL.PAGE.HISTORY,
    name: 'history',
    component: () => import('@/pages/transaction/HistoryPage.vue'),
    meta: { headerKey: 'common.header.history' },
  },
  {
    path: URL.PAGE.CHARGE,
    name: 'charge',
    component: () => import('@/pages/transaction/ChargePage.vue'),
    meta: { headerKey: 'common.header.charge' },
  },
  {
    path: URL.PAGE.ACCOUNT,
    name: 'account',
    component: () => import('@/pages/user/AccountPage.vue'),
    meta: { headerKey: 'common.header.account', customBack: true },
  },

  {
    path: URL.PAGE.REMIT_SELECT,
    name: 'remit-select',
    component: () => import('@/pages/transaction/RemitSelectPage.vue'),
    meta: { headerKey: 'common.header.remit' },
  },
  {
    path: URL.PAGE.REMIT_INPUT,
    name: 'remit-input',
    component: () => import('@/pages/transaction/RemitInputPage.vue'),
    meta: { headerKey: 'common.header.remit' },
  },
  {
    path: URL.PAGE.REMIT_AMOUNT,
    name: 'remit-amount',
    component: () => import('@/pages/transaction/RemitAmountPage.vue'),
    meta: { headerKey: 'common.header.remit' },
  },
  {
    path: URL.PAGE.REMIT_COMPLETE,
    name: 'remit-complete',
    component: () => import('@/pages/transaction/RemitCompletePage.vue'),
    meta: { headerKey: 'common.header.remit' },
  },
  {
    path: URL.PAGE.RECOMMENDATION,
    name: 'recommendation',
    component: () => import('@/pages/recommendation/RecommendationPage.vue'),
    meta: { headerKey: 'common.header.recommendation' },
  },
  {
    path: URL.PAGE.MYPAGE,
    name: 'mypage',
    component: () => import('@/pages/user/MyPage.vue'),
    meta: { headerKey: 'common.header.mypage' },
  },
  {
    path: URL.PAGE.GROUP,
    name: 'group',
    component: () => import('@/pages/groupRemit/GroupPage.vue'),
    meta: { headerKey: 'common.header.group', bgColor: true, customBack: true },
  },
  {
    path: URL.PAGE.GROUP_SIGNUP,
    name: 'group-signup',
    component: () => import('@/pages/groupRemit/GroupSignupPage.vue'),
    meta: { headerKey: 'common.header.groupSignup' },
  },
  {
    path: URL.PAGE.GROUP_COMPLETE,
    name: 'group-complete',
    component: () => import('@/pages/groupRemit/GroupCompletePage.vue'),
    meta: { headerKey: 'common.header.groupSignup' },
  },
  {
    path: URL.PAGE.EXCHANGE_CHECK,
    name: 'exchange-check',
    component: () => import('@/pages/exchange/ExchangeCheckPage.vue'),
    meta: { headerKey: 'common.header.exchangeCheck' },
  },
  {
    path: URL.PAGE.EXCHANGE_RESULT,
    name: 'exchange-result',
    component: () => import('@/pages/exchange/ExchangeResultPage.vue'),
    meta: { headerKey: 'common.header.exchangeCheck' },
  },
  {
    path: URL.PAGE.LOADING,
    name: 'loading',
    component: () => import('@/pages/etc/LoadingPage.vue'),
    meta: { navBar: false },
  },
  {
    path: URL.PAGE.COMING,
    name: 'coming',
    component: () => import('@/pages/etc/ComingPage.vue'),
    meta: { headerKey: 'common.header.back' },
  },
  {
    path: URL.PAGE.TEST,
    name: 'test',
    component: () => import('@/pages/etc/TestPage.vue'),
    meta: { headerKey: 'common.header.test' },
  },
  {
    path: URL.PAGE.DUTCH,
    name: 'dutch',
    component: () => import('@/pages/etc/ComingPage.vue'),
    meta: { headerKey: 'common.header.back' },
  },
];
