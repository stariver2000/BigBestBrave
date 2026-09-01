/**
 * IUI 2024 논문의 표를 그대로 옮겨 적은 자리.
 *
 * 근거: Yoonsu Kim, Jueon Lee, Seoyoung Kim, Jaehyuk Park, Juho Kim.
 * "Understanding Users' Dissatisfaction with ChatGPT Responses: Types, Resolving
 * Tactics, and the Effect of Knowledge Level." IUI '24. doi:10.1145/3640543.3645148
 * 전문: arXiv:2311.07434v3
 *
 * 옮긴 것은 표 1~6이다. 그림(Figure 3~7)은 옮기지 않았다. 그림에서 눈으로 읽어낸
 * 값을 숫자로 적으면 그것은 논문의 수치가 아니라 내가 자로 잰 값이 되기 때문이다.
 * 그래서 "어느 불만에 어느 대응을 얼마나 썼는가"(Figure 4a)는 이 파일에 없고,
 * 대신 논문이 본문 문장으로 밝힌 것만 PROSE_PREFERENCE 에 담았다.
 *
 * 부호와 방향:
 *   score        1~10. 클수록 더 불만스러웠다는 뜻이다(1: 조금, 10: 매우).
 *   effect       1~10. 클수록 그 대응이 잘 들었다는 뜻이다(1: 효과 없음).
 *   freq         0~1. 한 사람이 겪은 응답 가운데 그 갈래가 차지한 비율의 평균이다.
 *   count/percent는 응답 단위, freq는 사람 단위다. 둘은 다른 종류이므로 섞지 않는다.
 */

/** 불만의 일곱 갈래(표 1). */
export type DissatisfactionId =
  | 'intent' | 'depth' | 'accuracy' | 'transparency' | 'refusal' | 'ethics' | 'format';

/** 대응의 네 갈래와 '아무것도 하지 않음'(표 3). */
export type TacticId = 'repeat' | 'specify' | 'error' | 'adapt' | 'none';

/** 대응의 열세 가지 낱개 수법(표 3). */
export type TacticCode =
  | 'T1' | 'T2' | 'T3' | 'T4' | 'T5' | 'T6' | 'T7'
  | 'T8' | 'T9' | 'T10' | 'T11' | 'T12' | 'T13';

/** 논문이 나눈 두 무리. 7점 척도에서 1~3은 낮음, 5~7은 높음, 4는 어느 쪽도 아니다. */
export type Knowledge = 'high' | 'low';

export const DISSATISFACTION_IDS: readonly DissatisfactionId[] = [
  'intent', 'depth', 'accuracy', 'transparency', 'refusal', 'ethics', 'format',
];

export const TACTIC_IDS: readonly TacticId[] = ['repeat', 'specify', 'error', 'adapt', 'none'];

export const TACTIC_CODES: readonly TacticCode[] = [
  'T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12', 'T13',
];

/** 표에 '-'로 적힌 칸. 표본이 없어 평균이 없다는 뜻이며 0이 아니다. */
export type Cell = number | null;

export interface Measured {
  /** 응답 단위 개수. */
  count: number;
  /** 논문이 함께 적은 백분율. count에서 되짚어 맞는지 시험이 확인한다. */
  percent: number;
  /** 1~10 평균. 불만 갈래에서는 불만의 세기, 대응 갈래에서는 효과다. */
  mean: Cell;
  sd: Cell;
  /** 사람 단위 평균 빈도. */
  freq: Cell;
  freqSd: Cell;
}

/** 표 2. 응답 단위 522, 사람 107명, 사례 511건. */
export const DISSATISFACTION: Record<DissatisfactionId, Measured> = {
  intent:       { count: 168, percent: 32.18, mean: 5.56, sd: 2.94, freq: 0.47, freqSd: 0.03 },
  depth:        { count: 107, percent: 20.50, mean: 5.09, sd: 2.69, freq: 0.33, freqSd: 0.35 },
  accuracy:     { count:  83, percent: 15.90, mean: 6.52, sd: 2.76, freq: 0.20, freqSd: 0.03 },
  transparency: { count:  27, percent:  5.17, mean: 4.81, sd: 3.13, freq: 0.08, freqSd: 0.02 },
  refusal:      { count:  27, percent:  5.17, mean: 6.37, sd: 2.68, freq: 0.09, freqSd: 0.02 },
  ethics:       { count:   4, percent:  0.77, mean: 6.25, sd: 3.20, freq: 0.01, freqSd: 0.01 },
  format:       { count: 106, percent: 20.31, mean: 6.14, sd: 3.04, freq: 0.27, freqSd: 0.03 },
};

