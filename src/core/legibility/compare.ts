/**
 * 두 화면을 견주고 답이 뒤집히는 자리를 찾는다.
 *
 * 걸리는 시간 = 글을 읽는 시간 + 시선을 옮기는 시간.
 * AR에서 읽으면 옮길 일이 없고, 폰에서 읽으면 바깥을 볼 때마다 옮겨야 한다.
 *
 * 뒤집히는 자리는 눈금을 처음부터 끝까지 훑어 찾는다. 눈금이 몇백 칸뿐이라
 * 어림잡거나 이분 탐색할 이유가 없다. 전부 세는 편이 정확하고 빠르다.
 */

import { ACUITY_FLOOR, DISTANCE, RANGE, SWITCH } from './config';
import { contrastOf, dioptreGap, logMarOf, millimetresFor } from './optics';
import { contrastFactor, sizeFactor, wordsPerMinute } from './speed';
import type { Reading, Setting, Surface, Verdict } from './types';

/** 시선 한 번 옮기는 값. 눈을 돌리고, 초점을 다시 맞추고, 읽던 자리를 찾는다. */
export function switchCost(): number {
  return SWITCH.saccade + SWITCH.perDioptre * dioptreGap() + SWITCH.reacquire;
}

export function read(surface: Surface, setting: Setting): Reading {
  const logMar = logMarOf(setting.arcminutes);
  /*
   * 여유(acuity reserve) = 지금 글자의 logMAR - 그 화면이 낼 수 있는 문턱의 logMAR.
   * 부호를 거꾸로 두면 큰 글자가 안 읽히는 것으로 나온다. 처음에 그렇게 틀렸다.
   */
  const reserve = logMar - ACUITY_FLOOR[surface];
  const contrast = contrastOf(surface, setting.ambient);

  const size = sizeFactor(reserve);
  const clarity = contrastFactor(contrast);
  const wpm = wordsPerMinute(size, clarity);

  // 속도가 0이면 아무리 기다려도 못 읽는다. 그때는 무한대로 둔다.
  const readSeconds = wpm <= 0 ? Number.POSITIVE_INFINITY : (setting.words / wpm) * 60;
  // AR은 글이 눈앞에 떠 있으므로 바깥을 보려고 화면을 옮길 일이 없다.
  const switchSeconds = surface === 'ar' ? 0 : setting.lookAways * switchCost();

  return {
    surface,
    millimetres: millimetresFor(setting.arcminutes, DISTANCE[surface]),
    logMar,
    reserve,
    contrast,
    sizeFactor: size,
    contrastFactor: clarity,
    wordsPerMinute: wpm,
    readSeconds,
    switchSeconds,
    totalSeconds: readSeconds + switchSeconds,
  };
}

function winnerOf(setting: Setting): Surface {
  return read('phone', setting).totalSeconds < read('ar', setting).totalSeconds ? 'phone' : 'ar';
}

/** 눈금 하나를 처음부터 끝까지 훑어 승자가 바뀌는 첫 자리를 찾는다. */
function crossoverAlong(
  setting: Setting,
  key: 'ambient' | 'lookAways',
  range: { min: number; max: number; step: number },
): number | null {
  const here = winnerOf(setting);
  for (let value = range.min; value <= range.max + 1e-9; value += range.step) {
    if (winnerOf({ ...setting, [key]: value }) !== here) return value;
  }
  return null;
}

export function compare(setting: Setting): Verdict {
  const ar = read('ar', setting);
  const phone = read('phone', setting);
  const winner: Surface = phone.totalSeconds < ar.totalSeconds ? 'phone' : 'ar';
  const savedSeconds = Math.abs(ar.totalSeconds - phone.totalSeconds);

  return {
    ar,
    phone,
    winner,
    savedSeconds: Number.isFinite(savedSeconds) ? savedSeconds : Number.POSITIVE_INFINITY,
    ambientCrossover: crossoverAlong(setting, 'ambient', RANGE.ambient),
    lookAwayCrossover: crossoverAlong(setting, 'lookAways', RANGE.lookAways),
  };
}
