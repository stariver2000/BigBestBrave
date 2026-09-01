/**
 * 차트가 자료를 얼마나 어긋나게 보여 주는지 재는 자료형.
 *
 * 논문은 차트 그림에서 요소를 검출해 어느 부분이 오해를 만드는지 짚는다.
 * 이 코어는 그림이 아니라 **차트의 설정**을 받는다. 설정만 있어도 왜곡의 크기는 계산되고,
 * 계산된 값은 그림에서 읽어 낸 것보다 정확하다. 대신 남의 차트 이미지를 검사할 수는 없다.
 */

export type ChartKind = 'bar' | 'line' | 'bubble';

/** 원의 크기를 값에 어떻게 잇는지. 반지름에 이으면 넓이가 제곱으로 커진다. */
export type BubbleScale = 'area' | 'radius';

export interface ChartSpec {
  kind: ChartKind;
  values: number[];
  /** 세로축이 시작하는 값. null이면 0에서 시작한다. */
  axisMin: number | null;
  /** 세로축이 끝나는 값. null이면 가장 큰 값에 맞춘다. */
  axisMax: number | null;
  /** 그림이 그려지는 크기(px). 선 그래프의 기울기를 좌우한다. */
  width: number;
  height: number;
  bubbleScale: BubbleScale;
  /** 세로축을 뒤집었는지. 위로 갈수록 작아진다. */
  inverted: boolean;
}

export type FindingKind =
  /** 축을 0이 아닌 곳에서 시작해 차이를 부풀렸다. */
  | 'truncated-axis'
  /** 원의 반지름에 값을 이어 넓이가 제곱으로 커졌다. */
  | 'radius-encoding'
  /** 가로세로 비율이 기울기를 부풀리거나 눕혔다. */
  | 'aspect-distortion'
  /** 세로축을 뒤집어 방향이 반대로 읽힌다. */
  | 'inverted-axis'
  /** 축 위쪽이 잘려 일부 값이 그림 밖으로 나갔다. */
  | 'clipped-range';

export interface Finding {
  kind: FindingKind;
  /**
   * 왜곡 배수. 그림에서 읽히는 차이를 자료의 실제 차이로 나눈 값이다.
   * 1이면 정직하고, 2면 두 배로 부풀려 보이며, 1보다 작으면 차이를 눌러 감춘 것이다.
   * 배수로 잴 수 없는 종류(뒤집힌 축 등)에서는 null이다.
   */
  factor: number | null;
  /** 화면이 문구를 고를 때 쓰는 심각도. */
  severity: 'high' | 'medium' | 'low';
}

export interface Audit {
  findings: Finding[];
  /** 가장 큰 왜곡 배수. 없으면 1(정직). */
  worst: number;
}
