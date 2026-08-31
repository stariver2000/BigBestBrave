'use client';

/**
 * 리듬을 막대로 그린다.
 *
 * 가로는 시간, 세로는 세기다. 떨림은 채워진 막대가 되고 쉼은 빈 자리가 된다.
 * 진동을 느낄 수 없는 화면에서도 리듬의 모양은 이걸로 전해진다.
 */

import type { Pattern } from '../../../core/rhythm';
import { BAR } from '../config';
import styles from './rhythm.module.css';

export function RhythmBars({ pattern }: { pattern: Pattern }) {
  const total = pattern.pulses.reduce(
    (sum, pulse, index) => sum + pulse.duration + (index === pattern.pulses.length - 1 ? 0 : pulse.gap),
    0,
  );
  if (total <= 0) return <div className={styles.bars} />;

  return (
    <div className={styles.bars} aria-hidden>
      {pattern.pulses.map((pulse, index) => {
        const isLast = index === pattern.pulses.length - 1;
        // 폭은 시간에 비례한다. 아주 짧은 떨림도 보이도록 최소 폭을 준다.
        const pulseWidth = Math.max((pulse.duration / total) * 100, BAR.minWidth);
        const gapWidth = isLast ? 0 : (pulse.gap / total) * 100;
        return (
          <span key={index} style={{ display: 'contents' }}>
            <span
              className={styles.bar}
              style={{
                inlineSize: `${pulseWidth}%`,
                blockSize: `${Math.max(pulse.intensity, 0.12) * BAR.height}px`,
                marginInlineEnd: gapWidth > 0 ? `${gapWidth}%` : undefined,
              }}
            />
          </span>
        );
      })}
    </div>
  );
}
