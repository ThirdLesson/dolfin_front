import { Banks, Icons, Flags } from '@/asset/images';
import URL from './URL';

export const accountBankOptions = [
  { label: 'options.banks.cu', value: 'cu', src: Banks.cu },
  { label: 'options.banks.post', value: 'post', src: Banks.post },
  { label: 'options.banks.jeonbuk', value: 'jeonbuk', src: Banks.gwangju },
  { label: 'options.banks.mg', value: 'mg', src: Banks.mg },
  { label: 'options.banks.sc', value: 'sc', src: Banks.sc },
  { label: 'options.banks.kb', value: 'kb', src: Banks.kb },
  { label: 'options.banks.woori', value: 'woori', src: Banks.woori },
  { label: 'options.banks.hana', value: 'hana', src: Banks.hana },
  { label: 'options.banks.kdb', value: 'kdb', src: Banks.kdb },
  { label: 'options.banks.busan', value: 'busan', src: Banks.busan },
  { label: 'options.banks.gwangju', value: 'gwangju', src: Banks.gwangju },
  { label: 'options.banks.im', value: 'im', src: Banks.im },
  { label: 'options.banks.shinhan', value: 'shinhan', src: Banks.shinhan },
  { label: 'options.banks.nh', value: 'nh', src: Banks.nh },
  { label: 'options.banks.k', value: 'k', src: Banks.k },
  { label: 'options.banks.city', value: 'city', src: Banks.city },
  { label: 'options.banks.sh', value: 'sh', src: Banks.sh },
  { label: 'options.banks.ibk', value: 'ibk', src: Banks.ibk },
  { label: 'options.banks.dgb', value: 'dgb', src: Banks.dgb },
];

export const transferBankOptions = [
  { label: 'options.banks.cu', value: 'cu', src: Banks.cu },
  { label: 'options.banks.post', value: 'post', src: Banks.post },
  { label: 'options.banks.jeonbuk', value: 'jeonbuk', src: Banks.gwangju },
  { label: 'options.banks.mg', value: 'mg', src: Banks.mg },
  { label: 'options.banks.sc', value: 'sc', src: Banks.sc },
  { label: 'options.banks.kb', value: 'kb', src: Banks.kb },
  { label: 'options.banks.woori', value: 'woori', src: Banks.woori },
  { label: 'options.banks.hana', value: 'hana', src: Banks.hana },
  { label: 'options.banks.kdb', value: 'kdb', src: Banks.kdb },
  { label: 'options.banks.toss', value: 'toss', src: Banks.toss },
  { label: 'options.banks.busan', value: 'busan', src: Banks.busan },
  { label: 'options.banks.gwangju', value: 'gwangju', src: Banks.gwangju },
  { label: 'options.banks.im', value: 'im', src: Banks.im },
  { label: 'options.banks.shinhan', value: 'shinhan', src: Banks.shinhan },
  { label: 'options.banks.nh', value: 'nh', src: Banks.nh },
  { label: 'options.banks.kakao', value: 'kakao', src: Banks.kakao },
  { label: 'options.banks.k', value: 'k', src: Banks.k },
  { label: 'options.banks.city', value: 'city', src: Banks.city },
  { label: 'options.banks.sh', value: 'sh', src: Banks.sh },
  { label: 'options.banks.ibk', value: 'ibk', src: Banks.ibk },
  { label: 'options.banks.dgb', value: 'dgb', src: Banks.dgb },
];

export const currencyOptions = [
  { value: 'USD', label: 'USD' },
  { value: 'JPY', label: 'JPY' },
  { value: 'EUR', label: 'EUR' },
  { value: 'GBP', label: 'GBP' },
  { value: 'CAD', label: 'CAD' },
  { value: 'KRW', label: 'KRW' },
  { value: 'HKD', label: 'HKD' },
  { value: 'CNY', label: 'CNY' },
  { value: 'THB', label: 'THB' },
  { value: 'IDR', label: 'IDR' },
  { value: 'VND', label: 'VND' },
  { value: 'RUB', label: 'RUB' },
  { value: 'BDT', label: 'BDT' },
  { value: 'MYR', label: 'MYR' },
];

