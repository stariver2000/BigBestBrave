/**
 * 삐삐 체험 페이지 설정.
 *
 * 근거가 된 연구: Back to the 1990s, BeeperRedux! — Revisiting Retro Technology to Reflect
 * Communication Quality and Experience in the Digital Age. ACM CHI 2025, KAIST.
 *
 * 이 연구는 옛 기기를 다시 써 보게 하고, 그 제약이 소통의 질을 어떻게 바꾸는지를 살핀 질적 연구다.
 * 논문의 방법(참여자 관찰과 인터뷰)을 구현할 수는 없다. 대신 논문이 다룬 **제약 그 자체**를
 * 화면에서 겪게 만든다. 숫자 스무 자리 안에 마음을 밀어 넣어 보면, 무엇을 포기하게 되는지
 * 설명 없이 알게 된다. 이 페이지가 재현하는 것은 결론이 아니라 조건이다.
 */

export const PAPER = {
  title:
    'Back to the 1990s, BeeperRedux!: Revisiting Retro Technology to Reflect Communication Quality and Experience in the Digital Age',
  venue: 'ACM CHI 2025',
  affiliation: 'KAIST',
  listing: 'https://hci.kaist.ac.kr/chi-2025/',
} as const;

/** 화면에 처음 떠 있는 숫자. 무엇을 하는 곳인지 한눈에 알리는 인사다. */
export const WELCOME_DIGITS = '1004';

/** 보내기 칸의 예시 문장들. 눌러서 바로 넣어 볼 수 있게 한다. */
export const SUGGESTIONS: readonly string[] = [
  '사랑해',
  '빨리빨리',
  '천사',
  '일찍와',
  '친구사이',
  '보고싶어',
];

/** 액정에 한 줄로 보여 줄 최대 자릿수. 넘으면 줄을 바꾼다. */
export const LCD_COLUMNS = 10;

/** 숫자가 찍힐 때 울리는 소리의 성질. 실제 삐삐의 짧은 전자음을 흉내 낸다. */
export const BEEP = {
  frequency: 1720,
  durationMs: 55,
  gain: 0.05,
} as const;

/** 호출이 왔을 때 울리는 방식. 짧은 소리 두 번과 짧은 진동 — 실제 기기의 인상이다. */
export const RING = {
  beeps: 2,
  gapMs: 140,
  vibrationMs: 120,
} as const;

/**
 * 액정에 숫자가 한 자리씩 찍히는 간격(ms).
 * 한 번에 다 뜨면 '도착했다'는 감각이 없다. 기다리는 짧은 시간이 이 놀이의 절반이다.
 */
export const REVEAL_INTERVAL_MS = 180;
