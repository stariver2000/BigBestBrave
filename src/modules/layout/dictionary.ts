/**
 * 배치의 두 얼굴 페이지의 세 언어 사전.
 *
 * 지표 이름은 논문 용어(영문)를 함께 적는다. 그림 1의 행 이름이 정본이라
 * 옮긴 이름만 두면 논문과 맞대 볼 수 없기 때문이다.
 */

import type { Locale } from '../../core/i18n';
import type { AestheticId, FaithfulnessId, GoalId, SampleId } from '../../core/graphaes';

export interface LayoutDictionary {
  title: string;
  summary: string;
  capability: string;
  paperLabel: string;
  caveat: string;
  samples: Record<SampleId, { name: string; hint: string }>;
  goals: Record<GoalId, { name: string; what: string }>;
  aesthetics: Record<AestheticId, string>;
  faithfulness: Record<FaithfulnessId, string>;
  groupNames: Record<number, string>;
  stage: {
    title: string;
    note: string;
    stepLine: string;
    run: string;
    stop: string;
    reset: string;
    settled: string;
    keyboard: string;
    nodes: string;
  };
  gauges: {
    title: string;
    note: string;
    readability: string;
    faithfulness: string;
    notMeasured: string;
    noCrossing: string;
    deltaTitle: string;
    deltaHint: string;
    up: string;
    down: string;
    same: string;
  };
  groups: {
    title: string;
    note: string;
    measured: string;
    notMeasured: string;
    findings: string[];
  };
  reveal: {
    title: string;
    body: string;
    average: string;
  };
  notes: {
    title: string;
    took: { title: string; items: string[] };
    left: { title: string; items: string[] };
    added: { title: string; items: string[] };
  };
  related: { title: string; focus: string; rulers: string };
}

const AES_KO: Record<AestheticId, string> = {
  nodeResolution: '점 해상도 (Node Resolution)',
  nodeUniformity: '점 고름 (Node Uniformity)',
  crossingAngle: '교차각 (Crossing Angle)',
  gabrielEdges: '가브리엘 비율·간선 (Gabriel Ratio-Edges)',
  edgeLengthDeviation: '간선 길이 편차 (Edge Length Deviation)',
  angularResolutionMin: '각 해상도·최소 (Angular Resolution Min)',
  angularResolutionAvg: '각 해상도·평균 (Angular Resolution Avg)',
  edgeCrossings: '간선 교차 (Edge Crossings)',
  gabrielNodes: '가브리엘 비율·점 (Gabriel Ratio-Nodes)',
  aspectRatio: '가로세로비 (Aspect Ratio)',
  edgeOrthogonality: '간선 직교성 (Edge Orthogonality)',
};

const AES_EN: Record<AestheticId, string> = {
  nodeResolution: 'Node Resolution',
  nodeUniformity: 'Node Uniformity',
  crossingAngle: 'Crossing Angle',
  gabrielEdges: 'Gabriel Ratio-Edges',
  edgeLengthDeviation: 'Edge Length Deviation',
  angularResolutionMin: 'Angular Resolution (min)',
  angularResolutionAvg: 'Angular Resolution (avg)',
  edgeCrossings: 'Edge Crossings',
  gabrielNodes: 'Gabriel Ratio-Nodes',
  aspectRatio: 'Aspect Ratio',
  edgeOrthogonality: 'Edge Orthogonality',
};

const AES_JA: Record<AestheticId, string> = {
  nodeResolution: '点の解像度 (Node Resolution)',
  nodeUniformity: '点の均一さ (Node Uniformity)',
  crossingAngle: '交差角 (Crossing Angle)',
  gabrielEdges: 'ガブリエル比・辺 (Gabriel Ratio-Edges)',
  edgeLengthDeviation: '辺の長さのばらつき (Edge Length Deviation)',
  angularResolutionMin: '角の解像度・最小 (Angular Resolution Min)',
  angularResolutionAvg: '角の解像度・平均 (Angular Resolution Avg)',
  edgeCrossings: '辺の交差 (Edge Crossings)',
  gabrielNodes: 'ガブリエル比・点 (Gabriel Ratio-Nodes)',
  aspectRatio: '縦横比 (Aspect Ratio)',
  edgeOrthogonality: '辺の直交性 (Edge Orthogonality)',
};

