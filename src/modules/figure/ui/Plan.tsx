'use client';

/**
 * 계획 판과 진단 판.
 *
 * 계획 판: 결과 유형을 고르고(열한 갈래, 갈래색 표식) 부호를 고르면(다섯,
 * 단추마다 말뭉치 출현 수를 미리 보여 준다) 항목이 붙는다.
 * 진단 판: 점수 없이, 논문 5장의 관찰 가운데 이 계획에 닿는 것만 보여 준다.
 */

import { useState } from 'react';
import {
  CATEGORIES,
  DATA_TYPES,
  ENCODINGS,
  pairing,
  rowOf,
  type DataTypeId,
  type PlanItem,
  type PlanSummary,
} from '../../../core/taviz';
import { Badge, Button, Panel } from '../../../kit';
import { CATEGORY_COLORS, MAX_PLAN_ITEMS } from '../config';
import type { FigureDictionary } from '../dictionary';
import { CORPUS_FILL, fill } from './Figure';
import styles from './figure.module.css';

export function Plan({
  dict,
  items,
  onChange,
}: {
  dict: FigureDictionary;
  items: readonly PlanItem[];
  onChange: (items: PlanItem[]) => void;
}) {
  const [addingType, setAddingType] = useState<DataTypeId | null>(null);
  const full = items.length >= MAX_PLAN_ITEMS;

  return (
    <Panel title={dict.plan.title} note={dict.plan.note}>
      {items.length === 0 && <p className={styles.empty}>{dict.plan.empty}</p>}
      <ul className={styles.planList}>
        {items.map((item, index) => {
          const info = pairing(item.dataType, item.encoding);
          const category = rowOf(item.dataType).category;
          return (
            <li key={`${item.dataType}-${item.encoding}-${index}`} className={styles.planItem}>
              <span
                className={styles.planName}
                style={{ '--cat': CATEGORY_COLORS[category] } as React.CSSProperties}
              >
                <span className={styles.dot} aria-hidden />
                {dict.dataTypes[item.dataType].name}
                <span className={styles.planArrow} aria-hidden>
                  →
                </span>
                {dict.encodings[item.encoding].name}
              </span>
              <span className={styles.planCorpus}>
                {fill(dict.plan.corpusLine, { count: info.count, total: info.rowTotal })}
              </span>
              <span className={styles.planBadges}>
                {info.isTop && <Badge tone="pass">{dict.plan.topBadge}</Badge>}
                {info.isUnseen && <Badge tone="neutral">{dict.plan.unseenBadge}</Badge>}
                <button
                  type="button"
                  className={styles.planRemove}
                  onClick={() => onChange(items.filter((_, at) => at !== index))}
                >
                  {dict.plan.remove}
                </button>
              </span>
            </li>
          );
        })}
      </ul>

      {addingType === null ? (
        <div className={styles.addBlock}>
          <p className={styles.addLabel}>{dict.plan.addType}</p>
          <div className={styles.typeGrid}>
            {DATA_TYPES.map((row) => (
              <button
                key={row.id}
                type="button"
                className={styles.typeButton}
                style={{ '--cat': CATEGORY_COLORS[row.category] } as React.CSSProperties}
                disabled={full}
                onClick={() => setAddingType(row.id)}
                title={dict.dataTypes[row.id].definition}
              >
                <span className={styles.dot} aria-hidden />
                {dict.dataTypes[row.id].name}
              </button>
            ))}
          </div>
          {full && <p className={styles.empty}>{fill(dict.plan.limit, { max: MAX_PLAN_ITEMS })}</p>}
        </div>
      ) : (
        <div className={styles.addBlock}>
          <p className={styles.addLabel}>
            {dict.dataTypes[addingType].name} · {dict.plan.addEncoding}
          </p>
          <div className={styles.encodingRow}>
            {ENCODINGS.map((encoding) => {
              const info = pairing(addingType, encoding);
              return (
                <Button
                  key={encoding}
                  onClick={() => {
                    onChange([...items, { dataType: addingType, encoding }]);
                    setAddingType(null);
                  }}
                >
                  {dict.encodings[encoding].name} ({info.count})
                </Button>
              );
            })}
            <button type="button" className={styles.planRemove} onClick={() => setAddingType(null)}>
              {dict.plan.cancel}
            </button>
          </div>
        </div>
      )}
    </Panel>
  );
}

export function Diagnosis({
  dict,
  items,
  summary,
}: {
  dict: FigureDictionary;
  items: readonly PlanItem[];
  summary: PlanSummary;
}) {
  return (
    <Panel title={dict.summaryPanel.title} note={dict.summaryPanel.note}>
      <div className={styles.mixRow}>
        <span className={styles.addLabel}>{dict.summaryPanel.mix}</span>
        <span className={styles.mixChips}>
          {CATEGORIES.filter((category) => summary.byCategory[category] > 0).map((category) => (
            <span
              key={category}
              className={styles.mixChip}
              style={{ '--cat': CATEGORY_COLORS[category] } as React.CSSProperties}
            >
              <span className={styles.dot} aria-hidden />
              {dict.categories[category]} ×{summary.byCategory[category]}
            </span>
          ))}
        </span>
      </div>
      <p className={styles.qualLine}>
        {fill(dict.summaryPanel.qualitative, { count: summary.qualitativeCount, total: summary.itemCount })}
        {' · '}
        {fill(dict.summaryPanel.corpusQualitative, CORPUS_FILL)}
      </p>

      <h3 className={styles.noteTitle}>{dict.summaryPanel.observationsTitle}</h3>
      {summary.touchedObservations.length === 0 ? (
        <p className={styles.empty}>{items.length === 0 ? dict.plan.empty : dict.summaryPanel.noObservations}</p>
      ) : (
        <ul className={styles.observationList}>
          {summary.touchedObservations.map((id) => (
            <li key={id}>{dict.observations[id]}</li>
          ))}
        </ul>
      )}
      {summary.unseenPairings.length > 0 && (
        <p className={styles.unseenLine}>
          {summary.unseenPairings.map((item) => (
            <span key={`${item.dataType}-${item.encoding}`} className={styles.unseenItem}>
              {dict.dataTypes[item.dataType].name} → {dict.encodings[item.encoding].name}:{' '}
              {dict.matrix.cellUnseen}
            </span>
          ))}
        </p>
      )}
    </Panel>
  );
}
