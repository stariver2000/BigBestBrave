'use client';

/**
 * 시연이 돌고 있다는 표시.
 *
 * 화면이 저절로 움직이는데 아무 말이 없으면 사람은 자기가 뭘 눌렀나 싶어 불안해진다.
 * 그래서 돌고 있다는 사실과, 손대면 멈춘다는 약속을 함께 적는다. 멈춘 뒤에는 다시 보여 줄 수 있다.
 */

import type { Locale } from '../../core/i18n';
import { AUTOPILOT_LABELS } from './model';
import styles from '../ui/ui.module.css';

export function AutopilotChip({
  running,
  onRestart,
  locale,
}: {
  running: boolean;
  onRestart: () => void;
  locale: Locale;
}) {
  if (running) {
    return (
      <p className={styles.autopilot}>
        <span className={styles.autopilotPulse} aria-hidden="true" />
        {AUTOPILOT_LABELS.running[locale]}
      </p>
    );
  }

  return (
    <p className={styles.autopilot}>
      <span className={styles.autopilotIdle}>{AUTOPILOT_LABELS.stopped[locale]}</span>
      <button type="button" className={styles.autopilotButton} onClick={onRestart}>
        {AUTOPILOT_LABELS.resume[locale]}
      </button>
    </p>
  );
}
