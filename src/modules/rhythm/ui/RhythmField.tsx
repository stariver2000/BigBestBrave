'use client';

/**
 * 리듬 마당.
 *
 * 가운데가 나이고, 이름 붙은 리듬들이 닮은 만큼 가까이 놓인다.
 * 논문이 찾은 것 — 진동 패턴이 닮을수록 상대에게 가까이 선다 — 을 거리로 그대로 옮긴 그림이다.
 * 각도는 리듬마다 고정해 두었다. 닮음이 바뀔 때 점이 원 위를 미끄러지듯 움직여,
 * 무엇이 가까워지고 멀어졌는지 눈으로 따라갈 수 있다.
 */

import { PATTERNS, type Match } from '../../../core/rhythm';
import { FIELD_RADIUS, FIELD_SIZE } from '../config';
import styles from './rhythm.module.css';

/** 닮음(0~1)을 중심으로부터의 거리로 바꾼다. 닮을수록 가깝다. */
function radiusOf(similarity: number): number {
  const clamped = Math.max(0, Math.min(1, similarity));
  return FIELD_RADIUS.min + (1 - clamped) * (FIELD_RADIUS.max - FIELD_RADIUS.min);
}

/** 리듬마다 고정된 각도. 목록 순서로 원을 나눈다. */
function angleOf(patternId: string): number {
  const index = PATTERNS.findIndex((pattern) => pattern.id === patternId);
  // 위쪽(-90도)에서 시작해 시계 방향으로 돈다.
  return (index / PATTERNS.length) * Math.PI * 2 - Math.PI / 2;
}

export function RhythmField({
  matches,
  selectedId,
  youLabel,
  nameOf,
  onSelect,
}: {
  matches: readonly Match[];
  selectedId: string | null;
  youLabel: string;
  nameOf: (patternId: string) => string;
  onSelect: (patternId: string) => void;
}) {
  const center = FIELD_SIZE / 2;

  return (
    <svg className={styles.field} viewBox={`0 0 ${FIELD_SIZE} ${FIELD_SIZE}`} role="group">
      {[0.34, 0.67, 1].map((step) => (
        <circle
          key={step}
          className={styles.fieldRing}
          cx={center}
          cy={center}
          r={FIELD_RADIUS.min + (FIELD_RADIUS.max - FIELD_RADIUS.min) * step}
        />
      ))}

      {matches.map((match) => {
        const angle = angleOf(match.patternId);
        const radius = radiusOf(match.similarity);
        const x = center + Math.cos(angle) * radius;
        const y = center + Math.sin(angle) * radius;
        const isActive = selectedId === match.patternId;
        const isClose = match.closeness !== 'distinct';

        return (
          <g
            key={match.patternId}
            className={styles.node}
            onClick={() => onSelect(match.patternId)}
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') onSelect(match.patternId);
            }}
          >
            {/* 중심에서 뻗는 선. 거리가 눈에 들어오게 한다. */}
            <line className={styles.fieldSpoke} x1={center} y1={center} x2={x} y2={y} />
            <circle
              className={`${styles.nodeDot} ${isClose ? styles.nodeDotClose : ''} ${isActive ? styles.nodeDotActive : ''}`}
              cx={x}
              cy={y}
              r={isActive ? 13 : 10}
              strokeWidth={1.5}
            />
            <text
              className={`${styles.nodeLabel} ${isActive ? styles.nodeLabelActive : ''}`}
              x={x}
              y={y - 20}
            >
              {nameOf(match.patternId)}
            </text>
          </g>
        );
      })}

      <circle className={styles.youHalo} cx={center} cy={center} r={26} />
      <circle className={styles.you} cx={center} cy={center} r={8} />
      <text className={styles.nodeLabel} x={center} y={center + 34}>
        {youLabel}
      </text>
    </svg>
  );
}
