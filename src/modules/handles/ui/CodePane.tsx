'use client';

/**
 * 코드 판. 블록을 누르면 그 블록이 그리는 요소가 그림에서 밝아진다(DG1).
 * 코드는 그림과 같은 하나의 명세에서 나온다 - 사람이 쓴 소스를 해석한 것이 아니다.
 */

import { lineCount, type CodeBlock } from '../../../core/chartspec';
import { Panel } from '../../../kit';
import type { HandlesDictionary } from '../dictionary';
import { fill } from './Handles';
import styles from './handles.module.css';

export function CodePane({
  dict,
  code,
  picked,
  onPick,
}: {
  dict: HandlesDictionary;
  code: readonly CodeBlock[];
  picked: string;
  onPick: (picked: string) => void;
}) {
  return (
    <Panel
      title={dict.code.title}
      note={dict.code.note}
      actions={<span className={styles.lineCount}>{fill(dict.code.lines, { lines: lineCount(code) })}</span>}
    >
      <div className={styles.codeList}>
        {code.map((block) => (
          <button
            key={block.nodeId}
            type="button"
            className={styles.codeBlock}
            data-picked={picked === block.nodeId || undefined}
            onClick={() => onPick(picked === block.nodeId ? '' : block.nodeId)}
          >
            <span className={styles.codeLabel}>{dict.nodes[block.nodeId]}</span>
            <pre className={styles.codeText}>{block.lines.join('\n')}</pre>
          </button>
        ))}
      </div>
      <p className={styles.hint}>{dict.code.clickToPick}</p>
      <p className={styles.notRun}>{dict.code.notRun}</p>
    </Panel>
  );
}
