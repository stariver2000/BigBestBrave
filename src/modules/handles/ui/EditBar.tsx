'use client';

/**
 * 손잡이 줄. 끌기로 되는 것과 같은 조작을 단추로도 둔다 - 끌기를 못 하는
 * 사람도 같은 일을 할 수 있어야 하기 때문이다.
 * 조작 뒤에는 코드가 몇 줄 따라 바뀌었는지 함께 적는다(이 페이지의 요점).
 */

import { Badge, Button, Panel } from '../../../kit';
import type { Edit, Spec } from '../../../core/chartspec';
import type { HandlesDictionary } from '../dictionary';
import { fill } from './Handles';
import styles from './handles.module.css';

export function EditBar({
  dict,
  spec,
  lastEdit,
  onEdit,
  onReset,
}: {
  dict: HandlesDictionary;
  spec: Spec;
  lastEdit: { label: string; lines: number } | null;
  onEdit: (edit: Edit, label: string) => void;
  onReset: () => void;
}) {
  const modeEdit: Edit =
    spec.mode === 'grouped' ? { kind: 'toMode', mode: 'stacked' } : { kind: 'toMode', mode: 'grouped' };
  const modeLabel = spec.mode === 'grouped' ? dict.edits.toStacked : dict.edits.toGrouped;

  return (
    <Panel title={dict.edits.title} note={dict.edits.note}>
      <div className={styles.editRow}>
        <Button variant="primary" onClick={() => onEdit(modeEdit, modeLabel)}>
          {modeLabel}
        </Button>
        <Button
          onClick={() =>
            onEdit(
              { kind: 'setInteraction', interaction: spec.interaction === 'clickDim' ? 'none' : 'clickDim' },
              spec.interaction === 'clickDim' ? dict.edits.noInteraction : dict.edits.clickDim,
            )
          }
        >
          {spec.interaction === 'clickDim' ? dict.edits.noInteraction : dict.edits.clickDim}
        </Button>
        <Button
          onClick={() =>
            onEdit(
              {
                kind: 'setInteraction',
                interaction: spec.interaction === 'hoverTooltip' ? 'none' : 'hoverTooltip',
              },
              spec.interaction === 'hoverTooltip' ? dict.edits.noInteraction : dict.edits.hoverTooltip,
            )
          }
        >
          {dict.edits.hoverTooltip}
        </Button>
        <Button onClick={() => onEdit({ kind: 'toggleLegend' }, dict.edits.toggleLegend)}>
          {dict.edits.toggleLegend}
        </Button>
        <Button onClick={onReset}>{dict.edits.reset}</Button>
      </div>

      {lastEdit === null ? (
        <p className={styles.hint}>{dict.edits.nothingYet}</p>
      ) : (
        <p className={styles.lastEdit}>
          {fill(dict.edits.lastEdit, { what: lastEdit.label })}
          {' · '}
          <Badge tone={lastEdit.lines >= 5 ? 'pass' : 'neutral'}>
            {fill(dict.edits.changedLines, { lines: lastEdit.lines })}
          </Badge>
        </p>
      )}
    </Panel>
  );
}
