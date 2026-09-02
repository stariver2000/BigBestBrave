/**
 * 하우투 영상 정보 갈래표의 상수.
 *
 * 근거가 된 연구: Beyond Instructions: A Taxonomy of Information Types in How-to
 * Videos (Saelyne Yang, Sangkyung Kwak, Juhoon Lee, Juho Kim, KAIST),
 * CHI 2023, doi:10.1145/3544548.3581126. 전문은 연구실이 직접 올린
 * kixlab.github.io/website-files/2023/chi2023-videomap-paper.pdf 로 읽었다.
 *
 * 옮겨 적은 것과 그 출처
 *   - TYPES / CATEGORIES: 표 1과 3.2절. 여덟 갈래 아래 스물한 유형.
 *   - CATEGORY_STATS: 부록 표 4 (갈래별 시간 비율의 평균·표준편차·최소·최대).
 *   - TYPE_STATS: 부록 표 5 (유형별 같은 값).
 *   - TIME_STATS: 부록 표 6 (영상 시간을 1000으로 정규화했을 때 갈래가 놓인 자리).
 *   - DATASET: 3.1절·4장·부록 A.5 (HTM-Type 자료집의 짜임).
 *   - DIFFERENCES: 5.2.2절 (작업 종류와 나레이션 방식에 따른 차이).
 *   - STUDY: 7~8장 (아홉 명이 찾기·간추리기·따라하기에서 매긴 점수).
 *
 * 옮겨 적기 검증은 tests/core/howto/howto.test.ts 에 있다. 유형 평균의 합은
 * 갈래 평균과, 자료집의 조각 수는 총계와, 비율은 개수에서 앞으로 되짚는다.
 */

/** 여덟 갈래. 표 1의 순서 그대로다. */
export const CATEGORIES = [
  'greeting',
  'overview',
  'method',
  'supplementary',
  'explanation',
  'description',
  'conclusion',
  'misc',
] as const;

export type CategoryId = (typeof CATEGORIES)[number];

/** 스물한 유형. 표 1의 순서 그대로이며, 이 순서가 URL 라벨 문자열의 알파벳이 된다. */
export const TYPES = [
  { id: 'opening', category: 'greeting' },
  { id: 'closing', category: 'greeting' },
  { id: 'goal', category: 'overview' },
  { id: 'motivation', category: 'overview' },
  { id: 'briefing', category: 'overview' },
  { id: 'subgoal', category: 'method' },
  { id: 'instruction', category: 'method' },
  { id: 'tool', category: 'method' },
  { id: 'tip', category: 'supplementary' },
  { id: 'warning', category: 'supplementary' },
  { id: 'justification', category: 'explanation' },
  { id: 'effect', category: 'explanation' },
  { id: 'status', category: 'description' },
  { id: 'context', category: 'description' },
  { id: 'toolSpec', category: 'description' },
  { id: 'outcome', category: 'conclusion' },
  { id: 'reflection', category: 'conclusion' },
  { id: 'sideNote', category: 'misc' },
  { id: 'selfPromotion', category: 'misc' },
  { id: 'bridge', category: 'misc' },
  { id: 'filler', category: 'misc' },
] as const satisfies readonly { id: string; category: CategoryId }[];

export type TypeId = (typeof TYPES)[number]['id'];

export interface ShareStats {
  /** 영상 안에서 차지한 시간 비율의 평균(%). 전체 120편 기준. */
  mean: number;
  sd: number;
  /** 그 갈래/유형이 있는 영상만 대상으로 한 최솟값(%). 없는 영상은 뺐다(표의 각주). */
  min: number;
  max: number;
}

/** 부록 표 4. 갈래별 시간 비율. */
export const CATEGORY_STATS: Record<CategoryId, ShareStats> = {
  greeting: { mean: 2.4, sd: 1.6, min: 0.19, max: 8.4 },
  overview: { mean: 6.4, sd: 6.0, min: 0.5, max: 34.4 },
  method: { mean: 47.5, sd: 16.9, min: 15.6, max: 88.1 },
  supplementary: { mean: 3.4, sd: 4.5, min: 0.8, max: 22.9 },
  explanation: { mean: 4.4, sd: 3.4, min: 0.5, max: 14.5 },
  description: { mean: 19.6, sd: 12.5, min: 1.9, max: 61.8 },
  conclusion: { mean: 6.3, sd: 6.6, min: 0.4, max: 30.9 },
  misc: { mean: 10.0, sd: 7.8, min: 0.3, max: 37.5 },
};

