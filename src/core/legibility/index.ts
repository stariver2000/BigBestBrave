/**
 * 읽기 쉬움과 시선 옮김 코어.
 *
 * 같은 글을 투과형 AR 안경에 띄울 때와 손에 든 폰에 띄울 때, 각각 얼마나 걸리는지 잰다.
 * AR은 시선을 옮길 일이 없지만 바깥이 밝으면 글자가 풍경에 잠기고,
 * 폰은 또렷하지만 바깥을 볼 때마다 눈과 초점을 옮겨야 한다.
 */

export {
  ACUITY_FLOOR,
  CONTRAST_PLATEAU,
  CRITICAL_RESERVE,
  DISTANCE,
  EMISSION,
  INITIAL,
  MAX_WPM,
  PHONE_GLARE,
  RANGE,
  SWITCH,
} from './config';
export { compare, read, switchCost } from './compare';
export { arcminutesOf, contrastOf, dioptreGap, logMarOf, millimetresFor } from './optics';
export { contrastFactor, sizeFactor, wordsPerMinute } from './speed';
export type { Reading, Setting, Surface, Verdict } from './types';
