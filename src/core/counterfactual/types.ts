/** 반사실 코어의 자료형. */

/** 맥락의 종류 넷. 논문이 쓴 것 그대로다. */
export type Facet = 'activity' | 'place' | 'social' | 'time';

/** 한 상황. 맥락 넷의 값이 하나씩 정해진 것. */
export type Situation = Record<Facet, string>;

/** 기록 한 줄. 그때의 상황과 스트레스 수준(1~5). */
export interface Record_ {
  situation: Situation;
  level: number;
}

/** 스트레스가 높다고 볼 문턱 위의 기록인가. */
export interface Fitted {
  /** 맥락 값마다의 로그 오즈 무게. weights[facet][value]. */
  weights: Record<Facet, Record<string, number>>;
  /** 아무 맥락도 모를 때의 로그 오즈. */
  bias: number;
  /** 기록 수. 화면에 적는다. */
  count: number;
  /** 높은 스트레스의 비율. */
  highRate: number;
}

/** 반사실 하나. */
export interface Counterfactual {
  situation: Situation;
  /** 이 상황에서 스트레스가 높을 확률. */
  probability: number;
  /** 목표 상황에서 몇 가지를 바꿨는가. 논문의 n이다. */
  changes: number;
  /** 바뀐 맥락의 종류. */
  changed: Facet[];
  /** 이 상황을 전에 몇 번이나 겪었는가. 논문의 r이다. 0이면 겪어 본 적 없다. */
  seen: number;
  /** 목표 상황보다 확률이 얼마나 줄었는가. */
  drop: number;
}

/** 맥락 하나가 확률을 줄이는 데 얼마나 이바지했는가. */
export interface Contribution {
  facet: Facet;
  from: string;
  to: string;
  /** 섀플리 값. 전부 더하면 확률 변화와 정확히 같다. */
  value: number;
}

/** 거친 정확 짝짓기로 잰 인과 효과. */
export interface CausalEffect {
  facet: Facet;
  value: string;
  /** 이 맥락일 때의 평균 스트레스. */
  treated: number;
  /** 나머지 맥락이 같은 짝을 지은 뒤의, 아닐 때의 평균 스트레스. */
  control: number;
  /** treated - control. 양수면 이 맥락이 스트레스를 올린다. */
  effect: number;
  /** 짝을 지은 기록 수. 적으면 믿을 값이 못 된다. */
  matched: number;
  /** 짝을 짓기 전의 단순 차이. 짝짓기가 무엇을 걷어 냈는지 견주려고 함께 낸다. */
  naive: number;
}
