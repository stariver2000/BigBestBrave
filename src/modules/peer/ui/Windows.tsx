'use client';

/**
 * 조하리의 창 여섯 개.
 *
 * 칸의 넓이가 곧 값이다. 네 값을 더하면 언제나 눈금 전체이므로 정사각형이 늘 꽉 찬다.
 * 가로는 '내가 아는 정도', 세로는 '상대가 보는 정도'로 잘라 네 칸을 만든다.
 */

import type { Area, Window } from '../../../core/johari';
import { SCALE } from '../../../core/johari';
import styles from './peer.module.css';

export function Windows({
  windows,
  size,
  areaName,
  labels,
}: {
  windows: readonly Window[];
  size: number;
  areaName: (area: Area) => string;
  labels: { open: string; blind: string; hidden: string; unknown: string; self: string; sees: string };
}) {
  return (
    <div className={styles.windows}>
      {windows.map((entry) => {
        // 가로: 내가 아는 만큼. 세로: 상대가 보는 만큼.
        const across = (entry.selfKnows / SCALE) * 100;
        const down = (entry.seesMe / SCALE) * 100;
        return (
          <figure key={entry.area} className={styles.windowBox}>
            <div className={styles.pane} style={{ width: size, height: size }}>
              {/* 왼쪽 위: 둘 다 아는 곳 */}
              <span className={styles.cell} data-kind="open" style={{ width: `${across}%`, height: `${down}%`, left: 0, top: 0 }}>
                {entry.open > 0 && entry.open}
              </span>
              {/* 오른쪽 위: 상대만 보는 곳 */}
              <span className={styles.cell} data-kind="blind" style={{ width: `${100 - across}%`, height: `${down}%`, right: 0, top: 0 }}>
                {entry.blind > 0 && entry.blind}
              </span>
              {/* 왼쪽 아래: 나만 아는 곳 */}
              <span className={styles.cell} data-kind="hidden" style={{ width: `${across}%`, height: `${100 - down}%`, left: 0, bottom: 0 }}>
                {entry.hidden > 0 && entry.hidden}
              </span>
              {/* 오른쪽 아래: 둘 다 모르는 곳 */}
              <span className={styles.cell} data-kind="unknown" style={{ width: `${100 - across}%`, height: `${100 - down}%`, right: 0, bottom: 0 }}>
                {entry.unknown > 0 && entry.unknown}
              </span>
            </div>
            <figcaption className={styles.windowName}>
              {areaName(entry.area)}
              <span className={styles.windowNums}>
                <span data-mine>
                  {labels.self} {entry.selfKnows}
                </span>
                <span data-other>
                  {labels.sees} {entry.seesMe}
                </span>
              </span>
            </figcaption>
          </figure>
        );
      })}
    </div>
  );
}
