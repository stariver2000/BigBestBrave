/**
 * 그림 계획 페이지의 세 언어 사전.
 *
 * 자료 유형과 부호 이름은 논문의 용어(영문)를 함께 적는다 - 갈래표의 정본이
 * 영문이라, 옮긴 이름만 두면 논문과 맞대 볼 수 없기 때문이다.
 * 숫자는 {자리}를 두고 화면 쪽에서 코어 값으로 채운다.
 */

import type { Locale } from '../../core/i18n';
import type { CategoryId, DataTypeId, EncodingId, ObservationId } from '../../core/taviz';

interface NamedCopy {
  name: string;
  definition: string;
}

export interface FigureDictionary {
  title: string;
  summary: string;
  capability: string;
  paperLabel: string;
  categories: Record<CategoryId, string>;
  dataTypes: Record<DataTypeId, NamedCopy>;
  encodings: Record<EncodingId, NamedCopy>;
  observations: Record<ObservationId, string>;
  plan: {
    title: string;
    note: string;
    addType: string;
    addEncoding: string;
    cancel: string;
    remove: string;
    empty: string;
    corpusLine: string;
    topBadge: string;
    unseenBadge: string;
    limit: string;
  };
  summaryPanel: {
    title: string;
    note: string;
    mix: string;
    qualitative: string;
    corpusQualitative: string;
    observationsTitle: string;
    noObservations: string;
  };
  matrix: {
    title: string;
    note: string;
    rowHead: string;
    totalHead: string;
    keyboard: string;
    cellTitle: string;
    cellLine: string;
    cellRowTotal: string;
    cellColumnTotal: string;
    cellTop: string;
    cellUnseen: string;
    pickHint: string;
    kindsTitle: string;
    fifthColumn: string;
  };
  corpus: {
    title: string;
    facts: string;
    alpha: string;
    pins: string[];
    siteNote: string;
  };
  notes: {
    title: string;
    took: { title: string; items: string[] };
    left: { title: string; items: string[] };
    added: { title: string; items: string[] };
  };
  related: { title: string; chart: string; script: string };
}

