/**
 * 엉킨 갈고리 페이지 설정.
 *
 * 근거가 된 연구: HookLens: Visual Analytics for Understanding React Hooks Structures
 * (Suyeon Hwang, Minkyu Kweon, Jeongmin Rhee, Soohyun Lee, Seokhyeon Park,
 * Seokweon Jung, Hyeon Jeon, Jinwook Seo; SNU·Samsung), IEEE PacificVis 2026.
 * 전문은 arXiv:2602.17891v2로 읽었다.
 *
 * 이 페이지가 가져온 것
 *   - 세 앤티패턴의 정의(2.2절)와 그것을 참조 관계에서 밝힌다는 접근(6.1~6.2절).
 *   - 중첩 노드-링크 그림의 짜임: 컴포넌트 상자 안에 상태·프롭·이펙트, 경고는 빨강.
 *   - 표 1·표 2와 실험 설계의 수, SUS, LLM 비교(8장)의 본문 서술.
 *
 * 가져오지 않은 것
 *   - Espree·TypeScript 컴파일러의 AST 파싱. 대신 교본 문법만 알아듣는 가벼운
 *     문자열 추출기를 이 페이지가 지었다(코어 parse.ts).
 *   - 그림 2·6·7의 값(그림에만 있다), GitHub 연동과 코드 뷰어의 실측 구현.
 *
 * 이 페이지가 스스로 더한 것
 *   - 견본 앱 둘(심긴 것·고친 것)과 찾기 놀이의 채점. 여기서 나온 점수는
 *     프로젝트도 크기도 시간도 달라 표 1·표 2와 견줄 수 없다 - 화면에 밝힌다.
 */

export const PAPER = {
  title: 'HookLens: Visual Analytics for Understanding React Hooks Structures',
  authors:
    'Suyeon Hwang, Minkyu Kweon, Jeongmin Rhee, Soohyun Lee, Seokhyeon Park, Seokweon Jung, Hyeon Jeon, Jinwook Seo',
  venue: 'PacificVis 2026',
  affiliation: 'SNU · Samsung',
  link: 'https://arxiv.org/abs/2602.17891',
  fullText: 'arXiv:2602.17891v2',
  /** 쉬운 말로. 열두 살이 읽어도 통하는 문장만 쓴다. */
  plain: {
    problem: {
      ko: '리액트로 만든 웹 앱은 부품(컴포넌트)들이 값을 주고받으며 돌아갑니다. 그런데 값이 여러 부품을 거쳐 흐르다 보면 나쁜 버릇이 생깁니다 - 아무도 안 쓰는 값, 쓰지도 않으면서 그냥 전달만 하는 부품, 자식이 몰래 부모의 값을 고치는 장치. 이런 엉킴은 여러 파일에 흩어져 있어 코드만 읽어서는 찾기 어렵습니다.',
      en: 'A React web app runs on parts (components) passing values around. As values flow through many parts, bad habits creep in — values nobody uses, parts that only relay a value without using it, gadgets that let a child quietly change its parent’s value. These tangles spread across many files and are hard to spot by reading code alone.',
      ja: 'Reactで作ったウェブアプリは、部品(コンポーネント)が値をやり取りしながら動きます。値が多くの部品を流れるうちに悪い癖が生まれます - 誰も使わない値、使いもせずただ渡すだけの部品、子が親の値をこっそり変える仕掛け。この絡まりは多くのファイルに散らばり、コードを読むだけでは見つけにくいのです。',
    },
    work: {
      ko: '연구진은 코드에서 부품과 값의 관계를 뽑아 상자와 화살표의 그림으로 그려 주고, 나쁜 버릇 세 가지를 빨갛게 칠해 주는 도구를 만들었습니다. 개발자 12명이 코드 편집기로 찾을 때와 이 그림으로 찾을 때를 견줬더니 그림 쪽이 훨씬 정확했고, 같은 과제를 준 인공지능 코딩 조수 넷보다도 나았습니다.',
      en: 'The authors built a tool that pulls the parts and their value relationships out of code, draws them as boxes and arrows, and paints the three bad habits red. Twelve developers hunted for the habits with a code editor and with this picture — the picture side was far more accurate, and even beat four AI coding assistants given the same task.',
      ja: '研究チームは、コードから部品と値の関係を取り出して箱と矢印の絵に描き、三つの悪い癖を赤く塗ってくれる道具を作りました。開発者12人がコードエディタとこの絵で癖を探し比べたところ、絵の方がはるかに正確で、同じ課題を与えたAIコーディング助手4つよりも優れていました。',
    },
    took: {
      ko: '세 가지 나쁜 버릇의 정의와, 그것을 상자-화살표 그림에서 빨갛게 드러내는 짜임, 그리고 실험의 수를 가져왔습니다. 작은 견본 앱에서 버릇을 직접 찾아본 다음 그림을 켜 보고, 내 점수를 논문 12명의 점수와 같은 잣대(정밀도·재현율)로 재 봅니다. 코드를 직접 붙여 넣어도 돌아갑니다.',
      en: 'This page carries the three definitions, the box-and-arrow picture that paints them red, and the study’s numbers. You hunt for the habits in a small sample app, then switch the picture on, and your score is measured with the paper’s own yardstick (precision and recall). Pasting your own code works too.',
      ja: '三つの悪い癖の定義と、それを箱と矢印の絵で赤く示す仕組み、実験の数を持ってきました。小さな見本アプリで癖を自分で探してから絵をつけてみて、自分の点数を論文の12人と同じ物差し(適合率・再現率)で測ります。自分のコードを貼り付けても動きます。',
    },
    left: {
      ko: '논문의 도구는 진짜 파서(AST)로 코드를 읽지만, 이 페이지의 추출기는 교본 문법만 알아듣는 가벼운 것입니다. 훅별 질문 비율 그림과 결과 막대그림의 값은 그림에만 있어 가져오지 않았고, 이 판의 점수는 과제가 달라 논문의 표와 견줄 수 없습니다.',
      en: 'The paper’s tool reads code with a real parser (AST); this page’s extractor is a light one that only understands textbook syntax. The pie and bar chart values live only in figures and were not carried, and scores from this board cannot be compared with the paper’s tables — the task is different.',
      ja: '論文の道具は本物のパーサー(AST)でコードを読みますが、このページの抽出器は教科書的な文法だけ分かる軽いものです。フック別質問比率の図や棒グラフの値は図にしかないので持ってこず、この盤の点数は課題が違うため論文の表とは比べられません。',
    },
  },
} as const;

