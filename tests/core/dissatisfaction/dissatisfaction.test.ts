/**
 * 옮겨 적기가 옳았는지 되짚는 시험.
 *
 * 이 파일의 목적은 계산이 맞는지 보는 것이 아니라 표를 잘못 베끼지 않았는지 보는 것이다.
 * 논문은 같은 사실을 두 번 적었다 - 개수와 백분율로, 낱개와 갈래로, 표와 검정값으로.
 * 그 둘이 서로 맞물리는지 확인하면 조용한 오타가 드러난다.
 */

import { describe, expect, it } from 'vitest';
import {
  CODE_CATEGORY,
  DISSATISFACTION,
  DISSATISFACTION_BY_KNOWLEDGE,
  DISSATISFACTION_IDS,
  MIN_COUNT_FOR_RANK,
  PROSE_PREFERENCE,
  REPORTED,
  TACTIC_CATEGORY,
  TACTIC_CATEGORY_BY_KNOWLEDGE,
  TACTIC_CODE,
  TACTIC_CODES,
  TACTIC_CODE_BY_KNOWLEDGE,
  TACTIC_IDS,
  chiSquare,
  gapFor,
  impliedTotal,
  percentOf,
  rankCodes,
  severest,
  shareOf,
  type ContingencyRow,
  type Knowledge,
  type Measured,
} from '../../../src/core/dissatisfaction';

const KNOWLEDGES: Knowledge[] = ['high', 'low'];

/**
 * 개수와 백분율이 같은 분모를 가리키는지 본다.
 *
 * 백분율에서 분모를 거꾸로 되짚는 대신 개수에서 백분율을 다시 내어 견준다.
 * 되짚는 쪽은 개수가 작을 때 반올림이 크게 번져 시험이 무뎌진다 - 4건에 1.5%면
 * 분모가 258에서 276 사이 어디든 될 수 있다. 앞으로 계산하면 그 번짐이 없다.
 * 논문이 소수 첫째 자리까지 적었으므로 0.06을 넘게 어긋나면 잘못 옮긴 것이다.
 */
function impliesTotal(cell: Measured, total: number) {
  expect(Math.abs(percentOf(cell.count, total) - cell.percent)).toBeLessThan(0.06);
}