/** 표 5. 지식 수준으로 가른 것. 높음 282, 낮음 152. 둘의 합은 522가 아니다(4점 무리 제외). */
export const DISSATISFACTION_BY_KNOWLEDGE: Record<Knowledge, Record<DissatisfactionId, Measured>> = {
  high: {
    intent:       { count: 89, percent: 31.56, mean: 5.91, sd: 2.85, freq: 0.43, freqSd: 0.30 },
    depth:        { count: 50, percent: 17.73, mean: 5.02, sd: 2.70, freq: 0.30, freqSd: 0.31 },
    accuracy:     { count: 49, percent: 17.38, mean: 6.73, sd: 2.85, freq: 0.24, freqSd: 0.29 },
    transparency: { count: 12, percent:  4.26, mean: 5.25, sd: 3.33, freq: 0.07, freqSd: 0.16 },
    refusal:      { count: 11, percent:  3.90, mean: 6.82, sd: 2.79, freq: 0.07, freqSd: 0.16 },
    ethics:       { count:  1, percent:  0.35, mean: 3.00, sd: null, freq: 0.01, freqSd: 0.07 },
    format:       { count: 70, percent: 24.82, mean: 6.66, sd: 2.86, freq: 0.28, freqSd: 0.32 },
  },
  low: {
    intent:       { count: 45, percent: 29.61, mean: 5.18, sd: 3.08, freq: 0.49, freqSd: 0.39 },
    depth:        { count: 41, percent: 26.97, mean: 5.22, sd: 2.72, freq: 0.38, freqSd: 0.38 },
    accuracy:     { count: 18, percent: 11.84, mean: 6.50, sd: 2.62, freq: 0.14, freqSd: 0.21 },
    transparency: { count:  9, percent:  5.92, mean: 3.67, sd: 3.00, freq: 0.10, freqSd: 0.23 },
    refusal:      { count: 13, percent:  8.55, mean: 6.92, sd: 2.02, freq: 0.14, freqSd: 0.26 },
    ethics:       { count:  3, percent:  1.97, mean: 7.33, sd: 2.89, freq: 0.03, freqSd: 0.08 },
    format:       { count: 23, percent: 15.13, mean: 5.70, sd: 3.36, freq: 0.25, freqSd: 0.37 },
  },
};

/** 표 4의 위쪽. 대응 갈래 단위, 응답 477건. */
export const TACTIC_CATEGORY: Record<TacticId, Measured> = {
  repeat:  { count:  45, percent:  9.4, mean: 4.04, sd: 3.16, freq: 0.09, freqSd: 0.20 },
  specify: { count: 183, percent: 38.4, mean: 6.04, sd: 3.44, freq: 0.33, freqSd: 0.34 },
  error:   { count:  73, percent: 15.3, mean: 4.19, sd: 2.95, freq: 0.10, freqSd: 0.22 },
  adapt:   { count:  12, percent:  2.5, mean: 5.17, sd: 3.04, freq: 0.04, freqSd: 0.11 },
  none:    { count: 164, percent: 34.4, mean: null, sd: null, freq: 0.47, freqSd: 0.38 },
};

/** 어느 낱개 수법이 어느 갈래에 속하는가(표 3). */
export const CODE_CATEGORY: Record<TacticCode, Exclude<TacticId, 'none'>> = {
  T1: 'repeat', T2: 'repeat', T3: 'repeat',
  T4: 'specify', T5: 'specify', T6: 'specify', T7: 'specify',
  T8: 'error', T9: 'error', T10: 'error',
  T11: 'adapt', T12: 'adapt', T13: 'adapt',
};

