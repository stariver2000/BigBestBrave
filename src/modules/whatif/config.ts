/**
 * 반사실 페이지 설정.
 *
 * 근거가 된 연구: CounterStress: Enhancing Stress Coping Planning through Counterfactual
 * Explanations in Personal Informatics (Gyuwon Jung, Uichin Lee, KAIST),
 * CHI 2025, doi:10.1145/3706598.3713730.
 *
 * 자기 기록을 모으는 도구들은 "언제 힘들었는지"는 잘 보여 주지만 "그래서 무엇을 바꿔야 하는지"는
 * 알려 주지 않는다. 연구진은 반사실 설명을 끌어와 그 빈자리를 메웠다. 이번 상황에서 무엇을
 * 어떻게 바꿨더라면 스트레스가 낮았을지를 여러 갈래로 지어 보이고, 그중 실행할 수 있는 것을
 * 사용자가 고르게 한다. 12명과 실험실·현장 연구를 했다.
 *
 * 이 페이지가 가져온 것
 *   - 맥락 넷(활동, 장소, 사회적 상황, 시간)과, 반사실마다의 세 수치:
 *     높은 스트레스일 확률 p, 바꾼 맥락의 수 n, 그 상황을 전에 겪은 횟수 r.
 *   - 겪어 본 적 있는 것과 없는 것을 다르게 그리는 것.
 *   - 바꾸지 않을 맥락을 잠그는 기능.
 *   - 고른 반사실에서 맥락마다의 이바지를 섀플리 값으로 내는 것.
 *   - 거친 정확 짝짓기로 인과를 보는 것.
 *
 * 가져오지 않은 것
 *   - 실제 사람의 기록. 여기 기록은 숨은 참값에서 지어냈다.
 *   - 12명의 실험 결과와 인용.
 *   - 휴대폰 센서로 맥락을 자동으로 모으는 부분. 여기에는 이미 모인 기록만 있다.
 */

export const PAPER = {
  title:
    'CounterStress: Enhancing Stress Coping Planning through Counterfactual Explanations in Personal Informatics',
  authors: 'Gyuwon Jung, Uichin Lee',
  venue: 'CHI 2025',
  affiliation: 'KAIST',
  link: 'https://doi.org/10.1145/3706598.3713730',
} as const;

/** 목표로 고를 수 있는 상황을 몇 개까지 보여 줄 것인가. 잦은 순으로 자른다. */
export const TARGET_CHOICES = 6;

/** 이바지 막대의 크기(px). */
export const BAR = { width: 260, height: 16 } as const;
