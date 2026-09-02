'use client';

/**
 * 구성 비율 판.
 *
 * 그림 2가 말뭉치 전체에서 한 일 - 갈래·유형이 영상을 얼마나 차지하는지 -
 * 을 내 대본 하나에 대해 한다. 견주는 잣대는 부록 표 4·5의 평균±1SD 띠다.
 * 논문이 시간으로 잰 비율을 여기서는 글자 수로 근사한다(패널 설명에 적는다).
 */

import {
  CATEGORIES,
  CATEGORY_STATS,
  TYPES,
  TYPE_STATS,
  verdictAgainst,
  type Composition,
} from '../../../core/howto';
import { Badge, Panel, Segmented } from '../../../kit';
import { CATEGORY_COLORS } from '../config';
import type { ScriptDictionary } from '../dictionary';
import { fill } from './Script';
import styles from './script.module.css';

const pct = (value: number) => value.toFixed(1);

export function Mix({
  dict,
  comp,
  byType,
  onByType,
}: {
  dict: ScriptDictionary;
  comp: Composition;
  byType: boolean;
  onByType: (byType: boolean) => void;
}) {
  const hasLabels = comp.labeledChars > 0;

  const rows = byType
    ? TYPES.filter((type) => (comp.typeShare[type.id] ?? 0) > 0).map((type) => ({
        key: type.id as string,
        name: dict.types[type.id].name,
        category: type.category,
        share: comp.typeShare[type.id] ?? 0,
        stats: TYPE_STATS[type.id],
      }))
    : CATEGORIES.filter((category) => (comp.categoryShare[category] ?? 0) > 0).map((category) => ({
        key: category as string,
        name: dict.categories[category],
        category,
        share: comp.categoryShare[category] ?? 0,
        stats: CATEGORY_STATS[category],
      }));

  const absentTypeCount = byType
    ? TYPES.length - rows.length
    : CATEGORIES.length - rows.length;

  return (
    <Panel
      title={dict.mix.title}
      note={dict.mix.note}
      actions={
        <Segmented
          options={[
            { value: 'category', label: dict.mix.byCategory },
            { value: 'type', label: dict.mix.byTypeLabel },
          ]}
          value={byType ? 'type' : 'category'}
          onChange={(value) => onByType(value === 'type')}
        />
      }
    >
      {!hasLabels ? (
        <p className={styles.empty}>{dict.mix.needLabels}</p>
      ) : (
        <>
          <div className={styles.bar} role="img" aria-label={dict.mix.title}>
            {CATEGORIES.map((category) => {
              const share = comp.categoryShare[category] ?? 0;
              if (share <= 0) return null;
              return (
                <span
                  key={category}
                  className={styles.barSegment}
                  style={{ inlineSize: `${share}%`, background: CATEGORY_COLORS[category] }}
                  title={`${dict.categories[category]} ${pct(share)}%`}
                />
              );
            })}
          </div>

          <table className={styles.table}>
            <thead>
              <tr>
                <th>{dict.mix.headers.name}</th>
                <th className={styles.num}>{dict.mix.headers.yours}</th>
                <th className={styles.num}>{dict.mix.headers.corpus}</th>
                <th>{dict.mix.headers.verdict}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                const verdict = verdictAgainst(row.share, row.stats);
                return (
                  <tr key={row.key}>
                    <td>
                      <span
                        className={styles.cellName}
                        style={{ '--cat': CATEGORY_COLORS[row.category] } as React.CSSProperties}
                      >
                        <span className={styles.dot} aria-hidden />
                        {row.name}
                      </span>
                    </td>
                    <td className={styles.num}>{pct(row.share)}%</td>
                    <td className={styles.num}>
                      {pct(row.stats.mean)}±{pct(row.stats.sd)}%
                    </td>
                    <td>
                      <Badge tone={verdict === 'within' ? 'pass' : 'neutral'}>
                        {dict.mix.verdicts[verdict]}
                      </Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {absentTypeCount > 0 && (
            <p className={styles.absentNote}>{fill(dict.mix.absentTypes, { count: absentTypeCount })}</p>
          )}
        </>
      )}
    </Panel>
  );
}
