/**
 * 그래프 미학과 충실도의 상관 페이지의 상수.
 *
 * 근거가 된 연구: Readability vs. Faithfulness: Unveiling Correlations between
 * Graph Aesthetics and DR Quality (Seokweon Jung(KAIST·SNU), Min Hyeong Kim,
 * Hyeon Jeon, Jinwook Seo(SNU)), EuroVis 2026 GDxDR Workshop,
 * doi:10.2312/evgdxdr.20261001. 전문은 Eurographics 디지털 도서관의 공개본
 * (CC-BY)으로 읽었다.
 *
 * 옮겨 적은 것
 *   - AESTHETICS: 그림 1 히트맵의 행 순서 그대로인 미적 지표 열하나와,
 *     본문 4장이 밝힌 네 그룹의 행 범위(1-5 / 6-9 / 10 / 11).
 *   - FINDINGS: 본문이 문장으로 밝힌 수치들(r≈0.6198, r≈0.7953, 견고한
 *     관계의 개수 7 대 2, |r|<0.1 등).
 *   - METHOD: 627개 그래프, 크기·밀도 범위, 99% 분산의 내재 차원, 견고 기준.
 *
 * 가져오지 않은 것
 *   - 그림 1 히트맵의 개별 상관계수. 그림에만 있어 옮기지 않는다. 본문이
 *     문장으로 집어 말한 몇 개만 담는다.
 *   - DR 지표의 전체 목록과 그 계산. ZADU 라이브러리의 것이고 이 페이지가
 *     재는 것은 그 가운데 브라우저에서 결정론적으로 셀 수 있는 셋뿐이다.
 */

/** 그림 1 히트맵의 행 순서 그대로. 이 순서가 그룹 구분의 근거다. */
export const AESTHETICS = [
  { id: 'nodeResolution', row: 1, group: 1 },
  { id: 'nodeUniformity', row: 2, group: 1 },
  { id: 'crossingAngle', row: 3, group: 1 },
  { id: 'gabrielEdges', row: 4, group: 1 },
  { id: 'edgeLengthDeviation', row: 5, group: 1 },
  { id: 'angularResolutionMin', row: 6, group: 2 },
  { id: 'angularResolutionAvg', row: 7, group: 2 },
  { id: 'edgeCrossings', row: 8, group: 2 },
  { id: 'gabrielNodes', row: 9, group: 2 },
  { id: 'aspectRatio', row: 10, group: 3 },
  { id: 'edgeOrthogonality', row: 11, group: 4 },
] as const;

export type AestheticId = (typeof AESTHETICS)[number]['id'];

/** 4장의 네 그룹. 이름은 논문 그대로이고 행 범위도 논문이 밝힌 것이다. */
export const GROUPS = [
  { id: 1, name: 'Topology Preserving Aesthetics', rows: [1, 5] },
  { id: 2, name: 'Local Neighborhood Preserving Aesthetics', rows: [6, 9] },
  { id: 3, name: 'Negative Aesthetics', rows: [10, 10] },
  { id: 4, name: 'Independent Aesthetics', rows: [11, 11] },
] as const;

/** 3장 방법. */
export const METHOD = {
  graphs: 627,
  nodeRange: [10, 400],
  /** |E|/|V| 범위. */
  densityRange: [1, 10],
  /** Isomap으로 고른 내재 차원이 보존해야 할 분산 비율(%). */
  variancePercent: 99,
  /** 견고하다고 보는 기준: |r|이 이보다 크고, 조절 분석에서 p가 이보다 클 것. */
  robustAbsR: 0.3,
  robustP: 0.05,
  layoutAlgorithm: 'MDS-initialized Kamada-Kawai',
  drLibrary: 'ZADU',
} as const;

/**
 * 본문이 문장으로 집어 말한 수치들. 히트맵의 나머지 칸은 옮기지 않았다.
 * 그룹 1의 견고한 관계 7개와 그룹 2의 2개는 본문의 "(2 vs. 7)"에서 왔다.
 */
export const FINDINGS = {
  /** 전체 평균 상관이 가장 높은 미적 지표. 다만 크기·밀도에 민감하다. */
  highestAverage: { aesthetic: 'gabrielEdges', r: 0.6198, robust: false },
  /** MRRE와의 가장 높은 기저 상관. 두 지표가 함께 언급됐다. */
  highestWithMrre: { aesthetics: ['edgeCrossings', 'gabrielNodes'], r: 0.7953 },
  /** 견고한 관계를 몇 개나 가졌는지(본문이 센 것). */
  robustCounts: { crossingAngle: 4, nodeResolution: 3 },
  /** 그룹별 견고한 관계의 수. */
  groupRobust: { group1: 7, group2: 2 },
  /** 그룹 4의 상관 상한. */
  independentAbsR: 0.1,
  /** 예시로 든 대체 가능성: 교차각의 대체재로 쓸 만한 DR 지표. */
  surrogateExample: { aesthetic: 'crossingAngle', drMetric: 'Steadiness' },
} as const;

/**
 * 이 페이지가 브라우저에서 실제로 재는 지표들.
 * 미적 지표는 논문의 열하나 가운데 결정론적으로 셀 수 있는 여섯,
 * 충실도 지표는 그래프 최단경로 거리와 2D 거리로 잴 수 있는 셋이다.
 * 나머지는 재지 않고, 화면이 그 사실을 밝힌다.
 */
export const MEASURED_AESTHETICS: readonly AestheticId[] = [
  'nodeResolution',
  'nodeUniformity',
  'crossingAngle',
  'edgeCrossings',
  'aspectRatio',
  'edgeOrthogonality',
];

export const MEASURED_FAITHFULNESS = ['stress', 'trustworthiness', 'continuity'] as const;
export type FaithfulnessId = (typeof MEASURED_FAITHFULNESS)[number];

/** 이웃 수. 논문이 인용한 관행을 따라 일곱로 둔다. */
export const NEIGHBOR_K = 7;

/** 레이아웃 목표 셋. 어느 것이 무엇을 밀어 올리는지가 이 페이지의 이야기다. */
export const GOALS = ['faithful', 'square', 'orthogonal'] as const;
export type GoalId = (typeof GOALS)[number];

/** 견본 그래프 셋. 크기는 논문의 범위 [10, 400] 안쪽에 둔다. */
export const SAMPLES = [
  { id: 'clusters', nodes: 36, seed: 20260904 },
  { id: 'grid', nodes: 36, seed: 20260905 },
  { id: 'tree', nodes: 31, seed: 20260906 },
] as const;

export type SampleId = (typeof SAMPLES)[number]['id'];
