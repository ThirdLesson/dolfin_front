import { createI18n } from 'vue-i18n';
import messages from '@/locales';

const supportedLocales = ['en', 'ko', 'jp', 'zh'];

function getBrowserLocale() {
  const lang = navigator.language || navigator.userLanguage;
  const shortLang = lang.split('-')[0];
  return supportedLocales.includes(shortLang) ? shortLang : 'ko';
}

export default createI18n({
  legacy: false,
  globalInjection: true,
  locale: getBrowserLocale(),
  fallbackLocale: 'ko',
  messages,
});
