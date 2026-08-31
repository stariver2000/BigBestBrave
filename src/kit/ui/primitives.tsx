'use client';

/**
 * 모든 페이지가 재사용하는 최소 UI 부품.
 *
 * 페이지 고유 컴포넌트는 각 모듈 안에 두고, 여기에는 어떤 주제에서도 의미가 통하는 것만 남긴다.
 * 스타일은 토큰 변수만 읽으므로 부품 자체는 특정 색·간격을 알지 못한다.
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
    <section className={styles.panel}>
      {(title || actions) && (
        <header className={styles.panelHeader}>
          <div className={styles.panelHeading}>
            {title && <h2 className={styles.panelTitle}>{title}</h2>}
            {note && <p className={styles.panelNote}>{note}</p>}
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
    <label className={styles.field}>
      <span className={styles.label}>{label}</span>
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
    <button type="button" className={className} onClick={onClick} title={title} disabled={disabled}>
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
    <div className={`${styles.segmented} ${dense ? styles.segmentedDense : ''}`} role="group">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
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
  return <span className={`${styles.badge} ${toneClass}`}>{children}</span>;
}
