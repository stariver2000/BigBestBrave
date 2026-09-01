/** 서로 기록하기 코어의 자료형. */

/** 논문이 참가자에게 살펴보라고 준 여섯 자리. */
export type Area = 'habit' | 'trait' | 'talk' | 'trigger' | 'stress' | 'strength';

/** 한 사람이 적는 세 벌의 답. 자리마다 0~4다. */
export interface Sheet {
  /** 이 자리를 내가 얼마나 안다고 보는가. */
  selfKnows: number[];
  /** 상대가 나에게서 이만큼 본다고 짐작하는가. */
  guessesOther: number[];
  /** 내가 상대에게서 이만큼 본다. */
  seesOther: number[];
}

/**
 * 조하리 창 네 칸. 넷을 더하면 언제나 눈금의 최대값이 된다.
 * 이 항등식이 이 페이지의 뼈대라 시험으로 붙들어 둔다.
 */
export interface Window {
  area: Area;
  /** 둘 다 아는 만큼. min(자기, 상대) */
  open: number;
  /** 상대는 보는데 나는 모르는 만큼. max(0, 상대 - 자기) */
  blind: number;
  /** 나는 아는데 상대는 못 보는 만큼. max(0, 자기 - 상대) */
  hidden: number;
  /** 둘 다 모르는 만큼. 최대값 - max(자기, 상대) */
  unknown: number;
  /** 셈에 쓴 두 값. 화면이 그대로 보여 준다. */
  selfKnows: number;
  seesMe: number;
}

/**
 * 어긋남을 둘로 가른 것.
 *
 * (내가 아는 정도 - 상대가 보는 정도) = (내가 아는 정도 - 내 짐작) + (내 짐작 - 상대가 보는 정도)
 *
 * 앞쪽은 내가 알면서 숨긴 몫이고, 뒤쪽은 짐작이 빗나간 몫이다.
 * 이 등식도 정확히 성립하므로 시험으로 붙든다.
 */
export interface Split {
  area: Area;
  /** 전체 어긋남. */
  total: number;
  /** 알면서 감춘 몫. */
  withheld: number;
  /** 짐작이 빗나간 몫. */
  misjudged: number;
}

/** 두 사람을 함께 본 결과. */
export interface Report {
  /** A가 보는 A의 창. */
  windows: Window[];
  splits: Split[];
  /** 짐작이 얼마나 맞았는가. 0이면 완벽히 맞혔다. */
  metaError: number;
  /** 눈에 가장 안 띄던 자리부터. */
  blindSpots: Window[];
  /** 내가 상대를 보는 평균. */
  iSee: number;
  /** 상대가 나를 보는 평균. */
  seenByOther: number;
  /** 둘의 차이. 양수면 내가 상대를 더 많이 본다는 뜻이다. */
  asymmetry: number;
}
