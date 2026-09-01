/**
 * 초록이 밝힌 것을 표로 되짚기.
 *
 * 여기서 하는 일은 계산이라기보다 옮겨 적기다. 논문이 유료라 실험 수치를 구하지 못했고,
 * 초록이 밝힌 네 줄만 가져왔다. 그러니 이 코어는 '무엇이 느껴지고 무엇이 안 느껴지는가'를
 * 말해 줄 뿐이지, 얼마나 느껴지는지는 말하지 않는다. 화면에도 그렇게 적는다.
 */

import { AFFECTS, DELAY_THRESHOLD_MS, DIMENSIONS, type Dimension } from './config';

export interface Setting {
  /** 밀리초. */
  delay: number;
}

export interface FactorVerdict {
  factor: 'waveform' | 'delay' | 'axis';
  /** 이 설정에서 손끝이 알아챌 수 있는가. */
  noticeable: boolean;
  /** 알아챈다면 어느 느낌이 움직이는가. */
  dimensions: Dimension[];
}

/** 지연이 문턱을 넘었는가. 초록이 밝힌 유일한 수치가 이것이다. */
export function delayNoticeable(delayMs: number): boolean {
  return delayMs > DELAY_THRESHOLD_MS;
}

/** 문턱까지 얼마나 남았는가. 음수면 이미 넘었다. */
export function delayHeadroom(delayMs: number): number {
  return DELAY_THRESHOLD_MS - delayMs;
}

function dimensionsOf(factor: 'waveform' | 'delay' | 'axis'): Dimension[] {
  return DIMENSIONS.filter((dimension) => AFFECTS[factor][dimension]);
}

/** 세 가지 설정 각각이 이 형편에서 느껴지는지. */
export function verdicts(setting: Setting): FactorVerdict[] {
  return [
    // 파형은 흔한 스마트폰 조건에서 구별되지 않았다. 지연과 무관하다.
    { factor: 'waveform', noticeable: false, dimensions: [] },
    {
      factor: 'delay',
      noticeable: delayNoticeable(setting.delay),
      dimensions: delayNoticeable(setting.delay) ? dimensionsOf('delay') : [],
    },
    // 축은 언제나 구별되었다.
    { factor: 'axis', noticeable: true, dimensions: dimensionsOf('axis') },
  ];
}

/** 이 형편에서 손끝이 알아채는 설정의 수. */
export function noticeableCount(setting: Setting): number {
  return verdicts(setting).filter((verdict) => verdict.noticeable).length;
}
