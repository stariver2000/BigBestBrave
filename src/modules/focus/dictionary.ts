/**
 * 초점 맞추기 페이지의 세 언어 사전.
 *
 * 두 시각 의미의 이름은 논문 용어(영문)를 함께 적는다. 잣대의 정본이 영문이라
 * 옮긴 이름만 두면 논문과 맞대 볼 수 없기 때문이다.
 * 숫자는 {자리}를 두고 화면 쪽에서 코어 값으로 채운다.
 */

import type { Locale } from '../../core/i18n';
import type { GroupId, QueryId } from '../../core/featurespace';

export interface FocusDictionary {
  title: string;
  summary: string;
  capability: string;
  paperLabel: string;
  caveat: string;
  groups: Record<GroupId, string>;
  features: Record<string, { name: string; hint: string }>;
  queries: Record<QueryId, { name: string; what: string }>;
  scatter: {
    title: string;
    note: string;
    clusteredness: string;
    overlap: string;
    clusterednessHint: string;
    overlapHint: string;
    kLabel: string;
    boundNote: string;
    empty: string;
  };
  knobs: {
    title: string;
    note: string;
    reset: string;
    allOff: string;
    onlyThis: string;
    weightLabel: string;
    keyboard: string;
  };
  query: {
    title: string;
    note: string;
    run: string;
    stop: string;
    again: string;
    stepLine: string;
    settled: string;
    needGroups: string;
    movedTitle: string;
    movedLine: string;
    nothingMoved: string;
    handOver: string;
    iterationNote: string;
  };
  study: {
    title: string;
    model: string;
    accuracy: string;
    people: string;
    insights: string;
    followed: string;
    kinds: Record<string, string>;
  };
  notes: {
    title: string;
    took: { title: string; items: string[] };
    left: { title: string; items: string[] };
    added: { title: string; items: string[] };
  };
  related: { title: string; distance: string; projection: string };
}

