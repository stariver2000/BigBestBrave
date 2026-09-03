/**
 * 다시 묻는 일을 실제로 겪게 하는 자리.
 *
 * 이 페이지에는 표가 다 있었다. 없던 것은 그 표가 가리키는 **겪음**이다 —
 * 논문에서 가장 서늘한 숫자는 28%다. 열 번 아쉬워하고 다시 물어도 일곱 번은 그대로였다.
 * 그 숫자는 적어 두는 것으로는 아무것도 남기지 않는다. 옆에서 세어 봐야 남는다.
 *
 * 그래서 여기 있는 것은 두 가지뿐이다.
 *   1) 사람들이 실제로 고른 대로 수법을 뽑는 일. 무게는 논문 표 3의 개수 그대로다.
 *      뽑아 보면 넷 중 하나가 T4(구체적으로 다시 말하기)이고, 그다음이 그냥 다시다.
 *   2) 풀렸는지 아닌지를 논문이 밝힌 비율로 굴리는 일(5.2.3절: 28%, 높음 29%, 낮음 23.5%).
 *
 * **굴림은 굴림이다.** 논문은 수법별 해결률을 그림으로만 실었으므로, 어떤 수법을 골라도
 * 여기서는 같은 비율로 굴린다. 수법에 따라 달라지는 것은 논문이 숫자로 밝힌 것 하나뿐 —
 * 사람들이 매긴 효과 점수(1~10)다. 화면도 그렇게 적어야 한다.
 */

import {
  MIN_COUNT_FOR_RANK,
  REPORTED,
  TACTIC_CODE,
  TACTIC_CODES,
  type Knowledge,
  type TacticCode,
} from './config';

/** 사람들이 이 수법을 고른 몫. 개수를 다 더한 것에 대한 비다. */
export function shareOfCode(code: TacticCode): number {
  const total = TACTIC_CODES.reduce((sum, id) => sum + TACTIC_CODE[id].count, 0);
  return TACTIC_CODE[code].count / total;
}

/**
 * 사람들이 고른 대로 수법 하나를 뽑는다. roll은 0 이상 1 미만.
 *
 * 무게는 표 3의 개수다. 잘 드는 순서가 아니라 **실제로 많이 고른 순서**로 뽑히는 것이
 * 이 대화가 보여 주려는 것이다.
 */
export function pickCode(roll: number): TacticCode {
  const total = TACTIC_CODES.reduce((sum, id) => sum + TACTIC_CODE[id].count, 0);
  let cursor = Math.min(Math.max(roll, 0), 0.999999) * total;
  for (const code of TACTIC_CODES) {
    cursor -= TACTIC_CODE[code].count;
    if (cursor < 0) return code;
  }
  return TACTIC_CODES[TACTIC_CODES.length - 1];
}

/** 이 무리에서 끝내 풀린 비율. 논문 5.2.3절. */
export function resolveRate(knowledge: Knowledge | null): number {
  if (knowledge === 'high') return REPORTED.resolvedHigh;
  if (knowledge === 'low') return REPORTED.resolvedLow;
  return REPORTED.resolved;
}

/** 이번에는 풀렸는가. 수법과 상관없이 같은 비율로 굴린다 — 갈래별 값은 논문에 없다. */
export function resolved(roll: number, knowledge: Knowledge | null): boolean {
  return roll < resolveRate(knowledge);
}

/**
 * 사람들이 고른 대로 물었을 때의 평균 효과.
 *
 * 낱개 수법의 효과 점수를 그 수법을 고른 개수로 가중 평균한 값이다. 표본이 모자란 칸
 * (MIN_COUNT_FOR_RANK 미만)은 빼는데, 두 건에서 나온 8.00 같은 값이 전체 평균을
 * 흔들기 때문이다. 그 규칙은 이 페이지의 것이고 논문의 것이 아니다.
 */
export function crowdEffect(): number {
  const used = TACTIC_CODES.filter(
    (code) => TACTIC_CODE[code].mean !== null && TACTIC_CODE[code].count >= MIN_COUNT_FOR_RANK,
  );
  const weight = used.reduce((sum, code) => sum + TACTIC_CODE[code].count, 0);
  const total = used.reduce((sum, code) => sum + TACTIC_CODE[code].count * (TACTIC_CODE[code].mean as number), 0);
  return total / weight;
}

/** 고른 수법들의 평균 효과. 하나도 고르지 않았으면 null. */
export function meanEffect(codes: readonly TacticCode[]): number | null {
  const scored = codes.filter((code) => TACTIC_CODE[code].mean !== null);
  if (scored.length === 0) return null;
  return scored.reduce((sum, code) => sum + (TACTIC_CODE[code].mean as number), 0) / scored.length;
}

/** 두 개 미만으로 고른 것은 '고르는 방식'이라 부르지 않는다. 이 페이지가 정한 규칙이다. */
export const MIN_PICKS = 2;

/**
 * 고른 수법들이 사람들이 고른 대로보다 잘 드는가.
 *
 * 이 페이지에서 사람이 무언가 알아차리는 자리다. 자주 고르는 수법과 잘 드는 수법은
 * 같지 않다 — 이 논문이 표로 말한 것이 그것이고, 자기 손으로 골라 넘어서 봐야 남는다.
 */
export function outdoesCrowd(codes: readonly TacticCode[]): boolean {
  if (codes.length < MIN_PICKS) return false;
  const mine = meanEffect(codes);
  return mine !== null && mine > crowdEffect();
}
