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
} as const;

/** 시간 막대의 크기(px). */
export const BAR = { width: 420, height: 26 } as const;
