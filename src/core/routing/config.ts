/**
 * 길찾기 코어의 상수.
 *
 * 근거가 된 연구: Modes of Interaction with Navigation Apps (Ju Yeon Jung, Tom Steinberger,
 * Phenomenal Data Lab, KAIST), CHI 2025, doi:10.1145/3706598.3714180.
 *
 * 연구진은 서른 번의 면담에서 길찾기 앱을 대하는 방식이 셋으로 묶인다는 것을 보였다.
 *   follow     — 앱이 시키는 대로 간다.
 *   modify     — 앱의 길을 받되 아는 구간은 내 방식대로 바꾼다.
 *   background — 내 길로 가고, 앱은 켜 두기만 한다. 크게 밀릴 때만 듣는다.
 *
 * 이 페이지가 가져온 것은 이 세 가지 태도와, 태도마다 얻는 것과 잃는 것이 다르다는 짜임이다.
 * 숫자는 하나도 가져오지 않았다. 면담 연구라 이런 값을 재지 않았기 때문이다.
 */

/** 도시의 크기. 4 x 4면 자리 열여섯, 길 스물넷이다. */
export const GRID = 4;

/** 길 하나의 기본 시간(분). 큰길이 조금 빠르다. */
export const BASE_MINUTES = { arterial: 4, street: 5 } as const;

/** 오늘 이 길이 막힐 확률과, 막혔을 때 더해지는 시간. 그날그날 달라지는 몫이다. */
export const JAM = { chance: 0.16, minMinutes: 3, maxMinutes: 11 } as const;

/**
 * 늘 느린 길이 따로 있다. 아침마다 밀리는 그 길 말이다.
 *
 * 이 몫이 없으면 기억이 쓸모없어진다. 그날그날 무작위로만 막힌다면 어제 겪은 일이
 * 오늘을 알려 주지 못하기 때문이다. 사람이 앱보다 나을 수 있는 자리가 바로 여기다 —
 * 골목이 평소 어떤지는 앱보다 늘 다니는 사람이 잘 안다.
 */
export const HABITUAL = { chance: 0.3, minMinutes: 2, maxMinutes: 6 } as const;

/**
 * 앱이 아는 것과 사람이 아는 것.
 *
 * 앱은 큰길을 잘 본다. 차가 많이 다녀 자료가 쌓이기 때문이다.
 * 사람은 늘 다니던 길을 잘 안다. 골목은 앱보다 사람이 낫다.
 * 두 앎이 어긋나는 자리에서 세 태도가 갈린다.
 */
export const KNOWS = {
  /** 앱이 큰길의 오늘 막힘을 알아채는 정도(0~1). */
  appArterial: 0.9,
  /** 앱이 골목의 오늘 막힘을 알아채는 정도. 차가 적어 자료가 얕다. */
  appStreet: 0.2,
} as const;

/**
 * 기억이 평소 시간 쪽으로 끌려가는 무게.
 *
 * 이것이 없으면 한 번 겪은 나쁜 날이 그 길의 인상을 통째로 정해 버린다. 그러면 그 길을
 * 다시는 안 가게 되고, 안 가니 기억이 고쳐지지도 않는다. 이 무게가 2라면 한 번의 경험은
 * 평소 시간과 2:1로 섞여, 하루치 우연이 판단을 뒤집지 못한다.
 */
export const MEMORY_PRIOR = 2;

/** 배경으로 켜 둔 앱이 끼어드는 문턱(분). 이만큼 넘게 벌어져야 듣는다. */
export const INTERRUPT_MINUTES = 6;

/** 화면을 보는 횟수. 태도마다 다르다. 지어낸 값이다. */
export const GLANCES = { follow: 6, modify: 3, background: 1 } as const;

/**
 * 몇 번이나 다녀 볼 것인가.
 *
 * 처음 값을 60으로 둔 까닭: 기억은 다닌 만큼 쌓이므로 며칠 안 다니면 '고치기'가 쓸 밑천이
 * 없어 '켜 두기'와 구별되지 않는다. 60일쯤부터 셋이 갈리고, 아무도 모든 값에서 이기지 않는
 * 자리가 나온다. 눈금을 왼쪽으로 밀면 아는 것이 없을 때 어떤지도 볼 수 있다.
 */
/**
 * 다녀오는 횟수(날 수)의 범위.
 * 걸음이 하루씩이라 눈금도 하루로 둔다 — 화면이 하루씩 세는데 손잡이가 닷새씩 튀면 어긋나 보인다.
 */
export const TRIPS = { min: 5, max: 120, step: 1, initial: 60 } as const;

/** 씨앗. 같은 씨앗이면 같은 날들이 온다. */
export const SEED = 20250901;

export const MODES = ['follow', 'modify', 'background'] as const;