const ko: FocusDictionary = {
  title: '초점 맞추기',
  summary: '특징 손잡이를 돌려 무리가 갈리는 순간을 찾고, 무엇이 그 무리를 만들었는지 본다',
  capability: '여덟 특징의 가중치를 직접 돌려 투영이 다시 그려지는 것을 보고, 세 가지 부탁(무리 찾기·합치기·가르기)을 걸면 탐색이 한 걸음씩 스스로 돌아 손잡이 조합을 찾아 준다. 논문의 두 잣대(또렷함·섞임)가 걸음마다 갱신된다',
  paperLabel: '근거 논문',
  caveat: '논문은 UMAP과 그것을 흉내 낸 신경망을 썼다. 브라우저 안에서 결정론적으로 돌릴 수 없어, 이 페이지는 늘 같은 그림을 주는 가중 주성분 투영을 쓴다. 굽은 구조는 못 잡지만 두 잣대와 세 부탁은 투영 방법과 무관하게 성립한다.',
  groups: { work: '작업용', talk: '수다용', takeout: '포장 위주' },
  features: {
    noise: { name: '소음', hint: '얼마나 시끄러운가' },
    seats: { name: '좌석', hint: '앉을 자리가 얼마나 많은가' },
    wifi: { name: '와이파이', hint: '인터넷이 얼마나 빠른가' },
    hours: { name: '영업시간', hint: '얼마나 늦게까지 여는가' },
    price: { name: '가격', hint: '한 잔 값이 얼마인가' },
    dessert: { name: '디저트', hint: '곁들일 것이 얼마나 많은가' },
    window: { name: '창가', hint: '창가 자리가 얼마나 되는가' },
    roast: { name: '로스팅', hint: '얼마나 진하게 볶는가' },
  },
  queries: {
    findClusters: { name: '무리 찾기', what: '또렷함을 가장 크게 만드는 손잡이 조합을 찾는다' },
    mergeGroups: { name: '무리 합치기', what: '섞임을 가장 크게 만든다 - 세 무리가 겹쳐 보이는 자리를 찾는다' },
    separateGroups: { name: '무리 가르기', what: '섞임을 가장 작게 만든다 - 세 무리가 갈라서는 자리를 찾는다' },
  },
  scatter: {
    title: '지금의 그림',
    note: '점 하나가 카페 한 곳이다. 색은 실제로 어느 무리에 속하는지를 말하고, 자리는 지금 손잡이가 만든 것이다.',
    clusteredness: '또렷함 (Clusteredness)',
    overlap: '섞임 (Overlap)',
    clusterednessHint: 'k-means로 {k}무리를 나눈 뒤 Calinski-Harabasz 지수를 잰 값. 클수록 무리가 또렷하다.',
    overlapHint: '20×20 격자의 칸마다 무리 분포의 엔트로피를 재어 모두 더한 값. 클수록 무리가 국소적으로 섞여 있다.',
    kLabel: '무리 수 k',
    boundNote: '논문은 칸 엔트로피가 "0에서 1"이라 적었는데, 무리가 셋이면 상한이 log₂3 = {bound}다. 고치지 않고 그대로 두고 여기 적는다.',
    empty: '손잡이를 모두 0으로 두면 잴 것이 없어 점이 한가운데로 모인다.',
  },
  knobs: {
    title: '특징 손잡이',
    note: '손잡이를 돌리면 그림이 곧바로 다시 그려진다. 0으로 두면 그 특징을 아예 빼고 그린다.',
    reset: '모두 1로',
    allOff: '모두 0으로',
    onlyThis: '이것만',
    weightLabel: '{name} 가중치',
    keyboard: '손잡이에 초점을 두고 ←→ 로도 돌릴 수 있다.',
  },
  query: {
    title: '부탁하기',
    note: '부탁을 걸면 탐색이 특징을 차례로 돌며 한 걸음씩 손잡이를 고쳐 잡는다. 손잡이를 직접 만지면 탐색은 물러난다.',
    run: '부탁 걸기',
    stop: '멈추기',
    again: '처음부터 다시',
    stepLine: '{step}걸음 · 지금 값 {score}',
    settled: '더 나아갈 곳이 없어 멎었다.',
    needGroups: '이 부탁은 무리가 둘 이상이어야 걸 수 있다.',
    movedTitle: '무엇이 움직였나',
    movedLine: '{name} {from} → {to}',
    nothingMoved: '아직 움직인 손잡이가 없다.',
    handOver: '여기서부터는 손잡이를 직접 돌려 하나씩 확인해 볼 수 있다. 논문에서도 열다섯 중 열하나가 질의가 크게 바꾼 특징을 따라 탐색을 이어 갔다.',
    iterationNote: '논문은 이 부탁을 100회 돌려 결과만 돌려준다(6.2절에서 100회에 점수가 안정됐다). 이 페이지는 걸음마다 무엇이 움직이는지 보이려고 한 걸음씩 돈다.',
  },
  study: {
    title: '논문이 잰 것',
    model: '신경망은 UMAP이 걸리는 시간의 {mean}%(SD {sd}%, 범위 {low}~{high}%)만 썼다. 자료집 {datasets}개, 특징 {minF}~{maxF}개에서 {repeats}회씩 쟀다.',
    accuracy: '지역 구조 보존(이웃 {k}개 기준): 고차원 자료 대비 신뢰도 {tw}, 연속성 {co}, MRRE {mr}. UMAP 투영 대비로는 각각 {twU}, {coU}, {mrU}였다. Hit Rate의 평균 절대 오차는 {mae}.',
    people: '사용자 연구 {n}명(남 {m}, 여 {f}), {ageMin}~{ageMax}세({ageMean}±{ageSd}). 절반은 부탁 기능을 쓰고 절반은 손잡이만 썼다.',
    insights: '통찰은 네 갈래로 갈랐다. 부탁을 쓴 쪽이 가설 통찰을 유의하게 많이 냈고(p={pH}, r={rH}), 확인 통찰의 차이는 유의하지 않았다(p={pC}, r={rC}).',
    followed: '부탁을 쓴 열다섯 중 열하나가 질의가 가장 크게 바꾼 특징을 따라 다음 탐색을 이어 갔다.',
    kinds: {
      perception: '알아봄 - 눈에 띈 무늬를 알아차림',
      hypothesis: '가설 - 그 무늬가 왜 생겼는지 특징으로 추측',
      feature: '특징 - 특징들 사이의 관계를 짚음',
      confirmation: '확인 - 짐작한 것을 확인함',
    },
  },
  notes: {
    title: '가져온 것과 아닌 것',
    took: {
      title: '가져온 것',
      items: [
        '두 시각 의미의 식 그대로 - Calinski-Harabasz와 20×20 격자 엔트로피 합',
        '세 부탁과 그 방향, 필요한 무리 수',
        '6장 정량 실험과 8장 사용자 연구의 수치',
      ],
    },
    left: {
      title: '가져오지 않은 것',
      items: [
        'UMAP과 그것을 흉내 낸 신경망 - 대신 가중 주성분 투영을 쓴다',
        '구매 이력 자료 7,200점 - 남의 자료다',
        'Optuna의 TPE 최적화와 그림에만 있는 값',
      ],
    },
    added: {
      title: '이 페이지가 더한 것',
      items: [
        '지어낸 카페 예순 곳 - 가르는 특징 셋과 잡음 다섯으로 지었다',
        '탐색이 한 걸음씩 도는 것을 눈으로 보는 것',
        '결정론적 좌표 탐색 - 링크를 열 때마다 같은 길을 걷는다',
      ],
    },
  },
  related: {
    title: '곁들여 볼 페이지',
    distance: '그 거리는 신기루다 - 같은 투영에서 거리를 잘못 읽는 법',
    projection: '산점도 신뢰도 검사 - 이 그림을 믿어도 되는지 재는 페이지',
  },
};

