/**
 * 맥락 페이지 설정.
 *
 * 근거가 된 연구: DataDive: Supporting Readers' Contextualization of Statistical
 * Statements with Data Exploration (Hyunwoo Kim, Khanh Duy Le, Gionnieve Lim,
 * Dae Hyun Kim, Yoo Jin Hong, Juho Kim), IUI 2024, doi:10.1145/3640543.3645155.
 * 전문은 저자 페이지(dhkim16.github.io/pdf/datadive.pdf)에서 받아 읽었다. CC-BY 4.0이다.
 *
 * 이 페이지가 가져온 것
 *   - 통계 문장을 (주체, 지표, 시점) 세 조각으로 가르는 짜임(5.2.1절).
 *   - 표 2. 맥락을 만들 수 있는 자리가 어디인가. 세 조각 x 네 축 가운데 열 칸.
 *   - 표 1. 고른 맥락이 어떤 그림을 부르는가. 여덟 칸이 전부다.
 *   - 표 3과 6.4절, 8.1절의 수치.
 *   - 8.1.3절. 논문이 스스로 적어 둔 역효과 - 밑줄과 물음이 오히려 수동적으로 읽게 한다.
 *
 * 가져오지 않은 것
 *   - GPT-3.5로 물음을 짓고 GPT-4 짝비교로 순위를 매기는 부분(5.2.2, 5.2.3절).
 *     이 사이트는 연산 예산이 0이라 모델을 부를 수 없다. 그래서 이 페이지에는
 *     순위가 없다. 열 칸을 모두 펼쳐 놓고 고르는 것은 읽는 사람이다.
 *   - 세계은행과 Our World in Data의 자료. 이 페이지는 자료를 싣지 않는다.
 *     그래서 그림도 값이 아니라 모양만 보여 준다.
 *   - 그림(Figure 6)의 상자그림 값. 눈으로 읽어낸 값은 논문의 수치가 아니다.
 *
 * 이 페이지가 스스로 더한 것
 *   - 문장을 가르는 규칙. 논문은 미세조정한 GPT-3.5에게 맡겼다. 여기서는 아는 이름을
 *     맞춰 보는 규칙이고, 못 가른 조각은 지어내지 않고 비워 둔다.
 *   - 열 칸의 물음 문장. 논문은 자리가 어디인지만 표로 적었다.
 *   - 표 2와 표 1을 잇는 규칙: 어느 조각을 맥락으로 고르면 그 조각이 여럿이 된다.
 *   - '물음 가려 두기'. 논문이 스스로 적은 역효과에 대한 답이다. 건네받은 물음을 보기
 *     전에 자기 물음을 먼저 적게 한다.
 */

export const PAPER = {
  title: "DataDive: Supporting Readers' Contextualization of Statistical Statements with Data Exploration",
  authors: 'Hyunwoo Kim, Khanh Duy Le, Gionnieve Lim, Dae Hyun Kim, Yoo Jin Hong, Juho Kim',
  venue: 'IUI 2024',
  affiliation: 'KAIST · HCMUT · SUTD',
  link: 'https://doi.org/10.1145/3640543.3645155',
  fullText: 'dhkim16.github.io/pdf/datadive.pdf',
} as const;

/**
 * 미리 넣어 둔 문장 셋.
 * 첫 번째는 논문이 Figure 5에서 든 예 그대로다.
 * 세 번째는 논문이 6.4.3절에서 파이프라인이 틀렸다고 밝힌 바로 그 종류의 문장이다.
 */
export const PRESETS = [
  "Korea's fertility rate dropped to 0.8 in 2019",
  '한국의 온실가스 배출량은 2018년에 정점을 찍었다',
  'Out of the large emitters the United States has the highest emissions per capita',
] as const;

/** 모양 그림의 크기(px). 자료가 아니라 모양이므로 눈금도 숫자도 없다. */
export const SHAPE_PLOT = { width: 260, height: 96, pad: 10 } as const;

/** 다섯 점 만점 눈금. 논문이 쓴 것이다. */
export const RATING_SCALE = { min: 1, max: 5 } as const;
