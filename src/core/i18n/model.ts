/**
 * 다국어 사전 모델.
 *
 * 외부 i18n 라이브러리를 쓰지 않는 이유: 페이지가 수백 개로 늘어날 때
 * 사전을 페이지(모듈)마다 지역적으로 두고 필요한 것만 로드하는 편이 가볍고,
 * 번역 누락을 타입 검사로 잡을 수 있기 때문이다.
 */

import { DEFAULT_LOCALE, LOCALES } from './config';

export type Locale = (typeof LOCALES)[number];

/** 한 모듈의 사전. 모든 로케일이 같은 키 집합을 갖도록 타입으로 강제한다. */
export type Dictionary<K extends string> = Record<Locale, Record<K, string>>;

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (LOCALES as readonly string[]).includes(value);
}

/** 문자열(쿠키/헤더)에서 로케일을 고른다. 실패하면 기본 로케일. */
export function resolveLocale(candidate: string | undefined | null): Locale {
  if (isLocale(candidate)) return candidate;
  return DEFAULT_LOCALE;
}

/**
 * Accept-Language 헤더에서 지원 로케일을 고른다.
 * q값 정렬까지 하지 않고 등장 순서만 보는 이유: 브라우저는 이미 선호 순서대로 보내며,
 * 사용자가 명시적으로 고른 값은 쿠키가 우선하기 때문이다.
 */
export function localeFromAcceptLanguage(header: string | undefined | null): Locale | null {
  if (!header) return null;
  const tags = header.split(',').map((part) => part.split(';')[0].trim().toLowerCase());
  for (const tag of tags) {
    const base = tag.split('-')[0];
    if (isLocale(base)) return base;
  }
  return null;
}

/** 사전에서 키를 꺼낸다. 누락 시 키 자체를 반환해 화면이 비지 않게 한다. */
export function translate<K extends string>(
  dictionary: Dictionary<K>,
  locale: Locale,
  key: K,
): string {
  const table = dictionary[locale] ?? dictionary[DEFAULT_LOCALE];
  return table[key] ?? key;
}

/** 사전과 로케일을 묶어 t(key) 하나로 쓰게 만든다. */
export function createTranslator<K extends string>(dictionary: Dictionary<K>, locale: Locale) {
  return (key: K): string => translate(dictionary, locale, key);
}
