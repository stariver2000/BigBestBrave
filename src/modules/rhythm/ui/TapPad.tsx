'use client';

/**
 * 두드리는 자리.
 *
 * 누르는 동안의 시간이 떨림의 길이가 되고, 떼고 다시 누르기까지가 쉼이 된다.
 * 손가락의 움직임이 그대로 리듬이 되도록, 버튼을 여러 개 두지 않고 하나의 넓은 면만 둔다.
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { IDLE_TIMEOUT, MAX_PULSES, TAP_DURATION, type Pulse } from '../../../core/rhythm';
import styles from './rhythm.module.css';

export function TapPad({
  intensity,
  label,
  onPulse,
  onHoldChange,
}: {
  intensity: number;
  label: string;
  /** 떨림 하나가 끝날 때마다 부른다. gap은 다음 떨림이 시작될 때 채워진다. */
  onPulse: (pulse: Pulse) => void;
  onHoldChange: (held: boolean) => void;
}) {
  const [held, setHeld] = useState(false);
  const pressedAt = useRef<number | null>(null);
  const releasedAt = useRef<number | null>(null);

  useEffect(() => {
    onHoldChange(held);
  }, [held, onHoldChange]);

  const press = useCallback(() => {
    pressedAt.current = performance.now();
    setHeld(true);
    // 누르는 순간에도 떨림을 준다. 손끝의 반응이 없으면 두드리는 맛이 없다.
    navigator.vibrate?.(18);
  }, []);

  const release = useCallback(() => {
    const start = pressedAt.current;
    pressedAt.current = null;
    setHeld(false);
    if (start === null) return;

    const duration = Math.min(Math.max(performance.now() - start, TAP_DURATION.min), TAP_DURATION.max);
    const previous = releasedAt.current;
    // 오래 쉬었다가 다시 두드리면 리듬이 끊긴 것으로 보고 쉼을 한도까지만 인정한다.
    const gap = previous === null ? 0 : Math.min(start - previous, IDLE_TIMEOUT);
    releasedAt.current = performance.now();

    onPulse({ duration, intensity, gap });
  }, [intensity, onPulse]);

  return (
    <button
      type="button"
      className={`${styles.pad} ${held ? styles.padHeld : ''}`}
      onPointerDown={(event) => {
        // 포인터를 붙잡아 두어야 면 밖에서 손을 떼도 끝을 놓치지 않는다.
        event.currentTarget.setPointerCapture(event.pointerId);
        press();
      }}
      onPointerUp={release}
      onPointerCancel={release}
      aria-label={label}
    >
      <span className={`${styles.padRing} ${held ? styles.padRingHeld : ''}`} aria-hidden />
      <span className={styles.padLabel}>{label}</span>
    </button>
  );
}

/** 떨림 목록에 새 떨림을 더한다. 한도를 넘으면 앞에서부터 밀어낸다. */
export function appendPulse(pulses: readonly Pulse[], pulse: Pulse): Pulse[] {
  const next = [...pulses, pulse];
  return next.length > MAX_PULSES ? next.slice(next.length - MAX_PULSES) : next;
}