const ko: LayoutDictionary = {
  title: '배치의 두 얼굴',
  summary: '그래프를 세 목표로 밀어 보며 보기 좋음과 속이지 않음이 어떻게 맞물리는지 본다',
  capability: '견본 그래프를 세 목표(충실하게·정사각으로·축에 맞춰)로 한 걸음씩 밀면서 미적 지표 여섯과 충실도 지표 셋이 함께 움직이는 것을 보고, 논문이 밝힌 네 갈래 분류와 맞대어 본다',
  paperLabel: '근거 논문',
  caveat: '논문은 MDS로 초기화한 Kamada-Kawai 배치를 쓰고 충실도는 ZADU로, 미적 지표는 Mooney 등의 구현으로 쟀다. 이 페이지는 브라우저 안에서 결정론적으로 도는 것만 다시 구현해 미적 여섯과 충실도 셋을 재고, 참값은 그래프 최단경로 거리로 삼는다. 열한 지표를 다 재지는 않는다.',
  samples: {
    clusters: { name: '뭉치 셋', hint: '세 덩이가 다리로 이어진 그래프' },
    grid: { name: '6×6 격자', hint: '이미 축에 맞아 있는 그래프' },
    tree: { name: '나무', hint: '뿌리에서 갈라지는 그래프' },
  },
  goals: {
    faithful: { name: '충실하게', what: '최단경로 거리와 화면 거리의 차이를 줄인다 - 논문의 KK와 같은 방향' },
    square: { name: '정사각으로', what: '배치를 정사각 테두리에 맞춘다 - 가로세로비를 좋게' },
    orthogonal: { name: '축에 맞춰', what: '간선을 가로세로에 붙인다 - 직교성을 좋게' },
  },
  aesthetics: AES_KO,
  faithfulness: {
    stress: '거리 보존 (1 − 스트레스)',
    trustworthiness: '신뢰도 (Trustworthiness)',
    continuity: '연속성 (Continuity)',
  },
  groupNames: {
    1: '위상을 지키는 미학',
    2: '가까운 이웃을 지키는 미학',
    3: '해가 되는 미학',
    4: '무관한 미학',
  },
  stage: {
    title: '배치',
    note: '점은 노드, 선은 간선이다. 목표를 고르고 밀면 배치가 한 걸음씩 움직인다.',
    stepLine: '{steps}걸음',
    run: '밀기',
    stop: '멈추기',
    reset: '처음 배치로',
    settled: '더 밀어도 거의 움직이지 않는다.',
    keyboard: '밀기 단추에 초점을 두고 Enter로도 시작·정지할 수 있다.',
    nodes: '노드 {nodes}개 · 간선 {edges}개',
  },
  gauges: {
    title: '두 눈금',
    note: '왼쪽 호박빛은 보기 좋음, 오른쪽 청록빛은 속이지 않음이다. 모두 클수록 좋게 방향을 맞췄다 - 논문도 그렇게 했다.',
    readability: '보기 좋음 (미적 지표)',
    faithfulness: '속이지 않음 (DR 품질)',
    notMeasured: '이 페이지가 재지 않는 지표',
    noCrossing: '교차가 없어 잴 수 없다',
    deltaTitle: '처음 배치에서 얼마나 움직였나',
    deltaHint: '밀기 전(0걸음)과 견준 것이다.',
    up: '올랐다',
    down: '내렸다',
    same: '그대로',
  },
  groups: {
    title: '논문의 네 갈래',
    note: '627개 그래프에서 미적 지표 열하나가 충실도 지표와 어떤 상관을 보이는지에 따라 갈렸다. 그림 1 히트맵의 행 순서 그대로다.',
    measured: '이 페이지가 잼',
    notMeasured: '재지 않음',
    findings: [
      '평균 상관이 가장 높은 것은 가브리엘 비율·간선(r≈{highR})이지만 크기와 밀도가 바뀌면 흔들려 견고하지 않다.',
      '간선 교차와 가브리엘 비율·점은 MRRE와 가장 높은 상관을 보인다(r≈{mrreR}).',
      '견고한 관계는 그룹 1이 {g1}개, 그룹 2가 {g2}개다. 교차각은 그중 {ca}개, 점 해상도는 {nr}개를 가졌다.',
      '가로세로비만 모든 충실도 지표와 음의 상관이다 - 정사각에 억지로 맞추면 높은 차원의 구조가 깎인다.',
      '간선 직교성은 모든 지표와 |r| < {indep}이라 구조와 무관한, 멋내기용 지표다.',
    ],
  },
  reveal: {
    title: '직접 본 것',
    body: '지금 견본에서 정사각으로 밀면 가로세로비는 {ratioDelta} 대신 거리 보존이 {stressDelta} 움직였다. 축에 맞춰 밀면 직교성만 크게 오르고 거리 보존은 거의 그대로다 - 논문의 그룹 3과 그룹 4가 눈앞에서 갈린다.',
    average: '다만 논문의 상관은 627개 그래프의 평균이다. 한 그래프에서는 방향이 반대로 나올 수도 있다 - 이 페이지의 견본 셋에서도 갈린다. 격자에서는 정사각 밀기가 거리 보존을 뚜렷이 깎지만, 뭉치 그래프는 이미 거의 정사각이라 오히려 조금 오른다.',
  },
  notes: {
    title: '가져온 것과 아닌 것',
    took: {
      title: '가져온 것',
      items: [
        '미적 지표 열하나와 네 그룹의 행 범위(1-5 / 6-9 / 10 / 11)',
        '본문이 문장으로 밝힌 수치들과 방법의 셈(627개, 99% 분산, 견고 기준)',
      ],
    },
    left: {
      title: '가져오지 않은 것',
      items: [
        '그림 1 히트맵의 개별 상관계수 - 그림에만 있다',
        '627개 그래프 자료집과 ZADU·Mooney 구현',
      ],
    },
    added: {
      title: '이 페이지가 더한 것',
      items: [
        '견본 그래프 셋과 세 목표를 향해 한 걸음씩 가는 배치기',
        '미적 여섯·충실도 셋의 브라우저 구현(참값은 최단경로 거리)',
        '개별 그래프에서 방향이 갈린다는 관찰',
      ],
    },
  },
  related: {
    title: '곁들여 볼 페이지',
    focus: '초점 맞추기 - 특징 손잡이로 투영을 바꿔 보는 페이지',
    rulers: '같은 것을 재는 다른 자들 - 투영을 재는 잣대 고르기',
  },
};

