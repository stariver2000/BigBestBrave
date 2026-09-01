/**
 * 길찾기 태도 페이지 설정.
 *
 * 근거가 된 연구: Modes of Interaction with Navigation Apps (Ju Yeon Jung, Tom Steinberger,
 * Phenomenal Data Lab, KAIST), CHI 2025, doi:10.1145/3706598.3714180.
 *
 * 연구진은 서른 번의 면담에서 길찾기 앱을 대하는 방식이 셋으로 묶인다는 것을 보였다.
 * 따르기, 고치기, 켜 두기. 그리고 태도마다 무엇을 바라고 무엇에 걸리는지가 다르다고 적었다.
 *
 * 이 페이지가 가져온 것
 *   - 세 가지 태도와 그 이름.
 *   - 태도마다 얻는 것과 잃는 것이 다르다는 짜임.
 *
 * 가져오지 않은 것
 *   - 서른 번의 면담과 그 이야기, 인용.
 *   - 수치 전부. 면담 연구라 이런 값을 재지 않았다. 화면의 숫자는 여기서 지어낸 도시를
 *     지어낸 규칙으로 돌린 것이다.
 */

export const PAPER = {
  title: 'Modes of Interaction with Navigation Apps',
  authors: 'Ju Yeon Jung, Tom Steinberger',
  venue: 'CHI 2025',
  affiliation: 'KAIST',
  link: 'https://doi.org/10.1145/3706598.3714180',
} as const;

/** 지도 하나의 크기(px). */
export const MAP = { size: 190, pad: 18, dot: 4 } as const;

/** 가장 많이 지난 길의 굵기(px). 지난 횟수에 따라 이만큼까지 굵어진다. */
export const STROKE = { min: 1, max: 7 } as const;
