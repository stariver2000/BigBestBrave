'use client';

/**
 * 문장과 라벨 판.
 *
 * 논문의 실험 화면(그림 4)이 시청자에게 준 것 - 유형이 달린 대본과 갈래 필터 -
 * 을 만드는 사람 쪽으로 돌려 놓았다. 문장을 고르고 갈래에서 유형을 짚으면
 * 라벨이 붙고, 갈래를 끄면 그 문장이 접힌다.
 *
 * 키보드만으로도 라벨을 달 수 있다: ↑↓로 문장을 옮기고, 1~8로 갈래를 열고,
 * 1~4로 유형을 고르고, Backspace로 지운다.
 */

import { useCallback, useRef, useState } from 'react';
import {
  CATEGORIES,
  categoryOf,
  typesOf,
  type CategoryId,
  type Label,
  type Sentence,
  type TypeId,
} from '../../../core/howto';
import { Button, Panel } from '../../../kit';
import { CATEGORY_COLORS } from '../config';
import type { ScriptDictionary } from '../dictionary';
import { fill } from './Script';
import styles from './script.module.css';

export function Board({
  dict,
  sentences,
  labels,
  suggestions,
  visible,
  filter,
  onToggleFilter,
  onResetFilter,
  onLabel,
}: {
  dict: ScriptDictionary;
  sentences: readonly Sentence[];
  labels: readonly Label[];
  suggestions: readonly ({ type: TypeId; cue: string } | null)[];
  visible: Set<CategoryId>;
  filter: string;
  onToggleFilter: (category: CategoryId) => void;
  onResetFilter: () => void;
  onLabel: (index: number, label: Label) => void;
}) {
  const [selected, setSelected] = useState(0);
  const [openCategory, setOpenCategory] = useState<CategoryId | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // 라벨의 갈래가 꺼져 있으면 접는다. 미정 문장은 라벨을 달아야 하니 항상 보인다.
  const isVisible = useCallback(
    (index: number) => {
      const label = labels[index];
      return label === null || visible.has(categoryOf(label));
    },
    [labels, visible],
  );
  const visibleIndexes = sentences.map((_, i) => i).filter(isVisible);
  const hiddenCount = sentences.length - visibleIndexes.length;

  const move = useCallback(
    (delta: number) => {
      if (visibleIndexes.length === 0) return;
      const at = visibleIndexes.indexOf(selected);
      const next = at < 0 ? 0 : Math.min(visibleIndexes.length - 1, Math.max(0, at + delta));
      setSelected(visibleIndexes[next]);
      setOpenCategory(null);
    },
    [selected, visibleIndexes],
  );

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      // 입력 요소 안에서는 끼어들지 않는다.
      if ((event.target as HTMLElement).tagName === 'TEXTAREA') return;
      if (event.key === 'ArrowDown') {
        move(1);
        event.preventDefault();
      } else if (event.key === 'ArrowUp') {
        move(-1);
        event.preventDefault();
      } else if (event.key === 'Escape') {
        setOpenCategory(null);
      } else if (event.key === 'Backspace' || event.key === 'Delete') {
        onLabel(selected, null);
        event.preventDefault();
      } else if (/^[1-9]$/.test(event.key)) {
        const digit = Number(event.key);
        if (openCategory === null) {
          if (digit <= CATEGORIES.length) {
            setOpenCategory(CATEGORIES[digit - 1]);
            event.preventDefault();
          }
        } else {
          const types = typesOf(openCategory);
          if (digit <= types.length) {
            onLabel(selected, types[digit - 1]);
            setOpenCategory(null);
            event.preventDefault();
          }
        }
      }
    },
    [move, onLabel, openCategory, selected],
  );

  return (
    <Panel title={dict.board.title} note={dict.board.note}>
      <div className={styles.filterRow} role="group" aria-label={dict.board.filterTitle}>
        {CATEGORIES.map((category) => {
          const on = visible.has(category);
          return (
            <button
              key={category}
              type="button"
              className={styles.filterChip}
              data-on={on || undefined}
              style={{ '--cat': CATEGORY_COLORS[category] } as React.CSSProperties}
              onClick={() => onToggleFilter(category)}
              aria-pressed={on}
            >
              <span className={styles.dot} aria-hidden />
              {dict.categories[category]}
            </button>
          );
        })}
        {filter !== '' && (
          <button type="button" className={styles.filterReset} onClick={onResetFilter}>
            {dict.board.filterReset}
          </button>
        )}
      </div>
      {hiddenCount > 0 && (
        <p className={styles.hiddenNote}>{fill(dict.board.hiddenBySentence, { count: hiddenCount })}</p>
      )}

      <div
        ref={listRef}
        className={styles.board}
        tabIndex={0}
        onKeyDown={onKeyDown}
        aria-label={dict.board.title}
      >
        {sentences.map((sentence, index) => {
          if (!isVisible(index)) return null;
          const label = labels[index];
          const suggestion = suggestions[index];
          const isSelected = index === selected;
          return (
            <div
              key={`${index}-${sentence.start}`}
              className={styles.row}
              data-selected={isSelected || undefined}
            >
              <button
                type="button"
                className={styles.rowMain}
                onClick={() => {
                  setSelected(index);
                  setOpenCategory(label !== null ? categoryOf(label) : null);
                }}
              >
                <span className={styles.rowIndex}>{index + 1}</span>
                <span className={styles.rowText}>{sentence.text}</span>
                {label !== null ? (
                  <span
                    className={styles.typeChip}
                    style={{ '--cat': CATEGORY_COLORS[categoryOf(label)] } as React.CSSProperties}
                  >
                    <span className={styles.dot} aria-hidden />
                    {dict.types[label].name}
                  </span>
                ) : (
                  <span className={styles.unsetChip}>{dict.board.unlabeled}</span>
                )}
              </button>

              {label === null && suggestion && (
                <div className={styles.suggestRow}>
                  <span
                    className={styles.suggestText}
                    style={{ '--cat': CATEGORY_COLORS[categoryOf(suggestion.type)] } as React.CSSProperties}
                  >
                    <span className={styles.dot} aria-hidden />
                    {fill(dict.board.suggestion, {
                      type: dict.types[suggestion.type].name,
                      cue: suggestion.cue,
                    })}
                  </span>
                  <Button onClick={() => onLabel(index, suggestion.type)}>{dict.board.adopt}</Button>
                </div>
              )}

              {isSelected && (
                <div className={styles.picker}>
                  <div className={styles.pickerCategories}>
                    {CATEGORIES.map((category, categoryIndex) => (
                      <button
                        key={category}
                        type="button"
                        className={styles.pickerCategory}
                        data-open={openCategory === category || undefined}
                        style={{ '--cat': CATEGORY_COLORS[category] } as React.CSSProperties}
                        onClick={() => setOpenCategory(openCategory === category ? null : category)}
                      >
                        <span className={styles.pickerDigit}>{categoryIndex + 1}</span>
                        {dict.categories[category]}
                      </button>
                    ))}
                    <button
                      type="button"
                      className={styles.pickerClear}
                      onClick={() => {
                        onLabel(index, null);
                        setOpenCategory(null);
                      }}
                    >
                      {dict.board.clear}
                    </button>
                  </div>
                  {openCategory !== null && (
                    <div className={styles.pickerTypes}>
                      {typesOf(openCategory).map((type, typeIndex) => (
                        <button
                          key={type}
                          type="button"
                          className={styles.pickerType}
                          data-current={label === type || undefined}
                          style={{ '--cat': CATEGORY_COLORS[openCategory] } as React.CSSProperties}
                          onClick={() => {
                            onLabel(index, type);
                            setOpenCategory(null);
                          }}
                          title={dict.types[type].definition}
                        >
                          <span className={styles.pickerDigit}>{typeIndex + 1}</span>
                          <span>
                            {dict.types[type].name}
                            <small className={styles.typeDefinition}>{dict.types[type].definition}</small>
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <p className={styles.keyboardHint}>{dict.board.keyboard}</p>
    </Panel>
  );
}
