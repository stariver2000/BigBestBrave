/**
 * 차원 축소 산점도 신뢰도 검사의 자료형.
 *
 * 고차원 자료와 2차원 좌표를 함께 받아, 좌표가 원래 이웃 관계를 얼마나 지켰는지 잰다.
 * 이 모듈은 상위 계층을 import하지 않으며 브라우저 API도 쓰지 않는다.
 */

/** 검사 입력. 두 배열의 길이(점 개수)는 반드시 같아야 한다. */
export interface Projection {
  /** 고차원 원본. rows[i]가 i번째 점의 특징 벡터다. */
  high: number[][];
  /** 2차원 좌표. low[i] = [x, y]. */
  low: [number, number][];
  /** 있으면 이웃 적중률 계산에 쓴다. 없으면 그 지표는 건너뛴다. */
  labels?: string[];
}

export interface Metrics {
  /**
   * 신뢰도(trustworthiness). 산점도에서 가까워 보이지만 원래는 멀었던 이웃(거짓 이웃)을 벌한다.
   * 1에 가까울수록 "가까이 보이는 것을 믿어도 된다".
   */
  trustworthiness: number;
  /**
   * 연속성(continuity). 원래는 가까웠는데 산점도에서 멀어진 이웃(놓친 이웃)을 벌한다.
   * 1에 가까울수록 "떨어져 보이는 것이 실제로도 멀다".
   */
  continuity: number;
  /** 라벨이 있을 때만. 2차원 이웃 k개 중 같은 라벨의 비율. */
  neighborhoodHit: number | null;
  /** 모든 점쌍 거리의 스피어만 순위 상관. 전체 구조(멀고 가까운 순서)가 얼마나 남았는지. */
  distanceCorrelation: number;
  /** 계산에 쓴 이웃 수. 지표는 이 값에 따라 달라지므로 함께 들고 다닌다. */
  k: number;
  pointCount: number;
}

/** 점 하나의 국소 왜곡. 산점도에 색으로 얹어 "어디가 문제인지" 보여 준다. */
export interface PointDistortion {
  /** 산점도에서는 이웃인데 원래는 아니었던 점의 수. */
  falseNeighbors: number;
  /** 원래는 이웃인데 산점도에서 밀려난 점의 수. */
  missingNeighbors: number;
  /** 놓친 이웃들의 원본 인덱스. 화면에서 선으로 이어 보여 준다. */
  missingIndices: number[];
  /** 산점도에서 옆에 있지만 원래는 남이었던 점들. 렌즈가 이 점들을 붉게 표시한다. */
  falseIndices: number[];
  /** 원래 공간에서의 이웃 k개. 렌즈가 "사실은 누가 이웃인가"를 그릴 때 쓴다. */
  trueNeighbors: number[];
}

