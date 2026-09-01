/**
 * 차트 왜곡 검사 페이지 설정.
 *
 * 근거가 된 연구: Automated Pipeline for Detecting and Analyzing Misleading Visual Elements
 * (Minhyeong Kim, Yumin Song, Yungun Kim, Aeri Cho, Soohyun Lee, Hyeon Jeon, Jinwook Seo,
 * 서울대학교), IEEE PacificVis 2025.
 *
 * 연구진은 차트 그림에서 요소를 검출해 구조화한 뒤, 어느 요소가 어떻게 해석을 비트는지 짚어 설명한다.
 * "이 차트는 오해를 부른다"로 끝내지 않고 **어느 부분이 문제인지** 가려내는 것이 핵심이다.
 *
 * 이 페이지는 그림에서 요소를 검출하지 않는다(이미지 인식이 필요하다). 대신 차트의 설정을 직접 받아
 * 같은 질문에 답한다 — 어느 요소가, 얼마나 어긋나게 만드는가. 그래서 남의 차트 이미지는 검사할 수 없고,
 * 대신 왜곡의 크기를 어림이 아니라 계산으로 낸다.
 */

export const PAPER = {
  title: 'Automated Pipeline for Detecting and Analyzing Misleading Visual Elements',
  authors: 'Minhyeong Kim, Yumin Song, Yungun Kim, Aeri Cho, Soohyun Lee, Hyeon Jeon, Jinwook Seo',
  venue: 'IEEE PacificVis 2025',
  affiliation: 'Seoul National University',
  link: 'https://ieeexplore.ieee.org/document/11021031/',
} as const;

/** 그림 크기(px). 세로는 사용자가 움직인다. */
export const PLOT = { width: 380, minHeight: 90, maxHeight: 460 } as const;

/**
 * 처음 놓여 있는 자료.
 *
 * 100에서 112로 12퍼센트 오른 값이다. 축을 조금만 올려도 몇 배로 부풀어 보이는데,
 * 뉴스에서 가장 흔히 보는 왜곡이 정확히 이 모양이라 예시로 골랐다.
 */
export const SAMPLE_VALUES = [100, 103, 106, 112];

/** 왜곡 배수를 화면에 적을 때의 상한. 이보다 크면 "잴 수 없음"으로 적는다. */
export const FACTOR_CAP = 99;
