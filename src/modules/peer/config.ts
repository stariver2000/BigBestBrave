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
} as const;

/** 창 한 칸의 크기(px). */
export const PANE = 92;
