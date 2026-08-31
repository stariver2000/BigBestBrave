/**
 * 안개의 성질.
 *
 * 액체마다 다른 소리를 품는다는 것이 이 페이지의 뼈대다.
 * 색과 소리를 함께 정해 두어, 눈으로 본 것과 귀로 들은 것이 어긋나지 않게 한다.
 */

export interface Liquid {
  id: string;
  /** 화면에 그려질 색. */
  color: string;
  /** 바탕음의 높이(Hz). */
  frequency: number;
  /** 파형. 액체의 성질을 소리결로 옮긴 것이다. */
  wave: OscillatorType;
  /** 흔들림의 깊이. 0이면 곧은 소리, 크면 일렁인다. */
  vibrato: number;
}

/** 다섯 가지 액체. 서로 섞였을 때 구별되도록 음높이를 화음으로 벌려 두었다. */
export const LIQUIDS: readonly Liquid[] = [
  { id: 'drip', color: '#3B82C4', frequency: 523.25, wave: 'sine', vibrato: 0 },
  { id: 'bell', color: '#C4952E', frequency: 783.99, wave: 'triangle', vibrato: 1.5 },
  { id: 'wind', color: '#5FA88B', frequency: 196, wave: 'sawtooth', vibrato: 4 },
  { id: 'string', color: '#9B5DB5', frequency: 329.63, wave: 'triangle', vibrato: 0.6 },
  { id: 'breath', color: '#C4645E', frequency: 130.81, wave: 'sine', vibrato: 7 },
];

/** 한 번 뿌릴 때 나오는 물방울 수와 흩어지는 정도. */
export const SPRAY = {
  count: 7,
  /** 뿌린 방향으로 나가는 속도(좌표 단위/초). */
  speed: 46,
  /** 방향이 벌어지는 각도(라디안). 분무기의 원뿔을 흉내 낸다. */
  cone: 0.9,
  /** 뿌린 자리에서 흩뿌려지는 반경. */
  jitter: 9,
} as const;

/** 물방울이 공중에 머무는 시간(ms). 하나씩 조금씩 다르게 해야 안개처럼 흩어진다. */
export const LIFETIME = { min: 5200, max: 11000 } as const;

/** 시간이 흐르며 느려지는 정도(초당 남는 비율). 공기의 저항이다. */
export const DRAG = 0.42;

/** 들리는 범위와 줄어드는 모양. */
export const HEARING = {
  /** 이 거리를 넘으면 들리지 않는다. */
  radius: 190,
  /**
   * 거리에 따라 줄어드는 가파름. 1이면 곧게 줄고, 클수록 가까이에서만 들린다.
   * 향이 코앞에서 갑자기 진해지는 느낌을 내려고 1보다 크게 잡았다.
   */
  falloff: 1.8,
} as const;

/** 태어나고 사라질 때의 여닫힘(수명 대비 비율). 뚝 끊기면 소리가 아니라 잡음이 된다. */
export const ENVELOPE = { attack: 0.08, release: 0.45 } as const;

/** 화면에 둘 수 있는 최대 물방울 수. 넘으면 오래된 것부터 사라진다. */
export const MAX_PARTICLES = 420;