describe('옮겨 적은 표가 스스로와 맞는가', () => {
  it('불만 일곱 갈래의 개수 합이 522다', () => {
    const sum = DISSATISFACTION_IDS.reduce((acc, id) => acc + DISSATISFACTION[id].count, 0);
    expect(sum).toBe(REPORTED.dissatisfactionTotal);
  });

  it('불만 일곱 갈래의 백분율 합이 100이다', () => {
    const sum = DISSATISFACTION_IDS.reduce((acc, id) => acc + DISSATISFACTION[id].percent, 0);
    expect(sum).toBeCloseTo(100, 1);
  });

  it('불만 각 줄의 개수와 백분율이 같은 분모 522를 가리킨다', () => {
    for (const id of DISSATISFACTION_IDS) impliesTotal(DISSATISFACTION[id], REPORTED.dissatisfactionTotal);
  });

  it('응답 단위 합계는 사례 수보다 크다 - 한 응답이 여러 갈래를 가질 수 있기 때문이다', () => {
    expect(REPORTED.dissatisfactionTotal).toBeGreaterThan(REPORTED.instances);
  });

  it('대응 갈래의 개수 합이 477, 낱개 수법의 개수 합이 500이다', () => {
    const byCategory = TACTIC_IDS.reduce((acc, id) => acc + TACTIC_CATEGORY[id].count, 0);
    const byCode =
      TACTIC_CODES.reduce((acc, code) => acc + TACTIC_CODE[code].count, 0) + TACTIC_CATEGORY.none.count;
    expect(byCategory).toBe(REPORTED.tacticCategoryTotal);
    expect(byCode).toBe(REPORTED.tacticCodeTotal);
  });

  it('대응 각 줄의 개수와 백분율이 자기 분모를 가리킨다', () => {
    for (const id of TACTIC_IDS) impliesTotal(TACTIC_CATEGORY[id], REPORTED.tacticCategoryTotal);
    for (const code of TACTIC_CODES) impliesTotal(TACTIC_CODE[code], REPORTED.tacticCodeTotal);
  });

  /**
   * 갈래 개수는 그 갈래에 속한 낱개 개수의 합보다 작거나 같아야 한다.
   * 한 응답이 같은 갈래 안에서 두 수법을 함께 쓰면 낱개로는 두 번, 갈래로는 한 번 세기 때문이다.
   * 방향이 반대로 나오면 어느 수법을 어느 갈래에 잘못 붙였다는 뜻이다.
   */
  it('갈래 개수 <= 낱개 개수의 합이고, 그 차의 총합이 500과 477의 차와 같다', () => {
    let excess = 0;
    for (const id of ['repeat', 'specify', 'error', 'adapt'] as const) {
      const codeSum = TACTIC_CODES.filter((code) => CODE_CATEGORY[code] === id).reduce(
        (acc, code) => acc + TACTIC_CODE[code].count,
        0,
      );
      expect(TACTIC_CATEGORY[id].count).toBeLessThanOrEqual(codeSum);
      excess += codeSum - TACTIC_CATEGORY[id].count;
    }
    expect(excess).toBe(REPORTED.tacticCodeTotal - REPORTED.tacticCategoryTotal);
  });

  it('아무것도 하지 않은 164건은 갈래로 세나 낱개로 세나 같다', () => {
    expect(TACTIC_CATEGORY.none.count).toBe(164);
    // 아무것도 하지 않은 것은 겹쳐 셀 수법이 없으므로 두 분모에서 개수가 같아야 한다.
    expect(TACTIC_CATEGORY_BY_KNOWLEDGE.high.none.count).toBe(81);
    expect(TACTIC_CATEGORY_BY_KNOWLEDGE.low.none.count).toBe(51);
  });

  it('대응 갈래의 사람 단위 빈도 합이 1 언저리다', () => {
    for (const table of [TACTIC_CATEGORY, TACTIC_CATEGORY_BY_KNOWLEDGE.high, TACTIC_CATEGORY_BY_KNOWLEDGE.low]) {
      const sum = TACTIC_IDS.reduce((acc, id) => acc + (table[id].freq ?? 0), 0);
      expect(sum).toBeGreaterThan(0.95);
      expect(sum).toBeLessThan(1.15);
    }
  });

  it('지식 무리로 가른 표의 각 줄이 자기 분모를 가리킨다', () => {
    for (const k of KNOWLEDGES) {
      for (const id of DISSATISFACTION_IDS) {
        impliesTotal(DISSATISFACTION_BY_KNOWLEDGE[k][id], REPORTED.knowledgeDissatisfactionTotal[k]);
      }
      for (const id of TACTIC_IDS) {
        impliesTotal(TACTIC_CATEGORY_BY_KNOWLEDGE[k][id], REPORTED.knowledgeTacticCategoryTotal[k]);
      }
      for (const code of TACTIC_CODES) {
        impliesTotal(TACTIC_CODE_BY_KNOWLEDGE[k][code], REPORTED.knowledgeTacticCodeTotal[k]);
      }
    }
  });

  it('두 무리의 합이 전체보다 작다 - 가운데 4점을 매긴 사람들이 빠졌기 때문이다', () => {
    const split = REPORTED.knowledgeDissatisfactionTotal.high + REPORTED.knowledgeDissatisfactionTotal.low;
    expect(split).toBeLessThan(REPORTED.dissatisfactionTotal);
    expect(REPORTED.dissatisfactionTotal - split).toBe(88);
  });

  it('개수가 0인 칸에는 평균이 없다', () => {
    for (const k of KNOWLEDGES) {
      for (const code of TACTIC_CODES) {
        const cell = TACTIC_CODE_BY_KNOWLEDGE[k][code];
        if (cell.count === 0) expect(cell.mean).toBeNull();
      }
    }
  });

  it("'No Tactic'에는 효과 점수가 없다", () => {
    expect(TACTIC_CATEGORY.none.mean).toBeNull();
    for (const k of KNOWLEDGES) expect(TACTIC_CATEGORY_BY_KNOWLEDGE[k].none.mean).toBeNull();
  });

  it("Tspecify는 'No Tactic'을 뺀 네 갈래의 58.6%다", () => {
    const four = (['repeat', 'specify', 'error', 'adapt'] as const).reduce(
      (acc, id) => acc + TACTIC_CATEGORY[id].count,
      0,
    );
    const share = TACTIC_CATEGORY.specify.count / four;
    expect(share).toBeCloseTo(REPORTED.specifyShareAmongTactics, 2);
  });
});

