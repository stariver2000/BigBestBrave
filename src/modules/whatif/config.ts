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
  /**
   * 쉬운 말로. 열두 살이 읽어도 통하는 문장만 쓴다.
   * 논문이 무슨 말을 하려는 것인지 먼저 전하고, 이 페이지가 어디까지 가져왔는지를 밝힌다.
   */
  plain: {
    problem: {
      ko: '기록 앱은 \'언제 힘들었는지\'는 잘 보여 줍니다. 그런데 \'그래서 무엇을 바꿔야 하는지\'는 알려 주지 않습니다.',
      en: 'Self-tracking apps are good at showing when you had a hard time. They are no help at all with what to change because of it.',
      ja: '記録アプリは「いつ辛かったか」はよく見せてくれます。しかし「では何を変えればよいか」は教えてくれません。',
    },
    work: {
      ko: '연구진은 반사실을 끌어왔습니다 — 그때 무엇을 어떻게 바꿨더라면 덜 힘들었을지를 여러 갈래로 지어 보이고, 그중 실제로 할 수 있는 것을 고르게 하는 방식입니다. 12명과 실험실과 현장에서 시험했습니다.',
      en: 'They borrowed counterfactuals: show several versions of what could have been changed to make the day less stressful, and let the person pick the one they could actually do. Tested with twelve people, in the lab and in daily life.',
      ja: '研究者は反実仮想を持ち込みました — あのとき何をどう変えていれば楽だったかをいくつも示し、その中から実際にできるものを選んでもらう方式です。12人と実験室と現場で試しました。',
    },
    took: {
      ko: '맥락 넷(활동·장소·함께 있던 사람·시간)과 반사실마다의 세 수치, 겪어 본 것과 안 겪어 본 것을 다르게 그리는 것, 바꾸지 않을 맥락을 잠그는 것을 가져왔습니다.',
      en: 'The four contexts — activity, place, who you were with, time — the three numbers attached to each counterfactual, drawing what you have lived through differently from what you have not, and locking the contexts you will not change.',
      ja: '四つの文脈（活動・場所・一緒にいた人・時間）と、反実仮想ごとの三つの数値、経験したことと経験していないことを描き分けること、変えない文脈を固定できることを受け取りました。',
    },
    left: {
      ko: '실제 사람의 기록은 없습니다. 여기 기록은 숨은 참값에서 지어낸 것입니다. 12명의 실험 결과도, 휴대폰 센서로 맥락을 모으는 부분도 없습니다.',
      en: 'There are no real people\'s logs — the records here are generated from a hidden ground truth. Neither the results from the twelve participants nor the phone sensing that gathers context are here.',
      ja: '実際の人の記録はありません。ここの記録は隠された真値から作ったものです。12人の実験結果も、スマホのセンサーで文脈を集める部分もありません。',
    },
  },
} as const;

/** 목표로 고를 수 있는 상황을 몇 개까지 보여 줄 것인가. 잦은 순으로 자른다. */
export const TARGET_CHOICES = 6;

/** 이바지 막대의 크기(px). */
export const BAR = { width: 260, height: 16 } as const;
