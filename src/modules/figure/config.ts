/**
 * 그림 계획 페이지 설정.
 *
 * 근거가 된 연구: A Scoping Review on How HCI Researchers Visualize Results of
 * Thematic Analysis (Seokweon Jung, Jiwon Song, Yumin Song, Jinwook Seo,
 * Ha-Kyung Hidy Kong), CHI EA 2026, doi:10.1145/3772363.3798541.
 * 전문은 연구실이 직접 올린 hcil.snu.ac.kr/cms/uploads 공개 PDF로 읽었다.
 *
 * 이 페이지가 가져온 것
 *   - 표 1 전체(자료 유형 11갈래 × 부호 5열의 출현 수)와 그 갈래 정의.
 *   - 3장의 수집 셈(187편, 1052점 → 572점/149편, Krippendorff 알파 셋).
 *   - 4.2절의 부호 세부 갈래 이름들과 5장의 관찰 다섯.
 *
 * 가져오지 않은 것
 *   - 그림 1(연도별 추이)과 그림 2의 값·이미지. 그림에만 있다.
 *   - 공개 사이트(taresultvis.github.io)의 색인 수. 표 1과 달라 셈법을 알 수
 *     없다(여과 전 전체를 세는 것으로 보인다). 링크만 건다.
 *
 * 이 페이지가 스스로 더한 것
 *   - "계획"이라는 쓰임새 자체. 논문은 관찰이고, 이 페이지는 그 관찰을
 *     자기 그림 계획을 비추는 거울로 쓴다.
 *   - 기본 계획(이 논문 스스로의 선택: 갈래표는 표로, 연도 추이는 차트로,
 *     예시는 이미지로)과 관찰 문구의 한국어·일본어 옮김.
 */

import type { PlanItem } from '../../core/taviz';
import type { CategoryId } from '../../core/taviz';

export const PAPER = {
  title: 'A Scoping Review on How HCI Researchers Visualize Results of Thematic Analysis',
  authors: 'Seokweon Jung, Jiwon Song, Yumin Song, Jinwook Seo, Ha-Kyung Hidy Kong',
  venue: 'CHI EA 2026',
  affiliation: 'KAIST · SNU · RIT',
  link: 'https://doi.org/10.1145/3772363.3798541',
  fullText: 'hcil.snu.ac.kr (연구실 공개본)',
  site: 'https://taresultvis.github.io/',
  /** 쉬운 말로. 열두 살이 읽어도 통하는 문장만 쓴다. */
  plain: {
    problem: {
      ko: '사람들의 이야기를 모아 갈래를 짓는 연구는 결과가 숫자가 아니라 말입니다. 숫자를 그림으로 그리는 법은 교과서가 있는데, 말로 된 발견을 어떻게 그려야 하는지는 정해진 길이 없어서 다들 제각각 그리고 있습니다.',
      en: 'Research that gathers people’s stories and sorts them into themes ends with words, not numbers. There are textbooks for charting numbers, but no settled way to draw findings made of words — so everyone draws them differently.',
      ja: '人々の話を集めて主題に分ける研究は、結果が数字ではなく言葉です。数字を図にする教科書はあるのに、言葉でできた発見をどう描くかには決まった道がなく、みんなばらばらに描いています。',
    },
    work: {
      ko: '연구진은 CHI 학회 논문 187편에 실린 그림과 표 천여 점을 하나하나 읽고, 무엇을(주제·개념·수치) 무엇으로(표·이미지·도해·차트) 그렸는지 세어 갈래표를 만들었습니다. 그리고 그림 노력의 절반 이상이 정작 핵심 질적 발견 밖으로 가더라는 것을 밝혔습니다.',
      en: 'The authors read over a thousand figures and tables from 187 CHI papers one by one, counted what was drawn (themes, concepts, numbers) with which form (table, image, diagram, chart), and built a taxonomy. They found that more than half of the visualization effort goes outside the core qualitative findings.',
      ja: '研究チームはCHI論文187本に載った千点余りの図表を一つずつ読み、何を(主題・概念・数値)何で(表・画像・図解・チャート)描いたかを数えて分類表を作りました。そして図の労力の半分以上が肝心の質的発見の外に向かっていることを明らかにしました。',
    },
    took: {
      ko: '이 페이지는 그 셈을 거울로 뒤집었습니다. 내 연구 결과 목록에 그림 형식을 하나씩 골라 붙이면, 실제 CHI 149편에서 그 짝이 몇 번 쓰였는지, 내 계획이 논문의 관찰 어디에 닿는지를 보여 줍니다. 갈래표 전체도 눌러 볼 수 있게 펼쳐 두었습니다.',
      en: 'This page turns those counts into a mirror. Pick a form for each result in your study plan, and it shows how often that pairing appeared across 149 real CHI papers and which of the paper’s observations your plan touches. The full taxonomy is laid out to explore, cell by cell.',
      ja: 'このページはその数え上げを鏡にひっくり返しました。自分の研究結果の一覧に図の形式を一つずつ選んで付けると、実際のCHI論文149本でその組み合わせが何回使われたか、自分の計画が論文の観察のどこに触れるかを見せてくれます。分類表全体もセルごとに押して見られます。',
    },
    left: {
      ko: '연도별 추이 같은 그림 속 값은 옮기지 않았습니다. 논문의 공개 사이트 수치는 인쇄된 표와 달라 셈법을 알 수 없어 링크만 걸었습니다. 그리고 이 페이지의 조언은 점수가 아니라 말뭉치의 관찰일 뿐입니다 - 드문 짝이 틀린 짝은 아닙니다.',
      en: 'Values that live only in figures, like the yearly trend, are not carried over. The paper’s companion site shows counts that differ from the printed table with no stated method, so it is only linked. And this page’s advice is observation, not a score — a rare pairing is not a wrong one.',
      ja: '年別推移のような図の中だけの値は写していません。論文の公開サイトの数値は印刷された表と異なり数え方が分からないため、リンクだけにしました。そしてこのページの助言は点数ではなくコーパスの観察です - 珍しい組み合わせが間違いというわけではありません。',
    },
  },
} as const;

/**
 * 기본 계획: 이 논문이 자기 결과를 그린 방식 그대로다.
 * 표 1은 갈래표를 표(+열지도)로, 그림 1은 연도 추이(측정 수치)를 차트로,
 * 그림 2는 예시를 이미지로 그렸다. 첫 화면에서 이야기가 서도록 이것을 둔다.
 */
export const DEFAULT_PLAN: readonly PlanItem[] = [
  { dataType: 'taxonomy', encoding: 'table' },
  { dataType: 'objective', encoding: 'chart' },
  { dataType: 'example', encoding: 'image' },
];

/** 계획 항목 수의 상한. URL과 화면이 감당할 만큼만. */
export const MAX_PLAN_ITEMS = 12;

/**
 * 네 갈래의 표식색. plate 룩의 종이 위에서 실측했다(scratchpad plate-measure):
 * 모두 surface(#F7F6F2) 위 APCA |Lc| >= 71.5, WCAG >= 4.99:1이라 글자로도 쓸 수
 * 있고, bg(#E9E8E3) 위에서도 |Lc| >= 63.2다.
 */
export const CATEGORY_COLORS: Record<CategoryId, string> = {
  theme: '#1D6E8C',
  concept: '#6A3FB5',
  quant: '#206B3A',
  misc: '#6E6A60',
};

/** 관련 페이지. 그림의 정직함을 다루는 페이지와, 갈래표를 도구로 뒤집은 페이지. */
export const RELATED_PAGES = [
  { path: '/chart', key: 'chart' },
  { path: '/script', key: 'script' },
] as const;