const ko: FigureDictionary = {
  title: '그림 계획',
  summary: '질적 연구 결과의 그림 형식을 고르고, CHI 149편이 실제로 그린 방식과 견준다',
  capability: '연구 결과 목록에 그림 형식을 하나씩 붙이면 실제 CHI 논문 말뭉치에서 그 짝이 몇 번 쓰였는지 보여 주고, 계획 전체를 논문의 다섯 관찰로 비추며, 자료 유형 11갈래 × 부호 5열의 갈래표를 칸마다 눌러 볼 수 있다',
  paperLabel: '근거 논문',
  categories: {
    theme: '주제 (Theme)',
    concept: '개념 (Concept)',
    quant: '수치 (Quant.)',
    misc: '그 밖 (Misc.)',
  },
  dataTypes: {
    taxonomy: { name: '갈래표 (Taxonomy)', definition: '주제와 하위 주제의 층층 구조' },
    definition: { name: '정의 (Definition)', definition: '주제의 정의나 묘사' },
    example: { name: '예시 (Example)', definition: '주제를 풀어 보여 주는 예(인용 등)' },
    frequency: { name: '빈도 (Frequency)', definition: '주제별 나온 횟수' },
    otherTheme: { name: '그 밖의 주제', definition: '위에 들지 않는 주제 결과' },
    model: { name: '모형·틀 (Model/Framework)', definition: '분석에서 떠오른 새 개념 구조' },
    designInsight: { name: '설계 시사점 (Design Insight)', definition: '다음 설계를 위한 실행 가능한 통찰' },
    otherConcept: { name: '그 밖의 개념', definition: '위에 들지 않는 개념 결과' },
    selfReported: { name: '자기 보고 수치 (Self-reported)', definition: '설문·리커트 같은 자기 보고 값' },
    objective: { name: '측정 수치 (Objectively-measured)', definition: '기기·기록으로 잰 값' },
    miscResult: { name: '그 밖의 결과', definition: '어느 갈래에도 들지 않는 결과' },
  },
  encodings: {
    table: { name: '표 (Table)', definition: '행과 열의 격자. 글 중심 표, 표시 중심 매트릭스, 색 진하기의 열지도까지' },
    image: { name: '이미지 (Image)', definition: '장면이나 개념을 담은 그림 - 사진·화면 갈무리·스케치·일러스트' },
    diagram: { name: '도해 (Diagram)', definition: '관계를 그리는 그림 - 블록·네트워크·벤·양파·시간줄' },
    chart: { name: '차트 (Chart)', definition: '수치를 시각 요소에 매는 그림 - 막대 갈래들·상자·점·선·범위 표시' },
    other: { name: '그 밖', definition: '표 1의 이름 없는 다섯째 열. 캡션이 넷만 이름 붙였다' },
  },
  observations: {
    tablesDominate: '표는 말뭉치에서 252회로 가장 흔한 형식이다(5.2절). 풍부함은 지키지만 글이 무거워져, 논문은 표를 더 시각적인 형식으로 옮길 길을 물었다.',
    imagesForExamples: '이미지는 주로 주제의 예시를 보여 주는 데 쓰였다(5.3절). 예시를 이미지 아닌 것으로만 그리는 계획은 말뭉치의 주된 길과 다르다.',
    diagramsForConcepts: '개념(모형·틀)에서는 도해의 비중이 유난히 높았다(5.4절, 42점 중 32점). 개념을 그리는데 도해가 없는 계획은 말뭉치의 지배적 선택과 다르다.',
    chartsForQuant: '차트는 수치와 주제 빈도에 국한됐다(5.5절). 그 밖의 자리에 차트를 두는 것은 말뭉치에 드물다.',
    halfNotQualitative: '말뭉치에서 핵심 질적 발견(주제·개념)을 그린 그림은 절반이 안 됐다(5.1절, 1052점 중 406점). 이 계획에는 질적 발견 그림이 없다.',
  },
  plan: {
    title: '내 그림 계획',
    note: '보고할 결과마다 그림 형식을 하나 골라 붙인다. 옆의 셈은 CHI 149편에서 그 짝이 실제로 나온 횟수다 - 드물다고 틀린 것은 아니다.',
    addType: '어떤 결과를 그리나',
    addEncoding: '무엇으로 그리나 - 괄호는 말뭉치의 출현 수',
    cancel: '그만두기',
    remove: '빼기',
    empty: '항목을 더하면 계획이 선다. 기본 계획은 이 논문 스스로의 선택이다.',
    corpusLine: '말뭉치 {count}번 · 이 유형의 그림 {total}점',
    topBadge: '가장 흔한 짝',
    unseenBadge: '말뭉치에 없던 짝',
    limit: '항목은 {max}개까지다.',
  },
  summaryPanel: {
    title: '계획 진단',
    note: '점수가 아니라 관찰이다. 논문 5장이 말뭉치에서 본 것 가운데 이 계획에 닿는 것만 보여 준다.',
    mix: '갈래 구성',
    qualitative: '질적 발견(주제·개념) 항목 {count}개 / 전체 {total}개',
    corpusQualitative: '말뭉치는 {core}/{denominator}점 - 절반이 안 됐다',
    observationsTitle: '이 계획에 닿는 관찰',
    noObservations: '닿는 관찰이 없다. 말뭉치의 흔한 길 안에 있는 계획이다.',
  },
  matrix: {
    title: '갈래표 헤아리기',
    note: '표 1 그대로다: 자료 유형 11갈래 × 부호 5열의 출현 수. 칸을 고르면 그 짝의 셈이 아래 선다. 한 그림이 여러 부호를 겸해 행 합이 총계(Tot.)와 다를 수 있다.',
    rowHead: '자료 유형',
    totalHead: 'Tot.',
    keyboard: '키보드: 화살표로 칸 이동 · Esc 고름 풀기',
    cellTitle: '{type} × {encoding}',
    cellLine: '이 짝은 말뭉치에 {count}번 나왔다.',
    cellRowTotal: '이 유형의 그림은 모두 {total}점',
    cellColumnTotal: '이 부호는 모두 {total}회',
    cellTop: '이 유형에서 가장 흔한 부호다.',
    cellUnseen: '말뭉치에서 한 번도 안 나온 짝이다. 틀렸다는 뜻이 아니라, 앞서 간 사람이 없다는 뜻이다.',
    pickHint: '칸을 고르면 여기에 셈이 선다.',
    kindsTitle: '이 부호의 세부 갈래(4.2절)',
    fifthColumn: '다섯째 열은 캡션이 이름 붙이지 않은 열이다. 글자 추출에서 글리프가 깨져 이름을 읽을 수 없었고, 열 합 12만 총계 행과 맞는 것을 확인했다.',
  },
  corpus: {
    title: '말뭉치의 짜임',
    facts: '2012~2025년 CHI에서 제목·초록 검색 {hits}편에 보충 검색 {supp}편을 더하고 중복을 빼 {papers}편. 그림 없는 {noVis}편을 뺀 뒤 그림·표 {visuals}점을 뽑고, 결과 단계만 걸러 {result}점({resultPapers}편)을 코딩했다.',
    alpha: '코더 간 일치도 Krippendorff α: 연구 단계 {step} · 자료 유형 {type} · 부호 {encoding}',
    pins: [
      '표 1의 두 행(그 밖의 주제, 설계 시사점)은 부호 합이 총계보다 1 작다. 캡션은 "합이 총계를 넘을 수 있다"고만 말한다. 다섯 열의 합계가 전부 맞으므로 옮겨 적기 오류가 아니라 표 자체의 어긋남이다.',
      '본문 5.3절은 예시용 이미지를 138/187, 말뭉치 이미지의 138/173이라 하는데 표 1의 같은 자리는 144, 열 합은 196이다. 서로 다른 셈(고유 그림 수 대 겸하는 부호의 중복 계수)으로 보이나 논문이 밝히지 않는다.',
      '본문 5.5절은 막대 갈래 44회가 "차트의 절반 가까이"라 하는데 표 1의 차트 열 합 112로는 39%다. 이 또한 다른 셈일 수 있다.',
    ],
    siteNote: '논문의 공개 사이트(taresultvis.github.io)의 색인 수는 표 1과 다르다(예: 갈래표 127 대 59). 여과 전 1,052점 전체를 세는 것으로 보이나 사이트가 셈법을 밝히지 않아, 이 페이지는 인쇄된 표 1만 옮겼다.',
  },
  notes: {
    title: '가져온 것과 아닌 것',
    took: {
      title: '가져온 것',
      items: [
        '표 1 전체와 자료 유형의 정의',
        '3장의 수집 셈과 Krippendorff 알파 셋',
        '4.2절의 부호 세부 갈래와 5장의 관찰 다섯',
      ],
    },
    left: {
      title: '가져오지 않은 것',
      items: [
        '그림 1·2에만 있는 값과 이미지',
        '공개 사이트의 색인 수 - 표 1과 달라 셈법을 알 수 없다',
      ],
    },
    added: {
      title: '이 페이지가 더한 것',
      items: [
        '관찰을 계획의 거울로 쓰는 짜임새와 기본 계획(이 논문 스스로의 선택)',
        '관찰 문구의 세 언어 옮김 - 판정은 출현 수와 관찰뿐, 점수는 없다',
      ],
    },
  },
  related: {
    title: '곁들여 볼 페이지',
    chart: '이 차트가 거짓말하는 크기 - 그린 다음의 정직함을 재는 페이지',
    script: '대본 진단 - 또 하나의 갈래표를 도구로 뒤집은 페이지',
  },
};

