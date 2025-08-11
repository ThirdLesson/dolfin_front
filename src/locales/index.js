import enMyPage from '@/locales/en/user/mypage.json';
import koMyPage from '@/locales/ko/user/mypage.json';
import enCommon from '@/locales/en/etc/common.json';
import koCommon from '@/locales/ko/etc/common.json';
import enMainPage from '@/locales/en/etc/mainPage.json';
import koMainPage from '@/locales/ko/etc/mainPage.json';
import enHistory from '@/locales/en/transaction/history.json';
import koHistory from '@/locales/ko/transaction/history.json';
import enGroupRemit from '@/locales/en/groupRemit/groupRemit.json';
import koGroupRemit from '@/locales/ko/groupRemit/groupRemit.json';
import enCharge from '@/locales/en/transaction/charge.json';
import koCharge from '@/locales/ko/transaction/charge.json';
import enRemit from '@/locales/en/transaction/remit.json';
import koRemit from '@/locales/ko/transaction/remit.json';
import enOptions from '@/locales/en/etc/options.json';
import koOptions from '@/locales/ko/etc/options.json';
import enOnboarding from '@/locales/en/etc/onboarding.json';
import koOnboarding from '@/locales/ko/etc/onboarding.json';
import enExchange from '@/locales/en/exchange/exchange.json';
import koExchange from '@/locales/ko/exchange/exchange.json';
import enMap from '@/locales/en/map/map.json';
import koMap from '@/locales/ko/map/map.json';
import enRecommendation from '@/locales/en/recommendation/recommendation.json';
import koRecommendation from '@/locales/ko/recommendation/recommendation.json';
import enLogin from '@/locales/en/user/login.json';
import koLogin from '@/locales/ko/user/login.json';
import enSignUp from '@/locales/en/user/signUp.json';
import koSignUp from '@/locales/ko/user/signUp.json';
import enAccount from '@/locales/en/user/account.json';
import koAccount from '@/locales/ko/user/account.json';

export default {
  ko: {
    common: koCommon,
    mypage: koMyPage,
    mainpage: koMainPage,
    history: koHistory,
    ...koGroupRemit,
    ...koCharge,
    ...koRemit,
    ...koOptions,
    ...koOnboarding,
    ...koExchange,
    ...koMap,
    recommendation: koRecommendation,
    login: koLogin,
    signup: koSignUp,
    ...koAccount,
  },
  en: {
    common: enCommon,
    mypage: enMyPage,
    mainpage: enMainPage,
    history: enHistory,
    ...enGroupRemit,
    ...enCharge,
    ...enRemit,
    ...enOptions,
    ...enOnboarding,
    ...enExchange,
    ...enMap,
    recommendation: enRecommendation,
    login: enLogin,
    signup: enSignUp,
    ...enAccount,
  },
};
