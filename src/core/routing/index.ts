/**
 * 길찾기 코어.
 *
 * 격자 도시에서 세 가지 태도(따르기·고치기·켜 두기)로 다녀 보고, 걸린 시간과 후회,
 * 그리고 얼마나 많은 길을 실제로 지나 보았는지를 잰다.
 * 도시가 작아 최단 경로가 정확히 나오므로 후회도 어림이 아니다.
 */

export { buildCity, costOf, otherEnd, shortest, type Route } from './city';
export {
  BASE_MINUTES,
  GLANCES,
  GRID,
  HABITUAL,
  INTERRUPT_MINUTES,
  JAM,
  KNOWS,
  MEMORY_PRIOR,
  MODES,
  SEED,
  TRIPS,
} from './config';
export { compare, runMode, type SimOptions } from './simulate';
export { appView, habitualDelays, makeTrip, memoryView, todaysTimes, type TripInput } from './trip';
export type { City, Edge, Mode, Node, Run, Times, Trip } from './types';
