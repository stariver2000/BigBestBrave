/**
 * IUI 2024 DataDive 논문에서 옮겨 적은 자리.
 *
 * 근거: Hyunwoo Kim, Khanh Duy Le, Gionnieve Lim, Dae Hyun Kim, Yoo Jin Hong, Juho Kim.
 * "DataDive: Supporting Readers' Contextualization of Statistical Statements with Data
 * Exploration." IUI '24. doi:10.1145/3640543.3645155
 * 전문은 저자 페이지(dhkim16.github.io/pdf/datadive.pdf)에서 받아 읽었다. CC-BY 4.0이다.
 *
 * 옮긴 것은 표 1(그림 고르는 규칙), 표 2(맥락 만드는 기준), 표 3(바깥 정보를 찾은 횟수),
 * 그리고 6.4절과 8.1절의 수치다. 그림(Figure 6)의 상자그림 값은 옮기지 않았다.
 *
 * 이 논문의 시스템은 GPT-3.5와 GPT-4로 물음을 짓고 순위를 매긴다. 그 부분은 이 사이트의
 * 조건(연산 예산 0, 브라우저 안 결정론)에 맞지 않아 가져오지 않았다. 가져온 것은 그
 * 아래 깔린 뼈대다 - 통계 문장을 (주체, 지표, 시점)으로 가르는 것, 맥락을 만들 수 있는
 * 자리가 어디인가(표 2), 그리고 고른 맥락이 어떤 그림을 부르는가(표 1). 이 셋은 모두
 * 규칙이지 모델이 아니다.
 */

/** 통계 문장을 가르는 세 조각(5.2.1절, Figure 5). */
export type Component = 'entity' | 'indicator' | 'date';

/**
 * 맥락을 만드는 네 축(5.2.2절).
 *   inText       둘레 문장이 이미 말하고 있는 것
 *   relational   닮았거나 이어진 것(구성 관계, 인과 관계)
 *   statistical  통계적으로 두드러진 것. 이 논문은 전역 극값만 다룬다
 *   personalized 읽는 사람이 이미 알 법한 것
 */
export type Axis = 'inText' | 'relational' | 'statistical' | 'personalized';

export const COMPONENTS: readonly Component[] = ['entity', 'indicator', 'date'];
export const AXES: readonly Axis[] = ['inText', 'relational', 'statistical', 'personalized'];

/**
 * 표 2를 그대로 옮긴 것. 열두 칸 가운데 열 칸만 채워져 있다.
 *
 * 비어 있는 두 칸이 이 표에서 가장 말이 많은 자리다.
 *   지표 x 개인   지표에는 '읽는 사람이 익숙한 것'이 없다. 사람은 나라나 해에는 개인적으로
 *                 얽히지만 출산율이나 배출량이라는 지표 자체에는 그렇게 얽히지 않는다.
 *   시점 x 통계   시점에는 '전역 극값'이 없다. 가장 큰 해라는 것은 지표를 정해야 비로소
 *                 정해지므로, 시점 혼자서는 극값을 가질 수 없다.
 * 논문은 이 두 칸이 왜 비었는지 따로 설명하지 않는다. 위의 읽기는 내가 붙인 것이다.
 */
export const CONTEXT_GRID: Record<Component, Record<Axis, boolean>> = {
  entity:    { inText: true, relational: true, statistical: true,  personalized: true },
  indicator: { inText: true, relational: true, statistical: true,  personalized: false },
  date:      { inText: true, relational: true, statistical: false, personalized: true },
};

/** 논문이 순위를 매길 때 쓴 네 가지 잣대(5.2.3절). 순위 자체는 GPT-4가 매겼다. */
export const RANK_CRITERIA = ['helpful', 'interesting', 'novel', 'decisive'] as const;
export type RankCriterion = (typeof RANK_CRITERIA)[number];

/** 고른 것이 하나인가 여럿인가. */
export type Multiplicity = 'single' | 'multiple';

/** 한 시점인가 기간인가. 표 1의 두 열이다. */
export type Span = 'point' | 'duration';

/** 표 1이 내놓는 다섯 가지 그림. */
export type ChartKind = 'bar' | 'groupedBar' | 'singleLine' | 'multiLine' | 'multiLinePerEntity';

