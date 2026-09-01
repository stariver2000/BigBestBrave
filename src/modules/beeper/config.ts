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
  /**
   * 쉬운 말로. 열두 살이 읽어도 통하는 문장만 쓴다.
   * 논문이 무슨 말을 하려는 것인지 먼저 전하고, 이 페이지가 어디까지 가져왔는지를 밝힌다.
   */
  plain: {
    problem: {
      ko: '지금은 하루에도 수십 번 메시지를 보냅니다. 그래서 무슨 말을 할지 오래 고르는 일은 드뭅니다. 연구자들은 궁금해했습니다 — 옛날처럼 숫자만 보낼 수 있다면, 사람들의 대화는 어떻게 달라질까?',
      en: 'We send dozens of messages a day now, so we rarely spend long choosing what to say. The researchers wondered: if you could only send digits, the way people once did, what would happen to the talking?',
      ja: '今は一日に何十回もメッセージを送ります。だから何を言うか長く選ぶことはめったにありません。研究者は考えました — 昔のように数字しか送れないとしたら、人の会話はどう変わるだろう？',
    },
    work: {
      ko: '사람들에게 1990년대 삐삐를 다시 쓰게 하고, 그동안 무엇이 달라지는지 지켜보고 물었습니다. 기계를 만든 연구가 아니라 사람을 살펴본 연구입니다.',
      en: 'They had people use 1990s beepers again, then watched and asked what changed while they did. It is a study of people, not a study that built a machine.',
      ja: '人々に1990年代のポケベルをもう一度使ってもらい、その間に何が変わるかを観察し、尋ねました。機械を作った研究ではなく、人を見た研究です。',
    },
    took: {
      ko: '그 연구가 사람들을 놓아둔 자리, 곧 \'숫자만 보낼 수 있다\'는 제약 하나를 가져왔습니다. 결론을 설명하는 대신 그 제약을 직접 겪게 합니다.',
      en: 'What it takes is the place the study put people in — the one rule that only digits may be sent. Instead of explaining the findings, it lets you run into that rule yourself.',
      ja: '受け取ったのは、その研究が人を置いた場所 — 「数字しか送れない」という制約一つです。結論を説明する代わりに、その制約を自分で味わってもらいます。',
    },
    left: {
      ko: '관찰과 인터뷰는 코드로 옮길 수 없습니다. 그래서 논문이 찾아낸 결론을 이 페이지가 대신 말하지 않습니다. 무엇을 느꼈는지는 해 본 사람이 정합니다.',
      en: 'Watching people and interviewing them cannot be turned into code, so this page does not speak the conclusions of the paper for it. What you took from it is yours to decide.',
      ja: '観察やインタビューはコードに移せません。だからこのページは論文の結論を代弁しません。何を感じたかは、やってみた人が決めます。',
    },
  },
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
