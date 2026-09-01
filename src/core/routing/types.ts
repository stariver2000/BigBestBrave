/** 길찾기 코어의 자료형. */

/** 격자 위의 자리. */
export interface Node {
  id: number;
  x: number;
  y: number;
}

/** 두 자리를 잇는 길. */
export interface Edge {
  id: number;
  from: number;
  to: number;
  /** 막히지 않았을 때의 시간(분). */
  base: number;
  /** 큰길인가. 앱은 큰길의 막힘을 잘 알고, 사람은 골목을 잘 안다. */
  arterial: boolean;
}

export interface City {
  nodes: Node[];
  edges: Edge[];
  /** 자리마다 이어진 길의 번호. 다익스트라가 이 표를 쓴다. */
  adjacency: number[][];
}

/** 오늘 이 길들이 실제로 얼마나 걸리는가. */
export type Times = number[];

/** 논문이 가른 세 가지 태도. */
export type Mode = 'follow' | 'modify' | 'background';

/** 한 번의 다녀옴. */
export interface Trip {
  index: number;
  mode: Mode;
  /** 지나온 길의 번호. */
  path: number[];
  /** 실제로 걸린 시간. */
  minutes: number;
  /** 모든 것을 알았다면 걸렸을 가장 짧은 시간. */
  best: number;
  /** 걸린 시간에서 가장 짧은 시간을 뺀 값. 0보다 작아질 수 없다. */
  regret: number;
  /** 화면을 몇 번 보았는가. */
  glances: number;
}

/** 한 태도로 여러 번 다닌 결과. */
export interface Run {
  mode: Mode;
  trips: Trip[];
  meanMinutes: number;
  meanRegret: number;
  /** 도시의 길 가운데 한 번이라도 지나 본 비율. */
  coverage: number;
  /**
   * 서로 다른 길이 몇 갈래 나왔는가.
   *
   * 지나 본 비율만 보면 여러 날을 다니는 동안 다들 1에 붙어 버려 아무것도 알려 주지 않는다.
   * 같은 길을 얼마나 되풀이하는가는 태도마다 크게 갈리므로 이 둘을 함께 낸다.
   */
  distinctRoutes: number;
  /** 가장 자주 간 길이 전체에서 차지하는 몫. 1에 가까우면 늘 같은 길로 다닌 것이다. */
  topRouteShare: number;
  /** 화면을 본 횟수의 평균. */
  meanGlances: number;
  /** 길마다 지나간 횟수. 지도에 굵기로 그린다. */
  useCount: number[];
}
