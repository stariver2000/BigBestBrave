/**
 * 읽기 쉬움과 시선 옮김 코어의 상수.
 *
 * 근거가 된 연구: AReading with Smartphones: Understanding the Trade-offs between Enhanced
 * Legibility and Display Switching Costs in Hybrid AR Interfaces
 * (Sunyoung Bang, Hyunjin Lee, Seo Young Oh, Woontack Woo, KAIST), CHI 2025,
 * doi:10.1145/3706598.3713879.
 *
 * 논문이 놓은 자리: 투과형 AR 안경에 글을 띄우면 눈을 딴 데로 돌리지 않아도 되지만 글이
 * 잘 안 보이고, 손에 든 폰에 띄우면 잘 보이지만 화면을 옮겨 다녀야 한다. 그 맞바꿈을 살폈다.
 *
 * 이 페이지는 그 맞바꿈을 계산으로 만들었다. 다만 아래 값들은 논문에서 가져온 것이 아니다.
 * 전문을 구하지 못해 초록의 짜임만 가져왔고, 숫자는 널리 알려진 시각 연구의 값을 옮겼다.
 * 무엇이 어디서 왔는지는 값마다 적어 둔다.
 */

/** 눈에서 화면까지의 거리(밀리미터). */
export const DISTANCE = {
  /** AR 안경의 상은 대개 몇 미터 앞에 맺힌다. */
  ar: 2000,
  /** 손에 든 폰. */
  phone: 400,
} as const;

/**
 * 시력 문턱(logMAR). 0.0이 이른바 1.0 시력이다.
 * 사람 눈의 문턱이 아니라 그 화면이 낼 수 있는 한계로 본다.
 * AR 안경은 각도당 화소가 적어 아무리 크게 띄워도 가장자리가 뭉개진다.
 */
export const ACUITY_FLOOR = { ar: 0.25, phone: 0.0 } as const;

/**
 * 술술 읽히려면 시력 문턱보다 이만큼은 커야 한다.
 * 읽기 연구에서 널리 쓰이는 값이다(acuity reserve).
 */
export const CRITICAL_RESERVE = 0.3;

/** 여유가 모자랄 때 속도가 떨어지는 가파름. 값이 클수록 뚝 떨어진다. */
export const SIZE_FALLOFF = 2;

/** 눈이 다 아는 글을 읽을 때의 최고 속도(분당 낱말). */
export const MAX_WPM = 260;

/**
 * 화면이 내는 빛(칸델라/제곱미터).
 * AR은 이 빛을 바깥 풍경 '위에 더한다'. 그래서 바깥이 밝으면 글자가 잠긴다.
 * 폰은 스스로 검정을 낼 수 있어 대비가 훨씬 잘 선다.
 */
export const EMISSION = { ar: 300, phone: 500 } as const;

/** 폰 화면에 비쳐 드는 둘레 빛의 몫. 유리에 반사되는 만큼이다. */
export const PHONE_GLARE = 0.04;

/**
 * 베버 대비가 이만큼 넘으면 읽기 속도가 더 빨라지지 않는다.
 *
 * 읽기 연구에서 거듭 보고된 바로는 대비가 10%쯤만 되어도 속도가 거의 최고에 이르고,
 * 그 아래에서 가파르게 떨어진다. 처음에는 대비'비'를 10배로 잡았다가 잘못을 알았다.
 * 그러면 실내의 AR조차 못 읽는 것으로 나오는데, 실제로 실내 AR은 읽힌다.
 */
export const CONTRAST_PLATEAU = 0.1;

/** 시선을 한 번 옮기는 데 드는 시간(초). */
export const SWITCH = {
  /** 고개와 눈을 돌리는 데. */
  saccade: 0.35,
  /** 초점을 다시 맞추는 데. 디옵터 차이 한 단위마다. */
  perDioptre: 0.22,
  /** 읽던 자리를 다시 찾는 데. */
  reacquire: 0.5,
} as const;

/**
 * 처음 놓여 있는 형편.
 * 두 화면이 거의 비기는 자리로 골랐다. 눈금을 조금만 밀어도 답이 뒤집히는 것을
 * 첫 화면에서 바로 볼 수 있어야 하기 때문이다.
 */
export const INITIAL = { ambient: 1500, arcminutes: 16, words: 120, lookAways: 8 } as const;

/** 눈금의 범위. */
export const RANGE = {
  ambient: { min: 50, max: 20000, step: 50 },
  arcminutes: { min: 6, max: 40, step: 0.5 },
  words: { min: 20, max: 600, step: 10 },
  lookAways: { min: 0, max: 40, step: 1 },
} as const;
