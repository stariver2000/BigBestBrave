'use client';

/**
 * 시연이 돌고 있다는 표시.
 *
 * 화면이 저절로 움직이는데 아무 말이 없으면 사람은 자기가 뭘 눌렀나 싶어 불안해진다.
 * 그래서 돌고 있다는 사실과, 손대면 멈춘다는 약속을 함께 적는다. 멈춘 뒤에는 다시 보여 줄 수 있다.
 */

import type { Locale } from '../../core/i18n';
import { AUTOPILOT_LABELS, SIMULATION_LABELS } from './model';
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

/**
 * 스스로 도는 계산의 표시.
 *
 * 시연 표시와 생김새는 같지만 약속이 다르다. 이쪽은 손을 대도 멈추지 않으므로
 * 멈추는 방법을 사람이 볼 수 있게 단추로 내놓는다.
 */
export function SimulationChip({
  running,
  onToggle,
  locale,
}: {
  running: boolean;
  onToggle: () => void;
  locale: Locale;
}) {
  return (
    <p className={styles.autopilot}>
      {running && <span className={styles.autopilotPulse} aria-hidden="true" />}
      <span className={styles.autopilotIdle}>
        {running ? SIMULATION_LABELS.running[locale] : SIMULATION_LABELS.paused[locale]}
      </span>
      <button type="button" className={styles.autopilotButton} onClick={onToggle}>
        {running ? SIMULATION_LABELS.pause[locale] : SIMULATION_LABELS.play[locale]}
      </button>
    </p>
  );
}
