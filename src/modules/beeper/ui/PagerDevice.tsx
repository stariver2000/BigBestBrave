'use client';

/**
 * 삐삐 기기.
 *
 * 액정과 키패드를 그린다. 숫자를 직접 눌러 넣는 감각이 이 페이지의 절반이므로,
 * 입력창 대신 키패드를 앞에 둔다.
 */

import { LCD_COLUMNS } from '../config';
import { beep } from './beep';
import styles from './beeper.module.css';

const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

/** 긴 숫자는 액정 폭에 맞춰 줄을 나눈다. 실제 기기도 그렇게 보였다. */
function toLines(digits: string): string[] {
  if (digits.length === 0) return [''];
  const lines: string[] = [];
  for (let index = 0; index < digits.length; index += LCD_COLUMNS) {
    lines.push(digits.slice(index, index + LCD_COLUMNS));
  }
  return lines;
}

export function PagerDevice({
  digits,
  meaning,
  maxDigits,
  label,
  countLabel,
  clearLabel,
  editable,
  ringing = false,
  onChange,
}: {
  digits: string;
  /** 액정 아래 한 줄로 보여 줄 뜻. 없으면 빈 줄로 자리를 지킨다. */
  meaning: string;
  maxDigits: number;
  label: string;
  countLabel: string;
  clearLabel: string;
  /** 보내기 모드에서는 숫자가 글에서 나오므로 키패드를 잠근다. */
  editable: boolean;
  /** 호출이 도착하는 중인가. 기기가 떨린다. */
  ringing?: boolean;
  onChange: (next: string) => void;
}) {
  const press = (digit: string) => {
    if (digits.length >= maxDigits) return;
    beep();
    onChange(digits + digit);
  };

  return (
    <div className={`${styles.device} ${ringing ? styles.deviceRinging : ''}`}>
      <div className={styles.deviceTop}>
        <span>{label}</span>
        <span>
          {digits.length} {countLabel} {maxDigits}
        </span>
      </div>

      <div className={styles.screen}>
        <div className={styles.digits}>
          {toLines(digits).map((line, index) => (
            <div key={index}>
              {line}
              {editable && index === toLines(digits).length - 1 && (
                <span className={styles.caret}>_</span>
              )}
            </div>
          ))}
        </div>
        <div className={styles.screenMeaning}>{meaning}</div>
      </div>

      {editable && (
        <div className={styles.keypad}>
          {KEYS.map((key) => (
            <button key={key} type="button" className={styles.key} onClick={() => press(key)}>
              {key}
            </button>
          ))}
          <button
            type="button"
            className={`${styles.key} ${styles.keyWide}`}
            onClick={() => {
              beep();
              onChange(digits.slice(0, -1));
            }}
          >
            ←
          </button>
          <button type="button" className={styles.key} onClick={() => press('0')}>
            0
          </button>
          <button
            type="button"
            className={`${styles.key} ${styles.keyWide}`}
            onClick={() => onChange('')}
          >
            {clearLabel}
          </button>
        </div>
      )}
    </div>
  );
}
