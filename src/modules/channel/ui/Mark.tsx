/**
 * 채널 하나로 값 하나를 그리는 표식.
 *
 * 값은 0~1이다. 어느 채널이든 값이 크면 '더 많이'가 되도록 그린다 - 넓이는 더 크게,
 * 밝기는 더 어둡게(흰 지면에서 잉크가 많은 쪽), 기울기는 더 돌아가게, 길이는 더 길게.
 */

import { DEMO, type DemoChannel } from '../config';
import styles from './channel.module.css';

export function Mark({ channel, value }: { channel: DemoChannel; value: number }) {
  const S = DEMO.markSize;
  const center = S / 2;

  if (channel === 'area') {
    const side = Math.sqrt(value) * (S - 12);
    return (
      <svg className={styles.mark} viewBox={`0 0 ${S} ${S}`} aria-hidden="true">
        <rect
          x={center - side / 2}
          y={center - side / 2}
          width={side}
          height={side}
          className={styles.markFill}
        />
      </svg>
    );
  }

  if (channel === 'luminance') {
    // 0이면 옅은 회색, 1이면 짙은 회색. 지면과의 대비는 항상 남긴다.
    const level = Math.round(205 - value * 150);
    return (
      <svg className={styles.mark} viewBox={`0 0 ${S} ${S}`} aria-hidden="true">
        <rect x={10} y={10} width={S - 20} height={S - 20} fill={`rgb(${level} ${level} ${level})`} />
      </svg>
    );
  }

  if (channel === 'tilt') {
    const angle = value * 180;
    return (
      <svg className={styles.mark} viewBox={`0 0 ${S} ${S}`} aria-hidden="true">
        <line
          x1={center - (S - 18) / 2}
          y1={center}
          x2={center + (S - 18) / 2}
          y2={center}
          className={styles.markStroke}
          transform={`rotate(${angle} ${center} ${center})`}
        />
      </svg>
    );
  }

  // length: 아래에서 위로 자라는 막대.
  const height = 8 + value * (S - 16);
  return (
    <svg className={styles.mark} viewBox={`0 0 ${S} ${S}`} aria-hidden="true">
      <rect x={center - 4} y={S - 4 - height} width={8} height={height} className={styles.markFill} />
    </svg>
  );
}