/**
 * 표 1을 그대로 옮긴 것. 주체 수 x 지표 수 x 시간 종류 = 여덟 칸이 전부다.
 * 전수이므로 시험이 여덟 칸을 모두 훑는다.
 *
 *   주체    지표      한 시점        기간
 *   하나    하나      막대           선 하나
 *   하나    여럿      막대           선 여럿
 *   여럿    하나      막대           선 여럿
 *   여럿    여럿      묶은 막대      주체마다 선 여럿
 */
export const CHART_RULE: Record<Span, Record<Multiplicity, Record<Multiplicity, ChartKind>>> = {
  point: {
    single: { single: 'bar', multiple: 'bar' },
    multiple: { single: 'bar', multiple: 'groupedBar' },
  },
  duration: {
    single: { single: 'singleLine', multiple: 'multiLine' },
    multiple: { single: 'multiLine', multiple: 'multiLinePerEntity' },
  },
};

/**
 * 6.4.3절. 파이프라인이 문장에 맞는 자료를 찾아냈는지를 77개 문장에서 세어 본 것.
 * 백분율은 논문이 함께 적은 값이고, 개수에서 다시 계산해 맞는지 시험이 확인한다.
 * rating은 5점 만점이며 클수록 알맞았다는 뜻이다.
 */
export const MATCH_TOTAL = 77;

export interface MatchQuality {
  matched: number;
  percent: number;
  rating: number;
  ratingSd: number;
}

export const MATCH_QUALITY: Record<'entity' | 'date' | 'indicator' | 'all', MatchQuality> = {
  entity:    { matched: 65, percent: 84.4, rating: 4.02, ratingSd: 0.90 },
  date:      { matched: 71, percent: 92.2, rating: 3.92, ratingSd: 0.69 },
  indicator: { matched: 77, percent: 100.0, rating: 4.12, ratingSd: 0.48 },
  /** 셋을 모두 맞춘 문장. 셋 각각보다 클 수 없다. */
  all:       { matched: 62, percent: 80.5, rating: 0, ratingSd: 0 },
};

/** 6.4.2절. 물음 묶음 전체에 대한 평가. 5점 만점. */
export const RECOMMENDATION_QUALITY = {
  meaningful: { mean: 4.12, sd: 0.43 },
  diverse: { mean: 3.86, sd: 0.35 },
  interesting: { mean: 4.07, sd: 0.40 },
  /** 6.4.1절. 낱개 물음의 뜻있음. 상위 다섯 물음이 4.08과 4.20 사이에 있었다. */
  individual: { mean: 4.12, sd: 0.55, topFiveLow: 4.08, topFiveHigh: 4.20 },
} as const;

/**
 * 표 3. 글을 읽는 동안 바깥 정보를 찾아본 횟수의 평균.
 * p가 작을수록 두 조건의 차이가 우연으로 보기 어렵다는 뜻이다.
 * 두 글 가운데 한 글에서만 뜻있는 차이가 났다.
 */
export interface Behaviour {
  withTool: number;
  baseline: number;
  p: number;
  statistic: string;
}

export const EXPLORATION: Record<'fertility' | 'carbon' | 'total', Behaviour> = {
  fertility: { withTool: 7.20, baseline: 5.00, p: 0.018, statistic: 'U = 21.5' },
  carbon:    { withTool: 7.36, baseline: 6.00, p: 0.195, statistic: 'U = 36.5' },
  total:     { withTool: 7.29, baseline: 5.48, p: 0.017, statistic: 'W = 119' },
};

/** 뜻있다고 볼 문턱. 논문이 쓴 값이다. */
export const ALPHA = 0.05;

/** 8.1절. 사람들이 실제로 어디를 눌렀는가. */
export const CLICKS = {
  /** 탐색을 시작한 232번 가운데 밑줄에서 시작한 것과 직접 고른 것. */
  starts: { total: 232, underline: 141, freeForm: 61 },
  /** 물음을 누른 240번 가운데 파이프라인이 지은 물음과 기본 물음. */
  questions: { total: 240, generated: 165, fallback: 75 },
} as const;

/** 8.1.3절. 논문이 스스로 적어 둔 역효과. 몇 사람이 그렇게 말했는가. */
export const PASSIVE_READING = {
  participants: 21,
  /** 물음이 얕고 되풀이된다고 말한 사람. */
  shallow: 5,
  /** 스스로 묻기를 그만두게 된다고 말한 사람(P3, P18). */
  passive: 2,
  /** 밑줄이 주의를 끌어 좋았다고 말한 사람. */
  nudged: 12,
} as const;
