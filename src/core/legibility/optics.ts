/**
 * 눈에 맺히는 크기와 대비.
 *
 * 두 화면의 차이는 결국 두 가지로 줄어든다. 글자가 눈에 얼마나 크게 맺히는가,
 * 그리고 그 글자가 배경에서 얼마나 떠오르는가.
 *
 * 크기는 각도로 잰다. 같은 3밀리미터 글자라도 2미터 앞에 있으면 40센티미터 앞에 있을 때의
 * 5분의 1 크기로 맺힌다. 그래서 밀리미터가 아니라 분각으로 견주어야 한다.
 *
 * 대비는 두 화면이 근본부터 다르다. 투과형 AR은 바깥 풍경 '위에' 빛을 더할 뿐이라
 * 검정을 만들 수 없다. 그래서 바깥이 밝을수록 글자가 풍경에 잠긴다.
 * 폰은 스스로 검정을 내지만 유리에 둘레 빛이 비쳐 든다.
 */

import { DISTANCE, EMISSION, PHONE_GLARE } from './config';
import type { Surface } from './types';

const ARCMIN_PER_RADIAN = (180 / Math.PI) * 60;

/** 밀리미터 크기가 그 거리에서 몇 분각으로 맺히는가. */
export function arcminutesOf(millimetres: number, distanceMillimetres: number): number {
  const radians = 2 * Math.atan(millimetres / (2 * distanceMillimetres));
  return radians * ARCMIN_PER_RADIAN;
}

/** 거꾸로: 그 각도를 내려면 이 거리에서 글자가 몇 밀리미터여야 하는가. */
export function millimetresFor(arcminutes: number, distanceMillimetres: number): number {
  const radians = arcminutes / ARCMIN_PER_RADIAN;
  return 2 * distanceMillimetres * Math.tan(radians / 2);
}

/**
 * logMAR. 5분각짜리 글자가 0.0이다.
 * 작을수록 크게 보이는 것이고, 시력 문턱보다 작아지면 읽히지 않는다.
 */
export function logMarOf(arcminutes: number): number {
  return Math.log10(Math.max(arcminutes, 1e-6) / 5);
}

/**
 * 베버 대비. 배경 밝기에 견준 글자의 밝기다. (글자 - 배경) / 배경.
 *
 * AR: 투과형이라 화면 빛이 풍경 '위에 더해질' 뿐이다. 배경은 풍경 그 자체이고
 *     글자는 풍경 + 화면 빛이므로, 대비는 그대로 화면빛 / 풍경빛이 된다.
 *     풍경이 밝아지면 곧장 묽어진다. 바깥에서 AR 글자가 사라지는 까닭이다.
 * 폰: 스스로 검정을 낸다. 배경은 유리에 비친 둘레 빛뿐이라 대비가 훨씬 오래 버틴다.
 */
export function contrastOf(surface: Surface, ambient: number): number {
  const light = Math.max(ambient, 1e-6);
  if (surface === 'ar') return EMISSION.ar / light;
  const glare = Math.max(light * PHONE_GLARE, 1e-6);
  return EMISSION.phone / glare;
}

/** 두 화면 사이에서 초점을 옮길 때의 디옵터 차이. */
export function dioptreGap(): number {
  return Math.abs(1000 / DISTANCE.phone - 1000 / DISTANCE.ar);
}