describe('논문이 적어 둔 검정값을 표에서 되짚는다', () => {
  const rowsOf = (pick: (k: Knowledge) => Record<string, Measured>, keys: readonly string[]): ContingencyRow[] =>
    keys.map((key) => [pick('high')[key].count, pick('low')[key].count] as ContingencyRow);

  /**
   * 이것이 이 파일에서 가장 중요한 시험이다.
   * 표 5의 열네 개 숫자를 하나라도 잘못 옮기면 카이제곱이 17.7에서 벗어난다.
   */
  it('표 5에서 다시 계산한 카이제곱이 논문의 17.7과 맞는다', () => {
    const rows = rowsOf((k) => DISSATISFACTION_BY_KNOWLEDGE[k], DISSATISFACTION_IDS);
    const result = chiSquare(rows);
    expect(result.statistic).toBeCloseTo(REPORTED.chiSquareDissatisfaction, 1);
    expect(result.df).toBe(6);
    expect(result.total).toBe(282 + 152);
  });

  /**
   * 표 6은 되짚어지지 않는다. 우리가 옮긴 표로는 19.04가 나오는데 논문은 21.6이라 적었다.
   * 표 6의 개수는 자기 백분율과 맞고 합도 262와 131로 맞으므로 옮겨 적기의 잘못은 아니다.
   * 어느 쪽이 옳은지 표만으로는 알 수 없어, 맞추려 들지 않고 어긋난 채로 붙들어 둔다.
   * 화면도 두 값을 나란히 적는다.
   */
  it('표 6에서 다시 계산한 카이제곱은 19.04이며 논문의 21.6과 어긋난다', () => {
    const rows = rowsOf((k) => TACTIC_CATEGORY_BY_KNOWLEDGE[k], TACTIC_IDS);
    const result = chiSquare(rows);
    expect(result.statistic).toBeCloseTo(19.04, 2);
    expect(result.df).toBe(4);
    expect(Math.abs(result.statistic - REPORTED.chiSquareTacticCategory)).toBeGreaterThan(1);
  });

  it('끝내 풀린 비율이 두 무리의 비율 사이에 있다', () => {
    expect(REPORTED.resolved).toBeGreaterThanOrEqual(REPORTED.resolvedLow);
    expect(REPORTED.resolved).toBeLessThanOrEqual(REPORTED.resolvedHigh);
  });
});

describe('카이제곱 계산기 자체', () => {
  it('두 열이 정확히 같은 비율이면 0이다', () => {
    expect(chiSquare([[10, 20], [30, 60], [5, 10]]).statistic).toBeCloseTo(0, 12);
  });

  it('완전히 갈리면 Cramer V가 1이다', () => {
    const result = chiSquare([[40, 0], [0, 40]]);
    expect(result.cramersV).toBeCloseTo(1, 12);
    expect(result.df).toBe(1);
  });

  it('합이 0인 행은 자유도에서 빠진다', () => {
    expect(chiSquare([[10, 5], [0, 0], [5, 10]]).df).toBe(1);
  });

  it('빈 표는 0이다', () => {
    expect(chiSquare([]).statistic).toBe(0);
    expect(chiSquare([[0, 0]]).total).toBe(0);
  });

  it('열을 맞바꾸어도 통계량은 같다', () => {
    const rows: ContingencyRow[] = [[7, 3], [2, 9], [11, 4]];
    const flipped: ContingencyRow[] = rows.map(([a, b]) => [b, a]);
    expect(chiSquare(rows).statistic).toBeCloseTo(chiSquare(flipped).statistic, 12);
  });

  it('모든 칸을 같은 배수로 늘리면 통계량도 같은 배수로 는다', () => {
    const rows: ContingencyRow[] = [[7, 3], [2, 9], [11, 4]];
    const doubled: ContingencyRow[] = rows.map(([a, b]) => [a * 2, b * 2]);
    expect(chiSquare(doubled).statistic).toBeCloseTo(chiSquare(rows).statistic * 2, 10);
    // 반면 Cramer V는 표가 커져도 그대로다. 세기와 확실함은 다른 것이기 때문이다.
    expect(chiSquare(doubled).cramersV).toBeCloseTo(chiSquare(rows).cramersV, 10);
  });

  it('백분율과 분모가 서로를 되짚는다', () => {
    expect(impliedTotal(168, percentOf(168, 522))).toBeCloseTo(522, 9);
    expect(impliedTotal(0, 0)).toBeNull();
  });
});