const en: LayoutDictionary = {
  title: 'Two Faces of a Layout',
  summary: 'Push a graph toward three goals and watch how looking good and not lying pull against each other',
  capability: 'Push a sample graph one step at a time toward three goals (faithful, square, axis-aligned) and watch six aesthetic metrics and three faithfulness metrics move together, held against the paper’s four-group classification',
  paperLabel: 'Based on',
  caveat: 'The paper used MDS-initialized Kamada-Kawai layouts, measured faithfulness with ZADU and aesthetics with Mooney et al.’s implementation. This page reimplements only what runs deterministically in a browser — six aesthetics and three faithfulness metrics, with graph shortest-path distance as ground truth. It does not measure all eleven.',
  samples: {
    clusters: { name: 'Three clusters', hint: 'three blobs joined by bridges' },
    grid: { name: '6×6 grid', hint: 'a graph already aligned to axes' },
    tree: { name: 'Tree', hint: 'branching out from a root' },
  },
  goals: {
    faithful: { name: 'Faithful', what: 'shrink the gap between path distance and screen distance — the direction KK takes' },
    square: { name: 'Square', what: 'fit the layout into a square frame — improve aspect ratio' },
    orthogonal: { name: 'Axis-aligned', what: 'pull edges onto the axes — improve orthogonality' },
  },
  aesthetics: AES_EN,
  faithfulness: {
    stress: 'Distance preservation (1 − stress)',
    trustworthiness: 'Trustworthiness',
    continuity: 'Continuity',
  },
  groupNames: {
    1: 'Topology Preserving Aesthetics',
    2: 'Local Neighborhood Preserving Aesthetics',
    3: 'Negative Aesthetics',
    4: 'Independent Aesthetics',
  },
  stage: {
    title: 'The layout',
    note: 'Dots are nodes, lines are edges. Pick a goal and push; the layout moves one step at a time.',
    stepLine: '{steps} steps',
    run: 'Push',
    stop: 'Stop',
    reset: 'Back to start',
    settled: 'Pushing further barely moves it.',
    keyboard: 'Focus the push button and Enter starts and stops it too.',
    nodes: '{nodes} nodes · {edges} edges',
  },
  gauges: {
    title: 'Two gauges',
    note: 'Amber on the left is looking good; teal on the right is not lying. All are oriented so higher is better — as the paper did.',
    readability: 'Looking good (aesthetics)',
    faithfulness: 'Not lying (DR quality)',
    notMeasured: 'not measured on this page',
    noCrossing: 'no crossings, so nothing to measure',
    deltaTitle: 'How far it moved from the start',
    deltaHint: 'compared against 0 steps.',
    up: 'up',
    down: 'down',
    same: 'unchanged',
  },
  groups: {
    title: 'The paper’s four groups',
    note: 'Across 627 graphs, the eleven aesthetic metrics split by how they correlate with faithfulness metrics. The order is the row order of Figure 1’s heatmap.',
    measured: 'measured here',
    notMeasured: 'not measured',
    findings: [
      'The highest average correlation belongs to Gabriel Ratio-Edges (r≈{highR}), but it is highly sensitive to graph size and density, so it is not robust.',
      'Edge Crossings and Gabriel Ratio-Nodes reach the highest correlation with MRRE (r≈{mrreR}).',
      'Group 1 holds {g1} robust relationships and group 2 only {g2}. Crossing Angle owns {ca} of them, Node Resolution {nr}.',
      'Aspect Ratio alone correlates negatively with every faithfulness metric — forcing a square frame costs high-dimensional structure.',
      'Edge Orthogonality stays under |r| < {indep} with everything: a stylistic indicator, not a structural one.',
    ],
  },
  reveal: {
    title: 'What you just saw',
    body: 'On this sample, pushing toward square moved aspect ratio {ratioDelta} while distance preservation moved {stressDelta}. Pushing toward the axes lifts orthogonality sharply and leaves distance preservation nearly alone — groups 3 and 4 separating in front of you.',
    average: 'But the paper’s correlations are averages over 627 graphs. On any single graph the direction can reverse — and it does across these three samples. On the grid, squaring clearly costs distance preservation; the cluster graph is already nearly square, so it gains a little instead.',
  },
  notes: {
    title: 'What was taken, what was not',
    took: {
      title: 'Taken',
      items: [
        'The eleven aesthetic metrics and the four group row-ranges (1-5 / 6-9 / 10 / 11)',
        'The figures stated in prose and the method’s arithmetic (627 graphs, 99% variance, robustness criteria)',
      ],
    },
    left: {
      title: 'Not taken',
      items: [
        'The individual correlations in the Figure 1 heatmap — they live only in the figure',
        'The 627-graph dataset and the ZADU / Mooney implementations',
      ],
    },
    added: {
      title: 'Added by this page',
      items: [
        'Three sample graphs and a layout engine that steps toward three goals',
        'Browser implementations of six aesthetics and three faithfulness metrics',
        'The observation that direction can reverse on an individual graph',
      ],
    },
  },
  related: {
    title: 'Pages to pair with',
    focus: 'Focus the lens — turning feature knobs to reshape a projection',
    rulers: 'Different rulers for the same thing — choosing metrics for projections',
  },
};