const en: FigureDictionary = {
  title: 'Figure Planner',
  summary: 'Choose forms for qualitative findings and weigh them against how 149 CHI papers actually drew theirs',
  capability: 'Attach a visual form to each result you plan to report; the page shows how often that pairing appeared in a corpus of real CHI papers, mirrors your whole plan against the paper’s five observations, and lays out the full 11×5 taxonomy to explore cell by cell',
  paperLabel: 'Based on',
  categories: {
    theme: 'Theme',
    concept: 'Concept',
    quant: 'Quant.',
    misc: 'Misc.',
  },
  dataTypes: {
    taxonomy: { name: 'Taxonomy', definition: 'Hierarchical structure of themes and subthemes' },
    definition: { name: 'Definition', definition: 'Definitions or descriptions of themes' },
    example: { name: 'Example', definition: 'Examples that unpack a theme (quotes, etc.)' },
    frequency: { name: 'Frequency', definition: 'How often each theme occurred' },
    otherTheme: { name: 'Other theme', definition: 'Theme results that fit nowhere above' },
    model: { name: 'Model / Framework', definition: 'Novel conceptual structures that emerged from the analysis' },
    designInsight: { name: 'Design Insight', definition: 'Actionable insights for future design' },
    otherConcept: { name: 'Other concept', definition: 'Concept results that fit nowhere above' },
    selfReported: { name: 'Self-reported', definition: 'Self-reported values such as Likert ratings' },
    objective: { name: 'Objectively-measured', definition: 'Values measured by instruments or logs' },
    miscResult: { name: 'Miscellaneous result', definition: 'Results outside every category' },
  },
  encodings: {
    table: { name: 'Table', definition: 'Grids of rows and columns — text-centric tables, mark-centric matrices, color-intensity heatmaps' },
    image: { name: 'Image', definition: 'Pictures of scenes or concepts — photos, screenshots, sketches, illustrations' },
    diagram: { name: 'Diagram', definition: 'Relationship drawings — block, network, Venn, onion, timeline' },
    chart: { name: 'Chart', definition: 'Quantitative mappings — bar variants, box, dot, line, range symbols' },
    other: { name: 'Other', definition: 'The unnamed fifth column of Table 1; its caption names only four' },
  },
  observations: {
    tablesDominate: 'Tables are the corpus’s most common form at 252 appearances (§5.2). They preserve richness but read heavy; the paper asks how tabular data could become more visual.',
    imagesForExamples: 'Images mostly served as examples of themes (§5.3). Drawing examples with anything but images departs from the corpus’s main road.',
    diagramsForConcepts: 'For concepts (models/frameworks) diagrams dominate (§5.4; 32 of 42). Planning concepts without a single diagram departs from the corpus’s prevailing choice.',
    chartsForQuant: 'Charts stayed confined to quantitative results and theme frequencies (§5.5). A chart anywhere else is rare in the corpus.',
    halfNotQualitative: 'Less than half of the corpus’s visuals drew the core qualitative findings (§5.1; 406 of 1,052). This plan has no qualitative-finding visual at all.',
  },
  plan: {
    title: 'My figure plan',
    note: 'Pick one form per result you will report. The count beside each is how often that pairing actually appeared across 149 CHI papers — rare does not mean wrong.',
    addType: 'What result are you drawing?',
    addEncoding: 'Draw it as — parentheses show corpus counts',
    cancel: 'Cancel',
    remove: 'Remove',
    empty: 'Add items to build a plan. The default plan is this paper’s own choices.',
    corpusLine: 'corpus {count} times · {total} visuals of this type',
    topBadge: 'most common pairing',
    unseenBadge: 'unseen in the corpus',
    limit: 'Up to {max} items.',
  },
  summaryPanel: {
    title: 'Plan diagnosis',
    note: 'Observations, not scores. Only the paper’s Section 5 findings that touch this plan are shown.',
    mix: 'Category mix',
    qualitative: '{count} of {total} items draw qualitative findings (themes · concepts)',
    corpusQualitative: 'the corpus managed {core}/{denominator} — less than half',
    observationsTitle: 'Observations this plan touches',
    noObservations: 'No observation applies — the plan stays on the corpus’s common roads.',
  },
  matrix: {
    title: 'The taxonomy, counted',
    note: 'Table 1 as printed: 11 data types × 5 encodings. Pick a cell and its numbers appear below. One visual can carry several encodings, so row sums may differ from totals (Tot.).',
    rowHead: 'Data type',
    totalHead: 'Tot.',
    keyboard: 'Keyboard: arrows move · Esc clears the pick',
    cellTitle: '{type} × {encoding}',
    cellLine: 'This pairing appeared {count} times in the corpus.',
    cellRowTotal: '{total} visuals of this type in all',
    cellColumnTotal: '{total} appearances of this encoding in all',
    cellTop: 'The most common encoding for this type.',
    cellUnseen: 'Never appeared in the corpus — not wrong, just unprecedented.',
    pickHint: 'Pick a cell and its numbers appear here.',
    kindsTitle: 'Subkinds of this encoding (§4.2)',
    fifthColumn: 'The fifth column is unnamed by the caption; its glyph did not survive text extraction. Only its column total, 12, was verified against the totals row.',
  },
  corpus: {
    title: 'The corpus',
    facts: 'CHI 2012–2025: {hits} papers from title/abstract search plus {supp} supplementary, minus duplicates = {papers}. After dropping {noVis} with no visuals, {visuals} figures and tables were extracted; filtering to result-stage visuals left {result} from {resultPapers} papers.',
    alpha: 'Inter-coder agreement, Krippendorff’s α: research step {step} · data type {type} · encoding {encoding}',
    pins: [
      'Two rows of Table 1 (Other theme, Design Insight) have encoding sums one less than their totals; the caption only allows sums to exceed. All five column totals check out, so this is the table’s own quirk, kept as printed.',
      'Section 5.3 says example images number 138/187 and 138/173 of all images, but Table 1 reads 144 and a column total of 196. Likely different countings (unique visuals vs multi-encoding counts); the paper does not say.',
      'Section 5.5 calls 44 bar-variant appearances “nearly half of all charts”, but the chart column totals 112, making 39%. Possibly another counting.',
    ],
    siteNote: 'The paper’s companion site (taresultvis.github.io) indexes counts that differ from Table 1 (e.g. Taxonomy 127 vs 59), apparently over the unfiltered 1,052 visuals, with no stated method — so this page transcribes only the printed table.',
  },
  notes: {
    title: 'What was taken, what was not',
    took: {
      title: 'Taken',
      items: [
        'All of Table 1 with the data-type definitions',
        'The Section 3 collection arithmetic and the three Krippendorff alphas',
        'The §4.2 encoding subkinds and the five §5 observations',
      ],
    },
    left: {
      title: 'Not taken',
      items: [
        'Values and imagery living only in Figures 1–2',
        'The companion site’s index counts — they differ from Table 1 with no stated method',
      ],
    },
    added: {
      title: 'Added by this page',
      items: [
        'The planning mirror itself, and the default plan (the paper’s own choices)',
        'Trilingual renderings of the observations — verdicts are counts and observations, never scores',
      ],
    },
  },
  related: {
    title: 'Pages to pair with',
    chart: 'How big this chart lies — honesty after the drawing is done',
    script: 'Script Doctor — another taxonomy turned into a tool',
  },
};