/** 표 4의 아래쪽. 낱개 수법 단위, 응답 500건(한 응답이 같은 갈래의 여러 수법을 쓸 수 있다). */
export const TACTIC_CODE: Record<TacticCode, Measured> = {
  T1:  { count:  29, percent:  5.8, mean: 4.45, sd: 3.15, freq: 0.07, freqSd: 0.18 },
  T2:  { count:  18, percent:  3.6, mean: 3.06, sd: 3.06, freq: 0.02, freqSd: 0.09 },
  T3:  { count:   2, percent:  0.4, mean: 1.00, sd: 0.00, freq: 0.00, freqSd: 0.04 },
  T4:  { count: 122, percent: 24.4, mean: 6.25, sd: 3.53, freq: 0.22, freqSd: 0.28 },
  T5:  { count:  26, percent:  5.2, mean: 5.35, sd: 3.33, freq: 0.06, freqSd: 0.15 },
  T6:  { count:  40, percent:  8.0, mean: 6.45, sd: 3.16, freq: 0.08, freqSd: 0.17 },
  T7:  { count:  11, percent:  2.2, mean: 4.73, sd: 3.04, freq: 0.02, freqSd: 0.10 },
  T8:  { count:  53, percent: 10.6, mean: 4.26, sd: 2.99, freq: 0.06, freqSd: 0.16 },
  T9:  { count:  13, percent:  2.6, mean: 4.62, sd: 2.66, freq: 0.02, freqSd: 0.09 },
  T10: { count:  10, percent:  2.0, mean: 3.80, sd: 3.16, freq: 0.03, freqSd: 0.10 },
  T11: { count:   7, percent:  1.4, mean: 4.57, sd: 3.21, freq: 0.03, freqSd: 0.10 },
  T12: { count:   2, percent:  0.4, mean: 8.00, sd: 0.00, freq: 0.00, freqSd: 0.03 },
  T13: { count:   3, percent:  0.6, mean: 4.67, sd: 3.22, freq: 0.00, freqSd: 0.04 },
};

/**
 * 표 6의 아래쪽. 낱개 수법을 지식 수준으로 가른 것. 높음 273, 낮음 138.
 *
 * 사람 단위 빈도 열은 일부러 옮기지 않았다(모두 null). PDF에서 그 두 열은 행이
 * 어긋나 있다 - 이를테면 T3의 낮음 무리는 개수가 0인데 빈도가 0.23으로 읽힌다.
 * 개수가 0이면 빈도도 0이어야 하므로 이것은 옮겨 적을 수 있는 값이 아니다.
 * 개수와 효과 열은 자기 백분율과 되짚어 맞으므로 그 둘만 옮긴다.
 */
export const TACTIC_CODE_BY_KNOWLEDGE: Record<Knowledge, Record<TacticCode, Measured>> = {
  high: {
    T1:  { count: 12, percent:  4.4, mean: 4.75, sd: 2.96, freq: null, freqSd: null },
    T2:  { count:  4, percent:  1.5, mean: 6.00, sd: 3.37, freq: null, freqSd: null },
    T3:  { count:  1, percent:  0.4, mean: 1.00, sd: null, freq: null, freqSd: null },
    T4:  { count: 84, percent: 30.8, mean: 5.77, sd: 3.71, freq: null, freqSd: null },
    T5:  { count: 13, percent:  4.8, mean: 5.00, sd: 3.03, freq: null, freqSd: null },
    T6:  { count: 19, percent:  7.0, mean: 7.00, sd: 2.83, freq: null, freqSd: null },
    T7:  { count:  4, percent:  1.5, mean: 6.00, sd: 4.08, freq: null, freqSd: null },
    T8:  { count: 37, percent: 13.6, mean: 3.81, sd: 4.08, freq: null, freqSd: null },
    T9:  { count:  7, percent:  2.6, mean: 3.57, sd: 1.90, freq: null, freqSd: null },
    T10: { count:  6, percent:  2.2, mean: 2.00, sd: 2.45, freq: null, freqSd: null },
    T11: { count:  4, percent:  1.5, mean: 5.25, sd: 3.10, freq: null, freqSd: null },
    T12: { count:  0, percent:  0.0, mean: null, sd: null, freq: null, freqSd: null },
    T13: { count:  1, percent:  0.4, mean: 1.00, sd: null, freq: null, freqSd: null },
  },
  low: {
    T1:  { count:  9, percent:  6.5, mean: 3.00, sd: 3.00, freq: null, freqSd: null },
    T2:  { count: 12, percent:  8.7, mean: 1.67, sd: 1.15, freq: null, freqSd: null },
    T3:  { count:  0, percent:  0.0, mean: null, sd: null, freq: null, freqSd: null },
    T4:  { count: 24, percent: 17.4, mean: 7.17, sd: 2.78, freq: null, freqSd: null },
    T5:  { count: 12, percent:  8.7, mean: 5.42, sd: 3.73, freq: null, freqSd: null },
    T6:  { count: 13, percent:  9.4, mean: 6.00, sd: 3.70, freq: null, freqSd: null },
    T7:  { count:  7, percent:  5.1, mean: 4.00, sd: 2.31, freq: null, freqSd: null },
    T8:  { count:  5, percent:  3.6, mean: 5.20, sd: 3.83, freq: null, freqSd: null },
    T9:  { count:  2, percent:  1.4, mean: 7.00, sd: 1.41, freq: null, freqSd: null },
    T10: { count:  2, percent:  1.4, mean: 7.00, sd: 1.41, freq: null, freqSd: null },
    T11: { count:  1, percent:  0.7, mean: 1.00, sd: null, freq: null, freqSd: null },
    T12: { count:  0, percent:  0.0, mean: null, sd: null, freq: null, freqSd: null },
    T13: { count:  0, percent:  0.0, mean: null, sd: null, freq: null, freqSd: null },
  },
};

