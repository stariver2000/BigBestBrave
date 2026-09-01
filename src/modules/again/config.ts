/**
 * 다시 묻기 페이지 설정.
 *
 * 근거가 된 연구: Understanding Users' Dissatisfaction with ChatGPT Responses:
 * Types, Resolving Tactics, and the Effect of Knowledge Level
 * (Yoonsu Kim, Jueon Lee, Seoyoung Kim, Jaehyuk Park, Juho Kim),
 * IUI 2024, doi:10.1145/3640543.3645148. 전문은 arXiv:2311.07434v3 으로 읽었다.
 *
 * 이 페이지가 가져온 것
 *   - 불만의 일곱 갈래와 대응의 네 갈래, 그 아래 열세 가지 수법(표 1, 표 3).
 *   - 표 2, 4, 5, 6의 개수·백분율·점수·표준편차 전부.
 *   - 5.2.3절과 5.3절의 문장: 사람들이 어느 불만에 어느 쪽으로 기울었는가,
 *     끝내 28%만 풀렸다는 것, 두 지식 무리의 카이제곱 검정값.
 *
 * 가져오지 않은 것
 *   - 그림(Figure 3~7)의 값 전부. 동시 출현 행렬도, 생키 다이어그램도, 불만별 대응
 *     분포도 그림으로만 실렸다. 그림에서 눈으로 읽어낸 값을 적으면 그것은 논문의
 *     수치가 아니라 내가 자로 잰 값이 된다. 그래서 "어느 불만에 어느 대응을 몇 번"은
 *     이 페이지에 없고, 논문이 본문 문장으로 밝힌 방향만 있다.
 *   - 참가자의 대화 기록. 논문은 자료를 공개했지만 이 페이지는 남의 대화를 싣지 않는다.
 *
 * 이 페이지가 스스로 더한 것
 *   - 다시 물을 문장을 실제로 지어 주는 것. 논문은 열세 가지 수법이 무엇인지 적었을 뿐
 *     문장을 주지 않았다. 화면에 나오는 문장은 내가 쓴 것이며 논문의 것이 아니다.
 *     그 사실을 화면에도 적어 두었다.
 *   - 표본이 다섯 건 미만인 칸은 순위에 쓰지 않는 규칙. 두 사람이 매긴 평균을 효과라
 *     부르면 순위가 잡음을 따라 춤춘다. 논문에는 없는 규칙이고 이 페이지의 판단이다.
 */

export const PAPER = {
  title:
    "Understanding Users' Dissatisfaction with ChatGPT Responses: Types, Resolving Tactics, and the Effect of Knowledge Level",
  authors: 'Yoonsu Kim, Jueon Lee, Seoyoung Kim, Jaehyuk Park, Juho Kim',
  venue: 'IUI 2024',
  affiliation: 'KAIST · SNU · KDI',
  link: 'https://doi.org/10.1145/3640543.3645148',
  fullText: 'arXiv:2311.07434v3',
} as const;

/** 점수 눈금. 논문은 불만도도 효과도 1~10으로 받았다. */
export const SCALE = { min: 1, max: 10 } as const;

/** 막대 그림의 크기(px). */
export const BAR = { width: 168, height: 8 } as const;

/** 권하는 수법을 몇 개까지 보여 줄 것인가. 다 보여 주면 고르지 못한다. */
export const SUGGEST_LIMIT = 4;
