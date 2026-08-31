'use client';

/** 값과 단위를 함께 보여 주는 슬라이더. 표시 조건은 숫자를 보면서 맞춰야 한다. */

import { Field } from '../../../kit';
import styles from './subtitle.module.css';

export function SettingSlider({
  label,
  value,
  unit,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  unit: string;
  min: number;
  max: number;
  step: number;
  onChange: (next: number) => void;
}) {
  return (
    <Field
      label={
        <>
          {label} <span className={styles.settingValue}>{value}{unit && ` ${unit}`}</span>
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
