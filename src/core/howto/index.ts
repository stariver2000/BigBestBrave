/**
 * 하우투 대본 진단의 순수 계산.
 *
 * 논문(표 1)의 갈래표로 대본 문장에 라벨을 달고, 그 구성을 HTM-Type 120편의
 * 측정값(표 4~6)과 견준다. 논문은 문장의 시작·끝 시각으로 시간 비율을 쟀지만
 * 대본에는 시각이 없으므로 여기서는 글자 수 비율로 근사한다. 이 차이는
 * 화면에도 적는다.
 *
 * 유형 추천(suggestType)은 논문에 없는 이 페이지의 덧붙임이다. 논문은 사람
 * 셋이 영상을 보며 라벨을 달았고 자동 분류기는 후속 과제로 남겼다(9.4절).
 * 여기의 추천은 단서 낱말 몇 개로 하는 어림짐작일 뿐이라, 화면에서는 반드시
 * 사람이 확정해야 라벨이 된다.
 */

import {
  CATEGORIES,
  CATEGORY_STATS,
  TIME_STATS,
  TYPES,
  TYPE_STATS,
  type CategoryId,
  type ShareStats,
  type TypeId,
} from './config';

export * from './config';

/** 대본에서 잘라 낸 문장 하나. 오프셋은 원문 기준이라 자리 계산에 쓰인다. */
export interface Sentence {
  text: string;
  /** 원문에서 첫 글자의 오프셋. */
  start: number;
  /** 원문에서 마지막 글자 다음의 오프셋. */
  end: number;
}

const BOUNDARY = new Set(['.', '!', '?', '。', '！', '？', '\n']);

/**
 * 대본을 문장으로 나눈다. 마침표·물음표·느낌표(전각 포함)와 줄바꿈이 경계다.
 * "..."처럼 이어진 경계 문자는 한 경계로 삼는다. 논문의 자료집은 BERT 기반
 * 문장 분리기를 썼지만(3.1.1절), 여기서는 브라우저 안에서 결정론적으로
 * 돌아가는 단순 규칙으로 충분하다 - 나눈 결과를 사람이 화면에서 바로 본다.
 */
export function splitScript(text: string): Sentence[] {
  const sentences: Sentence[] = [];
  let segmentStart = 0;
  let index = 0;
  const push = (from: number, to: number) => {
    let start = from;
    let end = to;
    while (start < end && /\s/.test(text[start])) start += 1;
    while (end > start && /\s/.test(text[end - 1])) end -= 1;
    if (end > start) sentences.push({ text: text.slice(start, end), start, end });
  };
  while (index < text.length) {
    if (BOUNDARY.has(text[index])) {
      let boundaryEnd = index + 1;
      while (boundaryEnd < text.length && BOUNDARY.has(text[boundaryEnd])) boundaryEnd += 1;
      // 경계 문자까지 문장에 포함시켜 "어디서 잘렸는지"가 화면에 남게 한다.
      push(segmentStart, text[index] === '\n' ? index : boundaryEnd);
      segmentStart = boundaryEnd;
      index = boundaryEnd;
    } else {
      index += 1;
    }
  }
  push(segmentStart, text.length);
  return sentences;
}

/** 문장 하나의 라벨. null은 아직 정하지 않은 것. */
export type Label = TypeId | null;

/** URL에 라벨을 실을 때 쓰는 알파벳. TYPES 순서 그대로 a~u, 미정은 '-'. */
const LABEL_ALPHABET = 'abcdefghijklmnopqrstu';

const TYPE_INDEX = new Map<TypeId, number>(TYPES.map((type, i) => [type.id, i]));
const TYPE_BY_ID = new Map<TypeId, (typeof TYPES)[number]>(TYPES.map((type) => [type.id, type]));

export function categoryOf(type: TypeId): CategoryId {
  const found = TYPE_BY_ID.get(type);
  if (!found) throw new Error(`알 수 없는 유형: ${type}`);
  return found.category;
}

export function typesOf(category: CategoryId): TypeId[] {
  return TYPES.filter((type) => type.category === category).map((type) => type.id);
}

/** 라벨 배열을 URL용 문자열로. 전부 미정이면 빈 문자열, 꼬리의 미정은 잘린다. */
export function encodeLabels(labels: readonly Label[]): string {
  const chars = labels.map((label) => (label === null ? '-' : LABEL_ALPHABET[TYPE_INDEX.get(label) ?? 0]));
  while (chars.length > 0 && chars[chars.length - 1] === '-') chars.pop();
  return chars.join('');
}

