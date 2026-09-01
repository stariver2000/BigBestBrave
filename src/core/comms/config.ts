/**
 * 말할 틈 계산 코어의 상수.
 *
 * 근거가 된 연구: Less Talk, More Trust: Understanding Players' In-game Assessment of
 * Communication Processes in League of Legends (Juhoon Lee, Seoyoung Kim, Yeon Su Park,
 * Juho Kim, Jeong-woo Jang, Joseph Seering, KAIST), CHI 2025, doi:10.1145/3706598.3714226.
 *
 * 논문은 질적 연구다. 22명이 경기하는 동안 곁에서 지켜보며 물었고, 그 답을 주제별로 묶었다.
 * 그러니 여기 있는 숫자들은 **논문에서 나온 값이 아니라 이 페이지가 지어낸 값이다.**
 * 논문에서 가져온 것은 숫자가 아니라 **구조**다 — 무엇이 무엇을 좌우하는가.
 *
 * 논문이 말한 구조와, 그것을 여기서 어떻게 숫자로 옮겼는지:
 *   - "행동 경제(action economy)": 타이핑은 게임 시간을 먹는다     -> composeSeconds
 *   - "핑은 놓치거나 무시되거나 잘못 읽히기 쉽다"                   -> fidelity
 *   - "그저 못 봤다" (P1, P2, P3, P9, P12, P15, P18, P20, P21)     -> notice
 *   - "말이 오가는 것 자체가 앞으로 팀이 깨질 신호로 읽힌다"        -> socialRisk
 *   - "오해되면 안 될 만큼 중요하면 늦어지더라도 타이핑한다"        -> misreadCost
 *   - "지고 있는 사람에게는 팀을 이끌 자격이 없다고 여겨진다"       -> standing
 *   - "기회의 창을 놓치면 그 정보는 영영 나가지 못한다"             -> halfLifeSeconds
 */

import type { Channel, Situation } from './types';

/**
 * 통로별 값. 전부 지어낸 값이지만 아무렇게나 고른 것은 아니다.
 *
 * vote의 notice를 유독 낮게 둔 근거: 논문은 관찰된 수십 번의 오브젝트 투표 가운데
 * 세 표를 넘긴 것이 하나도 없었다고 적었다. 네 명 중 셋이 응해야 하는 조건에서
 * 그 일이 거의 일어나지 않으려면 한 사람이 알아챌 확률이 이쯤이어야 한다.
 * (0.25일 때 넷 중 셋 이상이 응할 확률은 약 5%다.)
 */
export const CHANNELS: readonly Channel[] = [
  // 타이핑. 뜻은 또렷하지만 손이 오래 멈추고, 말이라서 나중에 적대로 읽힐 위험이 가장 크다.
  { id: 'chat', composeSeconds: 2.2, fidelity: 0.92, notice: 0.6, socialRisk: 0.5, needed: 1 },
  // 핑. 거의 공짜지만 뜻이 갈린다.
  { id: 'ping', composeSeconds: 0.15, fidelity: 0.55, notice: 0.8, socialRisk: 0.12, needed: 1 },
  // 이모트. 뜻을 거의 못 싣는다. 분위기를 옮길 뿐이다.
  { id: 'emote', composeSeconds: 0.4, fidelity: 0.25, notice: 0.5, socialRisk: 0.2, needed: 1 },
  // 투표. 뜻은 또렷한데 넷 중 셋이 응해야 이뤄진다.
  { id: 'vote', composeSeconds: 0.25, fidelity: 0.85, notice: 0.25, socialRisk: 0.12, needed: 3 },
  // 침묵. 아무 값도 없고 아무 값도 치르지 않는다. 그래서 기준선이 된다.
  { id: 'silence', composeSeconds: 0, fidelity: 0, notice: 0, socialRisk: 0, needed: 1 },
];

/** 팀원 수(나를 뺀). 리그 오브 레전드는 다섯 명이 한 팀이다. */
export const TEAMMATES = 4;

/**
 * 한 초의 값. busyness가 1일 때 손이 멈춘 1초가 이만큼의 값을 깎는다.
 * importance가 0~1이므로, 이 값이 크면 '가장 중요한 정보를 온전히 전한 것'과
 * '2초를 잃은 것'이 맞먹는다는 뜻이 된다.
 */
export const ATTENTION_PRICE = 0.42;

/** 나중에 팀이 깨질 위험 한 단위의 값. socialRisk에 곱해진다. */
export const FRICTION_PRICE = 0.3;

/**
 * 내 성적이 말의 무게에 미치는 영향.
 * standing이 1이면 그대로, 0이면 이만큼만 남는다. 논문이 말한 '성적으로 생기는 서열'이다.
 */
export const STANDING_FLOOR = 0.25;

/**
 * 여럿이 함께 응해야 하는 통로가 이뤄졌을 때의 덤.
 * 정보만 건너가는 것이 아니라 팀이 한 몸으로 움직이기 때문이다.
 */
export const COMMIT_MULTIPLIER = 2.2;

/** 창을 몇 초까지 내다볼 것인가. 이보다 늦으면 어차피 아무 값도 남지 않는다. */
export const HORIZON_SECONDS = 12;

/** 창을 찾을 때의 시간 간격(초). */
export const STEP_SECONDS = 0.05;

/**
 * 상황들. 논문이 예로 든 장면에서 골랐다.
 * 값과 반감기는 여기서 정한 것이지 논문이 잰 것이 아니다.
 */
export const SITUATIONS: readonly Situation[] = [
  // 적이 시야에서 사라졌다. 몇 초만 지나면 이미 늦은 정보다.
  { id: 'missing', importance: 0.7, halfLifeSeconds: 3.5, busyness: 0.5, misreadCost: 0.35 },
  // 지금 그쪽으로 간다. 잘못 읽혀도 크게 손해될 것이 없다.
  { id: 'omw', importance: 0.4, halfLifeSeconds: 6, busyness: 0.45, misreadCost: 0.1 },
  // 큰 오브젝트가 곧 열린다. 값이 크고 오래가지만, 잘못 읽히면 팀이 통째로 죽는다.
  { id: 'objective', importance: 0.95, halfLifeSeconds: 22, busyness: 0.35, misreadCost: 0.8 },
  // 한창 싸우는 중. 값은 큰데 손이 하나도 남지 않는다.
  { id: 'fight', importance: 0.85, halfLifeSeconds: 2, busyness: 0.95, misreadCost: 0.5 },
  // 팀원이 화를 낸다. 무슨 말을 해도 얻는 것이 거의 없고 위험만 크다.
  { id: 'flame', importance: 0.15, halfLifeSeconds: 30, busyness: 0.3, misreadCost: 0.2 },
];

/**
 * 논문이 인용한 핑 사용 빈도(분당). 이 페이지의 셈에는 쓰지 않고 화면에만 적는다.
 * 논문이 [55]에서 가져온 값이다.
 */
export const PING_RATES = {
  onMyWay: { average: 0.267, master: 0.489 },
  enemyMissing: { average: 0.164, master: 0.245 },
} as const;
