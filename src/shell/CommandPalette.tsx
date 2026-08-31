'use client';

/**
 * 커맨드 팔레트: 트리 어디에 있든 다른 노드로 즉시 이동한다.
 *
 * 도메인은 고정이고 경로만 갈라지므로, 깊이가 10층까지 자라면 링크를 따라가는 이동은
 * 금방 비현실적이 된다. 이름을 쳐서 바로 뛰는 경로가 항상 있어야 한다.
 */

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Locale } from '../core/i18n';
import { createTranslator } from '../core/i18n';
import { shellDictionary } from './dictionary';
import styles from './shell.module.css';

/** 서버가 직렬화해 넘겨 주는 노드 요약. 컴포넌트가 트리 코어에 직접 의존하지 않게 한다. */
export interface PaletteEntry {
  path: string;
  title: string;
  summary: string;
  keywords: string[];
}

/** 열기 단축키. ⌘K / Ctrl+K 두 가지를 모두 받는다. */
const OPEN_KEY = 'k';

function matches(entry: PaletteEntry, query: string): boolean {
  if (query.length === 0) return true;
  const haystack = [entry.title, entry.summary, entry.path, ...entry.keywords].join(' ').toLowerCase();
  // 공백으로 나눈 모든 토큰이 포함돼야 한다(AND 검색). 짧은 질의에서도 결과가 빠르게 좁혀진다.
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter((token) => token.length > 0)
    .every((token) => haystack.includes(token));
}

export function CommandPalette({ entries, locale }: { entries: PaletteEntry[]; locale: Locale }) {
  const router = useRouter();
  const t = useMemo(() => createTranslator(shellDictionary, locale), [locale]);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);

  const results = useMemo(() => entries.filter((entry) => matches(entry, query)), [entries, query]);

  const close = useCallback(() => {
    setOpen(false);
    setQuery('');
    setActiveIndex(0);
  }, []);

  const go = useCallback(
    (path: string) => {
      close();
      router.push(path);
    },
    [close, router],
  );

  // 전역 단축키. 입력창 안에서도 동작해야 하므로 document에 붙인다.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === OPEN_KEY) {
        event.preventDefault();
        setOpen((previous) => !previous);
      }
      if (event.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [close]);

  const onInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((index) => Math.min(index + 1, results.length - 1));
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((index) => Math.max(index - 1, 0));
    }
    if (event.key === 'Enter' && results[activeIndex]) {
      event.preventDefault();
      go(results[activeIndex].path);
    }
  };

  return (
    <>
      <button type="button" className={styles.ghostButton} onClick={() => setOpen(true)}>
        {t('nav-open-palette')}
        <span className={styles.kbd} aria-hidden>
          {t('nav-palette-hint')}
        </span>
      </button>

      {open && (
        <div className={styles.paletteBackdrop} onClick={close} role="presentation">
          <div className={styles.paletteBox} onClick={(event) => event.stopPropagation()}>
            <input
              className={styles.paletteInput}
              autoFocus
              value={query}
              placeholder={t('nav-search-placeholder')}
              onChange={(event) => {
                setQuery(event.target.value);
                setActiveIndex(0);
              }}
              onKeyDown={onInputKeyDown}
            />
            {results.length === 0 ? (
              <p className={styles.paletteEmpty}>{t('nav-no-results')}</p>
            ) : (
              <ul className={styles.paletteList}>
                {results.map((entry, index) => (
                  <li
                    key={entry.path}
                    className={`${styles.paletteItem} ${index === activeIndex ? styles.paletteItemActive : ''}`}
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => go(entry.path)}
                  >
                    <span>{entry.title}</span>
                    <span className={styles.monoPath}>{entry.path}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </>
  );
}
