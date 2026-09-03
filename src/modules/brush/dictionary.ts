/** 왜곡을 아는 붓 문구 사전 (ko / en / ja). */

import type { Dictionary } from '../../core/i18n';

export type BrushKey =
  | 'title' | 'summary' | 'capability' | 'paper-label' | 'full-text'
  | 'board-title' | 'board-note' | 'board-mine'
  | 'mode-plain' | 'mode-aware' | 'proj-pca' | 'proj-random'
  | 'target-label' | 'cluster-name' | 'reveal-on' | 'reveal-off' | 'clear'
  | 'score-line' | 'score-empty' | 'score-hint'
  | 'legend-target' | 'legend-picked' | 'legend-inner' | 'legend-outer'
  | 'confusion-line' | 'confusion-hard' | 'confusion-easy'
  | 'how-title' | 'how-note'
  | 'how-1' | 'how-1-body' | 'how-2' | 'how-2-body' | 'how-3' | 'how-3-body' | 'how-4' | 'how-4-body'
  | 'lens-note' | 'snn-note'
  | 'study-title' | 'study-note' | 'study-a' | 'study-b' | 'study-c' | 'study-e'
  | 'study-people' | 'study-figure'
  | 'badge-technique' | 'badge-interaction' | 'badge-low' | 'snn-params'
  | 'took-title' | 'took-yes' | 'took-no' | 'took-mine';

