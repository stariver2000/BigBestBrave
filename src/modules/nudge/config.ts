/**
 * 작은 보상 페이지 설정.
 *
 * 근거가 된 연구: Like Adding a Small Weight to a Scale About to Tip: Personalizing
 * Micro-Financial Incentives for Digital Wellbeing (Sueun Jang, Youngseok Seo,
 * Woohyeok Choi, Uichin Lee), CHI 2025, doi:10.1145/3706598.3714208.
 *
 * 연구진은 휴대폰을 덜 쓰자는 작은 약속을 지킬 때마다 아주 적은 돈(0~100원)을 주되,
 * 얼마를 줄지를 사람마다 학습해 정하는 알고리즘을 만들었다. 72명을 세 집단으로 나눠
 * 고정(50원)·무작위·개인화를 견주었다.
 *
 * 이 페이지가 가져온 것
 *   - Algorithm 1을 그대로 옮겼다. 톰프슨 표집으로 각 금액의 성공 확률을 뽑고,
 *     성공은 크게 비용은 작게 하는 파레토 앞면을 구해 그 안에서 무작위로 고른다.
 *   - 금액 다섯 가지(0, 25, 50, 75, 100원)와 맥락 셋(근무 시간, 근무 외, 주말).
 *   - 견주는 세 방식(고정 50원, 무작위, 개인화).
 *
 * 가져오지 않은 것
 *   - 72명의 참가자. 여기서 알고리즘을 상대하는 사람은 화면에서 만든 지어낸 사람이다.
 *     논문도 알고리즘을 시험할 때 같은 일을 했지만, 논문에는 실제 참가자도 있었다.
 *   - 휴대폰 사용 시간을 재는 부분과 알림 설계. 여기에는 성공과 실패만 있다.
 *   - 논문의 결과 수치. 화면에 적기는 하되 이 시늉의 결과와 견주지 않는다.
 */

export const PAPER = {
  title:
    'Like Adding a Small Weight to a Scale About to Tip: Personalizing Micro-Financial Incentives for Digital Wellbeing',
  authors: 'Sueun Jang, Youngseok Seo, Woohyeok Choi, Uichin Lee',
  venue: 'CHI 2025',
  affiliation: 'KAIST',
  link: 'https://doi.org/10.1145/3706598.3714208',
} as const;

/** 팔 하나를 그릴 때의 크기(px). */
export const ARM = { width: 96, height: 150 } as const;

/** 비용 곡선 그림의 크기(px). */
export const PLOT = { width: 540, height: 220, pad: 44 } as const;

/** 사람을 만드는 눈금의 범위. */
export const DIALS = {
  base: { min: 0, max: 80 },
  lift: { min: 0, max: 70 },
  enough: { min: 25, max: 100, step: 25 },
} as const;
