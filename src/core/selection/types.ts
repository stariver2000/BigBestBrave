/** 선택 방식 실험 코어의 자료형. */

/** 세 가지 선택 방아쇠. 논문이 견준 것 그대로다. */
export type Trigger = 'cross' | 'dwell' | 'pinch';

/** 한 줄 위의 과녁. 위치는 0~1로 정규화한 띠 좌표다. */
export interface Target {
  id: number;
  center: number;
  /** 과녁의 폭(띠 전체 대비 비율). */
  width: number;
}

export interface Frame {
  /** 커서의 띠 좌표(0~1). */
  x: number;
  /** 실험 시작부터의 밀리초. */
  time: number;
  /** 이번 프레임에 확정 신호(핀치)가 있었는가. */
  pinched: boolean;
}

/** 방아쇠가 당겨진 순간. */
export interface Fire {
  /** 어느 과녁이 골라졌는가. 아무 과녁도 아니면 null. */
  targetId: number | null;
  /** 골라진 순간의 커서 좌표. 유효 폭을 재는 데 쓴다. */
  x: number;
  time: number;
}

/** 방아쇠 하나의 상태. 순수 함수로 굴린다. */
export interface TriggerState {
  /** 지금 커서가 들어가 있는 과녁. */
  insideId: number | null;
  /** 그 과녁에 들어간 순간(드웰 계산용). */
  enteredAt: number;
  /** 어느 쪽 모서리로 들어왔는가(크로싱 판정용). */
  enteredFrom: 'left' | 'right' | null;
  /** 이번 판에서 과녁 안팎을 드나든 횟수. 논문의 target re-entry다. */
  reentries: number;
}

/** 한 번의 선택 기록. */
export interface Selection {
  /** 골라야 했던 과녁. */
  askedId: number;
  /** 실제로 골라진 과녁. 빗나가면 다르다. */
  gotId: number | null;
  /** 앞선 선택부터 이번 선택까지의 시간(초). */
  movementTime: number;
  /** 골라진 순간의 커서 좌표. */
  x: number;
  /** 이 선택이 시작될 때 커서가 있던 좌표. 실제 이동 거리를 재는 데 쓴다. */
  fromX: number;
  /** 과녁의 명목 폭. */
  width: number;
  /** 과녁의 명목 이동 거리. */
  amplitude: number;
  reentries: number;
}

/** 한 조건(폭 × 거리)에서 모은 값. 피츠 모형의 점 하나가 된다. */
export interface ConditionPoint {
  width: number;
  amplitude: number;
  /** 실제로 움직인 거리의 평균. */
  effectiveAmplitude: number;
  /** 끝점이 흩어진 정도에서 되짚은 폭. We = 4.133 × 표준편차. */
  effectiveWidth: number;
  /** 유효 난이도 IDe = log2(Ae / We + 1). */
  ide: number;
  /** 평균 이동 시간(초). */
  movementTime: number;
  count: number;
}

/** 방아쇠 하나에 대한 최종 성적. */
export interface TriggerReport {
  trigger: Trigger;
  /** MT = a + b × IDe. */
  intercept: number;
  slope: number;
  /** 모형이 얼마나 잘 맞는가. */
  rSquared: number;
  /** 처리량(bits/second). IDe를 MT로 나눈 값의 평균이다. */
  throughput: number;
  /** 평균 이동 시간(초). */
  movementTime: number;
  /** 빗나간 비율(0~1). */
  errorRate: number;
  /** 판마다의 과녁 재진입 횟수 평균. */
  reentries: number;
  points: ConditionPoint[];
  selectionCount: number;
}
