import { Banks, Flags, Icons } from '@/asset/images';
import URL from './URL';

export const accountBankOptions = [
  { label: '신협은행', value: '신협은행', src: Banks.cu },
  { label: '우체국예금', value: '우체국예금', src: Banks.post },
  { label: '전북은행', value: '전북은행', src: Banks.gwangju },
  { label: '새마을금고', value: '새마을금고', src: Banks.mg },
  { label: '제일은행', value: '제일은행', src: Banks.sc },
  { label: '국민은행', value: '국민은행', src: Banks.kb },
  { label: '우리은행', value: '우리은행', src: Banks.woori },
  { label: '하나은행', value: '하나은행', src: Banks.hana },
  { label: '산업은행', value: '산업은행', src: Banks.kdb },
  { label: '부산은행', value: '부산은행', src: Banks.busan },
  { label: '광주은행', value: '광주은행', src: Banks.gwangju },
  { label: '아이엠뱅크', value: '아이엠뱅크', src: Banks.im },
  { label: '신한은행', value: '신한은행', src: Banks.shinhan },
  { label: '농협', value: '농협', src: Banks.nh },
  { label: '케이뱅크', value: '케이뱅크', src: Banks.k },
  { label: '씨티은행', value: '씨티은행', src: Banks.city },
  { label: '수협은행', value: '수협은행', src: Banks.sh },
  { label: '기업은행', value: '기업은행', src: Banks.ibk },
  { label: '대구은행', value: '대구은행', src: Banks.dgb },
];

export const transferBankOptions = [
  { label: '신협은행', value: '신협은행', src: Banks.cu },
  { label: '우체국예금', value: '우체국예금', src: Banks.post },
  { label: '전북은행', value: '전북은행', src: Banks.gwangju },
  { label: '새마을금고', value: '새마을금고', src: Banks.mg },
  { label: '제일은행', value: '제일은행', src: Banks.sc },
  { label: '국민은행', value: '국민은행', src: Banks.kb },
  { label: '우리은행', value: '우리은행', src: Banks.woori },
  { label: '하나은행', value: '하나은행', src: Banks.hana },
  { label: '산업은행', value: '산업은행', src: Banks.kdb },
  { label: '토스뱅크', value: '토스뱅크', src: Banks.toss },
  { label: '부산은행', value: '부산은행', src: Banks.busan },
  { label: '광주은행', value: '광주은행', src: Banks.gwangju },
  { label: '아이엠뱅크', value: '아이엠뱅크', src: Banks.im },
  { label: '신한은행', value: '신한은행', src: Banks.shinhan },
  { label: '농협', value: '농협', src: Banks.nh },
  { label: '카카오뱅크', value: '카카오뱅크', src: Banks.kakao },
  { label: '케이뱅크', value: '케이뱅크', src: Banks.k },
  { label: '씨티은행', value: '씨티은행', src: Banks.city },
  { label: '수협은행', value: '수협은행', src: Banks.sh },
  { label: '기업은행', value: '기업은행', src: Banks.ibk },
  { label: '대구은행', value: '대구은행', src: Banks.dgb },
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
  {
    value: 'GETCASH',
    label: '현찰 받을 때',
  },
  {
    value: 'SELLCASH',
    label: '현찰 팔 때',
  },
  {
    value: 'SEND',
    label: '송금 보낼 때',
  },
  {
    value: 'RECEIVE',
    label: '송금 받을 때',
  },
  {
    value: 'BASE',
    label: '매매 기준율',
  },
];

export const remitOptions = [
  {
    label: '계좌번호',
    value: 'account',
  },
  {
    label: '전화번호',
    value: 'tel',
  },
];

export const countryOptions = [
  { value: 'RUSSIA', label: '러시아' },
  { value: 'MONGOLIA', label: '몽골' },
  { value: 'USA', label: '미국' },
  { value: 'VIETNAM', label: '베트남' },
  { value: 'INDIA', label: '인도' },
  { value: 'INDONESIA', label: '인도네시아' },
  { value: 'JAPAN', label: '일본' },
  { value: 'CHINA', label: '중국' },
  { value: 'THAILAND', label: '태국' },
  { value: 'PHILIPPINES', label: '필리핀' },
  { value: 'KOREAN_RUSSIAN', label: '고려인' },
  { value: 'KOREAN_CHINESE', label: '조선족' },
  { value: 'OTHER', label: '기타' },
];

