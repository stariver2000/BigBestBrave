/**
 * 특징 공간 상호작용 페이지의 상수와 견본 자료.
 *
 * 근거가 된 연구: Towards More Explainable Nonlinear Dimensionality Reduction:
 * A Feature-Driven Interaction Approach (Aeri Cho, Hyeon Jeon, Kiroong Choe,
 * Seokhyeon Park, Jinwook Seo, SNU), IEEE TVCG 2026, doi:10.1109/TVCG.2025.3622114.
 * 전문은 연구실이 직접 올린 hcil.snu.ac.kr/cms/uploads 공개본으로 읽었다.
 *
 * 옮겨 적은 것
 *   - 두 시각 의미(Clusteredness = Calinski-Harabasz 지수, Overlap = 20x20
 *     격자의 칸별 엔트로피 합)의 식 그대로. semantics.ts에 있다.
 *   - 세 가지 질의(Find Clusters / Merge Groups / Separate Groups)와 그 방향.
 *   - 6장 정량 실험과 8장 사용자 연구의 수치.
 *
 * 가져오지 않은 것
 *   - UMAP과 그것을 흉내 내는 신경망(5.2절). 브라우저 안에서 가중치 없이
 *     결정론적으로 돌릴 수 없다. 대신 이 페이지는 가중 주성분 투영을 쓰고,
 *     그 사실을 화면에 적는다. 두 의미와 세 질의는 투영 방법과 무관하게 성립한다.
 *   - 구매 이력 자료(7,200점 11특징). 남의 자료다. 대신 지어낸 카페 자료를 쓴다.
 *   - Optuna의 TPE 최적화. 여기서는 결정론적 좌표 탐색을 쓴다(search.ts).
 *   - 그림 5·6·8·10의 값. 그림에만 있다.
 */

/** 5.1.2절: 투영을 20x20 격자(400칸)로 나눈다. */
export const GRID = 20;

/** 6.2절: 100회에서 점수가 안정돼 질의 반복을 100으로 고정했다. */
export const QUERY_ITERATIONS = 100;

/** 세 질의. 방향은 3.2.2절 그대로다. */
export const QUERIES = [
  { id: 'findClusters', semantic: 'clusteredness', direction: 'max', minGroups: 0 },
  { id: 'mergeGroups', semantic: 'overlap', direction: 'max', minGroups: 2 },
  { id: 'separateGroups', semantic: 'overlap', direction: 'min', minGroups: 2 },
] as const;

export type QueryId = (typeof QUERIES)[number]['id'];

/** 6.1절: 15개 자료집(특징 3~192개)에서 30회씩 되풀이해 잰 값. */
export const MODEL_EXPERIMENT = {
  datasets: 15,
  featureRange: [3, 192],
  repeats: 30,
  /** UMAP 대비 추론 시간 비율(%). */
  inferenceTimeMean: 16,
  inferenceTimeSd: 3,
  inferenceTimeRange: [13.1, 20.3],
  /** 고차원 자료를 기준으로 잰 지역 구조 보존. */
  againstHighDim: {
    trustworthiness: { mean: 0.92, sd: 0.04 },
    continuity: { mean: 0.94, sd: 0.03 },
    mrre: { mean: 0.93, sd: 0.03 },
  },
  /** UMAP 투영을 기준으로 잰 같은 값. */
  againstUmap: {
    trustworthiness: { mean: 0.95, sd: 0.04 },
    continuity: { mean: 0.96, sd: 0.03 },
    mrre: { mean: 0.94, sd: 0.03 },
  },
  /** Hit Rate의 평균 절대 오차. */
  hitRateMae: { mean: 0.027, sd: 0.016 },
  /** Trustworthiness 등에서 쓴 이웃 수. */
  neighborK: 7,
} as const;

/**
 * 8장 사용자 연구. 서른 명을 두 조건으로 갈랐다.
 * 통찰 네 갈래의 개수는 그림 8·10에만 있어 옮기지 않고, 본문이 문장으로
 * 밝힌 검정값만 옮긴다.
 */
export const USER_STUDY = {
  participants: 30,
  males: 8,
  females: 22,
  ageRange: [19, 31],
  ageMean: 24.8,
  ageSd: 2.82,
  perCondition: 15,
  tutorialMinutes: 15,
  sessions: 2,
  analysisMinutes: 10,
  debriefMinutes: 3,
  interviewMinutes: 15,
  /** 자료: 구매 이력 7,200점 11특징. 이 페이지는 자료를 가져오지 않았다. */
  datasetPoints: 7200,
  datasetFeatures: 11,
  /** 통찰 네 갈래(8.3절). 개수는 그림에만 있다. */
  insightKinds: ['perception', 'hypothesis', 'feature', 'confirmation'] as const,
  /** 본문이 밝힌 검정값. significant가 false면 유의하지 않다는 뜻이다. */
  tests: [
    { id: 'hypothesisCount', p: 0.02, r: 0.47, significant: true },
    { id: 'confirmationCount', p: 0.081, r: 0.37, significant: false },
    { id: 'featureInsightWidth', p: 0.018, r: 0.23, significant: true },
    { id: 'hypothesisInsightWidth', p: 0.19, r: 0.23, significant: false },
  ],
  /** 질의 조건 열다섯 중 열하나가 질의가 가장 크게 바꾼 특징을 따라 탐색을 이었다. */
  followedQueryFeatures: 11,
} as const;

export interface Feature {
  id: string;
  /** 이 특징이 실제로 무리를 가르는가. 자료를 지을 때의 참값이라 채점에 쓰지 않는다. */
  separates: boolean;
}

/** 지어낸 카페 자료의 여덟 특징. 화면 이름은 사전이 갖는다. */
export const FEATURES: readonly Feature[] = [
  { id: 'noise', separates: true },
  { id: 'seats', separates: true },
  { id: 'wifi', separates: true },
  { id: 'hours', separates: false },
  { id: 'price', separates: false },
  { id: 'dessert', separates: false },
  { id: 'window', separates: false },
  { id: 'roast', separates: false },
];

/** 세 무리. 지어낸 자료의 참 구조이며 화면에서 색으로만 쓴다. */
export const GROUPS = ['work', 'talk', 'takeout'] as const;
export type GroupId = (typeof GROUPS)[number];

/** 무리마다 스무 곳씩 예순 곳. */
export const POINTS_PER_GROUP = 20;

/** 가중치가 움직일 수 있는 범위와 눈금. 0이면 그 특징을 아예 끄는 것이다. */
export const WEIGHT_MIN = 0;
export const WEIGHT_MAX = 2;
export const WEIGHT_STEP = 0.25;

/** k-means의 무리 수 기본값. 사용자가 고른다(5.1.1절). */
export const DEFAULT_K = 3;
export const K_CHOICES = [2, 3, 4, 5] as const;
