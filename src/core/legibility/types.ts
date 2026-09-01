/** 읽기 쉬움과 시선 옮김 코어의 자료형. */

/** 글을 어디에 띄우는가. */
export type Surface = 'ar' | 'phone';

/** 지금의 형편. 화면에서 사용자가 만든다. */
export interface Setting {
  /** 둘레의 밝기(칸델라/제곱미터). 실내 200쯤, 흐린 날 창가 2000쯤, 한낮 바깥 10000 넘음. */
  ambient: number;
  /**
   * 글자가 눈에 맺히는 크기(분각).
   *
   * 밀리미터가 아니라 각도로 다루는 까닭: AR의 글자는 몇 미터 앞 허공에 맺히고 폰의 글자는
   * 손안에 있다. 같은 밀리미터라도 눈에는 전혀 다른 크기로 닿으므로 밀리미터끼리 견주면
   * 서로 다른 종류의 값을 한 자리에서 재는 셈이 된다. 눈이 실제로 받는 것은 각도다.
   */
  arcminutes: number;
  /** 읽을 글자 수(낱말). */
  words: number;
  /** 읽는 동안 바깥을 몇 번이나 돌아봐야 하는가. */
  lookAways: number;
}

/** 한 화면에 대해 잰 값. */
export interface Reading {
  surface: Surface;
  /** 이 화면에서 그 각도를 내려면 글자가 몇 밀리미터여야 하는가. */
  millimetres: number;
  /** 그 크기의 logMAR. 클수록 큰 글자다. */
  logMar: number;
  /** 시력 문턱보다 얼마나 여유가 있는가. 0.3쯤은 있어야 술술 읽힌다. */
  reserve: number;
  /** 베버 대비. 배경 밝기에 견준 글자의 밝기다. 0.1(10%)쯤이면 읽기에 넉넉하다. */
  contrast: number;
  /** 크기 때문에 남는 읽기 속도의 몫(0~1). */
  sizeFactor: number;
  /** 대비 때문에 남는 몫(0~1). */
  contrastFactor: number;
  /** 분당 낱말. */
  wordsPerMinute: number;
  /** 글을 읽는 데만 드는 시간(초). */
  readSeconds: number;
  /** 시선을 옮기는 데 드는 시간(초). */
  switchSeconds: number;
  /** 둘을 더한 값. */
  totalSeconds: number;
}

/** 두 화면을 견준 결과. */
export interface Verdict {
  ar: Reading;
  phone: Reading;
  /** 더 빠른 쪽. 같으면 'ar'로 둔다. */
  winner: Surface;
  /** 이긴 쪽이 아낀 시간(초). */
  savedSeconds: number;
  /**
   * 답이 뒤집히는 자리. 지금 설정에서 둘레 밝기만 바꿔 갈 때 처음으로 승자가 바뀌는 값.
   * 끝까지 바뀌지 않으면 null이다.
   */
  ambientCrossover: number | null;
  /** 돌아보는 횟수만 바꿔 갈 때 승자가 바뀌는 값. */
  lookAwayCrossover: number | null;
}
