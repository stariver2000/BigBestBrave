/**
 * 그림의 모양만 그리는 자리.
 *
 * 값은 그리지 않는다. 이 페이지는 자료를 싣지 않으므로 그릴 값이 없고, 없는 값을
 * 그럴듯하게 그려 두면 그것이 곧 지어낸 자료가 된다. 그래서 눈금도 숫자도 없이
 * 막대 몇 개와 선 몇 줄의 배치만 보여 준다.
 */

import type { ChartKind } from '../../../core/contextualization';
import { SHAPE_PLOT } from '../config';
import styles from './context.module.css';

const { width: W, height: H, pad: P } = SHAPE_PLOT;

/** 선 하나의 자취. 실제 자료가 아니라 눈에 선으로 읽히기만 하면 되는 모양이다. */
function path(offset: number, amplitude: number): string {
  const points: string[] = [];
  const steps = 6;
  for (let i = 0; i <= steps; i += 1) {
    const x = P + (i / steps) * (W - P * 2);
    const t = i / steps;
    const y = H - P - ((0.25 + amplitude * (0.5 + 0.5 * Math.sin(t * 3 + offset))) * (H - P * 2));
    points.push(`${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  return points.join(' ');
}

function Bars({ groups, perGroup }: { groups: number; perGroup: number }) {
  const slot = (W - P * 2) / groups;
  const barWidth = (slot * 0.7) / perGroup;
  const heights = [0.75, 0.45, 0.9, 0.6, 0.35, 0.8];
  const bars = [];
  for (let g = 0; g < groups; g += 1) {
    for (let b = 0; b < perGroup; b += 1) {
      const value = heights[(g * perGroup + b) % heights.length];
      const h = value * (H - P * 2);
      bars.push(
        <rect
          key={`${g}-${b}`}
          x={P + slot * g + slot * 0.15 + barWidth * b}
          y={H - P - h}
          width={Math.max(3, barWidth - 2)}
          height={h}
          className={b === 0 ? styles.barA : styles.barB}
        />,
      );
    }
  }
  return <>{bars}</>;
}

export function ShapePlot({ kind }: { kind: ChartKind }) {
  const panels = kind === 'multiLinePerEntity' ? 2 : 1;

  return (
    <div className={styles.plots}>
      {Array.from({ length: panels }, (_, panel) => (
        <svg
          key={panel}
          className={styles.plot}
          viewBox={`0 0 ${W} ${H}`}
          width={panels === 1 ? W : W / 2}
          height={H}
          role="img"
          aria-hidden="true"
        >
          <line x1={P} y1={H - P} x2={W - P} y2={H - P} className={styles.axis} />
          <line x1={P} y1={P} x2={P} y2={H - P} className={styles.axis} />
          {kind === 'bar' && <Bars groups={4} perGroup={1} />}
          {kind === 'groupedBar' && <Bars groups={3} perGroup={2} />}
          {kind === 'singleLine' && <path d={path(0, 0.6)} className={styles.lineA} />}
          {kind === 'multiLine' && (
            <>
              <path d={path(0, 0.6)} className={styles.lineA} />
              <path d={path(1.4, 0.4)} className={styles.lineB} />
              <path d={path(2.6, 0.5)} className={styles.lineC} />
            </>
          )}
          {kind === 'multiLinePerEntity' && (
            <>
              <path d={path(panel * 1.7, 0.6)} className={styles.lineA} />
              <path d={path(panel * 1.7 + 1.2, 0.4)} className={styles.lineB} />
            </>
          )}
        </svg>
      ))}
    </div>
  );
}
