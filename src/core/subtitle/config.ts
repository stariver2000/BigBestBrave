/**
 * 자막 재분할의 기준값.
 *
 * 방송·스트리밍 자막 실무에서 통용되는 값을 출발점으로 삼았고, 화면에서 조절할 수 있다.
 * 로직에는 숫자를 두지 않는다.
 */

/** 기본 옵션. 한국어 자막의 일반적인 기준에 맞췄다. */
export const DEFAULTS = {
  maxLines: 2,
  minDuration: 833,
  maxDuration: 7000,
  /** 초당 글자 수. 라틴 문자 기준 17~21이 흔히 쓰이고, 한글은 그보다 낮게 잡는다. */
  maxCps: 14,
  pauseThreshold: 300,
} as const;

/** 화면에서 조절 가능한 범위. */
export const LIMITS = {
  fontSize: { min: 12, max: 72 },
  displayWidth: { min: 240, max: 1920 },
  maxLines: { min: 1, max: 3 },
  maxCps: { min: 6, max: 30 },
  pauseThreshold: { min: 0, max: 2000 },
} as const;

/**
 * 분할점 점수.
 *
 * 같은 자리에 여러 근거가 겹치면 가장 큰 점수를 쓴다. 문장이 끝나는 자리가 가장 좋고,
 * 말이 끊긴 자리(pause)가 그다음이며, 어절 사이는 최소한의 근거다.
 * 이 순서가 곧 "어디서 잘라야 덜 어색한가"에 대한 규칙이다.
 */
export const BREAK_SCORE = {
  sentenceEnd: 100,
  pause: 85,
  clauseEnd: 70,
  closingBracket: 60,
  whitespace: 40,
  /** 띄어쓰기가 없는 문자열(일본어·중국어)에서 글자 사이를 자를 때. */
  character: 10,
} as const;

/** 문장이 끝나는 문장부호. 뒤에서 자른다. */
export const SENTENCE_END = /[.!?。！？…]/;

/** 절이 끊기는 문장부호. */
export const CLAUSE_END = /[,;:、，；：·]/;

export const CLOSING_BRACKET = /[)\]}»」』】]/;

/**
 * 마지막 한 줄이 지나치게 짧아지는 것을 막기 위한 하한.
 * 후보 분할점을 고를 때 이 비율보다 앞쪽은 보지 않는다.
 */
export const MIN_FILL_RATIO = 0.55;

/** 시간 배분 시 덩어리 사이에 남기는 최소 간격(ms). 자막이 붙어 보이지 않게 한다. */
export const CHUNK_GAP = 40;

/**
 * 재생이 마지막 자막 뒤로 더 흐르는 시간(ms).
 * 마지막 글자가 사라지자마자 처음으로 튕겨 나가면 끝난 줄 모르고 놓친다.
 */
export const TAIL_AFTER_LAST = 1200;