describe('무엇을 권할 것인가', () => {
  it('가장 높은 점수 8.00은 두 건에서 나온 것이라 첫머리에 서지 못한다', () => {
    const ranked = rankCodes(null);
    expect(TACTIC_CODE.T12.mean).toBe(8);
    expect(TACTIC_CODE.T12.count).toBeLessThan(MIN_COUNT_FOR_RANK);
    expect(ranked[0].code).not.toBe('T12');
    expect(ranked[0].code).toBe('T6');
    expect(ranked[1].code).toBe('T4');
    expect(ranked.find((entry) => entry.code === 'T12')?.thin).toBe(true);
  });

  it('표본이 넉넉한 것끼리, 모자란 것끼리 각각 효과가 내림차순이다', () => {
    for (const k of [null, 'high', 'low'] as const) {
      const ranked = rankCodes(k);
      // 표본이 모자란 것은 모두 뒤쪽에 모여 있다.
      const firstThin = ranked.findIndex((entry) => entry.thin);
      if (firstThin >= 0) {
        expect(ranked.slice(firstThin).every((entry) => entry.thin)).toBe(true);
      }
      for (let i = 1; i < ranked.length; i += 1) {
        if (ranked[i - 1].thin !== ranked[i].thin) continue;
        expect(ranked[i - 1].effect).toBeGreaterThanOrEqual(ranked[i].effect);
      }
    }
  });

  it('표본이 모자란 칸은 전체 값으로 되돌리고 그 사실을 표시한다', () => {
    const ranked = rankCodes('low');
    const t9 = ranked.find((entry) => entry.code === 'T9');
    // 낮은 무리에서 T9는 두 건뿐이라 7.00이라는 평균을 믿을 수 없다.
    expect(TACTIC_CODE_BY_KNOWLEDGE.low.T9.count).toBeLessThan(MIN_COUNT_FOR_RANK);
    expect(t9?.pooled).toBe(true);
    expect(t9?.effect).toBe(TACTIC_CODE.T9.mean);
  });

  it('지식 무리를 바꾸면 순위가 실제로 달라진다', () => {
    const high = rankCodes('high').map((entry) => entry.code).join(',');
    const low = rankCodes('low').map((entry) => entry.code).join(',');
    expect(high).not.toBe(low);
  });

  it('정확도 불만에서는 사람들이 고르는 쪽과 잘 드는 쪽이 어긋난다', () => {
    const gap = gapFor('accuracy', null);
    expect(gap.preferred).toBe('error');
    expect(gap.mostEffective).toBe('specify');
    expect(gap.diverges).toBe(true);
    expect(gap.preferredEffect).toBeLessThan(gap.mostEffectiveEffect);
  });

  it('의도 불만에서는 두 쪽이 같다', () => {
    const gap = gapFor('intent', null);
    expect(gap.diverges).toBe(false);
  });

  it('아무것도 하지 않는 쪽으로 기운 불만에는 효과 점수가 없다', () => {
    for (const id of ['transparency', 'refusal', 'ethics'] as const) {
      expect(PROSE_PREFERENCE[id]).toBe('none');
      expect(gapFor(id, null).preferredEffect).toBeNull();
      expect(gapFor(id, null).diverges).toBe(true);
    }
  });

  it('고른 불만이 많아질수록 몫이 커지고, 일곱을 다 고르면 1이다', () => {
    const one = shareOf(['intent'], REPORTED.dissatisfactionTotal);
    const two = shareOf(['intent', 'format'], REPORTED.dissatisfactionTotal);
    expect(two).toBeGreaterThan(one);
    expect(shareOf(DISSATISFACTION_IDS, REPORTED.dissatisfactionTotal)).toBeCloseTo(1, 12);
    expect(shareOf([], REPORTED.dissatisfactionTotal)).toBe(0);
  });

  it('가장 아픈 불만은 정확도다 - 가장 흔한 것은 의도인데도 그렇다', () => {
    expect(severest(DISSATISFACTION_IDS)).toBe('accuracy');
    expect(DISSATISFACTION.accuracy.count).toBeLessThan(DISSATISFACTION.intent.count);
    expect(severest([])).toBeNull();
  });
});
