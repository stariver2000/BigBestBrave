/**
 * CHI 2024 Time2Stop에서 옮겨 적은 자리.
 *
 * 근거: Adiba Orzikulova, Han Xiao, Zhipeng Li, Yukang Yan, Yuntao Wang, Yuanchun Shi,
 * Marzyeh Ghassemi, Sung-Ju Lee, Anind K. Dey, Xuhai "Orson" Xu.
 * "Time2Stop: Adaptive and Explainable Human-AI Loop for Smartphone Overuse Intervention."
 * CHI '24. doi:10.1145/3613904.3642747. 전문은 arXiv:2403.05584v1 로 읽었다.
 *
 * 옮긴 것은 표 1(네 가지 개입 방식), 표 2(설명의 두 층위), 3.2절의 설계 상수,
 * 6장의 수치다. 그림(Figure 5~9)의 막대값은 옮기지 않았고, 본문이 숫자로 적은 것만 담았다.
 *
 * 이 시스템의 ML 모델(XGBoost 등)과 SHAP 계산은 가져오지 않았다. 이 사이트는 연산
 * 예산이 0이고, 모델 없이 흉내 내면 지어낸 예측이 된다. 가져온 것은 그 아래 깔린
 * 설계다 - 언제 재고(5분마다), 얼마나 쉬고(10분), 어떤 마찰을 주고(12자리), 무엇을
 * 보여 주는가(상위 세 갈래의 설명).
 *
 * 부호와 방향: 정확도와 수용도는 Control을 1.0으로 둔 상대값이며 클수록 좋다.
 * 방문 감소율은 %이며 클수록 많이 줄었다는 뜻이다.
 */

/** 표 1. 네 가지 개입 방식. 셋 다 참인 마지막 것이 Time2Stop이다. */
export interface Condition {
  id: 'control' | 'personalized' | 'adaptiveWoExp' | 'adaptiveWExp';
  ml: boolean;
  adaptive: boolean;
  explainable: boolean;
}

export const CONDITIONS: readonly Condition[] = [
  { id: 'control', ml: false, adaptive: false, explainable: false },
  { id: 'personalized', ml: true, adaptive: false, explainable: false },
  { id: 'adaptiveWoExp', ml: true, adaptive: true, explainable: false },
  { id: 'adaptiveWExp', ml: true, adaptive: true, explainable: true },
];

export type ConditionId = Condition['id'];

/** 3.2절의 설계 상수. 논문이 파일럿으로 정한 값들이다. */
export const DESIGN = {
  /** 마찰 과제의 자릿수. 선행 연구가 10~20자리를 중간 부담이라 했고, 논문은 12로 정했다. */
  frictionDigits: 12,
  /** 앱을 쓰는 동안 몇 분마다 다시 재는가. */
  predictionIntervalMin: 5,
  /** 개입 한 번 뒤에 몇 분을 쉬는가. */
  cooldownMin: 10,
  /** 설명에 보여 주는 갈래 수. 나머지는 혼란을 피하려고 숨긴다(3.2.4절). */
  topCategories: 3,
  /** 모델은 밤마다 갱신된다(6.3.3절). */
  nightlyUpdate: true,
} as const;

/**
 * 표 2. 설명의 두 층위. 모델 특징 이름과 갈래는 논문의 표기 그대로 둔다 -
 * 식별자와 분류명이라 옮기면 논문에 없는 말이 생긴다.
 */
export interface ExplanationExample {
  feature: string;
  readable: string;
  high: string;
  low: string;
}

export const EXPLANATION_EXAMPLES: readonly ExplanationExample[] = [
  { feature: 'numViewScrolledCurrentAppCategory', readable: 'Number of Scrolls in Current App Category', high: 'Phone & App Use', low: 'Number of Interactions' },
  { feature: 'sumDurationDischarge', readable: 'Battery Discharge Duration', high: 'Phone & App Use', low: 'Battery Usage' },
  { feature: 'durationMobile', readable: 'Duration of Being Mobile', high: 'Activity', low: 'Duration of Being Mobile' },
  { feature: 'avgLux', readable: 'Average Lux in Light Conditions', high: 'Activity', low: 'Light Conditions' },
  { feature: 'countScansMostFrequentDevice', readable: 'Number of Frequently Scanned Devices', high: 'Social', low: 'Number of Nearby Devices' },
  { feature: 'timeFirstSent', readable: 'Time of First Sent Message', high: 'Social', low: 'Time of Sent Message' },
  { feature: 'timeAtTopOneLocation', readable: 'Time Spent at Top One Location', high: 'Location', low: 'Time at Frequent Locations' },
  { feature: 'minLengthStayAtClusters', readable: 'Minimum Stay at Frequent Locations', high: 'Location', low: 'Time at Frequent Locations' },
  { feature: 'isNight', readable: 'Whether it is the Night Time', high: 'Time', low: 'the Night Time' },
];

/** 실험의 크기(5~6장). 8주, 71명. */
export const SCALE = {
  participants: 71,
  weeks: 8,
  minutes: 497458,
  apps: 149,
  appsPerPersonMean: 17,
  appsPerPersonSd: 5,
  sessions: 207898,
  /** 모델 만들기 단계에서 모은 라벨과 그 시점별 몫(%). */
  labels: 75670,
  labelStageShare: { entry: 60.5, using: 24.5, exit: 14.9 },
  /** 개입 단계의 만남 횟수와 그때 걷힌 추가 라벨. */
  encounters: 47939,
  feedbackLabels: 39188,
} as const;

