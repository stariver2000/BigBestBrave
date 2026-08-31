'use client';

/** 언어 전환. 선택은 쿠키에 남고 서버 컴포넌트가 다시 그려진다. */

import { LOCALES, LOCALE_ENDONYMS, type Locale } from '../core/i18n';
import { useLocale } from './locale-context';
import styles from './shell.module.css';

export function LocaleSwitch() {
  const { locale, setLocale } = useLocale();
  return (
    <div className={styles.localeGroup} data-part="locale-group">
      {LOCALES.map((candidate: Locale) => (
        <button
          key={candidate}
          type="button"
          className={`${styles.localeButton} ${candidate === locale ? styles.localeActive : ''}`}
          data-part="locale-button"
          data-active={candidate === locale || undefined}
          aria-pressed={candidate === locale}
          onClick={() => setLocale(candidate)}
        >
          {LOCALE_ENDONYMS[candidate]}
        </button>
      ))}
    </div>
  );
}
