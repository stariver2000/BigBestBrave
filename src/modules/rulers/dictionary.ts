/** 지표 비교 문구 사전 (ko / en / ja). */

import type { Dictionary } from '../../core/i18n';

export type RulersKey =
  | 'title' | 'summary' | 'capability' | 'paper-label'
  | 'controls-title' | 'controls-note'
  | 'dataset' | 'population' | 'neighbors' | 'clusters' | 'elapsed' | 'suggested'
  | 'data-blobs' | 'data-moons' | 'data-hypercube' | 'data-manifold'
  | 'data-blobs-note' | 'data-moons-note' | 'data-hypercube-note' | 'data-manifold-note'
  | 'strip-title' | 'strip-note'
  | 'heat-title' | 'heat-note' | 'heat-legend-pos' | 'heat-legend-neg'
  | 'family-local' | 'family-cluster' | 'family-global'
  | 'm-trustworthiness' | 'm-continuity' | 'm-mrre' | 'm-neighbor-overlap'
  | 'm-label-trustworthiness' | 'm-distance-consistency' | 'm-silhouette'
  | 'm-stress' | 'm-kl-divergence'
  | 'w-trustworthiness' | 'w-continuity' | 'w-mrre' | 'w-neighbor-overlap'
  | 'w-label-trustworthiness' | 'w-distance-consistency' | 'w-silhouette'
  | 'w-stress' | 'w-kl-divergence'
  | 'clusters-title' | 'clusters-note' | 'representative' | 'cohesion' | 'recommended'
  | 'twins-title' | 'twins-note' | 'twins-cross' | 'twins-same' | 'twins-empty'
  | 'opposites-title' | 'opposites-note' | 'opposites-empty'
  | 'took-title' | 'took-yes' | 'took-no';

