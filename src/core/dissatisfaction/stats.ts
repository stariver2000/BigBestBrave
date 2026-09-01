/**
 * 표에서 다시 계산해 내는 통계.
 *
 * 여기 있는 함수는 모두 순수하다. 논문이 적어 둔 검정값을 우리가 옮겨 적은 표로부터
 * 되짚어 계산해 보는 것이 목적이다. 값이 맞으면 옮겨 적기가 옳았다는 뜻이고,
 * 어긋나면 어긋난 채로 화면에 적는다. 맞추려고 표를 고치지 않는다.
 */

/** 두 열짜리 분할표. 각 행은 [높음 무리 개수, 낮음 무리 개수]다. */
export type ContingencyRow = readonly [number, number];

export interface ChiSquareResult {
  /** 피어슨 카이제곱 통계량. 클수록 두 열의 분포가 다르다. */
  statistic: number;
  /** 자유도. (행 수 - 1) x (열 수 - 1)이며, 기대도수가 0인 행은 세지 않는다. */
  df: number;
  /** 표 전체 개수. */
  total: number;
  /** 0~1. 1에 가까울수록 두 열이 강하게 갈린다. 2열 표에서는 파이 계수와 같다. */
  cramersV: number;
}

/**
 * 두 열 분할표의 피어슨 카이제곱.
 * 행 합이 0인 행은 기대도수가 0이라 계산에서 빠지고 자유도에서도 빠진다.
 */
export function chiSquare(rows: readonly ContingencyRow[]): ChiSquareResult {
  let colA = 0;
  let colB = 0;
  for (const [a, b] of rows) {
    colA += a;
    colB += b;
  }
  const total = colA + colB;
  if (total === 0) return { statistic: 0, df: 0, total: 0, cramersV: 0 };

  let statistic = 0;
  let usedRows = 0;
  for (const [a, b] of rows) {
    const rowTotal = a + b;
    if (rowTotal === 0) continue;
    usedRows += 1;
    for (const [observed, colTotal] of [[a, colA], [b, colB]] as const) {
      const expected = (rowTotal * colTotal) / total;
      if (expected === 0) continue;
      statistic += ((observed - expected) ** 2) / expected;
    }
  }
  const df = Math.max(0, usedRows - 1);
  // 2열 표에서 Cramer's V = sqrt(chi2 / n). min(rows,cols)-1 = 1 이기 때문이다.
  return { statistic, df, total, cramersV: Math.sqrt(statistic / total) };
}

/** 개수를 전체로 나눈 백분율. 전체가 0이면 0이다. */
export function percentOf(count: number, total: number): number {
  return total === 0 ? 0 : (count / total) * 100;
}

/**
 * 개수와 함께 실린 백분율에서 분모를 되짚는다.
 * 논문의 표가 스스로와 맞는지 보려고 쓴다. 백분율이 0이면 되짚을 수 없다.
 */
export function impliedTotal(count: number, percent: number): number | null {
  return percent === 0 ? null : (count / percent) * 100;
}
