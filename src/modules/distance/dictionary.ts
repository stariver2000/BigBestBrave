/** 거리 문구 사전 (ko / en / ja). */

import type { Dictionary } from '../../core/i18n';

export type DistanceKey =
  | 'title' | 'summary' | 'capability' | 'paper-label' | 'full-text'
  | 'read-title' | 'read-note' | 'read-what' | 'read-with'
  | 'tech-tsne' | 'tech-umap' | 'tech-pca' | 'tech-mds'
  | 'task-neighborhood' | 'task-outlier' | 'task-cluster'
  | 'task-pointDistance' | 'task-classSeparability' | 'task-clusterDistance' | 'task-clusterDensity'
  | 'why-neighborhood' | 'why-outlier' | 'why-cluster'
  | 'why-pointDistance' | 'why-classSeparability' | 'why-clusterDistance' | 'why-clusterDensity'
  | 'verdict-ok' | 'verdict-mirage' | 'sketch-note'
  | 'kind-identification' | 'kind-investigation'
  | 'caveat-title' | 'caveat-body'
  | 'split-title' | 'split-note' | 'split-local' | 'split-global'
  | 'scale-title' | 'scale-note' | 'scale-line' | 'scale-figures'
  | 'people-title' | 'people-note' | 'people-quote' | 'people-line'
  | 'took-title' | 'took-yes' | 'took-no' | 'took-mine';