const en: FocusDictionary = {
  title: 'Focus the Lens',
  summary: 'Turn feature knobs until the groups separate, then see which feature made them',
  capability: 'Turn the weights of eight features and watch the projection redraw; ask one of three requests (find clusters, merge groups, separate groups) and a search walks step by step to a knob setting. The paper’s two measures update on every step',
  paperLabel: 'Based on',
  caveat: 'The paper used UMAP and a neural network trained to imitate it. Neither runs deterministically in a browser, so this page uses a weighted principal-component projection that always draws the same picture. It cannot catch curved structure, but both measures and all three requests hold regardless of the projection method.',
  groups: { work: 'for working', talk: 'for talking', takeout: 'takeout-heavy' },
  features: {
    noise: { name: 'Noise', hint: 'how loud it gets' },
    seats: { name: 'Seats', hint: 'how much seating there is' },
    wifi: { name: 'Wi-Fi', hint: 'how fast the network is' },
    hours: { name: 'Hours', hint: 'how late it stays open' },
    price: { name: 'Price', hint: 'what a cup costs' },
    dessert: { name: 'Dessert', hint: 'how much there is to go with it' },
    window: { name: 'Windows', hint: 'how many window seats' },
    roast: { name: 'Roast', hint: 'how dark the roast is' },
  },
  queries: {
    findClusters: { name: 'Find clusters', what: 'search for the knobs that make distinctness largest' },
    mergeGroups: { name: 'Merge groups', what: 'make mixing largest — find where the three groups overlap' },
    separateGroups: { name: 'Separate groups', what: 'make mixing smallest — find where the three groups pull apart' },
  },
  scatter: {
    title: 'The picture right now',
    note: 'Each dot is one cafe. Color says which group it truly belongs to; position is whatever the knobs make.',
    clusteredness: 'Clusteredness',
    overlap: 'Overlap',
    clusterednessHint: 'k-means splits the projection into {k} clusters, then the Calinski-Harabasz index scores that split. Higher means more distinct clusters.',
    overlapHint: 'Entropy of the group mix in each of 20×20 grid cells, summed. Higher means the groups are locally mixed.',
    kLabel: 'clusters k',
    boundNote: 'The paper says cell entropy "ranges from 0 to 1", but with three groups the bound is log₂3 = {bound}. Left as printed and noted here.',
    empty: 'With every knob at zero there is nothing to measure, so the dots collapse to the middle.',
  },
  knobs: {
    title: 'Feature knobs',
    note: 'Turn a knob and the picture redraws at once. At zero the feature is left out of the drawing entirely.',
    reset: 'All to 1',
    allOff: 'All to 0',
    onlyThis: 'Only this',
    weightLabel: '{name} weight',
    keyboard: 'Focus a knob and ←→ turns it too.',
  },
  query: {
    title: 'Make a request',
    note: 'A request walks the features in turn, refitting one knob per step. Touch a knob yourself and the search steps back.',
    run: 'Run request',
    stop: 'Stop',
    again: 'Start over',
    stepLine: 'step {step} · value now {score}',
    settled: 'Settled — nowhere further to go.',
    needGroups: 'This request needs at least two groups.',
    movedTitle: 'What moved',
    movedLine: '{name} {from} → {to}',
    nothingMoved: 'No knob has moved yet.',
    handOver: 'From here you can turn the knobs yourself to check them one at a time. In the paper, eleven of fifteen participants carried on from whichever feature the query had moved most.',
    iterationNote: 'The paper runs this request 100 times and hands back only the result (§6.2 found the score stable by 100). This page walks one step at a time so you can see what moves.',
  },
  study: {
    title: 'What the paper measured',
    model: 'The network needed only {mean}% of UMAP’s time (SD {sd}%, range {low}–{high}%), measured {repeats} times each across {datasets} datasets of {minF}–{maxF} features.',
    accuracy: 'Local structure preservation (k={k} neighbors): against the high-dimensional data, trustworthiness {tw}, continuity {co}, MRRE {mr}. Against the UMAP projection, {twU}, {coU}, {mrU}. Mean absolute error of Hit Rate was {mae}.',
    people: 'User study with {n} people ({m} male, {f} female), aged {ageMin}–{ageMax} ({ageMean}±{ageSd}). Half had the request feature; half had knobs only.',
    insights: 'Insights were coded into four kinds. The request condition produced significantly more hypothesis insights (p={pH}, r={rH}); the difference in confirmation insights was not significant (p={pC}, r={rC}).',
    followed: 'Eleven of the fifteen with requests carried their next exploration onward from whichever feature the query had moved most.',
    kinds: {
      perception: 'Perception — noticing a visual pattern',
      hypothesis: 'Hypothesis — guessing which feature caused it',
      feature: 'Feature — relating features to each other',
      confirmation: 'Confirmation — confirming a hunch',
    },
  },
  notes: {
    title: 'What was taken, what was not',
    took: {
      title: 'Taken',
      items: [
        'Both visual semantics exactly — Calinski-Harabasz, and summed entropy over a 20×20 grid',
        'The three requests, their directions, and how many groups each needs',
        'The Section 6 experiment and Section 8 study numbers',
      ],
    },
    left: {
      title: 'Not taken',
      items: [
        'UMAP and the neural network imitating it — a weighted PCA projection stands in',
        'The 7,200-point purchase dataset — someone else’s data',
        'Optuna’s TPE search, and values living only in figures',
      ],
    },
    added: {
      title: 'Added by this page',
      items: [
        'Sixty invented cafes — three separating features and five of noise',
        'Watching the search walk, one step at a time',
        'A deterministic coordinate search — the same link walks the same path',
      ],
    },
  },
  related: {
    title: 'Pages to pair with',
    distance: 'That distance is a mirage — how the same projections get misread',
    projection: 'Scatterplot reliability — whether this picture can be trusted at all',
  },
};

