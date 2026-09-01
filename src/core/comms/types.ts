/** 말할 틈 계산 코어의 자료형. */

/** 논문이 다룬 네 가지 통로. 침묵을 다섯 번째로 둔다. */
export type ChannelId = 'chat' | 'ping' | 'emote' | 'vote' | 'silence';

export interface Channel {
  id: ChannelId;
  /** 손이 게임에서 떨어져 있는 시간(초). 이 동안 나는 플레이를 못 한다. */
  composeSeconds: number;
  /** 보낸 뜻이 보낸 대로 읽힐 확률. 핑은 짧아서 뜻이 갈린다. */
  fidelity: number;
  /** 팀원 한 명이 그것을 알아챌 확률. 채팅은 로그에 묻히고 투표는 눈에 잘 안 든다. */
  notice: number;
  /** 이 말이 나중에 적대로 읽힐 위험. 말은 핑보다 위험하다. */
  socialRisk: number;
  /** 팀원 몇 명이 응해야 뜻이 이뤄지는가. 투표만 1보다 크다. */
  needed: number;
}

export interface Situation {
  id: string;
  /** 이 정보가 제때 닿았을 때의 값(0~1). */
  importance: number;
  /** 값이 절반으로 주는 데 걸리는 시간(초). 짧을수록 급한 정보다. */
  halfLifeSeconds: number;
  /** 지금 내 손이 얼마나 바쁜가(0~1). 한 초의 값이 여기서 정해진다. */
  busyness: number;
  /**
   * 뜻이 잘못 읽혔을 때의 손해(0~1). 논문이 말한, 사람들이 굳이 타이핑을 하는 까닭이다.
   * 잘못 읽힌 핑은 그저 헛수고가 아니라 팀원을 엉뚱한 곳으로 보낸다.
   */
  misreadCost: number;
}

/** 통로 하나에 대한 셈. */
export interface ChannelVerdict {
  channel: ChannelId;
  /** 지금 당장 시작했을 때의 기대값. 음수면 안 하느니만 못하다. */
  expected: number;
  /** 닿는 데 걸리는 시간(초). */
  landsAt: number;
  /** 닿았을 때 이 정보에 남아 있는 값의 비율. */
  remaining: number;
  /** 적어도 필요한 만큼의 팀원에게 닿을 확률. */
  reach: number;
  /**
   * 뜻이 제대로 설 확률에서 잘못 읽힐 손해를 뺀 값. 음수일 수 있다 —
   * 잘못 읽히면 크게 손해인 자리에서 뜻이 흐릿한 통로를 쓰는 것이 그렇다.
   */
  clarity: number;
  /** 내 손이 멈춘 값. */
  attentionCost: number;
  /** 나중에 팀이 깨질 위험의 값. */
  frictionCost: number;
  /**
   * 지금부터 몇 초 안에 시작해야 기대값이 0 위인가.
   * 이미 0 아래면 null이다 — 그런 말은 언제 시작해도 손해다.
   */
  windowSeconds: number | null;
}

export interface Advice {
  verdicts: ChannelVerdict[];
  /** 지금 가장 나은 통로. 아무것도 값이 없으면 'silence'다. */
  best: ChannelId;
  /**
   * 이 순간부터 몇 초가 지나면 침묵이 가장 나은 선택이 되는가.
   * 이미 그렇다면 0이고, 끝내 그렇게 되지 않으면 null이다.
   */
  silenceAfterSeconds: number | null;
}
