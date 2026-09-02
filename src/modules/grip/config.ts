/**
 * 크기 착시 페이지 설정.
 *
 * 근거가 된 연구: Big or Small, It's All in Your Head: Visuo-Haptic Illusion of Size-Change
 * Using Finger-Repositioning (Myung Jin Kim, Eyal Ofek, Michel Pahud, Mike J. Sinclair,
 * Andrea Bianchi), CHI 2024, doi:10.1145/3613904.3642254.
 *
 * 연구진은 크기가 변하지 않는 손잡이를 만들고, 손가락이 감기는 자리를 옮기는 것만으로
 * 손에 든 물건이 커지거나 작아지는 느낌을 냈다. 연구 1에서 참가자 열두 명에게
 * 계단법으로 문턱을 재었고, 그 표(Table 2)가 이 페이지의 뼈대다.
 *
 * 이 페이지가 가져온 것
 *   - Table 2의 여섯 차례 문턱을 밀리미터 그대로. 논문이 함께 실은 상대 비율과
 *     맞는지 시험으로 견주어, 옮겨 적다 틀리지 않았음을 붙들어 두었다.
 *   - 본문이 밝힌 세 수치: 올려 잰 문턱의 치우침 42.4%, 내려 잰 문턱 40.4%,
 *     두 끝의 차이 2.00%. 그리고 견준 선행 연구의 6.0%와 32.7%.
 *   - 기기 크기 55mm와 손가락을 옮길 수 있는 거리 26.6mm(SD 6.2).
 *
 * 가져오지 않은 것
 *   - 연구 2(움직이는 시각과 함께 본 것)의 결과. 이 페이지는 연구 1의 문턱만 다룬다.
 *   - 기기의 기계 설계, 토크와 속도, 참가자의 주관 평가.
 */

export const PAPER = {
  title:
    "Big or Small, It's All in Your Head: Visuo-Haptic Illusion of Size-Change Using Finger-Repositioning",
  authors: 'Myung Jin Kim, Eyal Ofek, Michel Pahud, Mike J. Sinclair, Andrea Bianchi',
  venue: 'CHI 2024',
  affiliation: 'KAIST · Microsoft Research',
  link: 'https://doi.org/10.1145/3613904.3642254',
  /**
   * 쉬운 말로. 열두 살이 읽어도 통하는 문장만 쓴다.
   * 논문이 무슨 말을 하려는 것인지 먼저 전하고, 이 페이지가 어디까지 가져왔는지를 밝힌다.
   */
  plain: {
    problem: {
      ko: '손에 쥔 물건이 커졌다 작아졌다 하는 느낌을 내려면 진짜로 크기가 변하는 기계가 있어야 할 것 같습니다. 그런데 꼭 그럴까요?',
      en: 'To make something in your hand feel like it is growing or shrinking, you would think you need a machine that really changes size. But do you?',
      ja: '手に持った物が大きくなったり小さくなったりする感覚を出すには、本当に大きさが変わる機械が要りそうです。でも、本当にそうでしょうか。',
    },
    work: {
      ko: '연구진은 크기가 변하지 않는 손잡이를 만들고, 손가락이 닿는 자리만 옮겨서 \'커졌다\'는 느낌을 냈습니다. 열두 명에게 얼마나 옮겨야 알아차리는지를 재어 표로 남겼습니다.',
      en: 'They built a handle that never changes size and created the feeling of growth just by moving where the fingers sit. With twelve people they measured how far it has to move before you notice, and put it in a table.',
      ja: '研究者は大きさの変わらない取っ手を作り、指の当たる位置を動かすだけで「大きくなった」感覚を生みました。十二人に、どれだけ動かせば気づくかを測り、表に残しました。',
    },
    took: {
      ko: '그 표의 문턱값을 밀리미터 그대로 가져왔습니다. 이 페이지는 그 숫자로 당신의 손이 언제 속는지를 보여 줍니다.',
      en: 'The thresholds from that table, in millimetres exactly as published. The page uses those numbers to show when a hand gets fooled.',
      ja: 'その表のしきい値をミリメートルのまま受け取りました。このページはその数字で、手がいつ騙されるのかを示します。',
    },
    left: {
      ko: '손잡이 기계도 없고, 움직이는 화면과 함께 본 두 번째 실험도 없습니다. 첫 번째 실험의 문턱만 다룹니다.',
      en: 'There is no handle device here, and no second study with moving visuals. Only the thresholds from the first study.',
      ja: '取っ手の装置もなく、動く映像と一緒に見た二つ目の実験もありません。一つ目の実験のしきい値だけを扱います。',
    },
  },
} as const;

/** 자 그림의 크기(px). */
export const RULER = { width: 560, height: 132, pad: 26 } as const;

/** 자에 그릴 수 있는 가장 큰 크기(mm). 이보다 크면 눈금이 벗어난다. */
export const RULER_MAX_MM = 190;

/** 계단이 한 번 묻고 답하는 데 걸리는 시간(ms). 눈이 원의 크기 차이를 알아볼 만큼 느리게. */
export const CLIMB_MS = 620;

/** 계단이 오르내릴 수 있는 크기의 끝(mm). 두 원이 좁은 화면에서도 나란히 보이도록 잡았다. */
export const LIMITS = { min: 20, max: 120 } as const;

/** 계단이 출발하는 자리(mm). 올려 가며 잴 때는 아래에서, 내려 가며 잴 때는 위에서 시작한다. */
export const START = { low: 28, high: 112 } as const;

/** 밀리미터를 화면의 픽셀로 옮기는 배율. 실제 크기가 아니라 견주기 위한 크기다. */
export const PX_PER_MM = 1.2;

/** 계단이 걸어온 길을 그리는 그림의 크기와, 한 번에 보여 줄 걸음 수. */
export const PLOT = { width: 240, height: 90, steps: 40, minSteps: 12 } as const;
