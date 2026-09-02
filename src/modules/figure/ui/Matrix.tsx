'use client';

/**
 * 갈래표 판. 표 1을 인쇄된 그대로, 칸마다 눌러 볼 수 있게 편다.
 *
 * 칸의 진하기는 출현 수에 비례한다(그 행의 갈래색). 고른 칸은 URL에 실려
 * "이 칸을 봐 달라"는 링크가 된다. 화살표 키로 칸을 옮겨 다닐 수 있다.
 */

import { useCallback } from 'react';
import {
  COLUMN_TOTALS,
  DATA_TYPES,
  ENCODINGS,
  ENCODING_KINDS,
  pairing,
  rowOf,
  type EncodingId,
} from '../../../core/taviz';
import { Panel } from '../../../kit';
import { CATEGORY_COLORS } from '../config';
import type { FigureDictionary } from '../dictionary';
import { fill } from './Figure';
import styles from './figure.module.css';

/** 가장 큰 셀(Example×Image=144)을 기준으로 진하기를 잰다. */
const MAX_CELL = Math.max(...DATA_TYPES.flatMap((row) => ENCODINGS.map((encoding) => row.counts[encoding])));

const TYPE_ALPHABET = 'abcdefghijk';

export function Matrix({
  dict,
  cell,
  onCell,
}: {
  dict: FigureDictionary;
  cell: string;
  onCell: (cell: string) => void;
}) {
  const selectedRow = cell === '' ? -1 : TYPE_ALPHABET.indexOf(cell[0]);
  const selectedCol = cell === '' ? -1 : Number(cell[1]);

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Escape') {
        onCell('');
        return;
      }
      const deltas: Record<string, [number, number]> = {
        ArrowUp: [-1, 0],
        ArrowDown: [1, 0],
        ArrowLeft: [0, -1],
        ArrowRight: [0, 1],
      };
      const delta = deltas[event.key];
      if (!delta) return;
      const row = selectedRow < 0 ? 0 : Math.min(DATA_TYPES.length - 1, Math.max(0, selectedRow + delta[0]));
      const col = selectedCol < 0 ? 0 : Math.min(ENCODINGS.length - 1, Math.max(0, selectedCol + delta[1]));
      onCell(`${TYPE_ALPHABET[row]}${col}`);
      event.preventDefault();
    },
    [onCell, selectedCol, selectedRow],
  );

  const picked =
    selectedRow >= 0 && selectedCol >= 0
      ? pairing(DATA_TYPES[selectedRow].id, ENCODINGS[selectedCol])
      : null;

  return (
    <Panel title={dict.matrix.title} note={dict.matrix.note}>
      <div className={styles.matrixScroll} tabIndex={0} onKeyDown={onKeyDown} aria-label={dict.matrix.title}>
        <table className={styles.matrix}>
          <thead>
            <tr>
              <th className={styles.matrixRowHead}>{dict.matrix.rowHead}</th>
              <th className={styles.num}>{dict.matrix.totalHead}</th>
              {ENCODINGS.map((encoding) => (
                <th key={encoding} className={styles.num}>
                  {dict.encodings[encoding].name.split(' (')[0]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {DATA_TYPES.map((row, rowIndex) => (
              <tr key={row.id}>
                <th
                  className={styles.matrixRowName}
                  style={{ '--cat': CATEGORY_COLORS[row.category] } as React.CSSProperties}
                >
                  <span className={styles.dot} aria-hidden />
                  {dict.dataTypes[row.id].name.split(' (')[0]}
                </th>
                <td className={styles.num}>{row.total}</td>
                {ENCODINGS.map((encoding, colIndex) => {
                  const count = row.counts[encoding];
                  const heat = count === 0 ? 0 : 0.1 + 0.55 * (count / MAX_CELL);
                  const isSelected = rowIndex === selectedRow && colIndex === selectedCol;
                  return (
                    <td key={encoding} className={styles.matrixCellWrap}>
                      <button
                        type="button"
                        className={styles.matrixCell}
                        data-selected={isSelected || undefined}
                        style={{
                          background: `color-mix(in srgb, ${CATEGORY_COLORS[row.category]} ${Math.round(heat * 100)}%, transparent)`,
                        }}
                        onClick={() => onCell(isSelected ? '' : `${TYPE_ALPHABET[rowIndex]}${colIndex}`)}
                      >
                        {count}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
            <tr className={styles.matrixTotals}>
              <th className={styles.matrixRowName}>Total</th>
              <td className={styles.num} />
              {ENCODINGS.map((encoding) => (
                <td key={encoding} className={styles.num}>
                  {COLUMN_TOTALS[encoding]}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <p className={styles.keyboardHint}>{dict.matrix.keyboard}</p>

      {picked === null ? (
        <p className={styles.empty}>{dict.matrix.pickHint}</p>
      ) : (
        <div className={styles.cellDetail}>
          <h3 className={styles.noteTitle}>
            {fill(dict.matrix.cellTitle, {
              type: dict.dataTypes[picked.dataType].name,
              encoding: dict.encodings[picked.encoding].name,
            })}
          </h3>
          <p className={styles.cellLine}>
            {fill(dict.matrix.cellLine, { count: picked.count })}{' '}
            {fill(dict.matrix.cellRowTotal, { total: picked.rowTotal })} ·{' '}
            {fill(dict.matrix.cellColumnTotal, { total: COLUMN_TOTALS[picked.encoding] })}
          </p>
          {picked.isTop && <p className={styles.cellNote}>{dict.matrix.cellTop}</p>}
          {picked.isUnseen && <p className={styles.cellNote}>{dict.matrix.cellUnseen}</p>}
          <p className={styles.cellDefinition}>{dict.encodings[picked.encoding].definition}</p>
          {ENCODING_KINDS[picked.encoding].length > 0 && (
            <p className={styles.cellKinds}>
              {dict.matrix.kindsTitle}: {ENCODING_KINDS[picked.encoding].join(' · ')}
            </p>
          )}
          {picked.encoding === ('other' as EncodingId) && (
            <p className={styles.cellKinds}>{dict.matrix.fifthColumn}</p>
          )}
        </div>
      )}
    </Panel>
  );
}