export const currencyImgOptions = [
  {
    value: 'USD',
    label: 'US Dollar (USD)',
    src: Flags.usa,
  },
  {
    value: 'JPY',
    label: 'Japanese Yen (JPY)',
    src: Flags.japan,
  },
  {
    value: 'EUR',
    label: 'Euro (EUR)',
    src: Flags.eu,
  },
  {
    value: 'GBP',
    label: 'British Pound (GBP)',
    src: Flags.uk,
  },
  {
    value: 'CAD',
    label: 'Canadian Dollar (CAD)',
    src: Flags.canada,
  },
  {
    value: 'HKD',
    label: 'Hong Kong Dollar (HKD)',
    src: Flags.hongkong,
  },
  {
    value: 'CNY',
    label: 'Chinese Yuan (CNY)',
    src: Flags.china,
  },
  {
    value: 'THB',
    label: 'Thai Baht (THB)',
    src: Flags.thailand,
  },
  {
    value: 'IDR',
    label: 'Indonesian Rupiah (IDR)',
    src: Flags.indonesia,
  },
  {
    value: 'VND',
    label: 'Vietnamese Dong (VND)',
    src: Flags.vietnam,
  },
  {
    value: 'RUB',
    label: 'Russian Ruble (RUB)',
    src: Flags.russia,
  },
  {
    value: 'MYR',
    label: 'Malaysian Ringgit (MYR)',
    src: Flags.malaysia,
  },
];

export const exchangeOptions = [
  { value: 'GETCASH', label: 'options.exchange.getCash' },
  { value: 'SELLCASH', label: 'options.exchange.sellCash' },
  { value: 'SEND', label: 'options.exchange.send' },
  { value: 'RECEIVE', label: 'options.exchange.receive' },
  { value: 'BASE', label: 'options.exchange.baseRate' },
];

export const remitOptions = [
  { label: 'options.remit.accountNumber', value: 'account' },
  { label: 'options.remit.phoneNumber', value: 'tel' },
];

export const countryOptions = [
  { value: 'RUSSIA', label: 'options.countries.russia' },
  { value: 'MONGOLIA', label: 'options.countries.mongolia' },
  { value: 'USA', label: 'options.countries.usa' },
  { value: 'VIETNAM', label: 'options.countries.vietnam' },
  { value: 'INDIA', label: 'options.countries.india' },
  { value: 'INDONESIA', label: 'options.countries.indonesia' },
  { value: 'JAPAN', label: 'options.countries.japan' },
  { value: 'CHINA', label: 'options.countries.china' },
  { value: 'THAILAND', label: 'options.countries.thailand' },
  { value: 'PHILIPPINES', label: 'options.countries.philippines' },
  { value: 'KOREAN_RUSSIAN', label: 'options.countries.koreanRussian' },
  { value: 'KOREAN_CHINESE', label: 'options.countries.koreanChinese' },
  { value: 'OTHER', label: 'options.countries.other' },
];

export const navBarOptions = [
  {
    value: 'main',
    label: 'options.nav.main',
    src: Icons.main,
    activeSrc: Icons.mainActive,
    href: URL.PAGE.MAIN,
  },
  {
    value: 'exchange',
    label: 'options.nav.exchange',
    src: Icons.exchange,
    activeSrc: Icons.exchangeActive,
    href: URL.PAGE.EXCHANGE_CHECK,
  },
  {
    value: 'map',
    label: 'options.nav.map',
    src: Icons.map,
    activeSrc: Icons.mapActive,
    href: URL.PAGE.MAP,
  },
  {
    value: 'groupRemittance',
    label: 'options.nav.groupRemittance',
    src: Icons.remit,
    activeSrc: Icons.remitActive,
    href: URL.PAGE.GROUP,
  },
];

