/**
 * 읽기 쉬움과 시선 옮김 페이지 설정.
 *
 * 근거가 된 연구: AReading with Smartphones: Understanding the Trade-offs between Enhanced
 * Legibility and Display Switching Costs in Hybrid AR Interfaces
 * (Sunyoung Bang, Hyunjin Lee, Seo Young Oh, Woontack Woo, KAIST), CHI 2025,
 * doi:10.1145/3706598.3713879.
 *
 * 연구진이 놓은 자리: 투과형 AR 안경에 글을 띄우면 눈을 딴 데로 돌리지 않아도 되지만 글이
 * 잘 안 보이고, 손에 든 폰에 띄우면 잘 보이지만 화면 사이를 오가야 한다. 그 맞바꿈을 살폈다.
 *
 * 이 페이지가 가져온 것
 *   - 그 맞바꿈의 짜임. 무엇이 무엇과 맞서는가.
 *   - 두 화면을 함께 쓰는 자리라는 조건.
 *
 * 가져오지 않은 것
 *   - 논문의 수치와 실험 결과. 전문을 구하지 못해 초록의 짜임만 가져왔고,
 *     그 사실을 화면에도 적는다.
 *   - 실험 과제와 참가자.
 *
 * 화면의 숫자는 널리 알려진 시각 연구의 관계(각도 크기, 시력 여유, 베버 대비, 초점 옮김)를
 * 옮긴 것이지 논문에서 온 것이 아니다. 계수는 이 페이지가 골랐다.
 */

export const PAPER = {
  title:
    'AReading with Smartphones: Understanding the Trade-offs between Enhanced Legibility and Display Switching Costs in Hybrid AR Interfaces',
  authors: 'Sunyoung Bang, Hyunjin Lee, Seo Young Oh, Woontack Woo',
  venue: 'CHI 2025',
  affiliation: 'KAIST',
  link: 'https://doi.org/10.1145/3706598.3713879',
  /**
   * 쉬운 말로. 열두 살이 읽어도 통하는 문장만 쓴다.
   * 논문이 무슨 말을 하려는 것인지 먼저 전하고, 이 페이지가 어디까지 가져왔는지를 밝힌다.
   */
  plain: {
    problem: {
      ko: 'AR 안경에 글을 띄우면 눈을 딴 데로 돌리지 않아도 되지만 글씨가 잘 안 보입니다. 손에 든 폰에 띄우면 잘 보이지만 두 화면 사이를 계속 오가야 합니다. 어느 쪽이 나을까요?',
      en: 'Put the text on AR glasses and you never have to look away, but it is harder to read. Put it on the phone in your hand and it is crisp, but your eyes keep travelling between two screens. Which is better?',
      ja: 'ARグラスに文を出せば目をそらさずに済みますが、字は読みにくい。手のスマホに出せばよく見えますが、二つの画面を行き来し続けます。どちらがよいのでしょう。',
    },
    work: {
      ko: '연구진은 그 맞바꿈을 살폈습니다 — 잘 보이는 대신 시선을 옮겨야 하는 비용과, 시선을 안 옮기는 대신 잘 안 보이는 비용.',
      en: 'They studied that trade-off: the cost of moving your eyes to gain legibility, against the cost of losing legibility to keep them still.',
      ja: '研究者はその引き換えを調べました — よく見える代わりに視線を移す負担と、視線を移さない代わりに見えにくくなる負担。',
    },
    took: {
      ko: '그 맞바꿈의 짜임과, 두 화면을 함께 쓰는 자리라는 조건만 가져왔습니다.',
      en: 'Only the shape of that trade-off, and the situation of using two displays at once.',
      ja: 'その引き換えの組み立てと、二つの画面を同時に使うという条件だけを受け取りました。',
    },
    left: {
      ko: '논문의 수치와 실험 결과는 없습니다. 전문을 구하지 못해 초록의 짜임만 가져왔습니다. 화면의 숫자는 널리 알려진 시각 연구의 관계를 옮긴 것이지 이 논문에서 온 것이 아닙니다.',
      en: 'None of the paper\'s numbers or results are here; the full text was not available, so only the framing from the abstract was taken. The numbers on screen come from well-known relationships in vision research, not from this paper.',
      ja: '論文の数値や実験結果はありません。全文が入手できず、要旨の枠組みだけを受け取りました。画面の数字は広く知られた視覚研究の関係を移したもので、この論文から来たものではありません。',
    },
  },
} as const;

/** 시간 막대의 크기(px). */
export const BAR = { width: 420, height: 26 } as const;