const ja: FigureDictionary = {
  title: '図の計画',
  summary: '質的研究の結果に図の形式を選び、CHI論文149本が実際に描いた方式と見比べる',
  capability: '報告する結果ごとに図の形式を付けると、実際のCHI論文コーパスでその組み合わせが何回使われたかを示し、計画全体を論文の五つの観察で照らし、資料タイプ11×符号5の分類表をセルごとに押して見られる',
  paperLabel: '根拠論文',
  categories: {
    theme: '主題 (Theme)',
    concept: '概念 (Concept)',
    quant: '数値 (Quant.)',
    misc: 'その他 (Misc.)',
  },
  dataTypes: {
    taxonomy: { name: '分類表 (Taxonomy)', definition: '主題と下位主題の階層構造' },
    definition: { name: '定義 (Definition)', definition: '主題の定義や記述' },
    example: { name: '例示 (Example)', definition: '主題を解きほぐす例(引用など)' },
    frequency: { name: '頻度 (Frequency)', definition: '主題ごとの出現回数' },
    otherTheme: { name: 'その他の主題', definition: '上に入らない主題の結果' },
    model: { name: '模型・枠組み (Model/Framework)', definition: '分析から現れた新しい概念構造' },
    designInsight: { name: '設計への示唆 (Design Insight)', definition: '次の設計のための実行可能な洞察' },
    otherConcept: { name: 'その他の概念', definition: '上に入らない概念の結果' },
    selfReported: { name: '自己報告の数値 (Self-reported)', definition: 'リッカートなど自己報告の値' },
    objective: { name: '測定された数値 (Objectively-measured)', definition: '機器や記録で測った値' },
    miscResult: { name: 'その他の結果', definition: 'どの分類にも入らない結果' },
  },
  encodings: {
    table: { name: '表 (Table)', definition: '行と列の格子 - 文字中心の表、印中心のマトリクス、色の濃さのヒートマップ' },
    image: { name: '画像 (Image)', definition: '場面や概念を写した絵 - 写真・スクリーンショット・スケッチ・イラスト' },
    diagram: { name: '図解 (Diagram)', definition: '関係を描く絵 - ブロック・ネットワーク・ベン・玉ねぎ・時間軸' },
    chart: { name: 'チャート (Chart)', definition: '数値を視覚要素に対応づける絵 - 棒の変種・箱・点・線・範囲記号' },
    other: { name: 'その他', definition: '表1の名前のない五列目。キャプションは四つしか名付けていない' },
  },
  observations: {
    tablesDominate: '表はコーパスで252回と最も多い形式だ(5.2節)。豊かさは守るが文字が重く、論文は表をより視覚的な形式へ移す道を問うた。',
    imagesForExamples: '画像は主に主題の例示に使われた(5.3節)。例示を画像以外だけで描く計画はコーパスの主な道と異なる。',
    diagramsForConcepts: '概念(模型・枠組み)では図解の比重が際立って高い(5.4節、42点中32点)。概念を描くのに図解がない計画はコーパスの支配的な選択と異なる。',
    chartsForQuant: 'チャートは数値と主題頻度に限られていた(5.5節)。それ以外の場所のチャートはコーパスでは珍しい。',
    halfNotQualitative: 'コーパスで核心の質的発見(主題・概念)を描いた図は半分に満たない(5.1節、1052点中406点)。この計画には質的発見の図が一つもない。',
  },
  plan: {
    title: '自分の図の計画',
    note: '報告する結果ごとに形式を一つ選ぶ。横の数はCHI論文149本でその組み合わせが実際に出た回数だ - 珍しいことは間違いではない。',
    addType: 'どんな結果を描くか',
    addEncoding: '何で描くか - 括弧はコーパスでの出現数',
    cancel: 'やめる',
    remove: '外す',
    empty: '項目を足すと計画が立つ。既定の計画はこの論文自身の選択だ。',
    corpusLine: 'コーパス{count}回 · このタイプの図{total}点',
    topBadge: '最も多い組み合わせ',
    unseenBadge: 'コーパスにない組み合わせ',
    limit: '項目は{max}個まで。',
  },
  summaryPanel: {
    title: '計画の診断',
    note: '点数ではなく観察だ。論文5章がコーパスで見たもののうち、この計画に触れるものだけを示す。',
    mix: '分類の構成',
    qualitative: '質的発見(主題・概念)の項目 {count}個 / 全体 {total}個',
    corpusQualitative: 'コーパスは{core}/{denominator}点 - 半分に満たなかった',
    observationsTitle: 'この計画に触れる観察',
    noObservations: '触れる観察はない。コーパスのよくある道の中にある計画だ。',
  },
  matrix: {
    title: '分類表を数える',
    note: '表1のままだ: 資料タイプ11×符号5の出現数。セルを選ぶとその組の数が下に立つ。一つの図が複数の符号を兼ねるため、行の合計は総計(Tot.)と異なりうる。',
    rowHead: '資料タイプ',
    totalHead: 'Tot.',
    keyboard: 'キーボード: 矢印で移動 · Escで選択解除',
    cellTitle: '{type} × {encoding}',
    cellLine: 'この組み合わせはコーパスに{count}回現れた。',
    cellRowTotal: 'このタイプの図は計{total}点',
    cellColumnTotal: 'この符号は計{total}回',
    cellTop: 'このタイプで最も多い符号だ。',
    cellUnseen: 'コーパスに一度も現れなかった組だ。間違いではなく、先例がないという意味だ。',
    pickHint: 'セルを選ぶとここに数が立つ。',
    kindsTitle: 'この符号の下位分類(4.2節)',
    fifthColumn: '五列目はキャプションが名付けていない列だ。文字抽出でグリフが壊れて名前が読めず、列の合計12だけが総計行と合うことを確かめた。',
  },
  corpus: {
    title: 'コーパスの成り立ち',
    facts: '2012~2025年のCHIで、題名・要旨検索{hits}本に補充検索{supp}本を足し重複を除いて{papers}本。図のない{noVis}本を除き図表{visuals}点を抽出し、結果段階だけ残して{result}点({resultPapers}本)をコーディングした。',
    alpha: 'コーダー間一致度 Krippendorff α: 研究段階{step} · 資料タイプ{type} · 符号{encoding}',
    pins: [
      '表1の二つの行(その他の主題、設計への示唆)は符号の合計が総計より1小さい。キャプションは「合計は総計を超えうる」としか言わない。五列の合計が全部合うので、書き写しの誤りではなく表自体の食い違いだ。',
      '本文5.3節は例示用画像を138/187、全画像の138/173とするが、表1の同じ場所は144、列の合計は196だ。異なる数え方(固有の図の数と兼ねる符号の重複計数)と見られるが、論文は明かしていない。',
      '本文5.5節は棒の変種44回を「チャートの半分近く」とするが、表1のチャート列の合計112では39%だ。これも別の数え方かもしれない。',
    ],
    siteNote: '論文の公開サイト(taresultvis.github.io)の索引数は表1と異なる(例: 分類表127対59)。ろ過前の1,052点全体を数えているように見えるが、サイトが数え方を明かさないため、このページは印刷された表1だけを写した。',
  },
  notes: {
    title: '受け取ったものとそうでないもの',
    took: {
      title: '受け取ったもの',
      items: [
        '表1の全体と資料タイプの定義',
        '3章の収集の数え上げとKrippendorffのα三つ',
        '4.2節の符号の下位分類と5章の観察五つ',
      ],
    },
    left: {
      title: '受け取らなかったもの',
      items: [
        '図1・2にしかない値と画像',
        '公開サイトの索引数 - 表1と異なり数え方が分からない',
      ],
    },
    added: {
      title: 'このページが足したもの',
      items: [
        '観察を計画の鏡として使う仕組みと既定の計画(この論文自身の選択)',
        '観察文の三言語訳 - 判定は出現数と観察だけで、点数はない',
      ],
    },
  },
  related: {
    title: '併せて見るページ',
    chart: 'このチャートが嘘をつく大きさ - 描いた後の正直さを測るページ',
    script: '台本診断 - もう一つの分類表を道具にひっくり返したページ',
  },
};

export const figureDictionary: Record<Locale, FigureDictionary> = { ko, en, ja };