export const navBarOptions = [
  {
    value: 'main',
    label: '메인',
    src: Icons.main,
    activeSrc: Icons.mainActive,
    href: URL.PAGE.MAIN,
  },
  {
    value: 'exchange',
    label: '환율조회',
    src: Icons.exchange,
    activeSrc: Icons.exchangeActive,
    href: URL.PAGE.EXCHANGE_CHECK,
  },
  {
    value: 'map',
    label: '스마트맵',
    src: Icons.map,
    activeSrc: Icons.mapActive,
    href: URL.PAGE.MAP,
  },
  {
    value: 'groupRemittance',
    label: '공동송금',
    src: Icons.remit,
    activeSrc: Icons.remitActive,
    href: URL.PAGE.GROUP,
  },
];

export const historyPeriodOptions = [
  { value: 'ONE_WEEK', label: '1주일' },
  { value: 'ONE_MONTH', label: '1개월' },
  { value: 'THREE_MONTH', label: '3개월' },
  { value: 'SIX_MONTH', label: '6개월' },
];

export const productPeriodOptions = [
  { value: 'SIX_MONTH', label: '6개월' },
  { value: 'ONE_YEAR', label: '12개월' },
  { value: 'TWO_YEAR', label: '24개월' },
  { value: 'STAY_EXPIRATION', label: '체류기간' },
];

export const categoryOptions = [
  { value: undefined, label: '전체' },
  { value: 'WITHDRAW', label: '출금' },
  { value: 'DEPOSIT', label: '입금' },
  { value: 'CHARGE', label: '충전' },
];

export const sortOptions = [
  { value: 'LATEST', label: '최신순' },
  { value: 'OLDEST', label: '과거순' },
];

export const depositConditionOptions = [
  { value: 'USING_CARD', label: '카드사용' },
  { value: 'FIRST_BANKING', label: '첫거래' },
  { value: 'DEPOSIT_AGAIN', label: '재예치' },
  { value: 'ONLINE', label: '비대면가입' },
  { value: 'USING_UTILITY_BILL', label: '공과금연동' },
  { value: 'BANK_APP', label: '은행앱사용' },
  { value: 'DEPOSIT_ACCOUNT', label: '입출금통장' },
  { value: 'USING_SALARY_ACCOUNT', label: '급여연동' },
];

export const savingConditionOptions = [
  { value: 'USING_CARD', label: '카드사용' },
  { value: 'FIRST_BANKING', label: '첫거래' },
  { value: 'DEPOSIT_AGAIN', label: '재예치' },
  { value: 'ONLINE', label: '비대면가입' },
  { value: 'USING_UTILITY_BILL', label: '공과금연동' },
  { value: 'BANK_APP', label: '은행앱사용' },
  { value: 'DEPOSIT_ACCOUNT', label: '입출금통장' },
  { value: 'USING_SALARY_ACCOUNT', label: '급여연동' },
  { value: 'HOUSING_SUBSCRIPTION', label: '주택청약' },
  { value: 'AUTO_DEPOSIT', label: '자동이체' },
  { value: 'RECOMMEND_COUPON', label: '추천' },
  { value: 'ETC', label: '기타' },
];

export const productOptions = [
  { value: 'DEPOSIT', label: '예금' },
  { value: 'SAVING', label: '적금' },
  { value: 'PERSONAL_LOAN', label: '개인 신용 대출' },
  { value: 'JEONSE_LOAN', label: '전세 대출' },
];

export const interestRateOptions = [
  { value: 'MIN_RATE', label: '최저 기준' },
  { value: 'MAX_RATE', label: '최고 기준' },
  { value: 'AVG_RATE', label: '평균 기준' },
];