export const rulersDictionary: Dictionary<RulersKey> = {
  ko: {
    title: '같은 것을 재는 다른 자들',
    summary:
      '산점도 여러 장을 아홉 개 지표로 채점한 뒤, 지표들끼리 얼마나 같이 움직이는지 잽니다. 설계가 다른 자들이 같은 것을 재고 있는지 직접 보실 수 있습니다.',
    capability:
      '평가 지표들의 경험적 상관을 재어 닮은 것끼리 묶고, 무리마다 대표 하나를 세워 겹치지 않는 최소 묶음을 낸다',
    'paper-label': '바탕이 된 연구',

    'controls-title': '실험 설정',
    'controls-note':
      '자료를 바꾸면 지표들의 사이가 통째로 달라집니다. 쉬운 자료에서는 모두가 사이좋게 굴고, 어려운 자료에서 갈립니다.',
    dataset: '자료',
    population: '산점도 장수',
    neighbors: '이웃 수 k',
    clusters: '무리 수',
    elapsed: '계산 시간',
    suggested: '팔꿈치 제안',
    'data-blobs': '흩어진 덩어리',
    'data-moons': '얽힌 초승달',
    'data-hypercube': '초입방체 꼭짓점',
    'data-manifold': '말린 띠',
    'data-blobs-note': '무리가 뚜렷해 어떤 자로 재도 답이 비슷하게 나오는 순한 자료.',
    'data-moons-note': '서로 얽혀 직선으로 갈라지지 않는 자료. 군집 지표와 전역 지표가 가장 크게 엇갈립니다.',
    'data-hypercube-note': '어느 두 축을 골라도 그럴듯해 보이는 함정 자료.',
    'data-manifold-note': '띠를 따라가면 이웃이지만 곧게 재면 건너편이 더 가까운 자료.',

    'strip-title': '채점 대상',
    'strip-note':
      '이런 그림들을 여러 장 만들어 아홉 개 자로 각각 채점했습니다. 일부러 서로 다른 방식으로 망가뜨립니다. 잘 그린 그림만 모으면 모든 지표가 다 같이 높은 점수를 주어 비교가 되지 않습니다.',

    'heat-title': '지표끼리의 상관',
    'heat-note':
      '두 지표가 산점도들을 같은 순서로 줄 세우면 1, 정반대로 세우면 -1입니다. 값이 아니라 순위를 견주는 이유는, 지표마다 점수의 분포 모양이 달라 값끼리는 비교할 수 없기 때문입니다. 행과 열은 묶인 순서대로 놓았으므로 덩어리가 보이면 그것이 무리입니다.',
    'heat-legend-pos': '같이 움직임',
    'heat-legend-neg': '반대로 움직임',

    'family-local': '국소',
    'family-cluster': '군집',
    'family-global': '전역',

    'm-trustworthiness': '신뢰도',
    'm-continuity': '연속성',
    'm-mrre': '순위 밀림',
    'm-neighbor-overlap': '이웃 겹침',
    'm-label-trustworthiness': '라벨 신뢰도',
    'm-distance-consistency': '거리 일관성',
    'm-silhouette': '실루엣',
    'm-stress': '스트레스',
    'm-kl-divergence': 'KL 발산',

    'w-trustworthiness': '가까이 보이는데 원래는 멀었던 이웃을 벌합니다.',
    'w-continuity': '원래는 가까웠는데 그림에서 밀려난 이웃을 벌합니다.',
    'w-mrre': '이웃의 순위가 몇 칸 밀렸는지 셉니다. 가까운 이웃일수록 크게 벌합니다.',
    'w-neighbor-overlap': '순위는 보지 않고 이웃 명단이 얼마나 같은지만 봅니다.',
    'w-label-trustworthiness': '그림에서의 이웃 중 나와 같은 무리의 비율을 봅니다.',
    'w-distance-consistency': '자기 무리의 무게중심이 가장 가까운 점의 비율을 봅니다.',
    'w-silhouette': '무리 안의 거리와 남의 무리까지의 거리를 견줍니다.',
    'w-stress': '모든 점쌍의 길이가 얼마나 어긋났는지 봅니다. 작을수록 좋습니다.',
    'w-kl-divergence': '이웃일 확률의 분포가 얼마나 다른지 봅니다. 작을수록 좋습니다.',

    'clusters-title': '묶고 대표 세우기',
    'clusters-note':
      '1에서 상관을 뺀 값을 거리로 삼아 평균 연결로 묶었습니다. 무리마다 다른 것들과 가장 닮은 지표가 대표입니다. 대표만 골라 쓰면 같은 것을 두 번 재는 일이 없습니다.',
    representative: '대표',
    cohesion: '무리 안 평균 상관',
    recommended: '이만큼만 쓰면 됩니다',

    'twins-title': '설계는 다른데 답이 같은 자들',
    'twins-note':
      '상관이 0.9를 넘는 쌍입니다. 갈래 표시가 붙은 것은 설계 의도가 서로 다른데도 실제로는 같이 움직이는 쌍입니다. 이 둘을 함께 쓰면 평가가 그쪽으로 기웁니다.',
    'twins-cross': '갈래가 다름',
    'twins-same': '같은 갈래',
    'twins-empty': '이 설정에서는 0.9를 넘는 쌍이 없습니다. 지표들이 서로 다른 것을 재고 있다는 뜻입니다.',
    'opposites-title': '서로 반대로 도는 자들',
    'opposites-note':
      '한쪽이 오르면 다른 쪽이 내리는 쌍입니다. 겹치는 쌍만큼이나 문제입니다 — 하나를 알면 다른 하나를 알 수 있으니 서로 다른 증거가 아니고, 두 지표를 나란히 보고할 때 어느 쪽을 앞에 두느냐가 결론을 바꿉니다. 묶을 때는 이런 쌍을 한 무리에 넣지 않습니다. 대표 하나가 다른 하나를 대신할 수 없기 때문입니다.',
    'opposites-empty': '이 설정에서는 크게 반대로 도는 쌍이 없습니다.',

    'took-title': '연구에서 가져온 것과 가져오지 않은 것',
    'took-yes':
      '가져온 것 — 절차 셋을 그대로 따랐습니다. 스피어만 순위 상관으로 지표 사이를 재고, 1에서 상관을 뺀 거리로 평균 연결 계층 군집화를 하고, 무리마다 가장 닮은 것을 대표로 세웁니다. 결론의 모양도 같습니다: 설계 갈래는 실제 행동을 예측하지 못합니다.',
    'took-no':
      '가져오지 않은 것 — 논문의 지표 목록과 96개 자료집, 40가지 차원 축소 기법, 그리고 무리 수를 고르는 Kneedle 알고리즘. 여기서는 브라우저 안에서 결정론적으로 돌아가는 것만 씁니다. 그래서 이 화면의 숫자는 논문의 숫자와 견줄 수 없습니다. 견줄 수 있는 것은 결론의 모양뿐입니다.',
  },

  en: {
    title: 'Different rulers, same measurement',
    summary:
      'Score a crowd of scatterplots with nine metrics, then measure how much the metrics move together. See for yourself whether rulers designed for different things are measuring the same thing.',
    capability:
      'measures the empirical correlation between evaluation metrics, clusters the ones that behave alike, and names one representative per cluster so nothing is measured twice',
    'paper-label': 'Based on',

    'controls-title': 'Setup',
    'controls-note':
      'Change the data and the relationships between metrics change wholesale. On easy data everyone agrees; the disagreements appear on hard data.',
    dataset: 'Data',
    population: 'Scatterplots',
    neighbors: 'Neighbours k',
    clusters: 'Clusters',
    elapsed: 'Computed in',
    suggested: 'Elbow suggests',
    'data-blobs': 'Separated blobs',
    'data-moons': 'Interlocking moons',
    'data-hypercube': 'Hypercube corners',
    'data-manifold': 'Rolled ribbon',
    'data-blobs-note': 'Clear groups, so most rulers give similar answers. The gentle case.',
    'data-moons-note': 'Tangled and not linearly separable. Cluster metrics and global metrics diverge most here.',
    'data-hypercube-note': 'A trap: any pair of axes produces a plausible-looking picture.',
    'data-manifold-note': 'Along the ribbon you are neighbours; measured straight, the far side is closer.',

    'strip-title': 'What is being scored',
    'strip-note':
      'Plots like these are generated and scored by all nine rulers. They are deliberately broken in different ways — a crowd of good plots would earn high marks from every metric and tell you nothing.',

    'heat-title': 'How the metrics correlate',
    'heat-note':
      'Two metrics that rank the scatterplots identically score 1; exact opposites score -1. Ranks are compared rather than values because each metric has its own distribution shape. Rows and columns follow the clustering order, so any block you see is a cluster.',
    'heat-legend-pos': 'move together',
    'heat-legend-neg': 'move apart',

    'family-local': 'local',
    'family-cluster': 'cluster',
    'family-global': 'global',

    'm-trustworthiness': 'Trustworthiness',
    'm-continuity': 'Continuity',
    'm-mrre': 'Rank error',
    'm-neighbor-overlap': 'Neighbour overlap',
    'm-label-trustworthiness': 'Label trustworthiness',
    'm-distance-consistency': 'Distance consistency',
    'm-silhouette': 'Silhouette',
    'm-stress': 'Stress',
    'm-kl-divergence': 'KL divergence',

    'w-trustworthiness': 'Penalises neighbours that look close but were far apart.',
    'w-continuity': 'Penalises neighbours that were close but got pushed away.',
    'w-mrre': 'Counts how many places a neighbour slipped, weighting the nearest most.',
    'w-neighbor-overlap': 'Ignores order; asks only how much the two neighbour lists share.',
    'w-label-trustworthiness': 'Asks what share of your plotted neighbours carry your own label.',
    'w-distance-consistency': 'Asks whether your own group centroid is the nearest one.',
    'w-silhouette': 'Compares distance within your group against distance to the nearest other group.',
    'w-stress': 'Asks how far every pairwise length is off. Lower is better.',
    'w-kl-divergence': 'Asks how different the neighbour probability distributions are. Lower is better.',

    'clusters-title': 'Clustering, and one representative each',
    'clusters-note':
      'One minus the correlation is the distance, joined by average linkage. The representative is the metric most like the rest of its cluster. Use only the representatives and nothing gets measured twice.',
    representative: 'representative',
    cohesion: 'mean correlation inside',
    recommended: 'This set is enough',

    'twins-title': 'Designed apart, answering alike',
    'twins-note':
      'Pairs correlating above 0.9. The tagged ones were designed for different things yet move together anyway. Using both tilts an evaluation toward whatever they share.',
    'twins-cross': 'different families',
    'twins-same': 'same family',
    'twins-empty': 'No pair exceeds 0.9 here — the metrics really are measuring different things.',
    'opposites-title': 'Rulers that turn against each other',
    'opposites-note':
      'Pairs where one rising means the other falling. Just as much of a problem as overlap — knowing one tells you the other, so they are not two pieces of evidence, and which of the two you report first changes the conclusion. Clustering keeps such pairs apart, because one cannot stand in for the other.',
    'opposites-empty': 'No strongly opposed pair at this setting.',

    'took-title': 'What this page took from the paper, and what it left',
    'took-yes':
      'Taken — all three steps: Spearman rank correlation between metrics, average-linkage hierarchical clustering on one-minus-correlation, and the most-similar member as each cluster representative. The shape of the conclusion is the same too: design family does not predict behaviour.',
    'took-no':
      'Left — the paper’s metric list and its 96 datasets, its 40 DR techniques, and the Kneedle algorithm for choosing the cluster count. This page runs only what a browser can compute deterministically, so its numbers cannot be compared with the paper’s. Only the shape of the conclusion can.',
  },

  ja: {
    title: '違う物差し、同じ答え',
    summary:
      '散布図をたくさん作って九つの指標で採点し、指標どうしがどれだけ一緒に動くかを測ります。設計の違う物差しが同じものを測っていないか、ご自身で確かめられます。',
    capability:
      '評価指標どうしの経験的な相関を測り、似た振る舞いのものをまとめ、群ごとに代表を一つ立てて重複のない最小の組を出す',
    'paper-label': '下敷きにした研究',

    'controls-title': '実験の設定',
    'controls-note':
      'データを変えると指標どうしの関係がまるごと変わります。易しいデータでは皆が仲良く、難しいデータで分かれます。',
    dataset: 'データ',
    population: '散布図の枚数',
    neighbors: '近傍数 k',
    clusters: '群の数',
    elapsed: '計算時間',
    suggested: '肘の目安',
    'data-blobs': '離れた塊',
    'data-moons': '絡んだ三日月',
    'data-hypercube': '超立方体の頂点',
    'data-manifold': '巻いた帯',
    'data-blobs-note': '群がはっきりしていて、どの物差しでも似た答えになる穏やかな例。',
    'data-moons-note': '絡み合って直線では分けられません。群指標と大域指標が最も食い違います。',
    'data-hypercube-note': 'どの二軸を選んでもそれらしく見える罠のデータ。',
    'data-manifold-note': '帯に沿えば隣なのに、まっすぐ測れば向こう岸のほうが近いデータ。',

    'strip-title': '採点されるもの',
    'strip-note':
      'こうした図を何枚も作り、九つの物差しで別々に採点します。わざと違うやり方で壊しています。良い図ばかり集めるとすべての指標が高得点を出し、比較になりません。',

    'heat-title': '指標どうしの相関',
    'heat-note':
      '二つの指標が散布図を同じ順に並べれば 1、正反対なら -1 です。値ではなく順位を比べるのは、指標ごとに得点の分布の形が違うからです。行と列はまとめた順に並べてあるので、塊が見えればそれが群です。',
    'heat-legend-pos': '一緒に動く',
    'heat-legend-neg': '逆に動く',

    'family-local': '局所',
    'family-cluster': '群',
    'family-global': '大域',

    'm-trustworthiness': '信頼度',
    'm-continuity': '連続性',
    'm-mrre': '順位ずれ',
    'm-neighbor-overlap': '近傍の重なり',
    'm-label-trustworthiness': 'ラベル信頼度',
    'm-distance-consistency': '距離一貫性',
    'm-silhouette': 'シルエット',
    'm-stress': 'ストレス',
    'm-kl-divergence': 'KLダイバージェンス',

    'w-trustworthiness': '近く見えるのに元は遠かった近傍を罰します。',
    'w-continuity': '元は近かったのに図で押しやられた近傍を罰します。',
    'w-mrre': '近傍の順位が何段ずれたかを数え、近いものほど重く罰します。',
    'w-neighbor-overlap': '順位は見ず、近傍の顔ぶれがどれだけ同じかだけを見ます。',
    'w-label-trustworthiness': '図の上の近傍のうち、自分と同じラベルの割合を見ます。',
    'w-distance-consistency': '自分の群の重心が最も近いかどうかを見ます。',
    'w-silhouette': '群の中の距離と、最も近い他の群までの距離を比べます。',
    'w-stress': 'すべての点対の長さがどれだけ狂ったかを見ます。小さいほど良いです。',
    'w-kl-divergence': '近傍である確率の分布がどれだけ違うかを見ます。小さいほど良いです。',

    'clusters-title': 'まとめて、代表を一つずつ',
    'clusters-note':
      '1 から相関を引いた値を距離とし、平均連結でまとめました。群の中で他と最も似た指標が代表です。代表だけを使えば同じものを二度測ることがありません。',
    representative: '代表',
    cohesion: '群内の平均相関',
    recommended: 'これだけで足ります',

    'twins-title': '設計は違うのに答えが同じ物差し',
    'twins-note':
      '相関が 0.9 を超えた組です。印の付いたものは設計の意図が違うのに実際には一緒に動く組です。両方を使うと評価がそちらに傾きます。',
    'twins-cross': '系統が違う',
    'twins-same': '同じ系統',
    'twins-empty': 'この設定では 0.9 を超える組はありません。指標が本当に別のものを測っているということです。',
    'opposites-title': '互いに逆を向く物差し',
    'opposites-note':
      '片方が上がれば片方が下がる組です。重なりと同じくらい厄介です — 一方が分かればもう一方も分かるので別々の証拠ではなく、どちらを先に報告するかで結論が変わります。まとめるときはこうした組を同じ群に入れません。代表が代わりを務められないからです。',
    'opposites-empty': 'この設定では大きく逆を向く組はありません。',

    'took-title': '研究から取ったものと、取らなかったもの',
    'took-yes':
      '取ったもの — 手順の三つすべて。指標間のスピアマン順位相関、1 から相関を引いた距離での平均連結階層クラスタリング、群内で最も似たものを代表に立てること。結論の形も同じです — 設計の系統は振る舞いを予測しません。',
    'took-no':
      '取らなかったもの — 論文の指標一覧と96のデータ集合、40の次元削減手法、そして群の数を決める Kneedle アルゴリズム。このページはブラウザで決定論的に動くものだけを使います。ですからここの数値は論文の数値と比べられません。比べられるのは結論の形だけです。',
  },
};