const ja: LayoutDictionary = {
  title: '配置の二つの顔',
  summary: 'グラフを三つの目標へ押しながら、見やすさと嘘のなさがどう噛み合うかを見る',
  capability: '見本のグラフを三つの目標(忠実に・正方形に・軸に合わせて)へ一歩ずつ押し、美的指標六つと忠実度指標三つが一緒に動くのを見て、論文が示した四つの分類と突き合わせる',
  paperLabel: '根拠論文',
  caveat: '論文はMDSで初期化したKamada-Kawai配置を使い、忠実度はZADU、美的指標はMooneyらの実装で測った。このページはブラウザの中で決定論的に回るものだけを再実装して美的六つと忠実度三つを測り、真値はグラフの最短経路距離とする。11個すべてを測るわけではない。',
  samples: {
    clusters: { name: '三つの塊', hint: '三つの塊が橋でつながったグラフ' },
    grid: { name: '6×6格子', hint: 'すでに軸に沿っているグラフ' },
    tree: { name: '木', hint: '根から枝分かれするグラフ' },
  },
  goals: {
    faithful: { name: '忠実に', what: '最短経路距離と画面距離の差を縮める - 論文のKKと同じ向き' },
    square: { name: '正方形に', what: '配置を正方形の枠に合わせる - 縦横比を良く' },
    orthogonal: { name: '軸に合わせて', what: '辺を縦横に寄せる - 直交性を良く' },
  },
  aesthetics: AES_JA,
  faithfulness: {
    stress: '距離の保存 (1 − ストレス)',
    trustworthiness: '信頼度 (Trustworthiness)',
    continuity: '連続性 (Continuity)',
  },
  groupNames: {
    1: '位相を守る美学',
    2: '近い隣人を守る美学',
    3: '害になる美学',
    4: '無関係な美学',
  },
  stage: {
    title: '配置',
    note: '点はノード、線は辺だ。目標を選んで押すと配置が一歩ずつ動く。',
    stepLine: '{steps}歩',
    run: '押す',
    stop: '止める',
    reset: '最初の配置へ',
    settled: 'これ以上押してもほとんど動かない。',
    keyboard: '押すボタンに焦点を当ててEnterでも開始・停止できる。',
    nodes: 'ノード{nodes}個 · 辺{edges}本',
  },
  gauges: {
    title: '二つの目盛り',
    note: '左の琥珀色は見やすさ、右の青緑は嘘のなさだ。どれも大きいほど良い向きに揃えた - 論文もそうしている。',
    readability: '見やすさ (美的指標)',
    faithfulness: '嘘のなさ (DR品質)',
    notMeasured: 'このページでは測らない指標',
    noCrossing: '交差がなく測れない',
    deltaTitle: '最初の配置からどれだけ動いたか',
    deltaHint: '押す前(0歩)と比べたものだ。',
    up: '上がった',
    down: '下がった',
    same: 'そのまま',
  },
  groups: {
    title: '論文の四つの分かれ目',
    note: '627個のグラフで、美的指標11個が忠実度指標とどんな相関を示すかで分かれた。図1のヒートマップの行順そのままだ。',
    measured: 'ここで測る',
    notMeasured: '測らない',
    findings: [
      '平均相関が最も高いのはガブリエル比・辺(r≈{highR})だが、大きさと密度が変わると揺れて頑健ではない。',
      '辺の交差とガブリエル比・点はMRREと最も高い相関を示す(r≈{mrreR})。',
      '頑健な関係はグループ1が{g1}個、グループ2が{g2}個。交差角はそのうち{ca}個、点の解像度は{nr}個を持つ。',
      '縦横比だけがすべての忠実度指標と負の相関だ - 正方形に無理に合わせると高次元の構造が削られる。',
      '辺の直交性はすべての指標と|r| < {indep}で、構造とは無関係な見た目だけの指標だ。',
    ],
  },
  reveal: {
    title: '直に見たこと',
    body: '今の見本で正方形に押すと、縦横比が{ratioDelta}動く代わりに距離の保存が{stressDelta}動いた。軸に合わせて押すと直交性だけが大きく上がり距離の保存はほぼそのままだ - 論文のグループ3とグループ4が目の前で分かれる。',
    average: 'ただし論文の相関は627個のグラフの平均だ。一つのグラフでは向きが逆になることもある - このページの見本三つでも分かれる。格子では正方形に押すと距離の保存がはっきり削られるが、塊のグラフはすでにほぼ正方形なので、むしろ少し上がる。',
  },
  notes: {
    title: '受け取ったものとそうでないもの',
    took: {
      title: '受け取ったもの',
      items: [
        '美的指標11個と四つのグループの行範囲(1-5 / 6-9 / 10 / 11)',
        '本文が文で示した数値と方法の数え上げ(627個、99%分散、頑健の基準)',
      ],
    },
    left: {
      title: '受け取らなかったもの',
      items: [
        '図1ヒートマップの個々の相関係数 - 図にしかない',
        '627個のグラフのデータとZADU・Mooneyの実装',
      ],
    },
    added: {
      title: 'このページが足したもの',
      items: [
        '見本のグラフ三つと、三つの目標へ一歩ずつ進む配置器',
        '美的六つ・忠実度三つのブラウザ実装(真値は最短経路距離)',
        '個々のグラフでは向きが分かれるという観察',
      ],
    },
  },
  related: {
    title: '併せて見るページ',
    focus: '焦点合わせ - 特徴のつまみで投影を変えてみるページ',
    rulers: '同じものを測る別の物差し - 投影を測る物差し選び',
  },
};

export const layoutDictionary: Record<Locale, LayoutDictionary> = { ko, en, ja };
