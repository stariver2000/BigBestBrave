/**
 * 서버에서 현재 로케일을 결정한다.
 *
 * 우선순위: 쿠키(사용자가 명시적으로 고른 값) > Accept-Language(브라우저 선호) > 기본값.
 */

import { cookies, headers } from 'next/headers';
import { LOCALE_COOKIE, DEFAULT_LOCALE, isLocale, localeFromAcceptLanguage, type Locale } from '../core/i18n';

export async function currentLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const saved = cookieStore.get(LOCALE_COOKIE)?.value;
  if (isLocale(saved)) return saved;

  const headerStore = await headers();
  const negotiated = localeFromAcceptLanguage(headerStore.get('accept-language'));
  return negotiated ?? DEFAULT_LOCALE;
}
