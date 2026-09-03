'use client';

/**
 * 특징 손잡이. 슬라이더 여덟 개.
 *
 * 가르는 특징과 잡음 특징을 화면에서 구별해 두지 않는다 - 무엇이 무리를
 * 만드는지 스스로 찾아내는 것이 이 페이지의 요점이기 때문이다.
 * 슬라이더는 키보드 화살표로도 돌아간다(브라우저가 range에 기본으로 준다).
 */

import { FEATURES, WEIGHT_MAX, WEIGHT_MIN, WEIGHT_STEP } from '../../../core/featurespace';
import { Button, Panel } from '../../../kit';
import type { FocusDictionary } from '../dictionary';
import { fill } from './Focus';
import styles from './focus.module.css';

export function Knobs({
  dict,
  weights,
  onChange,
  defaults,
}: {
  dict: FocusDictionary;
  weights: readonly number[];
  onChange: (weights: number[]) => void;
  defaults: readonly number[];
}) {
  const setOne = (index: number, value: number) => {
    const next = [...weights];
    next[index] = value;
    onChange(next);
  };

  return (
    <Panel
      title={dict.knobs.title}
      note={dict.knobs.note}
      actions={
        <span className={styles.knobActions}>
          <Button onClick={() => onChange([...defaults])}>{dict.knobs.reset}</Button>
          <Button onClick={() => onChange(FEATURES.map(() => 0))}>{dict.knobs.allOff}</Button>
        </span>
      }
    >
      <ul className={styles.knobList}>
        {FEATURES.map((feature, index) => {
          const copy = dict.features[feature.id];
          return (
            <li key={feature.id} className={styles.knob}>
              <label className={styles.knobLabel} htmlFor={`knob-${feature.id}`}>
                <span className={styles.knobName}>{copy.name}</span>
                <span className={styles.knobHint}>{copy.hint}</span>
              </label>
              <input
                id={`knob-${feature.id}`}
                className={styles.slider}
                type="range"
                min={WEIGHT_MIN}
                max={WEIGHT_MAX}
                step={WEIGHT_STEP}
                value={weights[index]}
                aria-label={fill(dict.knobs.weightLabel, { name: copy.name })}
                onChange={(event) => setOne(index, Number(event.target.value))}
              />
              <span className={styles.knobValue}>{weights[index].toFixed(2)}</span>
              <button
                type="button"
                className={styles.onlyThis}
                onClick={() => onChange(FEATURES.map((_, at) => (at === index ? 1 : 0)))}
              >
                {dict.knobs.onlyThis}
              </button>
            </li>
          );
        })}
      </ul>
      <p className={styles.keyboardHint}>{dict.knobs.keyboard}</p>
    </Panel>
  );
}
