/** 지원 로케일과 기본값. 언어를 늘릴 때 고치는 유일한 파일. */

export const LOCALES = ['ko', 'en', 'ja'] as const;

export const DEFAULT_LOCALE = 'ko';

/** 로케일 선택을 저장하는 쿠키 이름.
 *  경로(URL)는 트리 구조 전용이므로 로케일을 경로 접두사로 두지 않는다. */
export const LOCALE_COOKIE = 'bbb_locale';

export const LOCALE_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;

/** 언어 전환 UI에 표시할 이름. 각 언어는 자기 언어 이름으로 표기한다. */
export const LOCALE_ENDONYMS = {
  ko: '한국어',
  en: 'English',
  ja: '日本語',
} as const;

/** <html lang> 및 Accept-Language 매칭에 쓰는 BCP 47 태그. */
export const LOCALE_TAGS = {
  ko: 'ko-KR',
  en: 'en-US',
  ja: 'ja-JP',
} as const;
