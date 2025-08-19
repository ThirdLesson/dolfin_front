import { resolveLocale, supportedLocales, SYSTEM } from '@/shared/utils/locale';

function setLocale(i18n, lang) {
  i18n.global.locale.value = lang;
  document.documentElement.setAttribute('lang', lang);
}

export function initLocale(i18n, userStore) {
  const LOCALE_MIGRATION_KEY = 'user.language.migrated';
  if (!localStorage.getItem(LOCALE_MIGRATION_KEY)) {
    if (userStore?.userInfo?.language === 'ko') {
      userStore.setUserInfo({ language: 'system' });
    }
    localStorage.setItem(LOCALE_MIGRATION_KEY, 'true');
  }

  const initial = resolveLocale(userStore?.userInfo?.language);
  setLocale(i18n, initial);

  userStore.$subscribe((_m, state) => {
    const next = resolveLocale(state?.userInfo?.language);
    if (i18n.global.locale.value !== next) setLocale(i18n, next);
  });

  const onLanguageChange = () => {
    const lang = stateSafe(userStore)?.userInfo?.language;
    if (!lang || lang === SYSTEM) {
      const next = resolveLocale(lang);
      if (i18n.global.locale.value !== next) setLocale(i18n, next);
    }
  };
  window.addEventListener('languagechange', onLanguageChange);
}

function stateSafe(store) {
  try {
    return store;
  } catch {
    return {};
  }
}