export const historyPeriodOptions = [
  { value: 'ONE_WEEK', label: 'options.history.period.oneWeek' },
  { value: 'ONE_MONTH', label: 'options.history.period.oneMonth' },
  { value: 'THREE_MONTH', label: 'options.history.period.threeMonth' },
  { value: 'SIX_MONTH', label: 'options.history.period.sixMonth' },
];

export const productPeriodOptions = [
  { value: 'SIX_MONTH', label: 'options.productPeriod.sixMonth' },
  { value: 'ONE_YEAR', label: 'options.productPeriod.oneYear' },
  { value: 'TWO_YEAR', label: 'options.productPeriod.twoYear' },
  { value: 'STAY_EXPIRATION', label: 'options.productPeriod.stayExpiration' },
];

export const categoryOptions = [
  { value: 'ALL', label: 'options.history.category.all' },
  { value: 'WITHDRAW', label: 'options.history.category.withdraw' },
  { value: 'DEPOSIT', label: 'options.history.category.deposit' },
  { value: 'CHARGE', label: 'options.history.category.charge' },
];

export const sortOptions = [
  { value: 'LATEST', label: 'options.history.sort.latest' },
  { value: 'OLDEST', label: 'options.history.sort.oldest' },
];

export const depositConditionOptions = [
  { value: 'USING_CARD', label: 'options.conditions.deposit.usingCard' },
  { value: 'FIRST_BANKING', label: 'options.conditions.deposit.firstBanking' },
  { value: 'DEPOSIT_AGAIN', label: 'options.conditions.deposit.depositAgain' },
  { value: 'ONLINE', label: 'options.conditions.deposit.online' },
  {
    value: 'USING_UTILITY_BILL',
    label: 'options.conditions.deposit.utilityBill',
  },
  { value: 'BANK_APP', label: 'options.conditions.deposit.bankApp' },
  {
    value: 'DEPOSIT_ACCOUNT',
    label: 'options.conditions.deposit.depositAccount',
  },
  {
    value: 'USING_SALARY_ACCOUNT',
    label: 'options.conditions.deposit.salaryAccount',
  },
];

export const savingConditionOptions = [
  { value: 'USING_CARD', label: 'options.conditions.saving.usingCard' },
  { value: 'FIRST_BANKING', label: 'options.conditions.saving.firstBanking' },
  { value: 'DEPOSIT_AGAIN', label: 'options.conditions.saving.depositAgain' },
  { value: 'ONLINE', label: 'options.conditions.saving.online' },
  {
    value: 'USING_UTILITY_BILL',
    label: 'options.conditions.saving.utilityBill',
  },
  { value: 'BANK_APP', label: 'options.conditions.saving.bankApp' },
  {
    value: 'DEPOSIT_ACCOUNT',
    label: 'options.conditions.saving.depositAccount',
  },
  {
    value: 'USING_SALARY_ACCOUNT',
    label: 'options.conditions.saving.salaryAccount',
  },
  {
    value: 'HOUSING_SUBSCRIPTION',
    label: 'options.conditions.saving.housingSubscription',
  },
  { value: 'AUTO_DEPOSIT', label: 'options.conditions.saving.autoDeposit' },
  {
    value: 'RECOMMEND_COUPON',
    label: 'options.conditions.saving.recommendCoupon',
  },
  { value: 'ETC', label: 'options.conditions.saving.etc' },
];

export const productOptions = [
  { value: 'DEPOSIT', label: 'options.products.deposit' },
  { value: 'SAVING', label: 'options.products.saving' },
  { value: 'PERSONAL_LOAN', label: 'options.products.personalLoan' },
  { value: 'JEONSE_LOAN', label: 'options.products.jeonseLoan' },
];

export const interestRateOptions = [
  { value: 'MIN_RATE', label: 'options.interestRate.min' },
  { value: 'MAX_RATE', label: 'options.interestRate.max' },
  { value: 'AVG_RATE', label: 'options.interestRate.avg' },
];

export const languageOptions = [
  { label: 'options.languages.ko', value: 'ko' },
  { label: 'options.languages.en', value: 'en' },
  { label: 'options.languages.jp', value: 'jp' },
  { label: 'options.languages.zh', value: 'zh' },
];
