/**
 * 배치의 두 얼굴 페이지 설정.
 *
 * 근거가 된 연구: Readability vs. Faithfulness: Unveiling Correlations between
 * Graph Aesthetics and DR Quality (Seokweon Jung(KAIST·SNU), Min Hyeong Kim,
 * Hyeon Jeon, Jinwook Seo(SNU)), EuroVis 2026 GDxDR Workshop,
 * doi:10.2312/evgdxdr.20261001. 전문은 Eurographics 디지털 도서관의 공개본(CC-BY).
 *
 * 이 페이지가 가져온 것
 *   - 미적 지표 열하나와 네 그룹의 행 범위(1-5 / 6-9 / 10 / 11), 그룹 이름.
 *   - 본문이 문장으로 밝힌 수치(r≈0.6198, r≈0.7953, 견고한 관계 7 대 2, |r|<0.1).
 *   - 3장 방법의 셈(627개 그래프, 크기·밀도 범위, 99% 분산, 견고 기준).
 *
 * 가져오지 않은 것
 *   - 그림 1 히트맵의 개별 상관계수. 그림에만 있다.
 *   - 627개 그래프 자료집과 ZADU·Mooney 구현.
 *
 * 이 페이지가 스스로 더한 것
 *   - 견본 그래프 셋과, 세 목표를 향해 한 걸음씩 나아가는 배치기.
 *   - 미적 여섯·충실도 셋의 브라우저 구현. 논문의 열하나를 다 재지는 않는다.
 *   - "개별 그래프에서는 방향이 다를 수 있다"는 관찰. 논문의 상관은 627개의
 *     평균이지 한 그래프의 보장이 아니다 - 견본 셋에서 실제로 갈린다.
 */

import type { GoalId, SampleId } from '../../core/graphaes';

export const PAPER = {
  title: 'Readability vs. Faithfulness: Unveiling Correlations between Graph Aesthetics and DR Quality',
  authors: 'Seokweon Jung, Min Hyeong Kim, Hyeon Jeon, Jinwook Seo',
  venue: 'EuroVis 2026 GDxDR',
  affiliation: 'KAIST · SNU',
  link: 'https://doi.org/10.2312/evgdxdr.20261001',
  fullText: 'diglib.eg.org (CC-BY 공개본)',
  /** 쉬운 말로. 열두 살이 읽어도 통하는 문장만 쓴다. */
  plain: {
    problem: {
      ko: '점과 선으로 된 그림을 그릴 때 두 가지를 바랍니다. 보기 좋을 것, 그리고 원래 관계를 속이지 말 것. 그런데 이 둘이 서로 어떤 사이인지 아무도 통계로 밝힌 적이 없어서, 둘을 함께 좋게 만드는 방법도 없었습니다.',
      en: 'When you draw a picture of dots and lines you want two things: it should look good, and it should not lie about the original relationships. But nobody had measured how those two relate, so there was no way to improve both at once.',
      ja: '点と線でできた図を描くとき、二つを望みます。見やすいこと、そして元の関係について嘘をつかないこと。ところがこの二つがどんな間柄なのか誰も統計で明らかにしたことがなく、両方を良くする方法もありませんでした。',
    },
    work: {
      ko: '연구진은 그래프 627개를 그려 놓고, 보기 좋음을 재는 잣대 열한 개와 속이지 않음을 재는 잣대들을 모두 재어 서로의 상관을 구했습니다. 그랬더니 보기 좋음의 잣대들이 네 갈래로 갈렸습니다 - 도움이 되는 것, 다른 쪽을 돕는 것, 오히려 해가 되는 것, 아무 상관 없는 것.',
      en: 'The authors laid out 627 graphs, measured all eleven "looks good" metrics against the "does not lie" metrics, and correlated them. The looks-good metrics fell into four groups: ones that help, ones that help a different part, one that actually hurts, and one that relates to nothing at all.',
      ja: '研究チームはグラフ627個を描き、見やすさを測る物差し11個と嘘をつかなさを測る物差しをすべて測って相関を求めました。すると見やすさの物差しが四つに分かれました - 役立つもの、別の面を助けるもの、かえって害になるもの、まったく無関係なもの。',
    },
    took: {
      ko: '이 페이지는 그 네 갈래를 몸으로 겪게 합니다. 그래프 하나를 놓고 세 가지 목표(충실하게·정사각으로·간선을 축에 맞춰)로 배치를 밀어 보면, 무엇이 오르고 무엇이 내리는지 두 눈금이 함께 움직입니다. 특히 정사각으로 미는 것이 충실함을 깎는 것과, 축에 맞추는 것이 충실함과 무관한 것을 직접 봅니다.',
      en: 'This page lets you feel those four groups. Take one graph and push its layout toward three goals — faithful, square, axis-aligned — and watch both gauges move together. You see for yourself that squaring costs faithfulness, and that axis-aligning barely touches it.',
      ja: 'このページはその四つの分かれ目を体で味わわせます。グラフ一つを置いて三つの目標(忠実に・正方形に・辺を軸に合わせて)へ配置を押すと、何が上がり何が下がるかを二つの目盛りが一緒に動いて見せます。特に正方形に押すことが忠実さを削ることと、軸に合わせることが忠実さと無関係なことを直に見ます。',
    },
    left: {
      ko: '히트맵의 상관계수 하나하나는 그림에만 있어 옮기지 않았습니다. 627개 그래프 자료집도 가져올 수 없어 견본 셋을 지었습니다. 그리고 중요한 것 하나 - 논문의 상관은 627개의 평균이라, 한 그래프에서는 방향이 반대로 나올 수도 있습니다. 실제로 견본 셋에서 갈립니다.',
      en: 'The individual correlation values live only in the heatmap figure, so they are not transcribed. The 627-graph dataset could not be carried over either, so three sample graphs stand in. And one thing matters: the paper’s correlations are averages over 627 graphs — on any single graph the direction can reverse. It does, across these three samples.',
      ja: 'ヒートマップの相関係数一つ一つは図にしかないので写していません。627個のグラフのデータも持ってこられないので見本を三つ作りました。そして大事なこと - 論文の相関は627個の平均なので、一つのグラフでは向きが逆になることもあります。実際に見本三つで分かれます。',
    },
  },
} as const;

/**
 * 두 눈금의 색. truss 룩에서 실측했다 - 읽기 좋음은 호박빛(accent),
 * 충실함은 청록빛(second). 룩이 이미 변수로 들고 있어 여기서는 이름만 잇는다.
 */
export const GAUGE_VARS = {
  readability: 'var(--bbb-accent)',
  faithfulness: 'var(--bbb-second-color)',
} as const;

/** 한 걸음의 간격(ms). 배치가 움직이는 것이 눈에 보이도록. */
export const STEP_INTERVAL = 260;

/** 목표마다 몇 걸음까지 돌지. 그 뒤로는 거의 움직이지 않는다. */
export const MAX_STEPS = 60;

/** 기본 견본과 목표. 격자에서 정사각 밀기가 논문의 그룹 3을 가장 또렷이 보인다. */
export const DEFAULT_SAMPLE: SampleId = 'grid';
export const DEFAULT_GOAL: GoalId = 'faithful';

/** 관련 페이지. 같은 투영 품질을 다른 자리에서 다루는 페이지들. */
export const RELATED_PAGES = [
  { path: '/focus', key: 'focus' },
  { path: '/rulers', key: 'rulers' },
] as const;
