/**
 * 세 무리의 모양 그림.
 *
 * 점은 자료가 아니라 모양이다. 무리마다 자리가 손으로 정해져 있고, 점의 흩어짐은
 * 씨앗 난수로 그린다 - 시험이 재현할 수 있고, 다시 그려도 같은 그림이 나온다.
 * 읽으려는 것이 어디인지(두 무리 사이의 화살표, 한 무리의 테두리 등)를 겹쳐 가리킨다.
 */

import { createRandom } from '../../../core/random';
import type { TaskId } from '../../../core/misuse';
import { BLOBS, SKETCH } from '../config';
import styles from './distance.module.css';

const DOTS_PER_BLOB = 9;

function dots() {
  const random = createRandom(7);
  return BLOBS.map((blob) =>
    Array.from({ length: DOTS_PER_BLOB }, () => {
      const angle = random() * Math.PI * 2;
      const radius = Math.sqrt(random());
      return {
        x: blob.cx + Math.cos(angle) * radius * blob.rx * 0.82,
        y: blob.cy + Math.sin(angle) * radius * blob.ry * 0.82,
      };
    }),
  );
}

const ALL_DOTS = dots();

export function Sketch({ task, mirage }: { task: TaskId; mirage: boolean }) {
  const [a, b, c] = BLOBS;
  const overlayClass = mirage ? styles.overlayMirage : styles.overlayOk;

  return (
    <svg
      className={styles.sketch}
      viewBox={`0 0 ${SKETCH.width} ${SKETCH.height}`}
      role="img"
      aria-hidden="true"
    >
      {BLOBS.map((blob, index) => (
        <ellipse
          key={index}
          cx={blob.cx}
          cy={blob.cy}
          rx={blob.rx}
          ry={blob.ry}
          className={styles.blob}
        />
      ))}
      {ALL_DOTS.flat().map((dot, index) => (
        <circle key={index} cx={dot.x} cy={dot.y} r={3} className={styles.dot} />
      ))}

      {task === 'neighborhood' && (
        <circle cx={a.cx + 10} cy={a.cy - 4} r={14} className={overlayClass} />
      )}
      {task === 'outlier' && (
        <>
          <circle cx={288} cy={165} r={3.4} className={styles.dot} />
          <circle cx={288} cy={165} r={11} className={overlayClass} />
        </>
      )}
      {task === 'cluster' && (
        <ellipse cx={c.cx} cy={c.cy} rx={c.rx + 8} ry={c.ry + 8} className={overlayClass} />
      )}
      {task === 'pointDistance' && (
        <line x1={a.cx + 18} y1={a.cy + 6} x2={b.cx - 14} y2={b.cy + 2} className={overlayClass} />
      )}
      {task === 'classSeparability' && (
        <path
          d={`M ${(a.cx + b.cx) / 2 - 6} 18 L ${(a.cx + c.cx) / 2 + 14} ${SKETCH.height - 14}`}
          className={overlayClass}
        />
      )}
      {task === 'clusterDistance' && (
        <>
          <line x1={a.cx + a.rx} y1={a.cy} x2={b.cx - b.rx} y2={b.cy} className={overlayClass} />
          <line x1={b.cx - 6} y1={b.cy + b.ry} x2={c.cx + 10} y2={c.cy - c.ry} className={overlayClass} />
        </>
      )}
      {task === 'clusterDensity' && (
        <>
          <ellipse cx={a.cx} cy={a.cy} rx={a.rx * 0.55} ry={a.ry * 0.55} className={overlayClass} />
          <ellipse cx={b.cx} cy={b.cy} rx={b.rx * 0.55} ry={b.ry * 0.55} className={overlayClass} />
        </>
      )}
    </svg>
  );
}