/** URL 문자열을 라벨 배열로. 모르는 글자는 미정으로, 길이는 문장 수에 맞춘다. */
export function decodeLabels(raw: string, count: number): Label[] {
  const labels: Label[] = [];
  for (let i = 0; i < count; i += 1) {
    const char = raw[i];
    const typeIndex = char === undefined ? -1 : LABEL_ALPHABET.indexOf(char);
    labels.push(typeIndex >= 0 ? TYPES[typeIndex].id : null);
  }
  return labels;
}

export interface Composition {
  totalCount: number;
  labeledCount: number;
  /** 라벨이 달린 글자 수. 비율의 분모다. */
  labeledChars: number;
  /** 라벨이 달린 글자 수 기준 비율(%). 라벨이 없으면 빈 채로 남는다. */
  typeShare: Partial<Record<TypeId, number>>;
  categoryShare: Partial<Record<CategoryId, number>>;
}

/**
 * 대본의 구성 비율. 논문의 시간 비율을 글자 수 비율로 근사한다.
 * 분모를 "라벨이 달린 글자"로 두는 이유: 반쯤 라벨을 단 대본에서 미정 문장을
 * 분모에 넣으면 모든 비율이 낮게 나와 견주기가 흐려진다.
 */
export function composition(sentences: readonly Sentence[], labels: readonly Label[]): Composition {
  const typeChars = new Map<TypeId, number>();
  let labeledChars = 0;
  let labeledCount = 0;
  sentences.forEach((sentence, i) => {
    const label = labels[i];
    if (label === null || label === undefined) return;
    const weight = sentence.text.length;
    typeChars.set(label, (typeChars.get(label) ?? 0) + weight);
    labeledChars += weight;
    labeledCount += 1;
  });
  const typeShare: Partial<Record<TypeId, number>> = {};
  const categoryShare: Partial<Record<CategoryId, number>> = {};
  if (labeledChars > 0) {
    for (const [type, chars] of typeChars) {
      const share = (chars / labeledChars) * 100;
      typeShare[type] = share;
      const category = categoryOf(type);
      categoryShare[category] = (categoryShare[category] ?? 0) + share;
    }
  }
  return { totalCount: sentences.length, labeledCount, labeledChars, typeShare, categoryShare };
}

export type Verdict = 'below' | 'within' | 'above';

/**
 * 비율 하나를 말뭉치의 평균±1SD 띠와 견준 세 갈래 판정.
 * 띠의 아래끝이 0 밑으로 내려가면(평균보다 SD가 큰 유형이 많다) '아래'는
 * 성립할 수 없으므로 항상 '안'이 된다. 점수를 지어내지 않고 띠만 쓴다.
 */
export function verdictAgainst(sharePct: number, stats: ShareStats): Verdict {
  if (sharePct > stats.mean + stats.sd) return 'above';
  const floor = stats.mean - stats.sd;
  if (floor > 0 && sharePct < floor) return 'below';
  return 'within';
}

export interface CategoryPlacement {
  category: CategoryId;
  /** 이 갈래 문장들의 자리(0~1000, 글자 오프셋 기준). */
  positions: number[];
  /** 말뭉치의 [q5, q95] 띠 밖에 놓인 자리. */
  outside: number[];
}

/**
 * 갈래가 대본의 어느 자리에 놓였는지. 논문(표 6)이 시간을 1000으로 정규화한
 * 것을 따라, 대본 전체 글자 수를 1000으로 정규화한다. 띠 밖이라고 틀린 것은
 * 아니다 - 말뭉치 120편의 가운데 90%가 놓이던 자리를 벗어났다는 관찰일 뿐이다.
 */
export function placement(sentences: readonly Sentence[], labels: readonly Label[]): CategoryPlacement[] {
  if (sentences.length === 0) return [];
  const totalChars = sentences[sentences.length - 1].end;
  const byCategory = new Map<CategoryId, number[]>();
  sentences.forEach((sentence, i) => {
    const label = labels[i];
    if (label === null || label === undefined) return;
    const midpoint = (sentence.start + sentence.end) / 2;
    const position = Math.min(1000, Math.max(0, Math.round((midpoint / totalChars) * 1000)));
    const category = categoryOf(label);
    const list = byCategory.get(category) ?? [];
    list.push(position);
    byCategory.set(category, list);
  });
  return CATEGORIES.filter((category) => byCategory.has(category)).map((category) => {
    const positions = byCategory.get(category) ?? [];
    const band = TIME_STATS[category];
    return {
      category,
      positions,
      outside: positions.filter((position) => position < band.q5 || position > band.q95),
    };
  });
}

/** 지은이 조언 한 항목. 글은 사전이 채우고, 여기는 판정만 담는다. */
export interface AdviceCheck {
  id: 'sideNote' | 'subgoal' | 'description' | 'warning' | 'selfPromotion';
  /** 견준 대상이 유형인지 갈래인지. */
  target: { type?: TypeId; category?: CategoryId };
  yourShare: number;
  /** 'missing'은 대본에 그 유형/갈래가 아예 없다는 뜻이다. */
  verdict: Verdict | 'missing';
}

