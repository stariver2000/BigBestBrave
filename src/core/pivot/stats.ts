/**
 * 논문의 표기값을 앞으로 다시 계산해 내는 자리.
 *
 * 표기값을 사전이나 화면에 박아 두면 옮겨 적다 틀려도 아무도 모른다.
 * 그래서 백분율과 평균은 전부 원값에서 다시 계산하고, 표기와의 어긋남은
 * 시험이 폭까지 붙든다(반올림 전 원자료에서 나온 표기는 재계산과 0.1~0.3%p 어긋난다).
 */

import { DEVICE, HUMAN_REGRESSIONS, INDIVIDUAL, ROBOT, STUDY, type RegressionRow } from './config';

/** 기준에서 얼마나 낮아졌는가(%). 처리량이 떨어진 몫. */
export function dropPercent(base: number, value: number): number {
  return ((base - value) / base) * 100;
}

/** 기준에서 얼마나 높아졌는가(%). 길 이탈이 늘어난 몫. */
export function risePercent(base: number, value: number): number {
  return ((value - base) / base) * 100;
}

/** kilocount를 mm로. 1 kilocount = 1,000카운트 = 1,000/12,000인치 = 25.4/12 mm. */
export function kilocountToMm(kilocount: number): number {
  return (kilocount * 25.4 * 1000) / DEVICE.cpi;
}

/** 실험 설계의 곱: 위치 7 × 회기 18 × 시행 15 = 참가자 한 사람의 시행 수. */
export function trialsPerParticipant(): number {
  return STUDY.positions.length * STUDY.sessionsPerBlock * STUDY.trialsPerSession;
}

/** 표 2의 한 열 평균을 여섯 값에서 다시 계산한다. */
export function regressionAverage(pick: (row: RegressionRow) => number): number {
  const sum = HUMAN_REGRESSIONS.reduce((total, row) => total + pick(row), 0);
  return sum / HUMAN_REGRESSIONS.length;
}

/** 개인별 최적 자리가 50% 자리보다 나은 몫. 차는 0.236 bits/s, 비로는 4.1%쯤. */
export function personalGain(): { diff: number; percent: number } {
  const diff = INDIVIDUAL.personalBestTp - INDIVIDUAL.centerTp;
  return { diff, percent: (diff / INDIVIDUAL.centerTp) * 100 };
}

/** 회전 조건에서 20% 자리가 80% 자리보다 길게 간 몫(%). 표의 물리 센서 값으로 계산한다. */
export function robotLongerPercent(): number {
  const at20 = ROBOT.lengthAt20Kc.withRotation.physical;
  const at80 = ROBOT.lengthAt80Kc.withRotation.physical;
  return (at20 / at80 - 1) * 100;
}

/** 가상-물리 어긋남을 평균 길이에 대한 백분율로 되짚는다. */
export function discrepancyPercent(kind: 'translateOnly' | 'withRotation'): number {
  return (ROBOT.discrepancy[kind].kc / ROBOT.avgLengthKc[kind].physical) * 100;
}
