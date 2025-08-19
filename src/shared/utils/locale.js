export const supportedLocales = ['en', 'ko', 'ja', 'zh'];
export const SYSTEM = 'system';

export function normalize(input) {
  if (!input) return null;
  const raw = String(input).toLowerCase();
  if (raw === 'jp') return 'ja';
  if (raw.startsWith('zh')) return 'zh';
  return raw.split('-')[0];
}

export function detectBrowserLocale() {
  const raw =
    navigator.languages && navigator.languages.length
      ? navigator.languages[0]
      : navigator.language || navigator.userLanguage || 'ko';
  const short = normalize(raw);
  return supportedLocales.includes(short) ? short : 'ko';
}

export function resolveLocale(saved) {
  const s = normalize(saved);
  if (!s || s === SYSTEM) return detectBrowserLocale();
  return supportedLocales.includes(s) ? s : detectBrowserLocale();
}
