/**
 * "그래서 뭐라고 다시 물을까"를 세우는 자리.
 *
 * 두 가지를 절대 한 눈금에 섞지 않는다.
 *   - 효과(effect): 그 수법을 쓴 사람들이 1~10으로 매긴 점수. 얼마나 들었는가.
 *   - 선호(preference): 사람들이 실제로 무엇을 골랐는가. 논문 본문의 서술이다.
 * 이 둘은 종류가 다르다. 잘 드는 것과 자주 고르는 것은 같지 않고, 이 논문에서
 * 정확도 불만이 바로 그 어긋남의 사례다. 그래서 화면에서도 따로 보여 준다.
 */

import {
  CODE_CATEGORY,
  DISSATISFACTION,
  MIN_COUNT_FOR_RANK,
  PROSE_PREFERENCE,
  TACTIC_CATEGORY,
  TACTIC_CATEGORY_BY_KNOWLEDGE,
  TACTIC_CODE,
  TACTIC_CODES,
  TACTIC_CODE_BY_KNOWLEDGE,
  type DissatisfactionId,
  type Knowledge,
  type TacticCode,
  type TacticId,
} from './config';

export interface RankedCode {
  code: TacticCode;
  category: Exclude<TacticId, 'none'>;
  /** 순위를 매긴 효과 점수(1~10). */
  effect: number;
  /** 그 점수가 몇 건에서 나왔는가. */
  count: number;
  /** 고른 무리의 표본이 모자라 전체 표의 값을 대신 썼는가. */
  pooled: boolean;
  /** 전체 표에서도 표본이 모자란가. 이런 칸은 순위의 맨 뒤로 보내고 권하지 않는다. */
  thin: boolean;
}

/**
 * 효과가 높았던 순서로 낱개 수법을 줄 세운다.
 *
 * 지식 무리를 고르면 그 무리의 표(표 6)를 쓰되, 그 칸의 표본이 MIN_COUNT_FOR_RANK
 * 미만이면 전체 표(표 4)의 값으로 되돌린다. 두 사람이 매긴 평균을 효과라 부르면
 * 순위가 표본 잡음을 따라 춤춘다.
 *
 * 전체 표에서도 표본이 모자란 수법은 점수와 상관없이 맨 뒤로 보낸다. 이 논문에서
 * 가장 높은 효과 점수 8.00은 두 건에서 나온 것이라 순위의 첫머리에 둘 수 없다.
 * 같은 점수면 표본이 많은 쪽을 앞에 둔다.
 */
export function rankCodes(knowledge: Knowledge | null): RankedCode[] {
  const ranked: RankedCode[] = [];
  for (const code of TACTIC_CODES) {
    const overall = TACTIC_CODE[code];
    const grouped = knowledge ? TACTIC_CODE_BY_KNOWLEDGE[knowledge][code] : null;
    const useGroup = grouped !== null && grouped.count >= MIN_COUNT_FOR_RANK && grouped.mean !== null;
    const chosen = useGroup ? grouped : overall;
    if (chosen.mean === null) continue;
    ranked.push({
      code,
      category: CODE_CATEGORY[code],
      effect: chosen.mean,
      count: chosen.count,
      pooled: knowledge !== null && !useGroup,
      thin: chosen.count < MIN_COUNT_FOR_RANK,
    });
  }
  ranked.sort(
    (a, b) =>
      Number(a.thin) - Number(b.thin) ||
      b.effect - a.effect ||
      b.count - a.count ||
      a.code.localeCompare(b.code),
  );
  return ranked;
}

export interface GapReport {
  /** 사람들이 이 불만에 실제로 기울었던 쪽(논문 본문). */
  preferred: TacticId;
  /** 잰 효과가 가장 높았던 갈래. */
  mostEffective: Exclude<TacticId, 'none'>;
  /** 그 둘이 다른가. 다르면 화면이 그 어긋남을 말한다. */
  diverges: boolean;
  preferredEffect: number | null;
  mostEffectiveEffect: number;
}

/**
 * 자주 고르는 것과 잘 드는 것이 어긋나는지 본다.
 * 'none'은 효과 점수가 없다(아무것도 하지 않았으므로 잴 것이 없다). null로 남긴다.
 */
export function gapFor(dissatisfaction: DissatisfactionId, knowledge: Knowledge | null): GapReport {
  const table = knowledge ? TACTIC_CATEGORY_BY_KNOWLEDGE[knowledge] : TACTIC_CATEGORY;
  const preferred = PROSE_PREFERENCE[dissatisfaction];

  let best: Exclude<TacticId, 'none'> = 'specify';
  let bestEffect = -Infinity;
  for (const id of ['repeat', 'specify', 'error', 'adapt'] as const) {
    const cell = table[id];
    if (cell.mean === null || cell.count < MIN_COUNT_FOR_RANK) continue;
    if (cell.mean > bestEffect) {
      best = id;
      bestEffect = cell.mean;
    }
  }

  return {
    preferred,
    mostEffective: best,
    diverges: preferred !== best,
    preferredEffect: preferred === 'none' ? null : table[preferred].mean,
    mostEffectiveEffect: bestEffect,
  };
}

/** 고른 불만들을 합쳐 응답 단위 몫을 낸다. 겹쳐 세지 않도록 개수를 그대로 더한다. */
export function shareOf(ids: readonly DissatisfactionId[], total: number): number {
  const count = ids.reduce((sum, id) => sum + DISSATISFACTION[id].count, 0);
  return total === 0 ? 0 : count / total;
}

/** 고른 불만 가운데 사람들이 가장 아프다고 한 것. 세기가 같으면 흔한 쪽을 고른다. */
export function severest(ids: readonly DissatisfactionId[]): DissatisfactionId | null {
  let chosen: DissatisfactionId | null = null;
  for (const id of ids) {
    if (chosen === null) {
      chosen = id;
      continue;
    }
    const a = DISSATISFACTION[id];
    const b = DISSATISFACTION[chosen];
    const aScore = a.mean ?? 0;
    const bScore = b.mean ?? 0;
    if (aScore > bScore || (aScore === bScore && a.count > b.count)) chosen = id;
  }
  return chosen;
}