/**
 * 부록 표 5. 유형별 시간 비율.
 *
 * briefing의 최솟값(1.9)이 평균(0.7)보다 큰 것은 옮겨 적기 실수가 아니라
 * 표의 각주 때문이다 - 평균은 전체 영상에서, 최솟값은 그 유형이 있는 영상에서만
 * 계산됐다. briefing이 아예 없는 영상이 많으면 이런 역전이 생긴다.
 * 이 역전은 시험으로 붙들어 두었다.
 */
export const TYPE_STATS: Record<TypeId, ShareStats> = {
  opening: { mean: 1.0, sd: 0.8, min: 0.1, max: 4.4 },
  closing: { mean: 1.4, sd: 1.1, min: 0.2, max: 4.5 },
  goal: { mean: 2.5, sd: 1.8, min: 0.3, max: 8.8 },
  motivation: { mean: 3.2, sd: 4.8, min: 0.7, max: 29.7 },
  briefing: { mean: 0.7, sd: 2.0, min: 1.9, max: 10.9 },
  subgoal: { mean: 2.7, sd: 3.0, min: 0.3, max: 21.9 },
  instruction: { mean: 39.8, sd: 17.7, min: 1.8, max: 82.5 },
  tool: { mean: 5.0, sd: 5.6, min: 0.4, max: 17.8 },
  tip: { mean: 1.8, sd: 3.3, min: 0.7, max: 20.5 },
  warning: { mean: 1.5, sd: 3.1, min: 0.8, max: 16.4 },
  justification: { mean: 2.8, sd: 2.7, min: 0.5, max: 11.6 },
  effect: { mean: 1.7, sd: 2.0, min: 0.3, max: 10.5 },
  status: { mean: 6.5, sd: 6.0, min: 0.2, max: 28.8 },
  context: { mean: 7.8, sd: 9.5, min: 0.4, max: 56.3 },
  toolSpec: { mean: 5.3, sd: 5.6, min: 0.5, max: 27.8 },
  outcome: { mean: 2.8, sd: 4.1, min: 0.3, max: 30.9 },
  reflection: { mean: 3.6, sd: 5.0, min: 0.8, max: 26.5 },
  sideNote: { mean: 6.6, sd: 7.3, min: 0.6, max: 34.6 },
  selfPromotion: { mean: 2.0, sd: 2.4, min: 0.5, max: 14.2 },
  bridge: { mean: 1.4, sd: 1.5, min: 0.1, max: 8.3 },
  filler: { mean: 0.1, sd: 0.3, min: 0.1, max: 2.1 },
};

export interface TimeStats {
  /** 영상 시간을 [0, 1000]으로 정규화했을 때의 5% 분위. */
  q5: number;
  q95: number;
  mean: number;
  sd: number;
}

/** 부록 표 6. 갈래가 영상의 어느 자리에 놓이는지. 가운데 90%가 [q5, q95] 안에 있다. */
export const TIME_STATS: Record<CategoryId, TimeStats> = {
  greeting: { q5: 4, q95: 994, mean: 567, sd: 458 },
  overview: { q5: 12, q95: 238, mean: 92, sd: 96 },
  method: { q5: 111, q95: 854, mean: 472, sd: 233 },
  supplementary: { q5: 169, q95: 863, mean: 579, sd: 223 },
  explanation: { q5: 168, q95: 872, mean: 494, sd: 224 },
  description: { q5: 85, q95: 869, mean: 457, sd: 248 },
  conclusion: { q5: 720, q95: 967, mean: 866, sd: 85 },
  misc: { q5: 48, q95: 980, mean: 625, sd: 332 },
};

/** HTM-Type 자료집의 짜임. 3.1절·4장·부록 A.5. */
export const DATASET = {
  /** 12장르 x 10편. HowTo100M에서 골랐고 5분 이상·2017년 이후·영어 나레이션. */
  videos: 120,
  genres: 12,
  perGenre: 10,
  /** 갈래표를 만드는 데 쓴 영상 수(수렴할 때까지 6편씩 더해 48편). */
  constructionVideos: 48,
  /** 나머지 72편은 외부 주석자 둘이 라벨을 달아 자료집을 완성했다. */
  annotationVideos: 72,
  /** 주석자 훈련 뒤 마지막 42편에서 잰 두 주석자의 Cohen's Kappa. */
  annotatorKappa: 0.78,
  kappaVideos: 42,
  /** 한 영상이 담는 갈래/유형 수의 평균 (5.2.1절). */
  meanCategoriesPerVideo: 7.25,
  meanTypesPerVideo: 14.57,
  /** 작업 종류별 영상 수 (5.2.2절). */
  taskCounts: { creating: 82, fixing: 27, using: 11 },
  /** 나레이션 방식별 영상 수. */
  narrationCounts: { realTime: 78, dubbed: 42 },
  /** 부록 A.5의 구성 자료집(48편) 대 전체(120편) 비교 비율(%). */
  taskShare: {
    construction: { creating: 70.8, fixing: 18.8, using: 10.4 },
    entire: { creating: 68.3, fixing: 22.5, using: 9.2 },
  },
  narrationShare: {
    construction: { realTime: 62.5, dubbed: 37.5 },
    entire: { realTime: 65.0, dubbed: 35.0 },
  },
} as const;

