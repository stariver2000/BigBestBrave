/** 설계 공간 문구 사전 (ko / en / ja). */

import type { Dictionary } from '../../core/i18n';

export type SpaceKey =
  | 'title' | 'summary' | 'capability' | 'paper-label' | 'full-text' | 'taxonomy-label'
  | 'size-title' | 'size-note' | 'size-floor' | 'size-ceiling' | 'size-papers' | 'size-digits'
  | 'size-floor-why' | 'size-ceiling-why' | 'size-mine' | 'size-corpus-fine'
  | 'map-title' | 'map-note' | 'map-english'
  | 'a-task' | 'a-user' | 'a-technology' | 'a-interaction' | 'a-ecosystem'
  | 'decided-of' | 'pick-title' | 'pick-note' | 'pick-none' | 'clear' | 'fill-none'
  | 'blind-title' | 'blind-note' | 'blind-shared' | 'blind-shared-why' | 'blind-alone' | 'blind-alone-why'
  | 'blind-none' | 'blind-all'
  | 'named-title' | 'named-note' | 'named-growth' | 'named-codes'
  | 'took-title' | 'took-yes' | 'took-no' | 'took-mine';

export const spaceDictionary: Dictionary<SpaceKey> = {
  ko: {
    title: '안 보고 있는 칸',
    summary:
      '글쓰기 보조 도구를 설계할 때 정해야 할 것이 서른아홉 가지 있습니다. 서른여섯 명이 논문 115편을 읽어 그 목록을 만들었습니다. 여기에 당신의 도구를 놓아 보면 무엇을 빠뜨렸는지 보입니다.',
    capability:
      '글쓰기 보조 도구를 다섯 갈래 서른아홉 차원에 놓아 보고, 비운 칸을 내가 안 정한 것과 학계 전체가 안 보는 것으로 갈라 준다',
    'paper-label': '바탕이 된 연구',
    'full-text': '전문',
    'taxonomy-label': '분류표',

    'size-title': '이 공간은 얼마나 넓은가',
    'size-note':
      '논문은 공간의 크기를 세지 않았습니다. 세는 것은 이 화면이 더한 일입니다. 굳이 세는 까닭은 115편이라는 수가 크게 들리기 때문입니다. 옆에 공간의 넓이를 놓아야 그 115편이 어느 만큼인지 보입니다.',
    'size-floor': '차원마다 하나씩만 고를 때',
    'size-ceiling': '한 차원에 여럿을 둘 수 있을 때',
    'size-papers': '읽은 논문',
    'size-digits': '자리',
    'size-floor-why': '서른아홉 개 수를 곱한 값입니다. 어림하지 않고 그대로 셌습니다.',
    'size-ceiling-why': '코드가 k개면 그 차원의 가짓수는 2의 k제곱에서 하나를 뺀 값입니다.',
    'size-mine': '두 수 모두 이 화면이 센 것이고 논문에는 없습니다.',
    'size-corpus-fine': '차원 {dimensions}개 · 코드 {codes}개',

    'map-title': '서른아홉 조각',
    'map-note':
      '다섯 갈래 아래 서른아홉 개의 차원이 있습니다. 누르면 그 차원이 가질 수 있는 값이 펼쳐집니다. 산호색으로 두른 칸은 논문 무리 전체가 적게 다뤘다고 저자들이 이름을 짚은 자리입니다.',
    'map-english':
      '차원과 코드의 이름은 논문이 정한 말 그대로 두었습니다. 옮기면 논문에 없는 말이 생깁니다.',

    'a-task': '과제',
    'a-user': '사용자',
    'a-technology': '기술',
    'a-interaction': '상호작용',
    'a-ecosystem': '생태계',

    'decided-of': '정함',
    'pick-title': '고른 값',
    'pick-note': '한 차원에 여럿을 두셔도 됩니다. 다시 누르면 빠집니다.',
    'pick-none': '아직 아무것도 고르지 않으셨습니다.',
    clear: '모두 비우기',
    'fill-none': '차원을 하나 눌러 주십시오.',

    'blind-title': '비어 있는 칸',
    'blind-note':
      '비어 있는 칸은 두 종류입니다. 이 둘은 같은 빈 칸이 아닙니다. 앞의 것은 채우면 되지만, 뒤의 것은 채워 놓은 선례가 없습니다.',
    'blind-shared': '학계도 오래 비워 둔 자리',
    'blind-shared-why':
      '5.2절에서 저자들이 이름을 짚은 차원입니다. 비워 두어도 혼자는 아니지만, 그래서 참고할 선례도 없습니다.',
    'blind-alone': '남들은 채우는데 내가 비운 자리',
    'blind-alone-why': '문헌에 사례가 쌓여 있는 자리입니다. 빠뜨렸다면 찾아볼 곳이 있습니다.',
    'blind-none': '없습니다.',
    'blind-all': '서른아홉 칸이 모두 비어 있습니다.',

    'named-title': '저자들이 이름까지 짚은 자리',
    'named-note':
      '기반 모델을 쓴 논문은 크게 늘었습니다. 그런데 그와 함께 늘었어야 할 것들이 늘지 않았다고 저자들이 적었습니다. 신뢰와 투명성에 대한 사용자의 걱정, 제어 가능성과 윤리에 대한 기술적 평가입니다.',
    'named-growth': '기반 모델을 쓴 논문',
    'named-codes': '함께 늘지 않은 코드',

    'took-title': '논문에서 무엇을 가져왔는가',
    'took-yes':
      '가져온 것: 다섯 갈래 서른아홉 차원 백아흔여섯 코드로 된 분류표 전부, 그리고 5.2절이 문장으로 짚은 것.',
    'took-no':
      '가져오지 않은 것: 그림 4와 그림 5의 막대값입니다. 차원마다 논문이 몇 편인지는 그림에만 실려 있어, 자로 읽어낸 값은 논문의 수치가 아닙니다. 그래서 이 화면에는 적게 다뤄졌다는 사실만 있고 편수는 없습니다. 논문 115편의 개별 코딩도 싣지 않았습니다. 저자들의 자료에는 있지만 남의 논문을 여기 옮겨 오지 않습니다.',
    'took-mine':
      '제가 더한 것: 공간의 크기를 센 것, 빈 칸을 두 종류로 가른 것, 그리고 차원과 코드의 이름을 옮기지 않고 그대로 둔 것입니다.',
  },

  en: {
    title: 'The Cells You Are Not Looking At',
    summary:
      'There are thirty-nine things to decide when designing a writing assistant. Thirty-six people read 115 papers to make that list. Put your own tool into it and what you left out becomes visible.',
    capability:
      'Place a writing assistant across five aspects and thirty-nine dimensions, and split the empty cells into what you have not decided and what the field itself has long left blank',
    'paper-label': 'The study behind this page',
    'full-text': 'Full text',
    'taxonomy-label': 'Taxonomy',

    'size-title': 'How wide is this space',
    'size-note':
      'The paper does not count the size of the space. Counting it is this page’s own addition. It is worth counting because 115 sounds like a large number. Only with the size of the space beside it can you see how much of it those 115 papers are.',
    'size-floor': 'One code per dimension',
    'size-ceiling': 'Several codes allowed per dimension',
    'size-papers': 'Papers reviewed',
    'size-digits': 'digits',
    'size-floor-why': 'Thirty-nine numbers multiplied together, counted exactly rather than approximated.',
    'size-ceiling-why': 'With k codes, a dimension offers two to the k, less one.',
    'size-mine': 'Both numbers were counted by this page. They are not in the paper.',
    'size-corpus-fine': '{dimensions} dimensions · {codes} codes',

    'map-title': 'Thirty-nine patches',
    'map-note':
      'Five aspects hold thirty-nine dimensions. Press one and its possible values open up. A cell outlined in coral is one the authors named as under-represented across the whole corpus.',
    'map-english':
      'Dimension and code names are left in the paper’s own words. Translating them would invent terms the paper does not have.',

    'a-task': 'Task',
    'a-user': 'User',
    'a-technology': 'Technology',
    'a-interaction': 'Interaction',
    'a-ecosystem': 'Ecosystem',

    'decided-of': 'decided',
    'pick-title': 'Chosen',
    'pick-note': 'Several codes may sit in one dimension. Press again to drop one.',
    'pick-none': 'Nothing chosen yet.',
    clear: 'Clear all',
    'fill-none': 'Press one of the dimensions.',

    'blind-title': 'The empty cells',
    'blind-note':
      'Empty cells come in two kinds, and they are not the same kind of empty. The first you can simply fill. For the second there is no precedent to fill it from.',
    'blind-shared': 'Long left blank by the field too',
    'blind-shared-why':
      'Dimensions the authors named in section 5.2. Leaving them blank puts you in company, but it also means there is nothing to look up.',
    'blind-alone': 'Others fill these; you did not',
    'blind-alone-why': 'These have a literature behind them. If you skipped one, there is somewhere to look.',
    'blind-none': 'None.',
    'blind-all': 'All thirty-nine cells are empty.',

    'named-title': 'What the authors named outright',
    'named-note':
      'Papers using foundation models grew sharply. Yet the things that should have grown alongside did not, the authors write: user concerns of trust and transparency, and technological evaluations of controllability and ethics.',
    'named-growth': 'Papers using foundation models',
    'named-codes': 'Codes that did not grow with them',

    'took-title': 'What was taken from the paper',
    'took-yes':
      'Taken: the whole taxonomy of five aspects, thirty-nine dimensions and 196 codes, and what section 5.2 states in prose.',
    'took-no':
      'Not taken: the bar values in Figures 4 and 5. How many papers fall under each dimension lives only in a figure, and a number read off a figure with a ruler is not the paper’s. So this page carries the fact of under-representation but no counts. The per-paper coding of the 115 papers is not carried either; it exists in the authors’ artifact, but other people’s papers are not reproduced here.',
    'took-mine':
      'Added by me: counting the size of the space, splitting empty cells into two kinds, and leaving dimension and code names untranslated.',
  },

  ja: {
    title: '見ていない枠',
    summary:
      '書く手助けの道具を設計するとき、決めるべきことが三十九あります。三十六人が115編の論文を読んでその一覧を作りました。ここにご自分の道具を置いてみると、何を落としていたかが見えます。',
    capability:
      '書く手助けの道具を五つの面と三十九の次元に置き、空いた枠を自分が決めていないものと学界全体が見ていないものに分ける',
    'paper-label': 'もとになった研究',
    'full-text': '全文',
    'taxonomy-label': '分類表',

    'size-title': 'この空間はどれほど広いか',
    'size-note':
      '論文は空間の大きさを数えていません。数えるのはこの画面が足した仕事です。あえて数えるのは、115編という数が大きく聞こえるからです。空間の広さを隣に置いて初めて、その115編がどれほどかが見えます。',
    'size-floor': '次元ごとに一つだけ選ぶとき',
    'size-ceiling': '一つの次元に複数を置けるとき',
    'size-papers': '読んだ論文',
    'size-digits': '桁',
    'size-floor-why': '三十九個の数を掛け合わせた値です。概算せずそのまま数えました。',
    'size-ceiling-why': 'コードがk個なら、その次元の場合の数は2のk乗から1を引いた値です。',
    'size-mine': 'どちらもこの画面が数えたもので、論文にはありません。',
    'size-corpus-fine': '次元{dimensions}個 · コード{codes}個',

    'map-title': '三十九の継ぎ接ぎ',
    'map-note':
      '五つの面の下に三十九の次元があります。押すとその次元が取りうる値が開きます。珊瑚色で囲まれた枠は、論文群全体があまり扱っていないと著者が名指しした場所です。',
    'map-english':
      '次元とコードの名前は論文が定めた言葉のまま残しました。訳すと論文にない言葉が生まれます。',

    'a-task': '課題',
    'a-user': '利用者',
    'a-technology': '技術',
    'a-interaction': '相互作用',
    'a-ecosystem': '生態系',

    'decided-of': '決定',
    'pick-title': '選んだ値',
    'pick-note': '一つの次元に複数を置いても構いません。もう一度押すと外れます。',
    'pick-none': 'まだ何も選んでいません。',
    clear: 'すべて空にする',
    'fill-none': '次元をひとつ押してください。',

    'blind-title': '空いている枠',
    'blind-note':
      '空いている枠には二種類あります。この二つは同じ空きではありません。前者は埋めればよいのですが、後者には埋めた先例がありません。',
    'blind-shared': '学界も長く空けてきた場所',
    'blind-shared-why':
      '5.2節で著者が名指しした次元です。空けておいても一人ではありませんが、その分だけ参考にできる先例もありません。',
    'blind-alone': '他は埋めているのに自分が空けた場所',
    'blind-alone-why': '文献が積み上がっている場所です。落としていたなら、当たるべき先があります。',
    'blind-none': 'ありません。',
    'blind-all': '三十九の枠がすべて空いています。',

    'named-title': '著者が名指しした場所',
    'named-note':
      '基盤モデルを使う論文は大きく増えました。ところが、それとともに増えるべきものが増えていないと著者は書いています。信頼と透明性に対する利用者の懸念、制御可能性と倫理に対する技術的な評価です。',
    'named-growth': '基盤モデルを使った論文',
    'named-codes': '一緒に増えなかったコード',

    'took-title': '論文から何を取ったか',
    'took-yes':
      '取ったもの:五つの面・三十九の次元・196のコードからなる分類表のすべてと、5.2節が文章で述べたこと。',
    'took-no':
      '取らなかったもの:図4と図5の棒の値です。次元ごとに論文が何編あるかは図にしか載っておらず、図から目盛りで読み取った数は論文の数値ではありません。ですからこの画面にはあまり扱われていないという事実だけがあり、編数はありません。115編の個別の符号付けも載せていません。著者の資料にはありますが、他人の論文をここに移しては来ません。',
    'took-mine':
      '私が足したもの:空間の大きさを数えたこと、空いた枠を二種類に分けたこと、そして次元とコードの名前を訳さずそのまま残したことです。',
  },
};
