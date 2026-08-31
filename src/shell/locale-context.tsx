'use client';

/**
 * 로케일 컨텍스트.
 *
 * 로케일을 URL 접두사가 아니라 쿠키로 두는 이유: 경로(URL)는 페이지 트리의 좌표이며,
 * 언어가 경로에 섞이면 같은 노드가 여러 주소를 갖게 되기 때문이다.
 */

import { createContext, useCallback, useContext, useMemo, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE,
  LOCALE_COOKIE_MAX_AGE_SECONDS,
  createTranslator,
  type Dictionary,
  type Locale,
} from '../core/i18n';

interface LocaleContextValue {
  locale: Locale;
  setLocale: (next: Locale) => void;
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: DEFAULT_LOCALE,
  setLocale: () => {},
});

export function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  const router = useRouter();

  const setLocale = useCallback(
    (next: Locale) => {
      // 쿠키를 먼저 쓰고 서버 컴포넌트를 다시 그린다. 서버가 사전을 골라 내려주므로
      // 클라이언트에 3개 언어 사전을 모두 실을 필요가 없다.
      document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=${LOCALE_COOKIE_MAX_AGE_SECONDS}; samesite=lax`;
      router.refresh();
    },
    [router],
  );

  const value = useMemo(() => ({ locale, setLocale }), [locale, setLocale]);
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): LocaleContextValue {
  return useContext(LocaleContext);
}

/** 사전을 넘기면 현재 로케일에 묶인 t 함수를 돌려준다. */
export function useTranslator<K extends string>(dictionary: Dictionary<K>) {
  const { locale } = useLocale();
  return useMemo(() => createTranslator(dictionary, locale), [dictionary, locale]);
}