/** 표 6의 위쪽. 대응 갈래를 지식 수준으로 가른 것. 높음 262, 낮음 131. */
export const TACTIC_CATEGORY_BY_KNOWLEDGE: Record<Knowledge, Record<TacticId, Measured>> = {
  high: {
    repeat:  { count:  16, percent:  6.11, mean: 5.06, sd: 3.00, freq: 0.08, freqSd: 0.17 },
    specify: { count: 111, percent: 42.37, mean: 5.88, sd: 3.56, freq: 0.34, freqSd: 0.31 },
    error:   { count:  49, percent: 18.70, mean: 3.53, sd: 2.60, freq: 0.12, freqSd: 0.24 },
    adapt:   { count:   5, percent:  1.91, mean: 4.40, sd: 3.29, freq: 0.03, freqSd: 0.11 },
    none:    { count:  81, percent: 30.92, mean: null, sd: null, freq: 0.47, freqSd: 0.37 },
  },
  low: {
    repeat:  { count:  19, percent: 14.5, mean: 2.37, sd: 2.27, freq: 0.11, freqSd: 0.25 },
    specify: { count:  52, percent: 39.7, mean: 6.00, sd: 3.33, freq: 0.39, freqSd: 0.41 },
    error:   { count:   8, percent:  6.1, mean: 5.75, sd: 3.06, freq: 0.08, freqSd: 0.18 },
    adapt:   { count:   1, percent:  0.8, mean: 1.00, sd: null, freq: 0.01, freqSd: 0.07 },
    none:    { count:  51, percent: 38.9, mean: null, sd: null, freq: 0.44, freqSd: 0.39 },
  },
};

/**
 * 논문이 본문 문장으로 밝힌 것만 옮겼다(5.2.3절). 숫자가 아니라 방향이다.
 * "Tspecify is the dominant tactic across various dissatisfaction categories.
 *  However, when users encounter dissatisfaction related to the accuracy of
 *  information, they tend to employ Terror rather than Tspecify. Lastly, in cases
 *  of Dtrans, Drefuse, and Dethic, users often resort to No Tactic."
 */
export const PROSE_PREFERENCE: Record<DissatisfactionId, TacticId> = {
  intent: 'specify',
  depth: 'specify',
  accuracy: 'error',
  transparency: 'none',
  refusal: 'none',
  ethics: 'none',
  format: 'specify',
};

/** 논문이 본문과 초록에 적어 둔 값. 우리가 다시 계산한 값과 맞대어 보기 위해 둔다. */
export const REPORTED = {
  users: 107,
  instances: 511,
  /** 응답 단위 합계. 한 응답이 여러 갈래를 가질 수 있어 511보다 크다. */
  dissatisfactionTotal: 522,
  tacticCategoryTotal: 477,
  tacticCodeTotal: 500,
  knowledgeDissatisfactionTotal: { high: 282, low: 152 },
  knowledgeTacticCategoryTotal: { high: 262, low: 131 },
  knowledgeTacticCodeTotal: { high: 273, low: 138 },
  /** 카이제곱 검정값(5.3절). */
  chiSquareDissatisfaction: 17.7,
  chiSquareTacticCategory: 21.6,
  /** 끝내 풀린 비율(5.2.3절). */
  resolved: 0.28,
  resolvedHigh: 0.29,
  resolvedLow: 0.235,
  /** 'No Tactic'을 뺀 네 갈래 가운데 Tspecify의 몫(5.2.2절). */
  specifyShareAmongTactics: 0.586,
} as const;

/** 이보다 적은 표본에서 나온 평균은 순위에 쓰지 않는다. 두세 명의 답을 효과라 부를 수 없다. */
export const MIN_COUNT_FOR_RANK = 5;