/**
 * 5.2.2절. 영상의 성격에 따라 갈래 분포가 달라진 곳.
 * 검정값은 본문에 인쇄된 그대로다(Kruskal-Wallis H, Dunn Z).
 */
export const DIFFERENCES = {
  /** 작업 종류(만들기/고치기/쓰기)에 따라 갈린 것. */
  byTask: {
    descriptionH: 21.696, // H(3), p<0.001
    miscH: 10.435, // H(3), p=0.015
    /** Dunn 사후검정에서 갈린 쌍과 그 비율(%). */
    status: {
      share: { creating: 5.7, fixing: 10.0, using: 3.3 },
      creatingFixingZ: -2.68, // p=0.022
      usingFixingZ: 3.126, // p=0.005
    },
    context: {
      share: { creating: 6.2, fixing: 11.6 },
      creatingFixingZ: -2.443, // p=0.043
      /** 본문이 문장으로 밝힌 차이. 11.6 - 6.2 = 5.4를 시험이 되짚는다. */
      statedGap: 5.4,
    },
  },
  /** 나레이션 방식(실시간/후시녹음)에 따라 갈린 것. */
  byNarration: {
    methodH: 6.602, // H(1), p=0.01
    descriptionH: 7.036, // H(1), p=0.008
    instruction: {
      h: 7.568, // p=0.006
      share: { realTime: 36.9, dubbed: 45.0 },
      /** 본문이 문장으로 밝힌 차이. 45.0 - 36.9 = 8.1을 시험이 되짚는다. */
      statedGap: 8.1,
    },
    /**
     * 논문 자체의 어긋남. 본문은 두 번에 걸쳐 "실시간 나레이션에 Tool
     * Specification이 더 많다"고 말하는데, 괄호의 수치는 실시간 4.2%,
     * 후시녹음 5.9%로 방향이 반대다. 어느 쪽이 오기인지는 그림 7에만 있어
     * 확인할 수 없다(그림의 값은 옮기지 않는다). 수치는 인쇄된 그대로 두고
     * 어긋남을 시험과 화면에 남긴다.
     */
    toolSpec: {
      h: 4.043, // p=0.04
      printedShare: { realTime: 4.2, dubbed: 5.9 },
      proseSaysRealTimeHigher: true,
    },
  },
} as const;

/**
 * 7~8장의 사용자 연구(n=9). 세 과제에서 어떤 갈래·유형이 중요하다고 답했는지.
 * 점수는 5점 만점 리커트 평균이다. 질적 연구의 수치는 논문이 적은 것만 옮긴다.
 */
export const STUDY = {
  participants: 9,
  /** 찾기 과제: 질문 셋을 알맞은 유형에 이은 평균 개수. */
  search: { matchedOfThree: 2.44, sd: 0.53 },
  summarize: {
    helpfulnessCategory: 4.61,
    helpfulnessType: 4.66,
    /** 간추릴 때 중요한 갈래 상위 둘과 유형 상위 넷. */
    topCategories: [
      { id: 'method', score: 4.89 },
      { id: 'overview', score: 4.11 },
    ],
    topTypes: [
      { id: 'instruction', score: 4.89 },
      { id: 'subgoal', score: 4.78 },
      { id: 'tool', score: 4.78 },
      { id: 'goal', score: 3.89 },
    ],
    /** 간추림을 기대했다가 영상에 없어 낮게 매긴 유형. */
    reflectionScore: 2.67,
    /** Greeting과 Miscellaneous의 유형들은 가장 낮았다. */
    lowestScore: 1.61,
  },
  follow: {
    helpfulnessCategory: 4.35,
    helpfulnessType: 4.32,
    topCategories: [
      { id: 'method', score: 5.0 },
      { id: 'supplementary', score: 4.11 },
      { id: 'explanation', score: 4.11 },
    ],
    topTypes: [
      { id: 'instruction', score: 4.89 },
      { id: 'subgoal', score: 4.78 },
      { id: 'tool', score: 4.45 },
      { id: 'effect', score: 4.11 },
      { id: 'tip', score: 3.89 },
      { id: 'warning', score: 3.89 },
      { id: 'justification', score: 3.67 },
      { id: 'status', score: 3.67 },
    ],
  },
  /** 갈래·유형의 뜻을 이해한 정도. */
  understanding: { category: 4.86, type: 4.75 },
} as const;
