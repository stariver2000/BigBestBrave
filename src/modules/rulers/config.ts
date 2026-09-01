/**
 * 지표 비교 페이지 설정.
 *
 * 근거가 된 연구: Metric Design != Metric Behavior: Improving Metric Selection for the
 * Unbiased Evaluation of Dimensionality Reduction (Jiyeon Bae, Hyeon Jeon, Jinwook Seo,
 * 서울대학교), IEEE VIS 2025 short paper, doi:10.1109/VIS60296.2025.00014.
 *
 * 연구진의 질문은 이렇다. 차원 축소 그림을 평가할 때 지표를 여러 개 쓰는 것이 관행인데,
 * 그중 몇 개가 사실상 같은 것을 재고 있다면 평가는 그쪽으로 기운다. 그래서 지표를
 * **설계 의도로 나누지 말고 실제 행동으로 나누자**고 제안한다. 절차는 셋이다 —
 * 지표 쌍의 경험적 상관을 재고, 그것으로 묶고, 무리마다 대표 하나를 세운다.
 * 96개 자료집 × 300장씩으로 재어 보니 알맞은 무리 수는 다섯이었고,
 * 가장 큰 무리는 국소 지표가 많았지만 군집·전역 지표도 섞여 있었다.
 *
 * 이 페이지가 가져온 것
 *   - 절차 셋 전부. 스피어만 순위 상관 → 평균 연결 계층 군집화 → 무리별 대표.
 *   - 결론의 모양: 설계 갈래가 행동을 예측하지 못한다는 것을 직접 보게 한다.
 *
 * 가져오지 않은 것
 *   - 논문이 쓴 지표 목록과 96개 자료집. 여기서는 브라우저에서 결정론적으로 계산되는
 *     아홉 개와, 씨앗에서 짓는 네 벌을 쓴다.
 *   - 40가지 차원 축소 기법. 반복 최적화가 필요한 것(t-SNE, UMAP)은 돌릴 수 없다.
 *     대신 선형 사영과 이름 붙인 망가뜨리기 여덟 가지로 무리를 넓게 편다.
 *   - 무리 수를 고르는 Kneedle 알고리즘. 같은 생각을 더 짧게 옮긴 팔꿈치 계산을 쓴다.
 *   - 논문의 수치. 이 페이지의 숫자는 여기서 새로 잰 것이고 논문의 것과 견줄 수 없다.
 */

export const PAPER = {
  title:
    'Metric Design != Metric Behavior: Improving Metric Selection for the Unbiased Evaluation of Dimensionality Reduction',
  authors: 'Jiyeon Bae, Hyeon Jeon, Jinwook Seo',
  venue: 'IEEE VIS 2025',
  affiliation: 'Seoul National University',
  link: 'https://doi.org/10.1109/VIS60296.2025.00014',
  /**
   * 쉬운 말로. 열두 살이 읽어도 통하는 문장만 쓴다.
   * 논문이 무슨 말을 하려는 것인지 먼저 전하고, 이 페이지가 어디까지 가져왔는지를 밝힌다.
   */
  plain: {
    problem: {
      ko: '차원 축소 그림을 평가할 때 지표를 여러 개 씁니다. 그런데 그중 몇 개가 사실은 같은 것을 재고 있다면? 같은 말을 세 번 한 셈이라, 평가가 그쪽으로 기울어 버립니다.',
      en: 'To judge a dimensionality-reduction plot people use several metrics at once. But what if some of them are quietly measuring the same thing? Then the same opinion is counted three times and the verdict tilts that way.',
      ja: '次元削減の図を評価するとき、指標を複数使います。しかしその中のいくつかが実は同じものを測っていたら？ 同じ意見を三回数えることになり、評価はそちらへ傾きます。',
    },
    work: {
      ko: '연구진은 지표를 설계 의도가 아니라 실제 행동으로 나누자고 제안했습니다. 지표끼리 얼마나 같이 움직이는지 재고, 그것으로 묶고, 무리마다 대표 하나를 세우는 세 단계입니다. 96개 자료로 재어 보니 알맞은 무리는 다섯이었고, 설계 갈래와 행동은 잘 맞지 않았습니다.',
      en: 'They proposed sorting metrics by how they behave, not by what they were designed to mean: measure how much each pair moves together, group them by that, then keep one representative per group. Over 96 datasets the right number of groups was five — and the design categories did not line up with the behaviour.',
      ja: '研究者は、指標を設計意図ではなく実際の振る舞いで分けようと提案しました。指標同士がどれだけ一緒に動くかを測り、それでまとめ、群ごとに代表を一つ立てる三段階です。96のデータで測ると適切な群は五つで、設計の分類と振る舞いは一致しませんでした。',
    },
    took: {
      ko: '그 세 단계를 그대로 가져왔습니다. 그리고 결론의 모양 — 설계 갈래가 행동을 예측하지 못한다는 것을 직접 보게 합니다.',
      en: 'The three steps, as written. And the shape of the conclusion: you get to watch design categories fail to predict behaviour.',
      ja: 'その三段階をそのまま受け取りました。そして結論の形 — 設計の分類が振る舞いを予測できないことを、自分の目で見てもらいます。',
    },
    left: {
      ko: '논문이 쓴 지표 목록과 96개 자료집, 40가지 축소 기법은 쓰지 않습니다(브라우저에서 돌릴 수 없습니다). 여기 숫자는 새로 잰 것이라 논문의 값과 견줄 수 없습니다.',
      en: 'The paper\'s metric list, its 96 datasets and 40 reduction techniques are not used — they cannot run in a browser. The numbers here are measured afresh and cannot be compared with the paper\'s.',
      ja: '論文が使った指標の一覧、96のデータ集、40の削減手法は使いません（ブラウザでは動かせません）。ここの数字は新たに測ったもので、論文の値とは比べられません。',
    },
  },
} as const;

/** 처음 놓여 있는 설정. */
export const INITIAL = {
  dataset: 'moons',
  population: 60,
  k: 12,
} as const;

/** 상관 행렬 한 칸의 크기(px). */
export const CELL = 34;

/** 산점도 미리보기. */
export const THUMB = { size: 96, dot: 1.7, count: 8 } as const;

/** 상관을 색으로 옮길 때의 최대 진하기. 1로 두면 글자가 묻힌다. */
export const HEAT_MAX_ALPHA = 0.72;

/** 이 값보다 상관이 크면 칸의 숫자를 밝은 색으로 뒤집는다. */
export const HEAT_FLIP = 0.55;
