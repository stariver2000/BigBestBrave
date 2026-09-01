/**
 * 통계 문장을 (주체, 지표, 시점)으로 가르는 자리(5.2.1절, Figure 5).
 *
 * 논문은 이 일을 미세조정한 GPT-3.5에게 맡긴다. 여기서는 모델을 쓸 수 없으므로
 * 규칙으로 가른다. 규칙이 모델만큼 할 수는 없다 - 못 가른 조각은 지어내지 말고
 * null로 남기고, 화면이 "여기는 못 갈랐습니다"라고 말하게 한다.
 *
 * 부호와 방향: confidence는 0~1이며 클수록 규칙이 확신한다는 뜻이다. 세 조각을 모두
 * 찾으면 1이고 하나도 못 찾으면 0이다.
 */

export interface ParsedStatement {
  /** 문장의 주어가 되는 것. 나라 이름 같은 것이다. */
  entity: string | null;
  /** 무엇을 재는가. 출산율, 배출량 같은 것이다. */
  indicator: string | null;
  /** 언제인가. 네 자리 연도이거나 두 연도 사이의 기간이다. */
  date: string | null;
  /** 시점 하나인가 기간인가. 못 갈랐으면 한 시점으로 본다. */
  span: 'point' | 'duration';
  /** 문장에서 실제로 집어낸 숫자. 없으면 null이다. */
  value: string | null;
  confidence: number;
}

/**
 * 주체로 알아볼 이름들. 규칙이 아는 만큼만 안다.
 * 논문은 세계은행 세계개발지표를 썼으므로 그 자료에 나오는 이름 위주로 둔다.
 */
const ENTITY_WORDS = [
  'Korea', 'South Korea', 'Japan', 'China', 'India', 'United States', 'USA', 'US',
  'Germany', 'France', 'Sweden', 'Norway', 'Finland', 'Italy', 'Spain', 'Brazil',
  'Nigeria', 'Kenya', 'Vietnam', 'Indonesia', 'Mexico', 'Canada', 'Australia',
  'the world', 'the OECD', 'Europe', 'Africa', 'Asia',
  '한국', '대한민국', '일본', '중국', '인도', '미국', '독일', '프랑스', '스웨덴',
  '노르웨이', '핀란드', '브라질', '베트남', '멕시코', '캐나다', '호주', '세계', '유럽',
];

/** 지표로 알아볼 말들. 긴 것부터 맞춰야 '출산율'이 '율'에 먼저 걸리지 않는다. */
const INDICATOR_WORDS = [
  'fertility rate', 'birth rate', 'death rate', 'life expectancy', 'infant mortality',
  'carbon emissions', 'greenhouse gas emissions', 'emissions per capita', 'emissions',
  'GDP per capita', 'GDP growth', 'GDP', 'unemployment rate', 'inflation',
  'literacy rate', 'poverty rate', 'population', 'energy consumption', 'renewable energy',
  'labor force participation rate', 'household debt', 'housing price',
  '합계출산율', '출산율', '출생률', '사망률', '기대수명', '영아사망률',
  '탄소 배출량', '온실가스 배출량', '배출량', '일인당 GDP', '경제성장률', 'GDP',
  '실업률', '물가상승률', '문해율', '빈곤율', '인구', '에너지 소비', '재생에너지',
  '경제활동참가율', '가계부채', '집값',
];

/** 네 자리 연도. 1800년부터 2099년까지만 연도로 본다. */
const YEAR = /\b(1[89]\d{2}|20\d{2})\b/g;

/** 문장에 든 수. 백분율이나 소수도 잡는다. 연도와 겹치면 연도 쪽을 먼저 뺀다. */
const NUMBER = /-?\d+(?:[.,]\d+)*\s*(?:%|퍼센트|명|톤|달러|원)?/g;

function findLongest(text: string, words: readonly string[]): string | null {
  const lower = text.toLowerCase();
  let best: string | null = null;
  for (const word of words) {
    if (!lower.includes(word.toLowerCase())) continue;
    if (best === null || word.length > best.length) best = word;
  }
  return best;
}

/**
 * 문장을 가른다.
 *
 * 연도를 둘 이상 찾으면 기간으로 본다. 논문의 표 1이 '한 시점'과 '기간'을 가르는데,
 * 그 갈림이 어떤 그림이 필요한지를 정하기 때문에 여기서 정해 두어야 한다.
 */
export function parseStatement(sentence: string): ParsedStatement {
  const text = sentence.trim();

  const years = Array.from(text.matchAll(YEAR), (m) => m[1]);
  const unique = Array.from(new Set(years));
  const date = unique.length === 0 ? null : unique.length === 1 ? unique[0] : `${unique[0]}–${unique[unique.length - 1]}`;
  const span: 'point' | 'duration' = unique.length > 1 ? 'duration' : 'point';

  const entity = findLongest(text, ENTITY_WORDS);
  const indicator = findLongest(text, INDICATOR_WORDS);

  // 연도로 이미 쓴 숫자는 값 후보에서 뺀다. 2019가 값으로 읽히면 문장이 뒤집힌다.
  const withoutYears = text.replace(YEAR, ' ');
  const numbers = Array.from(withoutYears.matchAll(NUMBER), (m) => m[0].trim()).filter((n) => n.length > 0);
  const value = numbers.length > 0 ? numbers[0] : null;

  const found = [entity, indicator, date].filter((part) => part !== null).length;

  return { entity, indicator, date, span, value, confidence: found / 3 };
}