const ja: FocusDictionary = {
  title: '焦点合わせ',
  summary: '特徴のつまみを回して群れが分かれる瞬間を探し、何がその群れを作ったかを見る',
  capability: '八つの特徴の重みを自分で回して投影が描き直されるのを見て、三つの頼み(群れを探す・まとめる・分ける)をかければ探索が一歩ずつ自ら回ってつまみの組み合わせを見つける。論文の二つの物差し(くっきり・混ざり)が一歩ごとに更新される',
  paperLabel: '根拠論文',
  caveat: '論文はUMAPとそれを真似た神経網を使った。ブラウザの中で決定論的に回せないので、このページは常に同じ絵を返す加重主成分投影を使う。曲がった構造は捉えられないが、二つの物差しと三つの頼みは投影方法と無関係に成り立つ。',
  groups: { work: '作業向き', talk: 'おしゃべり向き', takeout: '持ち帰り中心' },
  features: {
    noise: { name: '騒音', hint: 'どれだけうるさいか' },
    seats: { name: '座席', hint: '座る場所がどれだけあるか' },
    wifi: { name: 'Wi-Fi', hint: 'ネットがどれだけ速いか' },
    hours: { name: '営業時間', hint: 'どれだけ遅くまで開くか' },
    price: { name: '価格', hint: '一杯いくらか' },
    dessert: { name: 'デザート', hint: '添えるものがどれだけあるか' },
    window: { name: '窓際', hint: '窓際の席がどれだけあるか' },
    roast: { name: '焙煎', hint: 'どれだけ深く煎るか' },
  },
  queries: {
    findClusters: { name: '群れを探す', what: 'くっきりを最も大きくするつまみの組み合わせを探す' },
    mergeGroups: { name: '群れをまとめる', what: '混ざりを最も大きくする - 三つの群れが重なる場所を探す' },
    separateGroups: { name: '群れを分ける', what: '混ざりを最も小さくする - 三つの群れが離れる場所を探す' },
  },
  scatter: {
    title: '今の絵',
    note: '点一つがカフェ一軒。色は実際にどの群れに属するかを言い、位置は今のつまみが作ったものだ。',
    clusteredness: 'くっきり (Clusteredness)',
    overlap: '混ざり (Overlap)',
    clusterednessHint: 'k-meansで{k}群に分けた後、Calinski-Harabasz指数で測った値。大きいほど群れがくっきりしている。',
    overlapHint: '20×20格子の升ごとに群れ分布のエントロピーを測って足した値。大きいほど群れが局所的に混ざっている。',
    kLabel: '群れの数 k',
    boundNote: '論文は升のエントロピーが「0から1」と書いたが、群れが三つなら上限はlog₂3 = {bound}だ。直さずそのまま置き、ここに記す。',
    empty: 'つまみを全部0にすると測るものがなく、点が真ん中に集まる。',
  },
  knobs: {
    title: '特徴のつまみ',
    note: 'つまみを回すと絵がすぐ描き直される。0にするとその特徴を外して描く。',
    reset: '全部1に',
    allOff: '全部0に',
    onlyThis: 'これだけ',
    weightLabel: '{name}の重み',
    keyboard: 'つまみに焦点を当てて←→でも回せる。',
  },
  query: {
    title: '頼んでみる',
    note: '頼みをかけると探索が特徴を順に回り、一歩ずつつまみを直す。つまみを自分で触ると探索は下がる。',
    run: '頼みをかける',
    stop: '止める',
    again: '最初からやり直す',
    stepLine: '{step}歩 · 今の値 {score}',
    settled: 'これ以上進む所がなく止まった。',
    needGroups: 'この頼みは群れが二つ以上必要だ。',
    movedTitle: '何が動いたか',
    movedLine: '{name} {from} → {to}',
    nothingMoved: 'まだ動いたつまみはない。',
    handOver: 'ここからはつまみを自分で回して一つずつ確かめられる。論文でも十五人中十一人が、質問が大きく変えた特徴から探索を続けた。',
    iterationNote: '論文はこの頼みを100回回して結果だけ返す(6.2節で100回で点数が安定した)。このページは一歩ごとに何が動くかを見せるため一歩ずつ回る。',
  },
  study: {
    title: '論文が測ったもの',
    model: '神経網はUMAPがかかる時間の{mean}%(SD {sd}%、範囲{low}~{high}%)しか使わなかった。データ集{datasets}個、特徴{minF}~{maxF}個で{repeats}回ずつ測った。',
    accuracy: '局所構造の保存(近傍{k}個基準): 高次元データ比で信頼度{tw}、連続性{co}、MRRE {mr}。UMAP投影比ではそれぞれ{twU}、{coU}、{mrU}。Hit Rateの平均絶対誤差は{mae}。',
    people: 'ユーザー研究{n}人(男{m}、女{f})、{ageMin}~{ageMax}歳({ageMean}±{ageSd})。半分は頼み機能を使い、半分はつまみだけを使った。',
    insights: '洞察は四種類に分けた。頼みを使った側が仮説の洞察を有意に多く出し(p={pH}, r={rH})、確認の洞察の差は有意でなかった(p={pC}, r={rC})。',
    followed: '頼みを使った十五人中十一人が、質問が最も大きく変えた特徴から次の探索を続けた。',
    kinds: {
      perception: '気づき - 目についた模様に気づく',
      hypothesis: '仮説 - その模様がなぜ生じたかを特徴で推測',
      feature: '特徴 - 特徴同士の関係を指摘',
      confirmation: '確認 - 見当をつけたことを確かめる',
    },
  },
  notes: {
    title: '受け取ったものとそうでないもの',
    took: {
      title: '受け取ったもの',
      items: [
        '二つの視覚的意味の式そのまま - Calinski-Harabaszと20×20格子エントロピーの和',
        '三つの頼みとその方向、必要な群れの数',
        '6章の定量実験と8章のユーザー研究の数値',
      ],
    },
    left: {
      title: '受け取らなかったもの',
      items: [
        'UMAPとそれを真似た神経網 - 代わりに加重主成分投影を使う',
        '購買履歴7,200点 - 他人のデータだ',
        'OptunaのTPE最適化と、図にしかない値',
      ],
    },
    added: {
      title: 'このページが足したもの',
      items: [
        '作り話のカフェ六十軒 - 分ける特徴三つと雑音五つで作った',
        '探索が一歩ずつ回るのを目で見ること',
        '決定論的な座標探索 - リンクを開くたび同じ道を歩く',
      ],
    },
  },
  related: {
    title: '併せて見るページ',
    distance: 'その距離は蜃気楼だ - 同じ投影で距離を読み違える話',
    projection: '散布図の信頼性検査 - この絵を信じてよいかを測るページ',
  },
};

export const focusDictionary: Record<Locale, FocusDictionary> = { ko, en, ja };
