'use client';

/**
 * 산점도와 진실의 렌즈.
 *
 * 평소에는 왜곡을 색으로 얹은 그림이다. 색 계단은 이 사이트의 색 코어(OKLCH)로 만든다.
 * 명도를 균일하게 나눠야 "색이 진하다"가 "값이 크다"로 정확히 읽히기 때문이다.
 *
 * 그림 위에 손을 올리면 렌즈가 켜진다. 렌즈 안에서는 그림이 말하는 거리 대신
 * 원래 자료의 사실이 색으로 나온다. 원래도 이웃이던 점은 빛나고, 우연히 옆에 온 점은 붉어지며,
 * 밀려난 진짜 이웃에게는 실이 이어진다. 손을 움직이는 동안 그림이 어디서 거짓말을 하는지 보인다.
 */

import { useMemo, useState } from 'react';
import { oklchToDisplayable, parseColor, srgbToOklch, toHex } from '../../../core/color';
import type { PointDistortion } from '../../../core/projection';
import { LENS_RADIUS, PLOT_PADDING, PLOT_SIZE, POINT_RADIUS } from '../config';
import { lookThrough, type LensView } from '../lens';
import styles from './projection.module.css';

/** 왜곡 0~1을 색으로 바꾸는 계단. 강조색의 색상은 유지하고 명도·채도만 움직인다. */
function buildScale(accentHex: string): (ratio: number) => string {
  const parsed = parseColor(accentHex);
  const hue = parsed.ok ? srgbToOklch(parsed.color).h : 250;
  return (ratio) => {
    const clamped = Math.max(0, Math.min(1, ratio));
    // 왜곡이 없을수록 밝고 옅게, 클수록 어둡고 진하게.
    const lightness = 0.9 - clamped * 0.55;
    const chroma = 0.03 + clamped * 0.16;
    return toHex(oklchToDisplayable({ l: lightness, c: chroma, h: hue, a: 1 }));
  };
}

interface Scale {
  x: (value: number) => number;
  y: (value: number) => number;
}

/** 자료 범위를 그림 좌표로 옮긴다. 가로세로를 같은 배율로 두어야 모양이 왜곡되지 않는다. */
function buildScales(points: readonly [number, number][]): Scale {
  const xs = points.map((point) => point[0]);
  const ys = points.map((point) => point[1]);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);

  const span = Math.max(maxX - minX, maxY - minY) || 1;
  const inner = PLOT_SIZE - PLOT_PADDING * 2;
  const centerX = (minX + maxX) / 2;
  const centerY = (minY + maxY) / 2;

  return {
    x: (value) => PLOT_SIZE / 2 + ((value - centerX) / span) * inner,
    // SVG의 y는 아래로 증가하므로 뒤집는다.
    y: (value) => PLOT_SIZE / 2 - ((value - centerY) / span) * inner,
  };
}

type Role = 'anchor' | 'kept' | 'imposter' | 'pushed';

/** 렌즈가 가른 결과를 점 번호 → 배역 표로 바꾼다. 그림은 이 표만 보고 색을 정한다. */
function rolesOf(view: LensView | null): Map<number, Role> | null {
  if (view === null) return null;
  const roles = new Map<number, Role>();
  for (const index of view.pushed) roles.set(index, 'pushed');
  for (const index of view.imposters) roles.set(index, 'imposter');
  for (const index of view.kept) roles.set(index, 'kept');
  roles.set(view.anchor, 'anchor');
  return roles;
}

export interface LensLabels {
  kept: string;
  imposters: string;
  pushed: string;
  idle: string;
  legendLow: string;
  legendHigh: string;
}

