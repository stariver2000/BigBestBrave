/**
 * 서로 기록하기 코어.
 *
 * 두 사람의 답에서 조하리의 창 네 칸을 정확히 내고, 어긋남을 '알면서 감춘 몫'과
 * '짐작이 빗나간 몫'으로 가른다. 둘 다 어림이 아니라 항등식이다.
 * 답은 짧은 글자로 바꿔 건넬 수 있다 — 계정도 서버도 없이 서로를 기록하기 위해서다.
 */

export { AREAS, CODE_VERSION, SAMPLE, SCALE } from './config';
export { decode, encode, type DecodeResult } from './code';
export { report, splitOf, splitsOf, windowOf, windowsOf } from './window';
export type { Area, Report, Sheet, Split, Window } from './types';
