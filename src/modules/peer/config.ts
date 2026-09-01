/**
 * 서로 기록하기 페이지 설정.
 *
 * 근거가 된 연구: Peerspective: A Study on Reciprocal Tracking for Self-awareness and
 * Relational Insight (Kwangyoung Lee, Yeohyun Jung, Gyuwon Jung, Xi Lu, Hwajung Hong),
 * CHI 2025, doi:10.1145/3706598.3713404.
 *
 * 연구진은 가까운 사이의 여덟 쌍에게 일주일간 서로를 관찰하고 되먹이게 했다. 이론 틀은
 * 조하리의 창이었고, 살펴볼 자리로 여섯을 주었다 — 습관, 성격, 말하는 방식,
 * 감정이 건드려지는 자리, 스트레스 반응, 자기도 모르는 장단점.
 *
 * 이 페이지가 가져온 것
 *   - 여섯 자리 그대로.
 *   - 조하리의 네 칸. 그리고 한쪽 답만으로는 창이 그려지지 않는다는 것 —
 *     그것이 이 연구의 요점이므로 화면도 그렇게 만든다.
 *   - 서로가 서로를 본다는 구조. 나도 상대를 보고 상대도 나를 본다.
 *
 * 가져오지 않은 것
 *   - 여덟 쌍의 이야기와 인용, 일주일치 관찰 기록, 카드 세 종류의 절차, 워크숍.
 *   - 수치 전부. 질적 연구라 이런 값을 재지 않았다.
 *
 * 계정도 서버도 없이 서로를 기록하게 하려고, 답을 짧은 글자로 바꿔 건네게 했다.
 * 그 방식은 논문에 없다. 이 사이트의 형편에서 나온 것이다.
 */

export const PAPER = {
  title: 'Peerspective: A Study on Reciprocal Tracking for Self-awareness and Relational Insight',
  authors: 'Kwangyoung Lee, Yeohyun Jung, Gyuwon Jung, Xi Lu, Hwajung Hong',
  venue: 'CHI 2025',
  affiliation: 'KAIST',
  link: 'https://doi.org/10.1145/3706598.3713404',
  /**
   * 쉬운 말로. 열두 살이 읽어도 통하는 문장만 쓴다.
   * 논문이 무슨 말을 하려는 것인지 먼저 전하고, 이 페이지가 어디까지 가져왔는지를 밝힌다.
   */
  plain: {
    problem: {
      ko: '나는 나를 얼마나 알까요? 내가 모르는 내 모습을 옆 사람은 이미 알고 있을지도 모릅니다. 그런데 그걸 서로 말해 주는 일은 좀처럼 일어나지 않습니다.',
      en: 'How well do you know yourself? The person next to you may already see something about you that you cannot. And yet we almost never tell each other.',
      ja: '自分のことをどれだけ知っているでしょう。自分では気づかない姿を、隣にいる人はもう知っているかもしれません。それでも、互いに伝え合うことはめったに起きません。',
    },
    work: {
      ko: '연구진은 가까운 사이 여덟 쌍에게 일주일 동안 서로를 관찰하고 그 결과를 주고받게 했습니다. 습관, 성격, 말투, 감정이 건드려지는 자리처럼 여섯 가지를 살펴보게 했습니다.',
      en: 'They asked eight close pairs to observe each other for a week and hand the observations back. Six things to watch for: habits, character, way of speaking, what touches a nerve, how stress shows, and strengths one cannot see in oneself.',
      ja: '研究者は親しい八組に、一週間互いを観察して結果を渡し合ってもらいました。習慣、性格、話し方、感情が触れられる場所など、六つを見てもらいました。',
    },
    took: {
      ko: '그 여섯 자리와, 조하리의 창이라는 네 칸짜리 틀을 가져왔습니다. 그리고 한쪽 답만으로는 창이 그려지지 않는다는 것 — 그것이 이 연구의 요점이라 화면도 그렇게 만들었습니다.',
      en: 'The six things to watch, and the four-pane Johari window. Also the point of the study: one side\'s answers alone cannot draw the window — so the page will not draw it either.',
      ja: 'その六つと、ジョハリの窓という四つの枠を受け取りました。そして片方の答えだけでは窓が描けないということ — それがこの研究の要点なので、画面もそう作ってあります。',
    },
    left: {
      ko: '여덟 쌍의 이야기와 일주일치 기록은 없습니다. 계정도 서버도 없이 서로 주고받게 하려고 답을 짧은 글자로 바꿔 건네는 방식을 썼는데, 그것은 논문에 없는 이 사이트의 방법입니다.',
      en: 'The eight pairs\' stories and their week of notes are not here. Passing answers as a short code, so this can work without accounts or a server, is this site\'s own arrangement, not the paper\'s.',
      ja: '八組の話も一週間の記録もありません。アカウントもサーバーもなしにやり取りするため、答えを短い文字列に変えて渡す方式を使いましたが、それは論文にはない、このサイトの都合です。',
    },
  },
} as const;

/** 창 한 칸의 크기(px). */
export const PANE = 92;