/**
 * 6.3절. Control을 1.0으로 둔 상대 정확도와 수용도.
 * delta는 논문이 적은 상대 증가율(%)이고, ratio는 1 + delta/100 이다.
 * 시험이 이 둘의 곱이 서로 맞물리는지 되짚는다.
 */
export const ACCURACY = {
  /** 세 갈래 비교(두 적응형을 합친 것). chi2(2)=24.52. */
  three: { personalizedVsControl: 17.1, adaptiveVsControl: 55.5, adaptiveVsPersonalized: 32.8, chi2: 24.52 },
  /** 네 갈래 비교. chi2(3)=35.70. GLMM 추정이라 곱이 정확히 맞물리지는 않는다. */
  four: { wExpVsControl: 97.5, wExpVsPersonalized: 66.9, wExpVsWoExp: 53.8, chi2: 35.7 },
} as const;

export const RECEPTIVITY = {
  three: { personalizedVsControl: 19.4, adaptiveVsControl: 29.0, chi2: 18.44 },
  four: { wExpVsControl: 39.6, wExpVsPersonalized: 18.9, wExpVsWoExp: 11.4, chi2: 25.57 },
  /** 초록이 적은 "적응형이 수용도를 8.0% 넘게 올렸다". 세 갈래 표에서 되짚어진다. */
  abstractClaim: 8.0,
} as const;

/**
 * 6.4절과 6.6절. 기준 주 대비 앱 방문 횟수 감소율(%).
 * 설명이 없는 쪽이 더 크게 줄었고(뜻있음), 있는 쪽은 가장자리 뜻(marginal)에 그쳤다.
 * 이 어긋남이 이 논문에서 가장 말이 많은 자리다.
 */
export const VISIT_REDUCTION = {
  woExp: { percent: 8.9, significant: true },
  wExp: { percent: 7.0, significant: false },
} as const;

/**
 * 6.5절. 선호 순위 투표(참가자 몫 %)와 효과 크기.
 * 설명이 있는 쪽은 1등 표도 가장 많이 받았지만 3등 표도 훨씬 많이 받았다. 갈리는 것이다.
 */
export const RANKING = {
  wExp: { first: 45, third: 19 },
  woExp: { first: 43, third: 8 },
  chi2: 88.01,
} as const;

/** 6.5.2절. 설명의 이점에 대해 논문이 함께 적어 둔 효과 크기. 크지 않다. */
export const EFFECT_SIZES = { effectiveness: 0.2, trust: 0.16 } as const;

/* ------------------------------------------------------------------------- *
 * 여기서부터는 논문에서 옮긴 것이 아니다.
 *
 * 논문의 알맹이는 "언제 끼어들지"를 아는 모델이고, 그 모델(XGBoost와 SHAP)은 이 사이트에
 * 들어올 수 없다. 그래서 그 고리를 **가장 작게** 만들었다 — 맥락마다 사람이 받아들인
 * 비율을 세고, 그 비율로 말을 걸지 말지 정하는 규칙 기반 학습이다. 브라우저 안에서 돌고
 * 서버도 모델도 쓰지 않는다.
 *
 * 아래 값은 모두 이 페이지가 정한 것이다. 논문이 제시한 값은 위쪽 DESIGN에만 있다.
 * ------------------------------------------------------------------------- */

/** 흉내 낸 하루에서 사람이 쓰는 앱의 갈래. 논문의 분류가 아니라 이 화면이 지어낸 넷이다. */
export const APPS = ['short-video', 'social', 'game', 'reading'] as const;
export type AppKind = (typeof APPS)[number];

/** 하루를 넷으로 나눈 시간대. 맥락의 한 축이다. */
export const BANDS = ['morning', 'afternoon', 'evening', 'night'] as const;
export type Band = (typeof BANDS)[number];

export const LOOP = {
  /** 이 점수를 넘으면 말을 건다. 0~1. */
  threshold: 0.35,
  /**
   * 아직 아무것도 모를 때의 무게. 받아들임도 넘김도 이만큼씩 미리 세어 둔 셈으로 친다.
   * 한 번의 대답에 판이 뒤집히지 않게 하는 완충이다.
   */
  prior: 2,
  /**
   * 한 자리에서 적어도 이만큼은 답을 들어야 '배워서 조용해졌다'고 말한다.
   * 한 번의 대답으로 조용해지는 것은 배움이 아니라 우연이다.
   */
  patience: 2,
  /** 이만큼 오래 보고 있으면 과사용 쪽 점수가 가장 높아진다(분). */
  longMin: 45,
  /** 밤에 더해 주는 점수. 늦게까지 보는 것이 문제라는 흔한 감각을 옮겼다. */
  nightBonus: 0.2,
  /** 화면의 한 걸음이 흐르는 시간(ms). 하루가 눈으로 따라올 만큼 느리게. */
  tickMs: 900,
  /** 흉내 낸 하루가 시작하는 시각(분). 아침 여덟 시. */
  startMin: 8 * 60,
  /** 한 걸음마다 앱을 바꿀 확률(백분율). */
  switchChance: 18,
} as const;
