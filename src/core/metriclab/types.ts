/** 지표 비교 코어의 자료형. */

/**
 * 지표의 **설계 갈래**. 논문이 가르는 세 갈래를 그대로 쓴다.
 * 이 페이지의 요점은 이 갈래가 실제 행동을 예측하지 못한다는 것이다.
 */
export type MetricFamily = 'local' | 'cluster' | 'global';

export interface MetricSpec {
  id: string;
  family: MetricFamily;
  /** 값이 클수록 좋은 지표인가. 상관을 낼 때 방향을 맞추는 데 쓴다. */
  higherIsBetter: boolean;
  /** 라벨이 있어야만 잴 수 있는가. */
  needsLabels: boolean;
}

/** 고차원 자료 한 벌. */
export interface Dataset {
  id: string;
  rows: number[][];
  labels: string[];
}

/** 한 장의 산점도. */
export interface Projection {
  /** 어떤 방식으로 만들었는지. 화면에 적는다. */
  recipe: string;
  low: [number, number][];
}

/** 지표 하나가 산점도 무리 전체에 매긴 점수. 길이는 산점도 수와 같다. */
export interface MetricScores {
  metricId: string;
  scores: number[];
}

/** 두 지표가 얼마나 같이 움직이는가. */
export interface MetricSimilarity {
  /** 지표 id 순서. 행렬의 행·열 순서다. */
  order: string[];
  /** rho[i][j] = 스피어만 순위 상관. 대각선은 1이다. */
  rho: number[][];
}

/** 지표 무리 하나. */
export interface MetricCluster {
  members: string[];
  /** 무리 안에서 다른 것들과 가장 닮은 지표. 이 하나만 골라 쓰면 된다. */
  representative: string;
  /** 무리 안 평균 상관. 1에 가까우면 서로 갈아 끼워도 되는 사이다. */
  cohesion: number;
}

/** 설계는 다른데 행동이 같은 쌍. 이 페이지가 하고 싶은 말이다. */
export interface Twin {
  a: string;
  b: string;
  rho: number;
  /** 두 지표의 설계 갈래가 다른가. */
  crossFamily: boolean;
}

export interface LabReport {
  projections: Projection[];
  scores: MetricScores[];
  similarity: MetricSimilarity;
  clusters: MetricCluster[];
  /** 덴드로그램 순서. 히트맵의 행·열을 이 순서로 놓으면 무리가 덩어리로 보인다. */
  leafOrder: string[];
  /** 무리 수를 하나씩 늘릴 때 얻는 이득. 팔꿈치를 찾는 데 쓴다. */
  gainByCount: number[];
  suggestedClusterCount: number;
  twins: Twin[];
}