export const distanceDictionary: Dictionary<DistanceKey> = {
  ko: {
    title: '그 거리는 신기루다',
    summary:
      't-SNE와 UMAP이 그린 점 그림은 또렷하고 아름답습니다. 그런데 거기서 무리 사이의 거리를 읽으면 안 됩니다. 이 그림에서 읽어도 되는 것과 안 되는 것을 논문의 판정대로 갈라 드립니다.',
    capability:
      '투영 그림에서 읽고 싶은 것을 고르면, 그 읽기가 어느 기법에서 맞고 어디서부터 신기루인지 논문의 판정으로 가른다',
    'paper-label': '바탕이 된 연구',
    'full-text': '전문',

    'read-title': '무엇을 읽으려 하십니까',
    'read-note':
      '점 그림을 놓고 사람들이 하는 일은 일곱 가지로 갈립니다. 앞의 셋은 무언가를 찾아내는 일이고, 뒤의 넷은 거리나 밀도를 따지는 일입니다. 읽고 싶은 것과 쓰신 기법을 고르시면 논문의 판정이 나옵니다.',
    'read-what': '읽고 싶은 것',
    'read-with': '쓴 기법',

    'tech-tsne': 't-SNE',
    'tech-umap': 'UMAP',
    'tech-pca': 'PCA',
    'tech-mds': 'MDS',

    'task-neighborhood': '이웃 찾기',
    'task-outlier': '튀는 점 찾기',
    'task-cluster': '무리 찾기',
    'task-pointDistance': '두 점 사이 거리',
    'task-classSeparability': '갈래가 나뉜 정도',
    'task-clusterDistance': '무리 사이 거리',
    'task-clusterDensity': '무리의 촘촘함',

    'why-neighborhood': '국소 기법은 이웃을 지키도록 설계되어 이 일에 가장 맞습니다.',
    'why-outlier': '이웃과 아닌 것을 또렷이 가르므로 튀는 점이 잘 떨어져 나옵니다.',
    'why-cluster': '이웃끼리 뭉치므로 고차원의 무리가 그림에서도 무리로 나타납니다.',
    'why-pointDistance': '점 사이 거리는 전역 기법이 지키는 것입니다. 국소 기법의 그림에서 두 점의 멀고 가까움은 원본과 다를 수 있습니다.',
    'why-classSeparability': '국소 기법은 갈래 사이 거리를 부풀린다고 널리 보고되어 있습니다. 섞임의 정도는 보여 주지만 나뉜 정도는 과장됩니다.',
    'why-clusterDistance': '이 논문의 첫 문단이 든 바로 그 오용입니다. 국소 기법의 그림에서 무리 사이 거리는 뜻이 없습니다.',
    'why-clusterDensity': '국소 기법은 이웃만 보므로 촘촘함이 그림에 제대로 남지 않습니다. den-SNE, densMAP 같은 보완 기법이 따로 나온 까닭입니다.',

    'verdict-ok': '읽어도 됩니다',
    'verdict-mirage': '신기루입니다',
    'sketch-note': '이 점들은 자료가 아니라 모양입니다. 읽으려는 것이 어디인지 가리키기 위한 그림입니다.',

    'kind-identification': '찾아내기',
    'kind-investigation': '따져보기',

    'caveat-title': '논문이 스스로 단 단서',
    'caveat-body':
      '이 판정은 기법 단위의 거친 판정입니다. perplexity 같은 초매개변수가 그림을 크게 좌우하므로 기법이 맞아도 그림이 어긋날 수 있습니다. 그런데도 기법 단위로 판정한 까닭이 논문에 적혀 있습니다 - 훑은 논문 거의 전부가 초매개변수를 보고하지 않았고, 기법 선택이 가장 큰 요인이기 때문입니다.',

    'split-title': '왜 이렇게 갈리는가',
    'split-note':
      '논문은 이 갈림이 우연이 아니라고 적었습니다. 두 갈래가 거리를 다루는 방식이 다르기 때문입니다.',
    'split-local':
      '국소 기법(t-SNE, UMAP)은 거리를 이웃이냐 아니냐의 이진으로 봅니다. 그래서 찾아내는 일 셋에 모두 맞고, 거리를 따지는 일 넷에 모두 안 맞습니다.',
    'split-global':
      '전역 기법(PCA, MDS)은 거리를 연속된 값으로 지킵니다. 그래서 따지는 일 넷에 맞습니다.',

    'scale-title': '얼마나 흔한 일인가',
    'scale-note': '수는 본문에 적힌 것만 옮겼습니다. 기법별 오용 비율은 그림에만 있어 싣지 않았습니다.',
    'scale-line':
      '{retrieved}편을 모아 {retained}편을 훑었습니다. 나온 기법은 {techniques}가지인데 넷만 스무 번 넘게 쓰였고, t-SNE가 {tsne}편으로 절반을 넘어 2등의 두 배가 넘습니다(UMAP {umap}편). 기법을 고른 근거를 하나도 적지 않은 논문이 {noReason}%입니다.',
    'scale-figures': '어느 과제에서 얼마나 오용되는지의 비율은 그림 4와 5에만 있어 여기 싣지 않았습니다.',

    'people-title': '사람들은 왜 그렇게 쓰는가',
    'people-note':
      '연구진은 실무자 12명과 DR 전문가 8명을 면접했습니다. 도구를 몰라서, 남들이 쓰니까, 그리고 그림이 마음에 들 때까지 설정을 만지작거려서였습니다.',
    'people-quote':
      '"지도교수가 UMAP을 권해서, 검증 없이 그대로 썼습니다." - 참가자의 말. 유명하다는 것 자체가 방패가 되어, t-SNE와 UMAP은 비판을 면제받는다(immune to criticism)고 논문은 적었습니다.',
    'people-line':
      '{practitioners}명 가운데 {cherry}명이 초매개변수를 손으로 골라 봤고, 그 가운데 {blind}명은 그 설정이 무엇을 바꾸는지 모른 채 골랐습니다. {peer}명은 동료의 권유로 썼습니다.',

    'took-title': '논문에서 무엇을 가져왔는가',
    'took-yes':
      '가져온 것: 일곱 과제와 두 갈래, 과제-기법 판정 전부, 문헌 훑기와 면접의 셈, 그리고 판정이 거칠다는 논문 스스로의 단서.',
    'took-no':
      '가져오지 않은 것: 그림 3~6의 값 전부입니다. 연도별 추이와 기법별·과제별 오용 비율은 그림에만 있습니다. 그래서 이 화면에는 무엇이 오용인지의 판만 있고 얼마나 오용되는지의 비율이 없습니다.',
    'took-mine':
      '제가 더한 것: 읽고 싶은 것을 골라 판정을 받는 화면 짜임과 세 무리의 모양 그림입니다. 그림의 점은 자료가 아닙니다.',
  },

  en: {
    title: 'That Distance Is a Mirage',
    summary:
      'The dot pictures t-SNE and UMAP draw are crisp and beautiful. But the distance between groups in them is not to be read. Here is what may and may not be read off these pictures, exactly as the paper rules.',
    capability:
      'Pick what you want to read off a projection, and the paper verdict says where that reading holds and where the mirage begins',
    'paper-label': 'The study behind this page',
    'full-text': 'Full text',

    'read-title': 'What are you trying to read',
    'read-note':
      'What people do with a dot picture splits into seven jobs. The first three find something; the other four measure distances or density. Pick what you want to read and the technique you used, and the paper verdict appears.',
    'read-what': 'What to read',
    'read-with': 'Technique used',

    'tech-tsne': 't-SNE',
    'tech-umap': 'UMAP',
    'tech-pca': 'PCA',
    'tech-mds': 'MDS',

    'task-neighborhood': 'Find neighbors',
    'task-outlier': 'Find outliers',
    'task-cluster': 'Find clusters',
    'task-pointDistance': 'Distance between two points',
    'task-classSeparability': 'How separated the classes are',
    'task-clusterDistance': 'Distance between clusters',
    'task-clusterDensity': 'How dense a cluster is',

    'why-neighborhood': 'Local techniques are built to preserve neighborhoods; this is their home ground.',
    'why-outlier': 'They split neighbors from non-neighbors sharply, so outliers fall out cleanly.',
    'why-cluster': 'Neighbors clump together, so high-dimensional clusters appear as clusters.',
    'why-pointDistance': 'Point-to-point distance is what global techniques preserve. In a local-technique picture, how far two points sit may not match the original.',
    'why-classSeparability': 'Local techniques are widely reported to exaggerate the distance between classes. They show mixing, but separation is inflated.',
    'why-clusterDistance': 'The very misuse the paper opens with. In a local-technique picture, the distance between clusters carries no meaning.',
    'why-clusterDensity': 'Local techniques look only at neighbors, so density does not survive into the picture — the reason den-SNE and densMAP exist.',

    'verdict-ok': 'Safe to read',
    'verdict-mirage': 'A mirage',
    'sketch-note': 'These dots are a shape, not data. The drawing exists to point at what you are trying to read.',

    'kind-identification': 'Finding',
    'kind-investigation': 'Measuring',

    'caveat-title': 'The caveat the paper attaches to itself',
    'caveat-body':
      'This verdict is coarse, at the level of techniques. Hyperparameters like perplexity can swing a picture, so even the right technique can produce a wrong one. The paper explains why it judges at technique level anyway: almost none of the surveyed papers reported their hyperparameters, and technique choice remains the largest factor.',

    'split-title': 'Why the split falls this way',
    'split-note': 'The paper writes that this alignment is no accident: the two families treat distance differently.',
    'split-local':
      'Local techniques (t-SNE, UMAP) treat distance as binary — neighbor or not. So they fit all three finding jobs and none of the four measuring jobs.',
    'split-global':
      'Global techniques (PCA, MDS) keep distance as a continuous value. So the four measuring jobs are theirs.',

    'scale-title': 'How common this is',
    'scale-note': 'Only numbers stated in the text are carried. Misuse ratios per technique live in figures and are not.',
    'scale-line':
      '{retrieved} papers were gathered and {retained} reviewed. {techniques} techniques appeared, only four of them more than twenty times; t-SNE appears in {tsne} papers — over half, and more than double the runner-up (UMAP, {umap}). {noReason}% of papers state no rationale at all for their choice.',
    'scale-figures': 'The ratio of misuse per task lives only in Figures 4 and 5 and is not carried here.',

    'people-title': 'Why people use it this way',
    'people-note':
      'The authors interviewed 12 practitioners and 8 DR experts. Because they do not know the tools, because everyone else uses them, and because they fiddle with settings until the picture pleases.',
    'people-quote':
      '"My advisor recommended UMAP, and I used it without verification" — a participant. Popularity itself becomes a shield: the paper writes that t-SNE and UMAP are treated as immune to criticism.',
    'people-line':
      'Of {practitioners} practitioners, {cherry} had hand-tuned hyperparameters, {blind} of them without knowing what the settings change. {peer} used the tools on a colleague’s suggestion.',

    'took-title': 'What was taken from the paper',
    'took-yes':
      'Taken: the seven tasks and two families, every task-technique verdict, the counts from the review and the interviews, and the paper’s own caveat that the verdict is coarse.',
    'took-no':
      'Not taken: every value in Figures 3 to 6. Yearly trends and misuse ratios per technique and task live only in figures. So this page carries the verdict of what counts as misuse, but no ratio of how often.',
    'took-mine':
      'Added by me: the pick-and-verdict framing and the three-blob sketch. The dots in it are not data.',
  },

  ja: {
    title: 'その距離は蜃気楼',
    summary:
      't-SNEとUMAPが描く点の絵はくっきりとして美しい。けれどもそこから群れどうしの距離を読んではいけません。この絵から読んでよいものと駄目なものを、論文の判定どおりに分けます。',
    capability:
      '投影図から読みたいものを選ぶと、その読みがどの手法で成り立ち、どこから蜃気楼になるかを論文の判定で分ける',
    'paper-label': 'もとになった研究',
    'full-text': '全文',

    'read-title': '何を読もうとしていますか',
    'read-note':
      '点の絵を前に人がすることは七つに分かれます。前の三つは何かを見つける仕事、後の四つは距離や密度を測る仕事です。読みたいものと使った手法を選ぶと、論文の判定が出ます。',
    'read-what': '読みたいもの',
    'read-with': '使った手法',

    'tech-tsne': 't-SNE',
    'tech-umap': 'UMAP',
    'tech-pca': 'PCA',
    'tech-mds': 'MDS',

    'task-neighborhood': '近くの点を探す',
    'task-outlier': '外れた点を探す',
    'task-cluster': '群れを探す',
    'task-pointDistance': '二点間の距離',
    'task-classSeparability': '群の分かれ具合',
    'task-clusterDistance': '群れどうしの距離',
    'task-clusterDensity': '群れの密度',

    'why-neighborhood': '局所手法は近傍を保つよう作られており、この仕事の本領です。',
    'why-outlier': '近傍とそれ以外を鋭く分けるので、外れた点がきれいに浮き上がります。',
    'why-cluster': '近い点どうしが固まるので、高次元の群れが絵でも群れとして現れます。',
    'why-pointDistance': '点どうしの距離は大域手法が保つものです。局所手法の絵で二点の遠近は元と違うことがあります。',
    'why-classSeparability': '局所手法は群の間の距離を誇張すると広く報告されています。混ざり具合は見えても、分かれ具合は膨らみます。',
    'why-clusterDistance': '論文が冒頭に挙げたまさにその誤用です。局所手法の絵で群れどうしの距離に意味はありません。',
    'why-clusterDensity': '局所手法は近傍しか見ないため密度が絵に残りません。den-SNEやdensMAPが別に作られた理由です。',

    'verdict-ok': '読んで大丈夫',
    'verdict-mirage': '蜃気楼です',
    'sketch-note': 'この点は資料ではなく形です。読もうとしている場所を指すための絵です。',

    'kind-identification': '見つける',
    'kind-investigation': '測る',

    'caveat-title': '論文が自らに付けた但し書き',
    'caveat-body':
      'この判定は手法単位の粗いものです。perplexityのような超母数が絵を大きく左右するので、手法が合っていても絵が外れることがあります。それでも手法単位で判定した理由が論文に書かれています。調べた論文のほぼすべてが超母数を報告しておらず、手法の選択が最大の要因だからです。',

    'split-title': 'なぜこう分かれるのか',
    'split-note': '論文はこの分かれ方が偶然ではないと書いています。二つの系統は距離の扱い方が違うのです。',
    'split-local':
      '局所手法(t-SNE、UMAP)は距離を「近傍か否か」の二値として扱います。だから見つける仕事三つすべてに合い、測る仕事四つには合いません。',
    'split-global':
      '大域手法(PCA、MDS)は距離を連続の値として保ちます。だから測る仕事四つはこちらのものです。',

    'scale-title': 'どれほどよくあることか',
    'scale-note': '本文に書かれた数だけを移しました。手法別の誤用率は図にしかないため載せていません。',
    'scale-line':
      '{retrieved}編を集めて{retained}編を調べました。現れた手法は{techniques}種で、二十回を超えて使われたのは四つだけ。t-SNEは{tsne}編で半分を超え、二位の二倍を超えます(UMAPは{umap}編)。手法を選んだ理由をひとつも書いていない論文が{noReason}%あります。',
    'scale-figures': 'どの課題でどれだけ誤用されるかの割合は図4と5にしかなく、ここには載せていません。',

    'people-title': 'なぜそう使ってしまうのか',
    'people-note':
      '著者らは実務者12名とDR専門家8名に面接しました。道具をよく知らないから、みんなが使うから、そして絵が気に入るまで設定をいじるからでした。',
    'people-quote':
      '「指導教員がUMAPを勧めたので、検証せずそのまま使いました」— 参加者の言葉。有名さ自体が盾になり、t-SNEとUMAPは批判を免れている(immune to criticism)と論文は書いています。',
    'people-line':
      '{practitioners}名のうち{cherry}名が超母数を手で選んだことがあり、うち{blind}名はその設定が何を変えるか知らないまま選んでいました。{peer}名は同僚の勧めで使っていました。',

    'took-title': '論文から何を取ったか',
    'took-yes':
      '取ったもの:七つの課題と二つの系統、課題と手法の判定のすべて、文献調査と面接の数、そして判定は粗いという論文自身の但し書き。',
    'took-no':
      '取らなかったもの:図3〜6の値のすべてです。年ごとの推移や手法別・課題別の誤用率は図にしかありません。だからこの画面には何が誤用かの判定だけがあり、どれだけ誤用されるかの割合はありません。',
    'took-mine':
      '私が足したもの:読みたいものを選んで判定を受ける画面の骨組みと、三つの群れの形の絵です。絵の点は資料ではありません。',
  },
};
