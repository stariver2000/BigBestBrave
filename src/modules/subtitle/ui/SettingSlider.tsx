'use client';

/**
 * 값과 단위를 함께 보여 주는 슬라이더. 표시 조건은 숫자를 보면서 맞춰야 한다.
 * 값 옆에는 그 값이 어디서 온 것인지(당신의 환경 / 실무 관행 / 이 화면이 고른 값)를 붙인다.
 */

import { Field } from '../../../kit';
import styles from './subtitle.module.css';

export function SettingSlider({
  label,
  value,
  unit,
  min,
  max,
  step,
  origin,
  onChange,
}: {
  label: string;
  value: number;
  unit: string;
  min: number;
  max: number;
  step: number;
  /** 이 값의 성격을 옮긴 짧은 말. 사전에서 번역된 문구가 그대로 들어온다. */
  origin: string;
  onChange: (next: number) => void;
}) {
  return (
    <Field
      label={
        <>
          {label} <span className={styles.settingValue}>{value}{unit && ` ${unit}`}</span>{' '}
          <span className={styles.origin}>{origin}</span>
        </>
      }
    >
      <input
        className={styles.slider}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </Field>
  );
}
