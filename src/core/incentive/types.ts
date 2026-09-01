/** 작은 보상 개인화 코어의 자료형. */

/** 시간 맥락. 논문이 나눈 세 가지 그대로다. */
export type Context = 'work' | 'off' | 'weekend';

/** 견줄 세 가지 방식. 논문의 세 집단과 같다. */
export type Strategy = 'fixed' | 'random' | 'personal';

/** 보상 하나에 대한 한 팔의 상태. 성공과 실패를 센 것이 전부다. */
export interface Arm {
  amount: number;
  successes: number;
  failures: number;
}

/** 맥락마다 팔 한 벌씩. */
export type Bandit = Record<Context, Arm[]>;

/** 한 번의 뽑기에서 각 팔이 받은 값. */
export interface Draw {
  amount: number;
  /** 베타 분포에서 뽑은 성공 확률. */
  theta: number;
  /** 기대 비용 = theta x amount. */
  cost: number;
  /** 파레토 앞면에 들었는가. */
  onFront: boolean;
}

/** 한 회의 기록. */
export interface Round {
  index: number;
  context: Context;
  amount: number;
  succeeded: boolean;
  /** 이 회까지 쓴 돈의 합. */
  spent: number;
}

/** 한 방식을 끝까지 돌린 결과. */
export interface Run {
  strategy: Strategy;
  rounds: Round[];
  /** 성공한 횟수의 비율. */
  successRate: number;
  /** 실제로 나간 돈의 합. 성공했을 때만 지급한다. */
  totalCost: number;
  /** 성공 한 번에 든 돈. 성공이 없으면 null. */
  costPerSuccess: number | null;
  /**
   * 맥락마다 이 방식이 평균 얼마를 걸었는가.
   *
   * '가장 많이 고른 금액'을 쓰지 않는 이유: 0원짜리 팔은 비용이 0이라 언제나 파레토 앞면에
   * 남고, 그래서 어떤 사람을 상대하든 횟수로는 0원이 1등이 된다. 그 값은 설정을 바꿔도
   * 움직이지 않아 아무것도 알려 주지 않는다. 평균은 앞면이 좁아지고 넓어지는 것을 따라 움직인다.
   */
  meanOffer: Record<Context, number | null>;
}

/** 사람이 돈에 얼마나 움직이는가. 화면에서 사용자가 만든다. */
export interface Responder {
  /** 돈이 없을 때의 성공 확률(0~1). */
  base: number;
  /** 보상이 충분해졌을 때 얼마나 더 오르는가(0~1). */
  lift: number;
  /**
   * 이 금액이면 충분한 지점(원). 여기까지는 돈이 늘수록 잘하지만, 넘어서면 더 줘도 그대로다.
   *
   * 이 항이 이 페이지의 요점이다. 파레토 앞면은 '성공은 같은데 더 비싼' 팔만 걸러 낼 수 있다.
   * 그러니 돈을 줄수록 끝없이 잘하는 사람에게는 다섯 팔이 모두 앞면에 남아 개인화가
   * 무작위와 다를 바 없어진다. 사람에게 '이만하면 충분한' 지점이 있을 때에야
   * 알고리즘이 그 위를 잘라 내고 돈을 아낀다. 논문의 제목이 말하는 저울도 그런 뜻이다.
   */
  enough: number;
  /** 맥락마다의 어려움. base에 더해진다. */
  contextShift: Record<Context, number>;
}
