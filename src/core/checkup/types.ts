/** 유출 확인(password checkup) 코어의 자료형. */

/** 해시를 서버로 보내는 조각과 남기는 조각으로 가른 결과. */
export interface HashSplit {
  /** 대문자 16진수 40자. */
  hash: string;
  /** 서버로 보내는 앞부분. */
  prefix: string;
  /** 기기에 남는 뒷부분. */
  suffix: string;
}

/** 앞부분만 보냈을 때 서버가 알게 되는 것의 크기. */
export interface AnonymitySet {
  /** 앞부분이 가질 수 있는 값의 가짓수. */
  prefixSpace: number;
  /** 서버로 넘어가는 정보량(비트). */
  bitsSent: number;
  /** 기기에 남는 정보량(비트). */
  bitsWithheld: number;
  /** 확인 서비스가 들고 있다고 가정한 해시 개수. */
  corpusSize: number;
  /** 같은 앞부분을 가진 해시의 기댓값. 서버가 보는 후보의 수다. */
  expectedBucket: number;
  /** 서버가 그 후보 중에서 내 것을 찍어 맞힐 확률. */
  guessProbability: number;
}

/** 사전 단어 하나를 내 비밀번호로 바꾸는 데 쓰인 변형 규칙. */
export type RuleId = 'reverse' | 'repeat' | 'suffix' | 'prefix' | 'case' | 'leet';

export interface AppliedRule {
  id: RuleId;
  /** 화면에 그대로 적을 짧은 근거. 붙인 글자, 바꾼 글자 수 따위. */
  detail: string;
  /** 이 규칙이 훑어야 할 경우의 수를 몇 배로 늘리는지. */
  branching: number;
}

/** 알려진 유출 단어에서 이 비밀번호에 이르는 가장 짧은 길. */
export interface Derivation {
  /** 출발한 사전 단어. */
  base: string;
  /** 그 단어가 빈도 순 사전에서 몇 번째인지(1부터). */
  baseRank: number;
  /** 적용 순서대로의 규칙. 비어 있으면 사전에 그대로 있는 비밀번호다. */
  rules: AppliedRule[];
  /** 이 사전과 이 규칙으로 훑을 때 대략 몇 번째 시도에서 걸리는지. */
  attempts: number;
}

/** 얼마나 급한 일인지. 논문이 지적한 '경보 피로'를 피하려고 단계를 넷으로만 둔다. */
export type Urgency = 'critical' | 'high' | 'caution' | 'unknown';

export interface CrackTime {
  /** 유출된 해시 파일을 손에 넣은 공격자 기준(초). */
  offline: number;
  /** 로그인 창을 두드리는 공격자 기준(초). */
  online: number;
}

export interface CheckupReport {
  split: HashSplit;
  anonymity: AnonymitySet;
  /** 사전에서 찾은 가장 짧은 길. 못 찾으면 null. */
  derivation: Derivation | null;
  /** 사전에 글자 그대로 있는가. */
  exact: boolean;
  urgency: Urgency;
  /** derivation이 있을 때만 낼 수 있다. */
  crackTime: CrackTime | null;
}
