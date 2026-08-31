/**
 * 리듬을 견줄 수 있는 형태로 편다.
 *
 * 떨림 목록을 그대로 비교하면 떨림 개수가 다를 때 견줄 수가 없다. 그래서 시간축을 따라
 * 세기를 일정 간격으로 읽어 같은 길이의 수열로 만든다. 이 수열이 리듬의 모양이다.
 *
 * 시간은 절대 시간으로 읽되, 창의 길이는 밖에서 정해 넘긴다.
 * 창을 어떻게 잡느냐가 곧 "무엇을 같은 리듬으로 볼 것인가"를 정하기 때문이다
 * (config의 MIN_WINDOW_MS 주석 참고).
 */

import { ENVELOPE_SAMPLES } from './config';
import type { Pattern, Pulse } from './types';

/** 리듬 전체 길이(ms). 마지막 떨림 뒤의 쉼은 세지 않는다. */
export function totalDuration(pattern: Pattern): number {
  return pattern.pulses.reduce((total, pulse, index) => {
    const isLast = index === pattern.pulses.length - 1;
    return total + pulse.duration + (isLast ? 0 : pulse.gap);
  }, 0);
}

/** 시각 t(ms)에서의 세기. 떨림 구간 안이면 그 세기, 쉼 구간이면 0이다. */
function intensityAt(pulses: readonly Pulse[], time: number): number {
  let cursor = 0;
  for (const pulse of pulses) {
    if (time < cursor + pulse.duration) return pulse.intensity;
    cursor += pulse.duration + pulse.gap;
    if (time < cursor) return 0;
  }
  return 0;
}

/** 리듬을 같은 길이의 세기 수열로 편다. 창보다 짧은 리듬의 뒤쪽은 0으로 남는다. */
export function envelopeOf(pattern: Pattern, windowMs: number, samples = ENVELOPE_SAMPLES): number[] {
  const result: number[] = [];
  for (let index = 0; index < samples; index += 1) {
    // 표본을 칸의 한가운데에서 읽는다. 끝에서 읽으면 마지막 떨림이 잘려 나간다.
    const time = ((index + 0.5) / samples) * windowMs;
    result.push(intensityAt(pattern.pulses, time));
  }
  return result;
}
