'use client';

/**
 * 배치 판. 그래프를 그리고, 견본과 목표를 고르고, 밀기를 건다.
 */

import type { ReactNode } from 'react';
import { GOALS, SAMPLES, type Graph, type Point } from '../../../core/graphaes';
import { Badge, Button, Panel, Segmented } from '../../../kit';
import type { LayoutDictionary } from '../dictionary';
import { MAX_STEPS } from '../config';
import type { LayoutState } from '../state';
import { fill } from './Layout';
import styles from './layout.module.css';

const SIZE = 300;
const PAD = 14;

export function Stage({
  dict,
  graph,
  points,
  state,
  onChange,
  steps,
  running,
  onToggle,
  onReset,
  chip,
}: {
  dict: LayoutDictionary;
  graph: Graph;
  points: readonly Point[];
  state: LayoutState;
  onChange: (patch: Partial<LayoutState>) => void;
  steps: number;
  running: boolean;
  onToggle: () => void;
  onReset: () => void;
  chip: ReactNode;
}) {
  const at = (point: Point) => ({
    x: PAD + point.x * (SIZE - 2 * PAD),
    y: PAD + (1 - point.y) * (SIZE - 2 * PAD),
  });
  const settled = steps >= MAX_STEPS;

  return (
    <Panel title={dict.stage.title} note={dict.stage.note} actions={running ? chip : undefined}>
      <div className={styles.controls}>
        <Segmented
          options={SAMPLES.map((sample) => ({
            value: sample.id,
            label: dict.samples[sample.id].name,
          }))}
          value={state.sample}
          onChange={(sample) => onChange({ sample })}
          dense
        />
        <Segmented
          options={GOALS.map((goal) => ({ value: goal, label: dict.goals[goal].name }))}
          value={state.goal}
          onChange={(goal) => onChange({ goal })}
          dense
        />
      </div>
      <p className={styles.goalWhat}>{dict.goals[state.goal].what}</p>

      <div className={styles.stageRow}>
        <svg
          className={styles.plot}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          role="img"
          aria-label={dict.stage.title}
        >
          {graph.edges.map(([a, b]) => {
            const from = at(points[a]);
            const to = at(points[b]);
            return (
              <line
                key={`${a}-${b}`}
                className={styles.edge}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
              />
            );
          })}
          {points.map((point, index) => {
            const spot = at(point);
            return <circle key={index} className={styles.node} cx={spot.x} cy={spot.y} r={3.6} />;
          })}
        </svg>

        <div className={styles.stageSide}>
          <p className={styles.countLine}>
            {fill(dict.stage.nodes, { nodes: graph.nodeCount, edges: graph.edges.length })}
          </p>
          <p className={styles.hint}>{dict.samples[state.sample].hint}</p>
          <div className={styles.runRow}>
            <Button variant="primary" onClick={onToggle}>
              {running ? dict.stage.stop : dict.stage.run}
            </Button>
            <Button onClick={onReset}>{dict.stage.reset}</Button>
          </div>
          <p className={styles.stepLine}>{fill(dict.stage.stepLine, { steps })}</p>
          {settled && <Badge tone="pass">{dict.stage.settled}</Badge>}
          <p className={styles.hint}>{dict.stage.keyboard}</p>
        </div>
      </div>
    </Panel>
  );
}
