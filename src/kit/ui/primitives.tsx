'use client';

/**
 * 모든 페이지가 재사용하는 최소 UI 부품.
 *
 * 페이지 고유 컴포넌트는 각 모듈 안에 두고, 여기에는 어떤 주제에서도 의미가 통하는 것만 남긴다.
 * 스타일은 토큰 변수만 읽으므로 부품 자체는 특정 색·간격을 알지 못한다.
 *
 * 각 요소에 `data-part` 이름표를 단다. CSS 모듈의 클래스 이름은 빌드할 때마다 뒤섞이므로,
 * 룩이 부품의 생김새를 바꾸려면 흔들리지 않는 이름이 필요하다. 룩은 이 이름만 보고 겨눈다
 * (`[data-look='x'] [data-part='panel']`). 그래서 룩마다 자기 CSS 파일을 가질 수 있다.
 */

import type { ChangeEvent, ReactNode } from 'react';
import styles from './ui.module.css';

export function Panel({
  title,
  note,
  actions,
  children,
}: {
  title?: ReactNode;
  note?: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className={styles.panel} data-part="panel">
      {(title || actions) && (
        <header className={styles.panelHeader} data-part="panel-header">
          <div className={styles.panelHeading} data-part="panel-heading">
            {title && <h2 className={styles.panelTitle} data-part="panel-title">
              {title}
            </h2>}
            {note && <p className={styles.panelNote} data-part="panel-note">
              {note}
            </p>}
          </div>
          {actions}
        </header>
      )}
      {children}
    </section>
  );
}

export function Field({ label, children }: { label: ReactNode; children: ReactNode }) {
  return (
    <label className={styles.field} data-part="field">
      <span className={styles.label} data-part="label">
        {label}
      </span>
      {children}
    </label>
  );
}

export function TextInput({
  value,
  onChange,
  placeholder,
  invalid = false,
  spellCheck = false,
}: {
  value: string;
  onChange: (next: string) => void;
  placeholder?: string;
  invalid?: boolean;
  spellCheck?: boolean;
}) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value);
  return (
    <input
      data-part="input"
      data-invalid={invalid || undefined}
      className={`${styles.input} ${invalid ? styles.inputInvalid : ''}`}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      spellCheck={spellCheck}
      autoComplete="off"
    />
  );
}

export function Button({
  onClick,
  children,
  variant = 'default',
  title,
  disabled = false,
}: {
  onClick: () => void;
  children: ReactNode;
  variant?: 'default' | 'primary';
  title?: string;
  disabled?: boolean;
}) {
  const className = variant === 'primary' ? `${styles.button} ${styles.buttonPrimary}` : styles.button;
  return (
    <button
      type="button"
      data-part="button"
      data-variant={variant}
      className={className}
      onClick={onClick}
      title={title}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export interface SegmentedOption<T extends string> {
  value: T;
  label: string;
  title?: string;
}

/**
 * 값이 5~10개 사이인 단일 선택에 쓴다. 그보다 많으면 select가 낫다.
 * dense는 라벨이 짧을 때(포맷 이름 등) 한 줄에 더 많이 넣기 위한 조밀 배치다.
 */
export function Segmented<T extends string>({
  options,
  value,
  onChange,
  dense = false,
}: {
  options: readonly SegmentedOption<T>[];
  value: T;
  onChange: (next: T) => void;
  dense?: boolean;
}) {
  return (
    <div
      className={`${styles.segmented} ${dense ? styles.segmentedDense : ''}`}
      data-part="segmented"
      role="group"
    >
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          data-part="segment"
          data-active={option.value === value || undefined}
          title={option.title}
          aria-pressed={option.value === value}
          className={`${styles.segment} ${option.value === value ? styles.segmentActive : ''}`}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export function Badge({ children, tone = 'neutral' }: { children: ReactNode; tone?: 'neutral' | 'pass' | 'fail' }) {
  const toneClass = tone === 'pass' ? styles.badgePass : tone === 'fail' ? styles.badgeFail : '';
  return (
    <span className={`${styles.badge} ${toneClass}`} data-part="badge" data-tone={tone}>
      {children}
    </span>
  );
}
