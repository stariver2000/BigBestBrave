/**
 * 서로 기록하기 코어의 상수.
 *
 * 근거가 된 연구: Peerspective: A Study on Reciprocal Tracking for Self-awareness and
 * Relational Insight (Kwangyoung Lee, Yeohyun Jung, Gyuwon Jung, Xi Lu, Hwajung Hong),
 * CHI 2025, doi:10.1145/3706598.3713404.
 *
 * 연구진은 서로를 일주일간 관찰하고 되먹이는 일을 여덟 쌍에게 시켰다. 이론 틀로는
 * 조하리의 창을 썼고, 참가자에게 살펴보라고 준 자리가 여섯이었다 — 습관, 성격,
 * 말하는 방식, 감정이 건드려지는 자리, 스트레스 반응, 자기도 모르는 장단점.
 *
 * 이 페이지가 가져온 것
 *   - 여섯 자리 그대로.
 *   - 조하리의 네 칸(열린 곳, 안 보이는 곳, 감춘 곳, 아무도 모르는 곳).
 *   - 서로가 서로를 본다는 구조. 한쪽만으로는 창이 그려지지 않는다.
 *
 * 가져오지 않은 것
 *   - 여덟 쌍의 이야기와 인용, 일주일치 관찰 기록, 카드 세 종류로 이뤄진 절차.
 *   - 수치 전부. 논문은 질적 연구라 이런 값을 재지 않았다.
 */

import type { Area } from './types';

/** 살펴보는 여섯 자리. 논문의 여섯과 같다. */
export const AREAS: readonly Area[] = ['habit', 'trait', 'talk', 'trigger', 'stress', 'strength'];

/** 눈금의 최대값. 0부터 이 값까지 다섯 칸이다. */
export const SCALE = 4;

/** 눈금 한 칸이 세 비트에 들어가므로 코드가 짧아진다. */
export const BITS_PER_VALUE = 3;

/** 코드의 판 번호. 나중에 자리 수가 바뀌면 이 값을 올린다. */
export const CODE_VERSION = 1;

/** 코드에 쓰는 글자. 헷갈리는 0/O/1/I를 뺀 32자다. */
export const ALPHABET = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';

/**
 * 처음 놓여 있는 두 사람. 화면을 열자마자 창이 그려져 있어야 무엇을 보는 도구인지 알 수 있다.
 * 지어낸 값이고 화면에도 그렇게 적는다.
 */
export const SAMPLE = {
  mine: {
    selfKnows: [3, 3, 2, 2, 1, 2],
    guessesOther: [2, 2, 3, 1, 1, 1],
    seesOther: [3, 2, 4, 2, 3, 2],
  },
  theirs: {
    selfKnows: [2, 3, 3, 3, 2, 1],
    guessesOther: [3, 2, 3, 2, 2, 2],
    seesOther: [4, 2, 2, 3, 4, 3],
  },
} as const;
