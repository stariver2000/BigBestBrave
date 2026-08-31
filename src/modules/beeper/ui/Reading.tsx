'use client';

/**
 * 해독 화면.
 *
 * 갈래를 늘어놓는 것으로 끝내지 않는다. 왜 여러 갈래가 생기는지 — 코드집이 같은 자리에서
 * 겹쳐 있기 때문이라는 사실을 먼저 보여 주고, 그다음에 갈래를 늘어놓는다.
 * 그 시절 사람들은 이 갈래를 문맥으로 골랐다. 우리에게는 그 문맥이 없어서 전부 남는다.
 */

import { useMemo } from 'react';
import { CODEBOOK, collisions, literalReading, occurrences } from '../../../core/pager';
import type { Segmentation } from '../../../core/pager';
import type { Locale } from '../../../core/i18n';
import type { BeeperKey } from '../dictionary';
import styles from './beeper.module.css';

export function Reading({
  digits,
  ways,
  locale,
  t,
}: {
  digits: string;
  ways: readonly Segmentation[];
  locale: Locale;
  t: (key: BeeperKey) => string;
}) {
  const found = useMemo(() => occurrences(digits), [digits]);
  const collided = useMemo(() => collisions(digits), [digits]);

  if (digits.length === 0) return <p className={styles.hint}>{t('read-empty')}</p>;

  return (
    <>
      <p className={styles.hint}>
        {t('read-literal')} · {literalReading(digits)}
      </p>

      {/* 무엇이 어디에 숨어 있는지. 자릿수는 사람이 세는 방식(1부터)으로 보여 준다. */}
      {found.length === 0 ? (
        <p className={styles.hint}>{t('read-found-none')}</p>
      ) : (
        <>
          <p className={styles.hint}>{t('read-found')}</p>
          <div className={styles.spots}>
            {found.map((spot) => (
              <span key={`${spot.start}-${spot.codeIndex}`} className={styles.spot}>
                <span className={styles.spotPlace}>
                  {spot.start + 1}–{spot.end}
                </span>
                <span className={styles.spotDigits}>{CODEBOOK[spot.codeIndex].digits}</span>
                <span className={styles.spotMeaning}>{CODEBOOK[spot.codeIndex].meaning[locale]}</span>
              </span>
            ))}
          </div>
        </>
      )}

      <p className={styles.hint}>
        {collided.length > 0 ? (
          <>
            {collided.length}
            {t('read-collide')}
          </>
        ) : (
          t('read-collide-none')
        )}
      </p>

      <p className={styles.hint}>
        {ways.length}
        {t('read-ways')}
      </p>

      <div className={styles.wayList}>
        {ways.map((way, index) => (
          <div key={index} className={`${styles.way} ${index === 0 ? styles.wayFirst : ''}`}>
            {way.pieces.map((piece, pieceIndex) => (
              <span key={pieceIndex} className={styles.wayPiece}>
                <span className={styles.wayDigits}>{piece.digits}</span>
                <span className={`${styles.wayReading} ${piece.codeIndex !== null ? styles.wayKnown : ''}`}>
                  {piece.reading}
                </span>
              </span>
            ))}
          </div>
        ))}
      </div>

      <p className={styles.context}>{t('read-context')}</p>
    </>
  );
}
