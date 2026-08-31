/** i18n 코어의 공개 진입점. */

export {
  DEFAULT_LOCALE,
  LOCALES,
  LOCALE_COOKIE,
  LOCALE_COOKIE_MAX_AGE_SECONDS,
  LOCALE_ENDONYMS,
  LOCALE_TAGS,
} from './config';
export {
  createTranslator,
  isLocale,
  localeFromAcceptLanguage,
  resolveLocale,
  translate,
  type Dictionary,
  type Locale,
} from './model';
