/**
 * 과제마다의 순위와, 이 논문의 알맹이인 어긋남을 꺼내는 자리.
 *
 * 순위는 지어내지 않는다. 정확도는 표 3의 대각선에서, 튀어나옴은 7.2절의 정답률에서
 * 그대로 줄 세운다. 위치(단독)는 표 3에 수치가 없어 정확도 순위에서 값 없이 맨 위에
 * 둔다 - 본문이 length보다 뜻있게 낫다고 밝혔기 때문이며, 그 사실도 함께 내보낸다.
 */

import {
  ACCURACY_BASELINE,
  CHANCE_LOG_ERROR,
  POPOUT_ACCURACY,
  SEPARABILITY,
  WORST_PAIR,
} from './config';

export interface RankedChannel {
  id: string;
  /** 정확도는 log-error(낮을수록 좋다), 튀어나옴은 정답률(높을수록 좋다). 종류가 다르므로 함께 더하지 않는다. */
  value: number | null;
}

/** 정확도 순위. 좋은 것부터. 위치(단독)는 값 없이 맨 위다. */
export function accuracyRanking(): RankedChannel[] {
  const measured = Object.entries(ACCURACY_BASELINE)
    .map(([id, value]) => ({ id, value: value as number | null }))
    .sort((a, b) => (a.value as number) - (b.value as number));
  return [{ id: 'position', value: null }, ...measured];
}

/** 튀어나옴 순위. 좋은 것부터. */
export function popoutRanking(): RankedChannel[] {
  return Object.entries(POPOUT_ACCURACY)
    .map(([id, value]) => ({ id, value: value as number | null }))
    .sort((a, b) => (b.value as number) - (a.value as number));
}

/**
 * 이 논문의 알맹이: 정확도와 튀어나옴이 따로 논다.
 * 넓이는 정확도 꼴찌 언저리인데 튀어나옴 1등이고, 길이는 정확도 윗줄인데 튀어나옴은 중하위다.
 */
export function dissociation(): { area: { accuracyRank: number; popoutRank: number }; length: { accuracyRank: number; popoutRank: number } } {
  const rankIn = (list: RankedChannel[], id: string) => list.findIndex((entry) => entry.id === id) + 1;
  const accuracy = accuracyRanking();
  const popout = popoutRanking();
  return {
    area: { accuracyRank: rankIn(accuracy, 'area'), popoutRank: rankIn(popout, 'area') },
    length: { accuracyRank: rankIn(accuracy, 'length'), popoutRank: rankIn(popout, 'length') },
  };
}

/** 분리성 행렬에서 한 행의 기준값(대각선). */
export function separabilityBaseline(primary: string): number | null {
  return SEPARABILITY[primary]?.[primary] ?? null;
}

/** 함께 흔들릴 때 기준값에서 얼마나 밀리는가. 양수면 나빠진 것이다. */
export function separabilityShift(primary: string, secondary: string): number | null {
  const base = separabilityBaseline(primary);
  const cell = SEPARABILITY[primary]?.[secondary] ?? null;
  if (base === null || cell === null) return null;
  return cell - base;
}

/** 가장 크게 무너지는 짝이 찍기 수준에서 얼마나 떨어져 있는가. */
export function worstPairGapToChance(): number {
  return Math.abs(WORST_PAIR.to - CHANCE_LOG_ERROR);
}
