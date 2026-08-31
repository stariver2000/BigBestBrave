'use client';

/**
 * 결과 요약과, 이 도구를 지나며 무엇이 남고 무엇이 사라지는지.
 *
 * 숫자 몇 개를 나열하는 대신 원본과 결과를 같은 자리에서 견준다. 자막을 다시 자르는 일은
 * 남의 파일을 고치는 일이라, 무엇이 보존되고 무엇이 버려지는지를 밝히지 않으면 쓰기 어렵다.
 * 여기 적힌 항목은 모두 이 저장소의 해석기·생성기가 실제로 하는 일이다.
 */

import type { SubtitleKey } from '../dictionary';
import styles from './subtitle.module.css';

export interface OutcomeNumbers {
  /** 원본 자막 수와 재분할 결과 수. */
  cues: number;
  chunks: number;
  /** 폭을 넘긴 자막 수 — 원본과 결과. */
  overflowBefore: number;
  overflowAfter: number;
  peakCps: number;
  maxCps: number;
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <p className={styles.outcomeRow}>
      <span className={styles.outcomeLabel}>{label}</span>
      <span className={styles.outcomeValue}>{children}</span>
    </p>
  );
}

export function Outcome({ numbers, t }: { numbers: OutcomeNumbers; t: (key: SubtitleKey) => string }) {
  const rescued = Math.max(0, numbers.overflowBefore - numbers.overflowAfter);
  const overCap = numbers.peakCps > numbers.maxCps;

  return (
    <div className={styles.outcome}>
      <Row label={t('outcome-chunks')}>
        {numbers.cues} → {numbers.chunks}
      </Row>
      <Row label={t('outcome-overflow')}>
        {numbers.overflowBefore} → {numbers.overflowAfter}
      </Row>
      <Row label={t('outcome-peak')}>
        <span className={overCap ? styles.outcomeOver : undefined}>{numbers.peakCps.toFixed(1)} cps</span>
        <span className={styles.outcomeCap}>/ {numbers.maxCps}</span>
      </Row>

      {/* 조언은 결과에서 나온다. 남은 넘침이 있으면 무엇을 바꿔야 하는지가 다음 할 일이다. */}
      <p className={styles.outcomeNote}>
        {numbers.overflowAfter > 0
          ? t('outcome-still-over')
          : rescued > 0
            ? t('outcome-rescued')
            : t('outcome-nothing-to-fix')}
      </p>

      <p className={styles.outcomeNote}>{t('keep-title')}</p>
      <ul className={styles.keepList}>
        <li>{t('keep-kept')}</li>
        <li>{t('keep-remade')}</li>
        <li>{t('keep-dropped')}</li>
        <li>{t('keep-tags')}</li>
      </ul>
    </div>
  );
}
