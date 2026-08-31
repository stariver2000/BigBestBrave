/**
 * 뿌리는 소리 페이지 설정.
 *
 * 근거가 된 연구: Sprayable Sound — Exploring the Experiential and Design Potential of
 * Physically Spraying Sound Interaction (Jongik Jeon, Chang Hee Lee, KAIST), ACM CHI 2025.
 *
 * 연구진이 만든 SoundMist는 실제 액체를 공중에 뿌려 그 자리에 소리를 둔다.
 * 향이 그러하듯 가까이 가면 커지고 멀어지면 작아지며, 시간이 지나면 흩어져 사라진다.
 * 연구가 꼽은 즐거움 넷 중 하나가 서로 다른 소리를 섞는 것이었다.
 *
 * 이 페이지는 그 장치를 재현하지 않는다(액체도, 공간도 없다). 대신 그 규칙만 화면으로 옮긴다 —
 * 소리를 자리에 두고, 다가가 듣고, 섞고, 사라지는 것을 지켜본다.
 */

export const PAPER = {
  title: 'Sprayable Sound: Exploring the Experiential and Design Potential of Physically Spraying Sound Interaction',
  authors: 'Jongik Jeon, Chang Hee Lee',
  venue: 'ACM CHI 2025',
  affiliation: 'KAIST',
  doi: 'https://doi.org/10.1145/3706598.3713786',
} as const;

/** 뿌리는 자리의 크기(좌표 단위). 화면 폭에 맞춰 늘어나되 비율은 이 값을 따른다. */
export const CANVAS = { width: 900, height: 560 } as const;

/** 물방울 하나를 그리는 반지름. 가운데가 진하고 가장자리로 갈수록 옅어진다. */
export const DROP_RADIUS = 26;

/** 뿌리는 간격(ms). 누르고 있는 동안 이 간격으로 계속 나온다. */
export const SPRAY_INTERVAL = 90;

/** 소리 크기가 따라 붙는 빠르기(초). 값이 바뀔 때 뚝 끊기지 않게 한다. */
export const GAIN_GLIDE = 0.08;

/** 액체 하나의 최대 소리 크기. 다섯이 겹쳐도 시끄럽지 않을 만큼으로 잡았다. */
export const MAX_GAIN = 0.14;
