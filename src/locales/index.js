import koMyPage from '@/locales/ko/user/myPage.json';
import koCommon from '@/locales/ko/etc/common.json';
import koMainPage from '@/locales/ko/etc/mainPage.json';
import koHistory from '@/locales/ko/transaction/history.json';
import koGroupRemit from '@/locales/ko/groupRemit/groupRemit.json';
import koCharge from '@/locales/ko/transaction/charge.json';
import koRemit from '@/locales/ko/transaction/remit.json';
import koOptions from '@/locales/ko/etc/options.json';
import koOnboarding from '@/locales/ko/etc/onboarding.json';
import koExchange from '@/locales/ko/exchange/exchange.json';
import koMap from '@/locales/ko/map/map.json';
import koRecommendation from '@/locales/ko/recommendation/recommendation.json';
import koLogin from '@/locales/ko/user/login.json';
import koSignUp from '@/locales/ko/user/signUp.json';
import koAccount from '@/locales/ko/user/account.json';

import enMyPage from '@/locales/en/user/myPage.json';
import enCommon from '@/locales/en/etc/common.json';
import enMainPage from '@/locales/en/etc/mainPage.json';
import enHistory from '@/locales/en/transaction/history.json';
import enGroupRemit from '@/locales/en/groupRemit/groupRemit.json';
import enCharge from '@/locales/en/transaction/charge.json';
import enRemit from '@/locales/en/transaction/remit.json';
import enOptions from '@/locales/en/etc/options.json';
import enOnboarding from '@/locales/en/etc/onboarding.json';
import enExchange from '@/locales/en/exchange/exchange.json';
import enMap from '@/locales/en/map/map.json';
import enRecommendation from '@/locales/en/recommendation/recommendation.json';
import enLogin from '@/locales/en/user/login.json';
import enSignUp from '@/locales/en/user/signUp.json';
import enAccount from '@/locales/en/user/account.json';

import jpMyPage from '@/locales/jp/user/myPage.json';
import jpCommon from '@/locales/jp/etc/common.json';
import jpMainPage from '@/locales/jp/etc/mainPage.json';
import jpHistory from '@/locales/jp/transaction/history.json';
import jpGroupRemit from '@/locales/jp/groupRemit/groupRemit.json';
import jpCharge from '@/locales/jp/transaction/charge.json';
import jpRemit from '@/locales/jp/transaction/remit.json';
import jpOptions from '@/locales/jp/etc/options.json';
import jpOnboarding from '@/locales/jp/etc/onboarding.json';
import jpExchange from '@/locales/jp/exchange/exchange.json';
import jpMap from '@/locales/jp/map/map.json';
import jpRecommendation from '@/locales/jp/recommendation/recommendation.json';
import jpLogin from '@/locales/jp/user/login.json';
import jpSignUp from '@/locales/jp/user/signUp.json';
import jpAccount from '@/locales/jp/user/account.json';

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
  jp: {
    common: jpCommon,
    mypage: jpMyPage,
    mainpage: jpMainPage,
    history: jpHistory,
    ...jpGroupRemit,
    ...jpCharge,
    ...jpRemit,
    ...jpOptions,
    ...jpOnboarding,
    ...jpExchange,
    ...jpMap,
    recommendation: jpRecommendation,
    login: jpLogin,
    signup: jpSignUp,
    ...jpAccount,
  },
};
