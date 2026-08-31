'use client';

/**
 * 보내기 화면.
 *
 * 얼마나 전해지는지를 막대로 보여 주는 데서 그치지 않는다. 왜 그것밖에 못 가는지를 함께 말한다.
 * 숫자만 보낼 수 있는 화면에는 문이 둘뿐이다 — 코드집에 있는 뜻과, 숫자를 읽는 음절.
 * 그 둘을 한글 음절 전체와 나란히 놓으면 막대가 늘 낮은 이유가 설명된다.
 */

import { Button } from '../../../kit';
import { MAX_DIGITS, whatPasses } from '../../../core/pager';
import type { Echo } from '../../../core/pager';
import { SUGGESTIONS } from '../config';
import type { BeeperKey } from '../dictionary';
import styles from './beeper.module.css';

export function Sending({
  text,
  echo,
  ringing,
  onChange,
  onSend,
  t,
}: {
  text: string;
  echo: Echo;
  /** 보내는 중에는 다시 누르지 못하게 한다. 숫자가 도착하는 동안이 이 화면의 절반이다. */
  ringing: boolean;
  onChange: (next: string) => void;
  onSend: () => void;
  t: (key: BeeperKey) => string;
}) {
  const lost = echo.sent.pieces.filter((piece) => piece.via === 'lost');
  const passes = whatPasses();

  return (
    <>
      <input
        className={styles.input}
        value={text}
        placeholder={t('send-placeholder')}
        onChange={(event) => onChange(event.target.value)}
      />
      <div className={styles.suggestions}>
        {SUGGESTIONS.map((suggestion) => (
          <button key={suggestion} type="button" className={styles.suggestion} onClick={() => onChange(suggestion)}>
            {suggestion}
          </button>
        ))}
      </div>

      {text.trim().length === 0 ? (
        <p className={styles.hint}>{t('send-empty')}</p>
      ) : (
        <>
          <div className={styles.coverageRow}>
            <span>{t('send-coverage')}</span>
            <span className={styles.coverageTrack}>
              <span
                className={styles.coverageFill}
                style={{ inlineSize: `${Math.round(echo.sent.coverage * 100)}%` }}
              />
            </span>
            <span>{Math.round(echo.sent.coverage * 100)}%</span>
          </div>

          <div className={styles.pieceList}>
            {echo.sent.pieces.map((piece, index) => (
              <span
                key={index}
                className={`${styles.piece} ${piece.via === 'lost' ? styles.pieceLost : styles.pieceSent}`}
              >
                {piece.text}
                {piece.digits && <span className={styles.pieceDigits}>{piece.digits}</span>}
              </span>
            ))}
          </div>

          <p className={styles.hint}>
            {lost.length === 0
              ? t('send-lost-none')
              : `${t('send-lost')} · ${lost.map((piece) => piece.text).join(' ')}`}
          </p>
          {echo.sent.overflow && <p className={styles.hint}>{t('send-overflow')}</p>}

          <Button variant="primary" disabled={echo.sent.digits.length === 0 || ringing} onClick={onSend}>
            {ringing ? t('send-going') : t('send-button')}
          </Button>
        </>
      )}

      {/* 문이 둘뿐이라는 사실. 수는 코드집과 음절표에서 세어 나온 것이고, 견줄 값만 유니코드에서 왔다. */}
      <div className={styles.gates}>
        <span className={styles.gate}>
          <span className={styles.gateCount}>{passes.codes}</span>
          {t('gate-codes')}
        </span>
        <span className={styles.gate}>
          <span className={styles.gateCount}>{passes.syllables}</span>
          {t('gate-syllables')}
        </span>
        <span className={styles.gate}>
          <span className={styles.gateCount}>{passes.hangul.toLocaleString('en-US')}</span>
          {t('gate-hangul')}
        </span>
      </div>
      <p className={styles.context}>{t('gate-note')}</p>
      <p className={styles.context}>
        {MAX_DIGITS}
        {t('digits-note')}
      </p>
    </>
  );
}
