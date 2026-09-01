/**
 * 설계 공간 페이지 설정.
 *
 * 근거가 된 연구: A Design Space for Intelligent and Interactive Writing Assistants
 * (Mina Lee, Katy Ilonka Gero, John Joon Young Chung 외 33인),
 * CHI 2024, doi:10.1145/3613904.3642697. 전문은 arXiv:2403.14117v2 로 읽었다.
 * 분류표는 저자들이 공개한 자료(writing-assistant.github.io)에서 옮겼다.
 *
 * 이 페이지가 가져온 것
 *   - 다섯 갈래, 서른아홉 차원, 백아흔여섯 코드로 된 분류표 전부.
 *   - 5.2절이 문장으로 짚은 것: 어느 차원이 적게 다뤄졌는가(audience, scalability,
 *     생태계 차원 대부분), 기반 모델 논문이 2020년 1편에서 2023년 13편으로 늘었는데도
 *     함께 늘지 않은 코드가 무엇인가(trust, transparency, controllability, ethics).
 *   - 훑은 논문 115편과 저자 36명.
 *
 * 가져오지 않은 것
 *   - 그림 4와 그림 5의 막대값. 차원마다 논문이 몇 편인지는 그림에만 실렸다. 자로 읽어낸
 *     값은 논문의 수치가 아니므로, 이 화면에는 '적게 다뤄졌다'는 사실만 있고 편수는 없다.
 *   - 논문 115편의 개별 코딩. 저자들의 자료에는 있지만 남의 논문을 여기 옮겨 싣지 않는다.
 *
 * 이 페이지가 스스로 더한 것
 *   - 공간의 크기를 세는 것. 논문은 세지 않았다. 115편이라는 수가 크게 들리므로 옆에
 *     공간의 넓이를 놓아야 그 115편이 어느 만큼인지 보인다. 어림하지 않고 BigInt로 센다.
 *   - 빈 칸을 둘로 가르는 것. 내가 아직 정하지 않은 칸과, 논문 무리 전체가 오래 비워 둔 칸은
 *     다른 종류의 빈 칸이다. 앞의 것은 채우면 되고 뒤의 것은 채울 사람이 없다.
 *   - 차원과 코드의 이름을 옮기지 않고 논문의 말 그대로 두는 것. 옮기면 논문에 없는 말이
 *     생긴다. 화면에도 그 까닭을 적어 두었다.
 */

export const PAPER = {
  title: 'A Design Space for Intelligent and Interactive Writing Assistants',
  authors: 'Mina Lee, Katy Ilonka Gero, John Joon Young Chung 외 33인',
  venue: 'CHI 2024',
  affiliation: '36인 공동 연구',
  link: 'https://doi.org/10.1145/3613904.3642697',
  fullText: 'arXiv:2403.14117v2',
  taxonomy: 'writing-assistant.github.io',
  /**
   * 쉬운 말로. 열두 살이 읽어도 통하는 문장만 쓴다.
   * 논문이 무슨 말을 하려는 것인지 먼저 전하고, 이 페이지가 어디까지 가져왔는지를 밝힌다.
   */
  plain: {
    problem: {
      ko: '글쓰기를 돕는 인공지능이 쏟아지는데, 서로 무엇이 다른지 말하기가 어렵습니다. 다들 \'글을 도와준다\'고만 하니까요.',
      en: 'AI writing helpers keep arriving, and it is hard to say how any two differ — they all just say they "help you write".',
      ja: '文章を助けるAIが次々に出てきますが、互いに何が違うのかを言うのは難しい。どれも「書くのを助ける」としか言わないからです。',
    },
    work: {
      ko: '서른여섯 명의 연구자가 논문 115편을 훑어, 이런 도구를 설명할 좌표계를 만들었습니다 — 다섯 갈래, 서른아홉 개의 축, 백아흔여섯 개의 값. 그리고 어느 축이 아직 거의 다뤄지지 않았는지도 짚었습니다.',
      en: 'Thirty-six researchers read 115 papers and built a coordinate system for describing such tools: five branches, thirty-nine dimensions, one hundred and ninety-six codes. They also pointed at which dimensions almost nobody has worked on.',
      ja: '三十六人の研究者が115編の論文を読み、この種の道具を説明する座標系を作りました — 五つの枝、三十九の次元、百九十六のコード。そして、どの次元がまだほとんど扱われていないかも指摘しました。',
    },
    took: {
      ko: '그 분류표 전부와, 논문이 문장으로 짚은 빈자리(독자, 규모, 그리고 신뢰·투명성·통제·윤리)를 가져왔습니다.',
      en: 'The whole taxonomy, and the gaps the paper names in its prose: audience, scalability, and trust, transparency, controllability, ethics.',
      ja: 'その分類表のすべてと、論文が文章で指摘した空白（読者、規模、そして信頼・透明性・制御・倫理）を受け取りました。',
    },
    left: {
      ko: '그림에만 실린 막대값은 가져오지 않았습니다. 115편 각각의 분류도 옮기지 않았습니다. 차원과 값의 이름은 논문의 말 그대로 두었습니다 — 옮기면 논문에 없는 말이 생기니까요.',
      en: 'Bar values that appear only in figures are left out, and so is the coding of each of the 115 papers. Dimension and code names are kept in the paper\'s own words — translating them would invent terms the paper never used.',
      ja: '図にしかない棒の値は取っていません。115編それぞれの分類も持ち込みません。次元とコードの名前は論文の言葉のままにしてあります — 訳せば論文にない言葉が生まれるからです。',
    },
  },
} as const;

/**
 * 첫 화면의 기본값. 요즘 흔한 대화형 글쓰기 도구 하나를 대충 적어 둔 것이다.
 *
 * 일부러 이렇게 골랐다. 과제와 기술과 상호작용은 웬만큼 채워지는데 사용자와 생태계는
 * 통째로 비어 있다. 이 논문이 하려는 말이 바로 그것이고, 첫 화면에서 이미 그 말이
 * 보여야 한다. 어느 특정 제품을 가리키는 것이 아니다.
 */
export const DEFAULT_PICKS: Record<string, string[]> = {
  'writing-stage': ['Drafting', 'Revision'],
  'writing-context': ['Personal'],
  purpose: ['Expository'],
  specificity: ['General Direction'],
  'model-type': ['Foundation model'],
  'learning-problem': ['Generation'],
  'learning-training-and-adaptation': ['Prompt Engineering'],
  'ui-interface-paradigm': ['Chatbot'],
  'ui-initiation': ['User-initiated'],
  'user-steering-the-system': ['Explicit'],
  'user-integrating-system-output': ['Editing'],
  'system-output-type': ['Generation'],
};

/** 큰 수를 적을 때 앞에서 몇 자리를 보여 줄 것인가. */
export const SIGNIFICANT_DIGITS = 3;