/**
 * 표 3의 분석(Analysis) 줄과 9.2.3절의 물음을 따라 만든 지은이 점검.
 * "잡담이 너무 많은가", "소목표를 충분히 말하는가", "묘사가 넉넉한가"에
 * 경고와 자기 홍보를 더했다(경고는 8장에서 "눈에 안 띄기 쉽다"던 정보다).
 */
export function advise(comp: Composition): AdviceCheck[] {
  const typeCheck = (id: AdviceCheck['id'], type: TypeId): AdviceCheck => {
    const share = comp.typeShare[type] ?? 0;
    return {
      id,
      target: { type },
      yourShare: share,
      verdict: share === 0 ? 'missing' : verdictAgainst(share, TYPE_STATS[type]),
    };
  };
  const description = comp.categoryShare.description ?? 0;
  return [
    typeCheck('sideNote', 'sideNote'),
    typeCheck('subgoal', 'subgoal'),
    {
      id: 'description',
      target: { category: 'description' },
      yourShare: description,
      verdict: description === 0 ? 'missing' : verdictAgainst(description, CATEGORY_STATS.description),
    },
    typeCheck('warning', 'warning'),
    typeCheck('selfPromotion', 'selfPromotion'),
  ];
}

/** 단서 낱말 규칙 하나. 앞에서부터 첫 일치가 이긴다. */
export interface SuggestionRule {
  type: TypeId;
  cue: RegExp;
  /** 자리 제한. 대본 앞머리에서만/끝머리에서만 통하는 단서가 있다. */
  position?: { before?: number; after?: number };
}

/**
 * 유형 추천 규칙. 논문에 없는 이 페이지의 덧붙임이며, 세 언어의 단서 낱말로
 * 어림짐작만 한다. 규칙 순서는 "더 구체적인 단서 먼저"다 - 예컨대 "구독"이
 * 있는 문장은 인사말 단서가 함께 있어도 자기 홍보다.
 */
export const SUGGESTION_RULES: readonly SuggestionRule[] = [
  {
    type: 'selfPromotion',
    cue: /subscribe|thumbs up|like this video|hit the bell|구독|좋아요.*눌러|알림 설정|チャンネル登録|高評価/i,
  },
  {
    type: 'warning',
    cue: /\b(don't|do not|never|avoid|careful|caution)\b|하지 마세요|조심|주의하세요|위험|절대로|ないでください|注意して|危険/i,
  },
  {
    type: 'tip',
    cue: /\b(tip|easier if|quicker if|shortcut)\b|팁을|더 쉬워|더 빨라|편해요|コツは|楽になり/i,
  },
  {
    type: 'justification',
    cue: /\b(because|since the|the reason)\b|왜냐하면|때문입니다|때문이에요|이유는|なぜなら|からです/i,
  },
  {
    type: 'tool',
    cue: /\b(you'll need|you will need|ingredients|materials|equipment)\b|준비물|필요한 것|재료는|必要なもの|材料は/i,
  },
  {
    type: 'goal',
    cue: /\b(today (i|we)'ll|in this video|i'll show you)\b|오늘은|이번 영상에서|보여드리겠|今日は|この動画では/i,
  },
  {
    type: 'opening',
    cue: /\b(hi|hey|hello|welcome)\b|안녕하세요|반갑습니다|こんにちは|ようこそ/i,
    position: { before: 200 },
  },
  {
    type: 'closing',
    cue: /\b(thanks for watching|see you next|goodbye)\b|시청해 주셔서|다음 영상에서 만나|여기까지입니다|ご視聴ありがとう|また次回/i,
    position: { after: 700 },
  },
  {
    type: 'outcome',
    cue: /\b(all done|finished|there you have it|final result)\b|완성입니다|완성됐|다 됐습니다|出来上がり|完成です/i,
    position: { after: 500 },
  },
  {
    type: 'subgoal',
    cue: /\b(next up|now let's|first,|step (one|two|three|\d))\b|다음은|이제부터|첫 번째로|두 번째로|次は|まずは/i,
  },
] as const;

/** 문장 하나에 대한 추천. position은 placement와 같은 0~1000 자리. */
export function suggestType(text: string, position: number): { type: TypeId; cue: string } | null {
  for (const rule of SUGGESTION_RULES) {
    if (rule.position?.before !== undefined && position >= rule.position.before) continue;
    if (rule.position?.after !== undefined && position <= rule.position.after) continue;
    const match = text.match(rule.cue);
    if (match) return { type: rule.type, cue: match[0] };
  }
  return null;
}
