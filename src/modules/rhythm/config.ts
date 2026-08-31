/**
 * 리듬 페이지 설정.
 *
 * 근거가 된 연구: Birds of a Rhythm — The Effects of Haptic Pattern Similarity on People's
 * Social Perceptions in Virtual Reality (Hyuckjin Jang, Jeongmi Lee, KAIST), ACM CHI 2025.
 *
 * 이 연구는 사람마다 다른 진동 패턴을 주고, 그 패턴이 닮은 정도를 같음·비슷함·다름으로 나눈 뒤
 * 사회적 인식이 어떻게 달라지는지 보았다. 패턴이 닮을수록 상대에게 더 가까이 섰고,
 * 소속감과 유대감, 편안함이 높아졌다. 동질감이 눈으로 보는 것 밖에서도 작동한다는 이야기다.
 *
 * 이 페이지는 그 실험을 재현하지 않는다(VR도, 참가자도 없다). 대신 그 발견을 손으로 만지게 한다.
 * 자기 리듬을 두드려 만들고, 이름 붙은 리듬들이 닮은 만큼 가까이 놓이는 것을 본다.
 * 논문이 쓴 31개 패턴과 닮음을 재는 방법은 공개돼 있지 않아, 리듬도 척도도 이 페이지에서 새로 지었다.
 */

export const PAPER = {
  title:
    "Birds of a Rhythm: The Effects of Haptic Pattern Similarity on People's Social Perceptions in Virtual Reality",
  authors: 'Hyuckjin Jang, Jeongmi Lee',
  venue: 'ACM CHI 2025',
  affiliation: 'KAIST',
  doi: 'https://doi.org/10.1145/3706598.3714264',
} as const;

/** 리듬 마당의 크기(px). 정사각형이라 거리가 방향에 따라 왜곡되지 않는다. */
export const FIELD_SIZE = 520;

/** 마당의 중심에서 가장 먼 리듬까지의 거리. 화면 밖으로 나가지 않게 잡았다. */
export const FIELD_RADIUS = { min: 58, max: 218 } as const;

/** 리듬 하나를 그리는 막대의 크기. */
export const BAR = { height: 44, gap: 2, minWidth: 2 } as const;

/**
 * 소리로 들려줄 때의 성질.
 * 손끝이 아니라 귀로 듣게 되더라도 세기와 길이는 그대로 전해져야 한다.
 */
export const TONE = { frequency: 68, maxGain: 0.22 } as const;

/** 처음 화면에 놓여 있는 리듬. 아무것도 두드리지 않아도 마당이 채워져 있어야 한다. */
export const STARTER_PATTERN_ID = 'heartbeat';