export const SAMPLE_IDS = ['planted', 'clean'] as const;
export type SampleId = (typeof SAMPLE_IDS)[number];

/**
 * 견본 앱 둘. 실험의 두 프로젝트는 남의 저장소라 싣지 않았고, 이 화분 앱은
 * 이 페이지가 지은 것이다. '심긴 것'에는 세 앤티패턴이 하나씩 들어 있다:
 * theme(안 쓰는 상태), title 사슬(안 쓰는 프롭), accent(PlantList를 그냥 지나는
 * 드릴링), SyncNote의 useEffect(부모 App의 setLastSynced를 부른다).
 * 정답은 여기 적지 않는다 - 검출기가 찾아내고, 시험이 그 목록을 붙든다.
 */
export const SAMPLES: Record<SampleId, string> = {
  planted: `function App() {
  const [plants, setPlants] = useState(SEED);
  const [filter, setFilter] = useState('all');
  const [theme, setTheme] = useState('light');
  const [lastSynced, setLastSynced] = useState(null);
  const [accent, setAccent] = useState('#2a7');
  const [title, setTitle] = useState('my plants');
  return (
    <main>
      <Header filter={filter} onPick={setFilter} />
      <PlantList plants={plants} accent={accent} />
      <SyncNote plants={plants} onSynced={setLastSynced} title={title} />
      <footer>synced {lastSynced} / {plants.length}</footer>
    </main>
  );
}

function Header({ filter, onPick }) {
  return (
    <header>
      <strong>plants - {filter}</strong>
      <button onClick={() => onPick('thirsty')}>thirsty only</button>
    </header>
  );
}

function PlantList({ plants, accent }) {
  return (
    <ul>
      {plants.map((plant) => (
        <PlantRow key={plant.id} plant={plant} accent={accent} />
      ))}
    </ul>
  );
}

function PlantRow({ plant, accent }) {
  return <li style={{ borderColor: accent }}>{plant.name}</li>;
}

function SyncNote({ plants, onSynced, title }) {
  useEffect(() => {
    onSynced(Date.now());
  }, [plants]);
  return <small>saved</small>;
}`,
  clean: `function App() {
  const [plants, setPlants] = useState(SEED);
  const [filter, setFilter] = useState('all');
  return (
    <main>
      <Header filter={filter} onPick={setFilter} />
      <PlantList plants={plants} onWater={setPlants} />
      <footer>{plants.length} plants</footer>
    </main>
  );
}

function Header({ filter, onPick }) {
  return (
    <header>
      <strong>plants - {filter}</strong>
      <button onClick={() => onPick('thirsty')}>thirsty only</button>
    </header>
  );
}

function PlantList({ plants, onWater }) {
  return (
    <ul>
      {plants.map((plant) => (
        <PlantRow key={plant.id} plant={plant} water={() => onWater(plant.id)} />
      ))}
    </ul>
  );
}

function PlantRow({ plant, water }) {
  return (
    <li>
      {plant.name}
      <button onClick={water}>water</button>
    </li>
  );
}`,
};

/**
 * 그림의 부호색. 논문은 노드 종류를 서로 다른 색상으로, 경고를 빨강으로 칠했다(6.2절).
 * 값은 이 페이지가 골랐다. 흰 지면(#FFFFFF) 위 WCAG 대비비:
 * 상태 #0F766E 5.3:1 · 프롭 #7C3AED 5.7:1 · 이펙트 #B45309 4.6:1 ·
 * 경고 #DC2626 4.8:1 · 컴포넌트 테두리 #1D4ED8 6.7:1 - 모두 3:1을 넘는다.
 */
export const NODE_COLORS = {
  component: '#1D4ED8',
  state: '#0F766E',
  prop: '#7C3AED',
  effect: '#B45309',
  warn: '#DC2626',
} as const;

/** 붙여 넣는 코드의 길이 상한. URL에 실을 수 있는 만큼만 받는다. */
export const MAX_CUSTOM_LENGTH = 4000;
/** URL에 실을 수 있는 붙여 넣기 길이. 넘으면 본문은 이 브라우저에만 남는다. */
export const MAX_URL_TEXT = 1500;
