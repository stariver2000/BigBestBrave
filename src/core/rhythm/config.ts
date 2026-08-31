/**
 * 리듬 사전과 비교 기준.
 *
 * 이름 붙은 리듬들은 이 페이지를 위해 지은 것이다. 논문은 31개의 진동 패턴을 만들어 썼지만
 * 그 목록이 공개돼 있지 않으므로, 사람이 이름만 듣고도 짐작할 수 있는 리듬으로 새로 짰다.
 * 가져온 것은 형식이다 — 세기와 길이를 달리해 서로 다른 리듬을 만들고, 닮은 정도를 세 단계로 나눈다.
 */

import type { Pattern } from './types';

/** 리듬을 견줄 때 쓰는 표본 수. 촘촘할수록 정확하지만 계산이 제곱으로 늘어난다. */
export const ENVELOPE_SAMPLES = 64;

/**
 * 두 리듬을 견줄 때 쓰는 시간 창의 최소 길이(ms).
 *
 * 창은 견주는 두 리듬 중 **긴 쪽**에 맞춘다. 그래야 두 가지가 동시에 지켜진다.
 *   - 절대 시간이 남는다: 90ms 심장 박동과 240ms 초인종은 서로 다른 리듬이어야 한다.
 *     길이를 1로 정규화해 지우면 그 둘이 같아진다. 논문이 다룬 두 축 중 하나가 길이다.
 *   - 빈 꼬리가 생기지 않는다: 창을 넉넉히 고정하면 모든 리듬이 뒤쪽의 긴 침묵을 공유해
 *     전부 비슷해져 버린다.
 * 아주 짧은 리듬끼리 견줄 때만 이 최소값이 쓰인다.
 */
export const MIN_WINDOW_MS = 300;

/**
 * 시간축을 늘였다 줄일 수 있는 폭(표본 수).
 *
 * 제한이 없으면 어떤 두 리듬이든 떨림끼리 억지로 맞출 수 있어 전부 비슷하게 나온다.
 * 사람도 그렇게 듣지 않는다 — 한두 박자 밀린 것은 같은 리듬으로 듣지만,
 * 순서가 통째로 뒤바뀐 것은 다른 리듬으로 듣는다. 그 한계를 폭으로 준다.
 */
export const WARP_BAND = 6;

/**
 * 닮음의 세 단계. 논문이 같음·비슷함·다름으로 나눈 것을 따랐다.
 * 경계값은 이 페이지에서 정한 것이다.
 */
export const CLOSENESS_THRESHOLDS = {
  same: 0.92,
  similar: 0.7,
} as const;

/** 사용자가 두드릴 때 쓰는 세기 단계. */
export const INTENSITY_STEPS = [
  { id: 'soft', value: 0.35 },
  { id: 'medium', value: 0.65 },
  { id: 'strong', value: 1 },
] as const;

/** 두드림 하나의 최소·최대 길이(ms). 너무 짧으면 떨림으로 느껴지지 않는다. */
export const TAP_DURATION = { min: 40, max: 900 } as const;

/** 리듬 하나에 담을 수 있는 최대 떨림 수. */
export const MAX_PULSES = 16;

/** 두드림 사이가 이보다 길면 리듬이 끝난 것으로 본다(ms). */
export const IDLE_TIMEOUT = 2200;

/**
 * 이름 붙은 리듬들.
 * 이름만 들어도 어떤 리듬인지 짐작되도록 지었다. 짐작이 맞는지 눌러 보는 것이 이 페이지의 놀이다.
 */
export const PATTERNS: readonly Pattern[] = [
  {
    id: 'heartbeat',
    pulses: [
      { duration: 90, intensity: 1, gap: 110 },
      { duration: 130, intensity: 0.7, gap: 520 },
    ],
  },
  {
    id: 'knock',
    pulses: [
      { duration: 70, intensity: 1, gap: 150 },
      { duration: 70, intensity: 1, gap: 150 },
      { duration: 70, intensity: 1, gap: 400 },
    ],
  },
  {
    id: 'rain',
    pulses: [
      { duration: 40, intensity: 0.4, gap: 90 },
      { duration: 40, intensity: 0.3, gap: 220 },
      { duration: 40, intensity: 0.5, gap: 70 },
      { duration: 40, intensity: 0.3, gap: 180 },
      { duration: 40, intensity: 0.45, gap: 120 },
    ],
  },
  {
    id: 'train',
    pulses: [
      { duration: 220, intensity: 0.8, gap: 120 },
      { duration: 220, intensity: 0.8, gap: 120 },
      { duration: 220, intensity: 0.8, gap: 120 },
      { duration: 220, intensity: 0.8, gap: 120 },
    ],
  },
  {
    id: 'wave',
    pulses: [
      { duration: 320, intensity: 0.3, gap: 60 },
      { duration: 320, intensity: 0.6, gap: 60 },
      { duration: 420, intensity: 1, gap: 500 },
    ],
  },
  {
    id: 'sos',
    pulses: [
      { duration: 80, intensity: 1, gap: 90 },
      { duration: 80, intensity: 1, gap: 90 },
      { duration: 80, intensity: 1, gap: 240 },
      { duration: 260, intensity: 1, gap: 90 },
      { duration: 260, intensity: 1, gap: 90 },
      { duration: 260, intensity: 1, gap: 240 },
      { duration: 80, intensity: 1, gap: 90 },
      { duration: 80, intensity: 1, gap: 90 },
      { duration: 80, intensity: 1, gap: 300 },
    ],
  },
  {
    id: 'waltz',
    pulses: [
      { duration: 160, intensity: 1, gap: 140 },
      { duration: 100, intensity: 0.4, gap: 140 },
      { duration: 100, intensity: 0.4, gap: 320 },
    ],
  },
  {
    id: 'clock',
    pulses: [
      { duration: 60, intensity: 0.5, gap: 440 },
      { duration: 60, intensity: 0.5, gap: 440 },
      { duration: 60, intensity: 0.5, gap: 440 },
    ],
  },
  {
    id: 'breath',
    pulses: [
      { duration: 700, intensity: 0.25, gap: 400 },
      { duration: 700, intensity: 0.25, gap: 400 },
    ],
  },
  {
    id: 'gallop',
    pulses: [
      { duration: 60, intensity: 0.7, gap: 70 },
      { duration: 60, intensity: 0.7, gap: 70 },
      { duration: 110, intensity: 1, gap: 380 },
    ],
  },
  {
    id: 'doorbell',
    pulses: [
      { duration: 240, intensity: 1, gap: 180 },
      { duration: 380, intensity: 0.65, gap: 400 },
    ],
  },
  {
    id: 'stutter',
    pulses: [
      { duration: 45, intensity: 0.9, gap: 55 },
      { duration: 45, intensity: 0.9, gap: 55 },
      { duration: 45, intensity: 0.9, gap: 55 },
      { duration: 45, intensity: 0.9, gap: 55 },
      { duration: 45, intensity: 0.9, gap: 300 },
    ],
  },
];
