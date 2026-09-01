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
  /**
   * 쉬운 말로. 열두 살이 읽어도 통하는 문장만 쓴다.
   * 논문이 무슨 말을 하려는 것인지 먼저 전하고, 이 페이지가 어디까지 가져왔는지를 밝힌다.
   */
  plain: {
    problem: {
      ko: '뉴스에서 \'실업률 4퍼센트\'라는 문장을 보면 그게 높은 건지 낮은 건지 알기 어렵습니다. 옆 나라와 견주거나 작년과 견줘야 뜻이 생기는데, 읽는 사람에게는 대개 그럴 자료가 없습니다.',
      en: 'When the news says "unemployment is 4 percent", it is hard to tell whether that is high or low. It only means something next to another country or another year — and the reader usually has neither at hand.',
      ja: 'ニュースで「失業率4パーセント」という文を見ても、それが高いのか低いのかは分かりません。他の国や去年と並べて初めて意味が出ますが、読む人にはたいていその材料がありません。',
    },
    work: {
      ko: '연구진은 통계 문장을 \'누구·무엇을 잰 것·언제\' 세 조각으로 가르고, 각 조각을 다른 것과 견줄 수 있게 자료 탐색으로 이어 주는 도구를 만들었습니다.',
      en: 'They built a tool that splits a statistical sentence into three pieces — who, what is measured, and when — and lets the reader swap each piece to compare against something else.',
      ja: '研究者は統計の文を「誰が・何を測ったか・いつ」の三つに分け、それぞれを別のものと比べられるようにデータ探索へつなぐ道具を作りました。',
    },
    took: {
      ko: '문장을 세 조각으로 가르는 짜임과, 맥락을 만들 수 있는 자리 열 칸을 가져왔습니다. 논문이 스스로 밝힌 역효과 — 밑줄과 물음이 오히려 수동적으로 읽게 만든다는 것 — 도 함께 적어 두었습니다.',
      en: 'The way a sentence is split into three, and the ten places where context can be built. Also the backfire the paper reported on itself: underlines and ready-made questions can make people read more passively.',
      ja: '文を三つに分ける仕組みと、文脈を作れる十の場所を受け取りました。論文が自ら記した逆効果 — 下線と問いがかえって受け身の読み方を招くこと — も併せて書いてあります。',
    },
    left: {
      ko: '물음을 지어내고 순위를 매기는 부분은 큰 모델이 필요해 빼고, 열 칸을 모두 펼쳐 둔 채 고르는 일은 읽는 사람에게 맡깁니다. 실제 통계 자료도 싣지 않아 그림은 값이 아니라 모양만 보여 줍니다.',
      en: 'Generating and ranking the questions needs a large model, so it is left out: all ten places are laid open and the choosing is yours. No real statistics are bundled either, so the charts show shape, not values.',
      ja: '問いを作って順位を付ける部分は大きなモデルが要るので外し、十の場所をすべて開いたまま選ぶのは読む人に任せます。実際の統計データも載せないので、図は値ではなく形だけを示します。',
    },
  },
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
