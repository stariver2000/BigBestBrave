/**
 * 스스로 도는 시연.
 *
 * 도구를 처음 열면 대개 빈 화면과 단추만 있다. 무엇을 넣어야 움직이는지 모르면
 * 사람은 아무것도 하지 않고 나간다. 그래서 페이지가 먼저 움직여 보인다 —
 * 자기가 무엇을 하는 물건인지 스스로 시연하고, 사람이 손을 대는 순간 자리를 비켜 준다.
 *
 * 여기에는 시간에 기대지 않는 계산만 둔다. 시계는 훅이 맡고, 이 파일은 시험할 수 있게 남긴다.
 */

import type { Locale } from '../../core/i18n';

export interface AutopilotStep {
  /** 이 단계를 실행하기 전에 기다리는 시간(ms). 사람이 눈으로 따라올 만큼 둔다. */
  wait: number;
  run: () => void;
}

/** 다음 단계의 자리. 끝에 닿으면 처음으로 돌아간다 — 시연은 지켜보는 동안 계속 돌아야 한다. */
export function nextIndex(index: number, count: number): number {
  if (count <= 0) return 0;
  return (index + 1) % count;
}

/**
 * 지금 기다려야 하는 시간.
 * 첫 단계만 다르게 잡는다. 화면이 뜨자마자 움직이면 무엇이 바뀌었는지 눈이 못 따라간다.
 */
export function waitFor(steps: readonly AutopilotStep[], index: number, firstWait: number): number {
  if (steps.length === 0) return firstWait;
  return index === 0 ? firstWait : steps[index % steps.length].wait;
}

export const AUTOPILOT_LABELS: Record<'running' | 'stopped' | 'resume', Record<Locale, string>> = {
  running: {
    ko: '혼자 돌아가는 중 — 손대면 멈춥니다',
    en: 'Running itself — touch anything to take over',
    ja: 'ひとりでに動いています — 触れると止まります',
  },
  stopped: {
    ko: '이제 당신 차례입니다',
    en: 'Your turn now',
    ja: 'ここからはあなたの番です',
  },
  resume: {
    ko: '다시 보여 주기',
    en: 'Show me again',
    ja: 'もう一度見せて',
  },
};