export function ScatterPlot({
  points,
  distortions,
  neighbors,
  accentHex,
  labels,
}: {
  points: readonly [number, number][];
  distortions: readonly PointDistortion[];
  neighbors: number;
  accentHex: string;
  labels: LensLabels;
}) {
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null);
  const scales = useMemo(() => buildScales(points), [points]);
  const scale = useMemo(() => buildScale(accentHex), [accentHex]);

  // 화면 좌표는 렌즈 계산과 그리기가 함께 쓴다. 점이 많으므로 한 번만 만든다.
  const positions = useMemo(
    () => points.map((point): [number, number] => [scales.x(point[0]), scales.y(point[1])]),
    [points, scales],
  );

  // 왜곡 비율: 놓친 이웃과 거짓 이웃을 합쳐 최대치(2k)로 나눈다.
  const ratios = distortions.map(
    (distortion) => (distortion.missingNeighbors + distortion.falseNeighbors) / (neighbors * 2),
  );

  const view = cursor === null ? null : lookThrough(positions, distortions, cursor, LENS_RADIUS);
  const roles = rolesOf(view);

  /** 마우스 위치를 그림 좌표로 옮긴다. SVG는 늘어나 그려지므로 비율로 환산해야 한다. */
  const trackCursor = (clientX: number, clientY: number, element: SVGSVGElement) => {
    const bounds = element.getBoundingClientRect();
    setCursor({
      x: ((clientX - bounds.left) / bounds.width) * PLOT_SIZE,
      y: ((clientY - bounds.top) / bounds.height) * PLOT_SIZE,
    });
  };

  const classOf = (index: number): string => {
    const role = roles?.get(index);
    if (role === 'anchor') return `${styles.point} ${styles.pointAnchor}`;
    if (role === 'kept') return `${styles.point} ${styles.pointKept}`;
    if (role === 'imposter') return `${styles.point} ${styles.pointImposter}`;
    if (role === 'pushed') return `${styles.point} ${styles.pointPushed}`;
    // 렌즈가 켜져 있는 동안 관계없는 점은 물린다. 지금 보는 자리만 또렷해야 한다.
    return roles === null ? styles.point : `${styles.point} ${styles.pointFaded}`;
  };

  const radiusOf = (index: number): number => {
    const role = roles?.get(index);
    if (role === 'anchor') return POINT_RADIUS.emphasis * 1.4;
    if (role === undefined) return POINT_RADIUS.base;
    return POINT_RADIUS.emphasis;
  };

  return (
    <>
      <div className={styles.plotWrap}>
        <svg
          className={styles.plot}
          viewBox={`0 0 ${PLOT_SIZE} ${PLOT_SIZE}`}
          role="img"
          onMouseMove={(event) => trackCursor(event.clientX, event.clientY, event.currentTarget)}
          onMouseLeave={() => setCursor(null)}
          // 손가락으로도 렌즈를 끌 수 있어야 한다. 휴대폰에는 올려놓을 마우스가 없다.
          onTouchStart={(event) => trackCursor(event.touches[0].clientX, event.touches[0].clientY, event.currentTarget)}
          onTouchMove={(event) => trackCursor(event.touches[0].clientX, event.touches[0].clientY, event.currentTarget)}
          onTouchEnd={() => setCursor(null)}
        >
          <line className={styles.axis} x1={PLOT_PADDING} y1={PLOT_SIZE / 2} x2={PLOT_SIZE - PLOT_PADDING} y2={PLOT_SIZE / 2} />
          <line className={styles.axis} x1={PLOT_SIZE / 2} y1={PLOT_PADDING} x2={PLOT_SIZE / 2} y2={PLOT_SIZE - PLOT_PADDING} />

          {/* 밀려난 이웃에게 잇는 실. 점 아래에 깔아 점을 가리지 않게 한다. */}
          {view?.pushed.map((target) => (
            <line
              key={target}
              className={styles.link}
              x1={positions[view.anchor][0]}
              y1={positions[view.anchor][1]}
              x2={positions[target][0]}
              y2={positions[target][1]}
            />
          ))}

          {view && (
            <circle
              className={styles.lensRing}
              cx={positions[view.anchor][0]}
              cy={positions[view.anchor][1]}
              r={LENS_RADIUS}
            />
          )}

          {points.map((_, index) => (
            <circle
              key={index}
              className={classOf(index)}
              cx={positions[index][0]}
              cy={positions[index][1]}
              r={radiusOf(index)}
              // 렌즈가 켜지면 색은 배역이 정한다. 꺼져 있을 때만 왜곡 색을 칠한다.
              fill={roles === null ? scale(ratios[index]) : undefined}
            />
          ))}
        </svg>
      </div>

      {/* 렌즈가 켜지면 점 색은 이 계단을 따르지 않는다. 범례를 물려 지금 읽을 것이 아님을 알린다. */}
      <div className={`${styles.legend} ${view ? styles.legendMuted : ''}`}>
        <span>{labels.legendLow}</span>
        <span
          className={styles.legendBar}
          style={{ background: `linear-gradient(90deg, ${scale(0)}, ${scale(0.5)}, ${scale(1)})` }}
        />
        <span>{labels.legendHigh}</span>
      </div>

      {view ? (
        <p className={styles.lensReadout}>
          <span className={styles.lensKept}>
            {labels.kept} {view.kept.length}
          </span>
          <span className={styles.lensImposter}>
            {labels.imposters} {view.imposters.length}
          </span>
          <span className={styles.lensPushed}>
            {labels.pushed} {view.pushed.length}
          </span>
          <span className={styles.lensOf}>k = {neighbors}</span>
        </p>
      ) : (
        <p className={styles.lensReadout}>{labels.idle}</p>
      )}
    </>
  );
}
