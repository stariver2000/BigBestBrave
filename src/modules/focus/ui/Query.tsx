'use client';

/**
 * 부탁 판. 세 질의 가운데 하나를 골라 걸면 탐색이 한 걸음씩 돈다.
 *
 * 논문은 100회를 돌려 결과만 돌려주지만(6.2절), 여기서는 걸음마다 무엇이
 * 움직이는지 보인다. 멎고 나서 "무엇이 움직였나"가 남는 것이 아하 지점이다.
 */

import type { ReactNode } from 'react';
import { QUERIES, type QueryId, type SearchState } from '../../../core/featurespace';
import { Badge, Button, Panel, Segmented } from '../../../kit';
import type { Locale } from '../../../core/i18n';
import type { FocusDictionary } from '../dictionary';
import { featureName, fill } from './Focus';
import styles from './focus.module.css';

export function Query({
  dict,
  query,
  onQuery,
  available,
  search,
  moved,
  running,
  onRun,
  chip,
}: {
  dict: FocusDictionary;
  locale: Locale;
  query: QueryId;
  onQuery: (query: QueryId) => void;
  available: boolean;
  search: SearchState | null;
  moved: { index: number; from: number; to: number; delta: number }[];
  running: boolean;
  onRun: () => void;
  onToggle: () => void;
  chip: ReactNode;
}) {
  return (
    <Panel title={dict.query.title} note={dict.query.note} actions={search ? chip : undefined}>
      <Segmented
        options={QUERIES.map((entry) => ({ value: entry.id, label: dict.queries[entry.id].name }))}
        value={query}
        onChange={onQuery}
        dense
      />
      <p className={styles.queryWhat}>{dict.queries[query].what}</p>

      {!available ? (
        <p className={styles.empty}>{dict.query.needGroups}</p>
      ) : (
        <div className={styles.queryRow}>
          <Button variant="primary" onClick={onRun}>
            {search === null ? dict.query.run : dict.query.again}
          </Button>
          {search !== null && (
            <span className={styles.stepLine}>
              {fill(dict.query.stepLine, {
                step: search.step,
                score: search.score.toFixed(2),
              })}
            </span>
          )}
          {search?.settled && <Badge tone="pass">{dict.query.settled}</Badge>}
          {running && !search?.settled && <span className={styles.pulse} aria-hidden />}
        </div>
      )}

      {search !== null && (
        <>
          <h3 className={styles.noteTitle}>{dict.query.movedTitle}</h3>
          {moved.length === 0 ? (
            <p className={styles.empty}>{dict.query.nothingMoved}</p>
          ) : (
            <ul className={styles.movedList}>
              {moved.map((move) => (
                <li key={move.index} className={styles.movedItem}>
                  <span className={styles.movedName}>
                    {fill(dict.query.movedLine, {
                      name: featureName(dict, move.index),
                      from: move.from.toFixed(2),
                      to: move.to.toFixed(2),
                    })}
                  </span>
                  <span
                    className={styles.movedBar}
                    data-direction={move.delta > 0 ? 'up' : 'down'}
                    style={{ inlineSize: `${Math.min(100, Math.abs(move.delta) * 50)}%` }}
                    aria-hidden
                  />
                </li>
              ))}
            </ul>
          )}
          {search.settled && moved.length > 0 && (
            <p className={styles.handOver}>{dict.query.handOver}</p>
          )}
        </>
      )}

      <p className={styles.iterationNote}>{dict.query.iterationNote}</p>
    </Panel>
  );
}