export const brushDictionary: Dictionary<BrushKey> = {
  ko: {
    title: '왜곡을 아는 붓',
    summary:
      '높은 차원의 자료를 납작한 그림으로 누르면, 멀리 있던 점들이 화면에서 딱 붙습니다. 그 그림 위에서 무리를 감싸 고르면 남의 무리를 함께 집습니다. 붓이 닿는 자리마다 점을 다시 배치해 이 거짓말을 바로잡는 기법이 있습니다.',
    capability:
      '납작해진 그림 위에서 직접 붓질해 보고, 화면 거리만 보는 붓과 고차원 이웃을 아는 붓이 같은 무리를 얼마나 다르게 집는지 논문의 잣대(F1)로 잰다',
    'paper-label': '바탕이 된 연구',
    'full-text': '전문',

    'board-title': '이 그림에서 노란 무리만 골라 보십시오',
    'board-note':
      '점 180개를 10차원에서 지어 2차원으로 눌렀습니다. 고차원에서는 여섯 무리가 완전히 갈려 있지만, 눌린 그림에서는 일부가 서로를 덮습니다. 끌어서 칠하십시오. 아는 붓을 켜면 붓 주변의 점이 고차원 이웃 관계에 따라 다시 배치됩니다.',
    'board-mine':
      '이 자료는 논문의 것(MNIST)이 아니라 이 페이지가 지은 것입니다. 고차원에서 무리가 갈리고 2차원에서 겹치도록 치수를 실측으로 골랐습니다. 보통 붓도 논문의 견줌 기법 셋이 아니라 화면 거리만 보는 가장 단순한 붓입니다.',
    'mode-plain': '보통 붓',
    'mode-aware': '아는 붓',
    'proj-pca': '주성분 투영',
    'proj-random': '무작위 직교 투영',
    'target-label': '겨눌 무리',
    'cluster-name': '무리 {n}',
    'reveal-on': '정답 색 끄기',
    'reveal-off': '정답 색 보기',
    clear: '지우기',

    'score-line': '정밀도 {p} · 재현율 {r} · F1 {f} — 정답 {truth}개 가운데 {hits}개',
    'score-empty': '아직 아무것도 칠하지 않았습니다.',
    'score-hint':
      '보통 붓으로 겨눈 무리를 끝까지 칠해 본 뒤, 같은 자리를 아는 붓으로 다시 칠해 보십시오. 점수가 달라지는 만큼이 그림이 하던 거짓말입니다.',
    'legend-target': '겨눈 무리',
    'legend-picked': '칠한 점',
    'legend-inner': '안쪽 경계 τ — 고차원의 참 이웃이 들어오는 자리',
    'legend-outer': '바깥 경계 3τ — 화면에서만 이웃이던 점이 밀려나는 자리',

    'confusion-line':
      '이 그림에서 무리 {n}의 화면 이웃 가운데 {percent}%가 실제로는 남의 무리입니다.',
    'confusion-hard': '가장 많이 파묻힌 무리입니다 — 보통 붓이 가장 크게 속습니다.',
    'confusion-easy': '거의 파묻히지 않은 무리입니다 — 어느 붓으로도 잘 집힙니다.',

    'how-title': '붓이 하는 일 네 걸음',
    'how-note':
      '논문 4.1절의 흐름 그대로입니다. 알맹이는 "화면의 2D 영역을 고차원 영역으로 옮기는" 것이 아니라 그 반대 — 고차원의 이웃 관계에 맞게 화면의 점을 옮기는 것입니다.',
    'how-1': '1. 어디서 시작할지 고른다',
    'how-1-body':
      '점의 진하기가 고차원 밀도입니다. 진한 자리가 무리의 한복판이라 붓질을 시작하기 좋습니다.',
    'how-2': '2. 그 자리의 왜곡을 살핀다',
    'how-2-body':
      '붓을 올리면 붓 안에서 밀도가 가장 높은 점을 씨앗으로 잡고, 나머지 점의 진하기가 그 씨앗과의 고차원 가까움으로 바뀝니다. 붓 옆인데 흐린 점이 가짜 이웃, 멀리 있는데 진한 점이 놓친 이웃입니다.',
    'how-3': '3. 점이 다시 배치된다',
    'how-3-body':
      '붓을 멈추면 렌즈가 생기고 점이 옮겨 갑니다. 가까움이 1인 점은 안쪽 경계 안으로, 0인 점은 바깥 경계 밖으로, 그 사이는 고리 안에 가까운 만큼 붙습니다.',
    'how-4': '4. 끌어서 칠한다',
    'how-4-body':
      '누른 채 끌면 붓이 덮은 점이 칠해지고, 칠할 때마다 렌즈와 배치가 다시 계산됩니다. 그래서 어떤 모양의 무리든 따라갈 수 있습니다.',
    'lens-note':
      '렌즈의 치수도 논문 그대로입니다. 안쪽 경계의 반지름은 붓의 반지름 τ와 같고 바깥은 3τ라, 고리의 폭이 붓의 지름과 정확히 같아집니다.',
    'snn-note':
      '가까움은 유클리드 거리가 아니라 공유 최근접 이웃(SNN)으로 잽니다. 차원이 높아지면 거리들이 서로 비슷해져 이웃과 남남을 못 가르기 때문입니다. SNN은 "이웃 목록을 얼마나 나눠 갖는가"를 세므로 그 병에 덜 걸립니다.',

    'study-title': '24명이 낸 결론',
    'study-note':
      '두 실험에 각 12명이 참여해, 네 가지 붓으로 무리를 골랐습니다. 한 사람이 36번씩입니다.',
    'study-a':
      '전체적으로 이 붓이 가장 정확했습니다(기법의 주효과 F(3,33)=36.361, p<.001). 실험 2에서도 같았습니다(F(3,33)=34.51, p<.001).',
    'study-b':
      '알맹이는 상호작용입니다(F(6,66)=7.272, p<.001). 왜곡이 낮은 그림에서는 네 붓 사이에 뜻있는 차이가 없었고(F(3,140)=0.847, p=.470) 모두 평균 0.85를 넘었습니다. 왜곡이 커지자(높은 MN F=20.764, 높은 FN F=19.318, 둘 다 p<.001) 다른 붓들만 무너졌습니다.',
    'study-c':
      '대신 이 붓은 시간을 더 씁니다(F(3,33)=8.557, p<.001). 면접에서 참가자들은 이 붓을 쓸 때 더 집중하고 조심스러워졌다고 답했습니다 — 정확도를 시간과 맞바꾼 셈입니다.',
    'study-e':
      '실험 2에서는 견줌 기법 사이에도 차이가 나왔습니다: 유사도 붓이 나머지 둘보다 뜻있게 낮았습니다(p<.001).',
    'study-people':
      '실험 1은 12명(22~32세, 평균 26.4), 실험 2는 12명(21~30세, 평균 24.6)이며 각 미화 10달러를 받았습니다. 초록의 24명은 이 둘을 합한 수입니다.',
    'study-figure':
      'F1 평균과 소요 시간의 막대값은 그림 5·6에만 있어 가져오지 않았습니다. 위의 검정값은 본문이 숫자로 적은 것뿐입니다.',

    'badge-technique': '기법의 주효과',
    'badge-interaction': '기법 × 왜곡의 상호작용',
    'badge-low': '왜곡이 낮을 때는 차이 없음',
    'snn-params': 'k = √{n} = {k}, {dims}차원 자료입니다.',
    'took-title': '논문에서 무엇을 가져왔는가',
    'took-yes':
      '가져온 것: 4.1절의 정의 전부(SNN 유사도, 고차원 밀도, 씨앗 점, 고차원 가까움, 렌즈 치수 τ·3τ, 재배치 규칙), 왜곡을 만드는 무작위 직교 투영, 채점 잣대 F1, 5장 두 실험의 설계와 본문의 검정값.',
    'took-no':
      '가져오지 않은 것: 그림 5·6의 막대값, MNIST 자료와 t-SNE 자극, 견줌 기법 셋의 구현, 보로노이 균일화와 볼록 껍질 경계.',
    'took-mine':
      '제가 더한 것: 견본 자료(치수는 실측으로 골랐습니다)와 화면 거리만 보는 보통 붓, 그리고 무리마다 얼마나 파묻혔는지의 셈. 여기서 나온 점수는 논문의 표와 견줄 수 없습니다.',
  },

  en: {
    title: 'The Brush That Knows',
    summary:
      'Flatten high-dimensional data into a picture and points that were far apart land right on top of each other. Lasso a clump there and you scoop up strangers. There is a technique that fixes this lie by rearranging points wherever the brush touches.',
    capability:
      'Brush on a flattened picture yourself and measure, with the paper’s own yardstick (F1), how differently a screen-distance brush and a brush that knows the high-dimensional neighbours pick the same cluster',
    'paper-label': 'The study behind this page',
    'full-text': 'Full text',

    'board-title': 'Pick out only the highlighted cluster',
    'board-note':
      '180 points were built in 10 dimensions and flattened to two. In the high-dimensional space the six clusters are fully separate; in the flattened picture some cover each other. Drag to paint. Switch the aware brush on and points near the brush rearrange by their high-dimensional neighbourhood.',
    'board-mine':
      'This data is not the paper’s (MNIST) but this page’s own; its dimensions were chosen by measurement so that clusters separate in high dimensions and overlap in two. The plain brush is not one of the paper’s three baselines either — it is the simplest brush, seeing only screen distance.',
    'mode-plain': 'Plain brush',
    'mode-aware': 'Aware brush',
    'proj-pca': 'Principal components',
    'proj-random': 'Random orthogonal',
    'target-label': 'Cluster to pick',
    'cluster-name': 'Cluster {n}',
    'reveal-on': 'Hide true colours',
    'reveal-off': 'Show true colours',
    clear: 'Clear',

    'score-line': 'Precision {p} · Recall {r} · F1 {f} — {hits} of {truth}',
    'score-empty': 'Nothing painted yet.',
    'score-hint':
      'Paint the target cluster to the end with the plain brush, then paint the same place again with the aware brush. However much the score moves is how much the picture was lying.',
    'legend-target': 'target cluster',
    'legend-picked': 'painted',
    'legend-inner': 'inner boundary τ — where true high-dimensional neighbours come in',
    'legend-outer': 'outer boundary 3τ — where screen-only neighbours are pushed out',

    'confusion-line': 'In this picture, {percent}% of cluster {n}’s on-screen neighbours actually belong to another cluster.',
    'confusion-hard': 'The most buried cluster — where the plain brush is fooled worst.',
    'confusion-easy': 'Barely buried at all — any brush picks it cleanly.',

    'how-title': 'What the brush does, in four steps',
    'how-note':
      'The flow of Section 4.1, unchanged. The trick is not converting a 2D region into a high-dimensional one but the opposite — moving the points on screen to match the high-dimensional neighbourhood.',
    'how-1': '1. Choose where to start',
    'how-1-body':
      'A point’s darkness is its high-dimensional density. Dark places are the core of a cluster and make good starting points.',
    'how-2': '2. Inspect the distortion there',
    'how-2-body':
      'Hover the brush and the densest point under it becomes the seed; every other point’s darkness switches to its high-dimensional closeness to that seed. A pale point right beside the brush is a false neighbour; a dark point far away is a missing one.',
    'how-3': '3. The points rearrange',
    'how-3-body':
      'Pause and a lens appears and points move. Closeness 1 goes inside the inner boundary, 0 gets pushed past the outer boundary, and everything between sits in the ring, closer in the closer it is.',
    'how-4': '4. Drag to paint',
    'how-4-body':
      'Hold and drag, and points under the brush are painted; each stroke recomputes the lens and the arrangement. That is how a cluster of any shape can be followed.',
    'lens-note':
      'The lens dimensions are the paper’s too: the inner radius equals the brush radius τ and the outer is 3τ, making the ring exactly as wide as the brush’s diameter.',
    'snn-note':
      'Closeness is measured with shared nearest neighbours (SNN), not Euclidean distance. In high dimensions distances all look alike and stop separating neighbours from strangers; SNN counts how much two points share a neighbour list, so it suffers less.',

    'study-title': 'What 24 people concluded',
    'study-note': 'Twelve people in each of two studies picked clusters with four brushes, 36 trials each.',
    'study-a':
      'Overall this brush was the most accurate (main effect of technique F(3,33)=36.361, p<.001), and the same held in Study 2 (F(3,33)=34.51, p<.001).',
    'study-b':
      'The heart of it is the interaction (F(6,66)=7.272, p<.001). On low-distortion pictures the four brushes did not differ significantly (F(3,140)=0.847, p=.470), all averaging above 0.85. As distortion rose (high MN F=20.764, high FN F=19.318, both p<.001) only the other brushes collapsed.',
    'study-c':
      'In exchange this brush takes longer (F(3,33)=8.557, p<.001). In interviews participants said they concentrated harder and grew more careful with it — accuracy traded for time.',
    'study-e':
      'Study 2 also separated the baselines: similarity brushing scored significantly lower than the other two (p<.001).',
    'study-people':
      'Study 1 had 12 participants (aged 22–32, mean 26.4), Study 2 another 12 (21–30, mean 24.6), each paid the equivalent of US$10. The abstract’s 24 is the two studies combined.',
    'study-figure':
      'Mean F1 and completion-time bars live only in Figures 5 and 6 and were not carried. The test statistics above are only those the text prints as numbers.',

    'badge-technique': 'main effect of technique',
    'badge-interaction': 'technique × distortion',
    'badge-low': 'no difference when distortion is low',
    'snn-params': 'k = √{n} = {k}, on {dims}-dimensional data.',
    'took-title': 'What was taken from the paper',
    'took-yes':
      'Taken: every definition in Section 4.1 (SNN similarity, high-dimensional density, seed points, closeness, the τ and 3τ lens, the relocation rule), the random orthogonal projection that manufactures distortion, the F1 yardstick, and both studies’ design with the text’s test statistics.',
    'took-no':
      'Not taken: the bar values of Figures 5 and 6, the MNIST data and t-SNE stimuli, implementations of the three baseline brushes, the Voronoi uniformisation and convex-hull boundary.',
    'took-mine':
      'Added by me: the sample data (dimensions chosen by measurement), the plain brush that sees only screen distance, and the per-cluster burial count. Scores from this board cannot be compared with the paper’s tables.',
  },

  ja: {
    title: '歪みを知る筆',
    summary:
      '高い次元のデータを平たい絵に押しつぶすと、遠かった点が画面でぴったりくっつきます。その絵の上で群れを囲んで選べば、よその群れまで拾ってしまいます。筆が触れる場所ごとに点を並べ替えて、この嘘を正す技法があります。',
    capability:
      '平たくなった絵の上で自分で筆を動かし、画面の距離だけを見る筆と高次元の隣人を知る筆が同じ群れをどれほど違って拾うかを論文の物差し(F1)で測る',
    'paper-label': 'もとになった研究',
    'full-text': '全文',

    'board-title': 'この絵から狙った群れだけを選び出してください',
    'board-note':
      '点180個を10次元で作り2次元に押しました。高次元では六つの群れが完全に分かれていますが、押した絵では一部が互いを覆います。ドラッグして塗ってください。分かる筆をつけると、筆の周りの点が高次元の隣人関係に従って並べ替えられます。',
    'board-mine':
      'このデータは論文のもの(MNIST)ではなくこのページが作ったものです。高次元で群れが分かれ2次元で重なるよう、寸法を実測で選びました。普通の筆も論文の比較用の三つではなく、画面の距離だけを見る最も単純な筆です。',
    'mode-plain': '普通の筆',
    'mode-aware': '分かる筆',
    'proj-pca': '主成分投影',
    'proj-random': 'ランダム直交投影',
    'target-label': '狙う群れ',
    'cluster-name': '群れ {n}',
    'reveal-on': '正解の色を消す',
    'reveal-off': '正解の色を見る',
    clear: '消す',

    'score-line': '適合率 {p} · 再現率 {r} · F1 {f} — 正解{truth}個のうち{hits}個',
    'score-empty': 'まだ何も塗っていません。',
    'score-hint':
      '普通の筆で狙った群れを最後まで塗ってから、同じ場所を分かる筆で塗り直してください。点数が動いた分だけ絵が嘘をついていたのです。',
    'legend-target': '狙う群れ',
    'legend-picked': '塗った点',
    'legend-inner': '内側の境界 τ — 高次元の真の隣人が入ってくる場所',
    'legend-outer': '外側の境界 3τ — 画面でだけ隣人だった点が押し出される場所',

    'confusion-line': 'この絵で群れ{n}の画面上の隣人のうち{percent}%は実際にはよその群れです。',
    'confusion-hard': '最も埋もれた群れです — 普通の筆が最も大きく騙されます。',
    'confusion-easy': 'ほとんど埋もれていない群れです — どの筆でもきれいに拾えます。',

    'how-title': '筆がすること、四つの歩み',
    'how-note':
      '論文4.1節の流れそのままです。要は画面の2D領域を高次元領域に移すのではなく、その逆 — 高次元の隣人関係に合わせて画面の点を動かすことです。',
    'how-1': '1. どこから始めるか選ぶ',
    'how-1-body': '点の濃さが高次元の密度です。濃い場所が群れの中心で、筆を始めるのに良い場所です。',
    'how-2': '2. その場所の歪みを調べる',
    'how-2-body':
      '筆を載せると、筆の中で密度が最も高い点が種になり、他の点の濃さがその種との高次元の近さに変わります。筆のすぐ隣なのに薄い点が偽の隣人、遠いのに濃い点が見落とされた隣人です。',
    'how-3': '3. 点が並べ替わる',
    'how-3-body':
      '筆を止めるとレンズができて点が動きます。近さ1の点は内側の境界の中へ、0の点は外側の境界の外へ、その間は輪の中に近いぶんだけ寄ります。',
    'how-4': '4. ドラッグして塗る',
    'how-4-body':
      '押したままドラッグすると筆が覆う点が塗られ、塗るたびにレンズと配置が計算し直されます。だからどんな形の群れでも追えます。',
    'lens-note':
      'レンズの寸法も論文どおりです。内側の境界の半径は筆の半径τと同じで外側は3τ、輪の幅が筆の直径とちょうど同じになります。',
    'snn-note':
      '近さはユークリッド距離ではなく共有最近傍(SNN)で測ります。次元が高くなると距離が互いに似てきて隣人とよそ者を分けられなくなるからです。SNNは「隣人リストをどれだけ分け合うか」を数えるので、その病にかかりにくいのです。',

    'study-title': '24人が出した結論',
    'study-note': '二つの実験に各12人が参加し、四つの筆で群れを選びました。一人あたり36回です。',
    'study-a':
      '全体としてこの筆が最も正確でした(技法の主効果 F(3,33)=36.361、p<.001)。実験2でも同じでした(F(3,33)=34.51、p<.001)。',
    'study-b':
      '要は交互作用です(F(6,66)=7.272、p<.001)。歪みの少ない絵では四つの筆に有意差がなく(F(3,140)=0.847、p=.470)すべて平均0.85を超えました。歪みが大きくなると(高MN F=20.764、高FN F=19.318、ともにp<.001)他の筆だけが崩れました。',
    'study-c':
      '代わりにこの筆は時間を多く使います(F(3,33)=8.557、p<.001)。面接で参加者は、この筆を使うときより集中し慎重になったと答えました — 正確さを時間と引き換えたのです。',
    'study-e':
      '実験2では比較用の筆の間にも差が出ました。類似度筆が他の二つより有意に低かったのです(p<.001)。',
    'study-people':
      '実験1は12人(22〜32歳、平均26.4)、実験2は12人(21〜30歳、平均24.6)で、各10米ドル相当を受け取りました。抄録の24人はこの二つを合わせた数です。',
    'study-figure':
      'F1平均と所要時間の棒の値は図5・6にしかなく、持ってきていません。上の検定値は本文が数字で書いたものだけです。',

    'badge-technique': '技法の主効果',
    'badge-interaction': '技法 × 歪みの交互作用',
    'badge-low': '歪みが低いときは差がない',
    'snn-params': 'k = √{n} = {k}、{dims}次元のデータです。',
    'took-title': '論文から何を取ったか',
    'took-yes':
      '取ったもの: 4.1節の定義すべて(SNN類似度、高次元密度、種の点、高次元の近さ、レンズの寸法τ・3τ、並べ替えの規則)、歪みを作るランダム直交投影、採点の物差しF1、5章の二つの実験の設計と本文の検定値。',
    'took-no':
      '取らなかったもの: 図5・6の棒の値、MNISTデータとt-SNE刺激、比較用の三つの筆の実装、ボロノイ均一化と凸包の境界。',
    'took-mine':
      '私が足したもの: 見本データ(寸法は実測で選びました)と画面の距離だけを見る普通の筆、そして群れごとにどれだけ埋もれているかの数。この盤の点数は論文の表とは比べられません。',
  },
};
