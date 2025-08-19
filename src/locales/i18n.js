import { createI18n } from 'vue-i18n';
import messages from '@/locales';
import { detectBrowserLocale } from '@/shared/utils/locale';

export default createI18n({
  legacy: false,
  globalInjection: true,
  locale: detectBrowserLocale(),
  fallbackLocale: 'ko',
  messages,
});
