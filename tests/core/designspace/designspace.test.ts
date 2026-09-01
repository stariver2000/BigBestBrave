/**
 * 분류표를 옳게 옮겼는지, 그리고 공간의 크기를 옳게 세는지 되짚는 시험.
 *
 * 분류표는 저자들의 자료에서 옮겼고 논문의 표 1~7이 같은 것을 산문으로 적어 두었다.
 * 두 곳이 어긋나는 자리가 있으므로(산문은 코드 이름을 풀어 쓴다) 여기서는 갈래별 차원 수와
 * 본문이 이름까지 짚은 코드가 실제로 분류표에 있는지를 붙들어 둔다.
 */

import { describe, expect, it } from 'vitest';
import {
  ASPECTS,
  CORPUS,
  DIMENSIONS,
  FOUNDATION_MODEL_PAPERS,
  UNDER_EXPLORED,
  UNDER_REPRESENTED,
  configurationCeiling,
  configurationFloor,
  coverageOf,
  digitsOf,
  dimensionById,
  dimensionsOf,
  isDecided,
  scientific,
  toggleCode,
  totalCodes,
  type Picks,
} from '../../../src/core/designspace';

describe('분류표를 옳게 옮겼는가', () => {
  it('다섯 갈래에 서른아홉 차원이 있다', () => {
    expect(ASPECTS).toHaveLength(CORPUS.aspects);
    expect(DIMENSIONS).toHaveLength(39);
  });

  it('갈래마다의 차원 수가 저자들의 자료와 같다', () => {
    const expected: Record<string, number> = {
      task: 5, user: 8, technology: 10, interaction: 10, ecosystem: 6,
    };
    for (const aspect of ASPECTS) expect(dimensionsOf(aspect)).toHaveLength(expected[aspect]);
    // 갈래별 합이 전체와 같다. 어느 차원도 갈래 없이 떠 있지 않다.
    expect(ASPECTS.reduce((sum, aspect) => sum + dimensionsOf(aspect).length, 0)).toBe(DIMENSIONS.length);
  });

  it('코드는 모두 196개다', () => {
    expect(totalCodes()).toBe(196);
  });

  it('차원 id가 겹치지 않고, 한 차원 안에서 코드도 겹치지 않는다', () => {
    expect(new Set(DIMENSIONS.map((dimension) => dimension.id)).size).toBe(DIMENSIONS.length);
    for (const dimension of DIMENSIONS) {
      expect(new Set(dimension.codes).size).toBe(dimension.codes.length);
      // 값이 하나뿐인 차원은 차원이 아니다. 고를 것이 없으면 설계 결정도 없다.
      expect(dimension.codes.length).toBeGreaterThanOrEqual(2);
    }
  });

  it("코드가 두 개뿐인 차원은 Scalability와 Digital Infrastructure 둘이다", () => {
    const thin = DIMENSIONS.filter((dimension) => dimension.codes.length === 2).map((dimension) => dimension.id);
    expect(thin.sort()).toEqual(['digital-infrastructure', 'scalability']);
    // 그 둘은 5.2절이 적게 다뤄졌다고 이름을 짚은 차원이기도 하다.
    for (const id of thin) expect(UNDER_REPRESENTED).toContain(id);
  });

  it('가장 코드가 많은 차원은 Purpose다', () => {
    const widest = [...DIMENSIONS].sort((a, b) => b.codes.length - a.codes.length)[0];
    expect(widest.id).toBe('purpose');
    expect(widest.codes).toHaveLength(11);
  });
});

describe('본문이 이름을 짚은 것이 분류표에 실제로 있는가', () => {
  it('적게 다뤄졌다는 차원이 모두 분류표에 있다', () => {
    for (const id of UNDER_REPRESENTED) expect(dimensionById(id)).toBeDefined();
  });

  it('생태계 갈래는 여섯 차원이 모두 적게 다뤄진 쪽에 들어 있다', () => {
    // 5.2절: "most ecosystem dimensions are ... under-represented"
    for (const dimension of dimensionsOf('ecosystem')) expect(UNDER_REPRESENTED).toContain(dimension.id);
  });

  /** 이것이 이 파일에서 가장 중요한 시험이다. 코드 이름을 잘못 옮기면 여기서 걸린다. */
  it('본문이 짚은 코드가 그 차원의 코드 목록에 그대로 있다', () => {
    for (const { dimension: id, code } of UNDER_EXPLORED) {
      const dimension = dimensionById(id);
      expect(dimension, id).toBeDefined();
      expect(dimension?.codes, `${id} / ${code}`).toContain(code);
    }
  });

  it('기반 모델 논문은 세 해 사이에 늘었다', () => {
    expect(FOUNDATION_MODEL_PAPERS[2023]).toBeGreaterThan(FOUNDATION_MODEL_PAPERS[2020]);
    expect(FOUNDATION_MODEL_PAPERS[2023]).toBe(13);
    // 그 코드도 분류표에 있어야 한다.
    expect(dimensionById('model-type')?.codes).toContain('Foundation model');
  });
});

describe('공간의 크기', () => {
  it('차원마다 하나씩 고를 때의 가짓수가 정확히 79475556016875110400000000이다', () => {
    expect(configurationFloor()).toBe(79475556016875110400000000n);
    expect(digitsOf(configurationFloor())).toBe(26);
  });

  it('부분집합까지 세면 쉰여덟 자리다', () => {
    const ceiling = configurationCeiling();
    expect(digitsOf(ceiling)).toBe(58);
    expect(ceiling).toBe(7302282291193782508901957304436372696390884158893974609375n);
  });

  it('아래끝이 위끝보다 작다', () => {
    expect(configurationFloor()).toBeLessThan(configurationCeiling());
  });

  /** 곱셈을 두 번 다른 방식으로 해 본다. 한쪽이 틀리면 어긋난다. */
  it('아래끝을 갈래별로 나누어 곱해도 같은 값이 나온다', () => {
    const byAspect = ASPECTS.reduce(
      (product, aspect) =>
        product * dimensionsOf(aspect).reduce((inner, dimension) => inner * BigInt(dimension.codes.length), 1n),
      1n,
    );
    expect(byAspect).toBe(configurationFloor());
  });

  it('코드 수의 합과 곱은 다른 종류의 값이다', () => {
    // 196은 이름표의 개수이고 26자리 수는 공간의 넓이다. 섞어 말하지 않기 위해 함께 붙들어 둔다.
    expect(BigInt(totalCodes())).toBeLessThan(configurationFloor());
  });

  it('읽은 논문 115편은 공간의 아래끝에 견주면 없는 것과 같다', () => {
    expect(BigInt(CORPUS.reviewed)).toBeLessThan(configurationFloor());
    expect(digitsOf(BigInt(CORPUS.reviewed))).toBe(3);
  });

  it('유효숫자를 반올림하지 않고 잘라 온다', () => {
    // 반올림하면 999...가 10^n으로 올라가 자릿수가 하나 늘어 버린다.
    expect(scientific(999999999n, 3)).toEqual({ mantissa: '9.99', exponent: 8 });
    expect(scientific(79475556016875110400000000n, 3)).toEqual({ mantissa: '7.94', exponent: 25 });
    expect(scientific(7n, 3)).toEqual({ mantissa: '7', exponent: 0 });
  });
});

describe('내가 무엇을 안 보고 있는가', () => {
  const everything: Picks = Object.fromEntries(DIMENSIONS.map((dimension) => [dimension.id, [dimension.codes[0]]]));

  it('아무것도 안 고르면 서른아홉 칸이 모두 사각지대다', () => {
    const coverage = coverageOf({});
    expect(coverage.decided).toBe(0);
    expect(coverage.blind).toHaveLength(39);
    for (const entry of coverage.byAspect) expect(entry.share).toBe(0);
  });

  it('모두 고르면 사각지대가 없다', () => {
    const coverage = coverageOf(everything);
    expect(coverage.decided).toBe(39);
    expect(coverage.blind).toHaveLength(0);
    expect(coverage.shared).toHaveLength(0);
    expect(coverage.alone).toHaveLength(0);
    for (const entry of coverage.byAspect) expect(entry.share).toBe(1);
  });

  it('사각지대는 둘로 정확히 갈린다 - 남들도 안 보는 것과 나만 안 보는 것', () => {
    for (const picks of [{}, { purpose: ['Narrative'] }, everything]) {
      const coverage = coverageOf(picks);
      expect(coverage.shared.length + coverage.alone.length).toBe(coverage.blind.length);
      // 두 무리는 겹치지 않는다.
      const sharedIds = new Set(coverage.shared.map((dimension) => dimension.id));
      for (const dimension of coverage.alone) expect(sharedIds.has(dimension.id)).toBe(false);
    }
  });

  it('정한 것과 안 정한 것의 합이 언제나 서른아홉이다', () => {
    for (const picks of [{}, { audience: ['Implied'], locale: ['Local writing'] }, everything]) {
      const coverage = coverageOf(picks);
      expect(coverage.decided + coverage.blind.length).toBe(coverage.total);
      expect(coverage.byAspect.reduce((sum, entry) => sum + entry.decided, 0)).toBe(coverage.decided);
    }
  });

  it('생태계를 통째로 비우면 사각지대가 모두 남들도 안 보는 쪽에 들어간다', () => {
    const picks: Picks = Object.fromEntries(
      DIMENSIONS.filter((dimension) => dimension.aspect !== 'ecosystem').map((dimension) => [
        dimension.id,
        [dimension.codes[0]],
      ]),
    );
    const coverage = coverageOf(picks);
    expect(coverage.blind).toHaveLength(6);
    expect(coverage.alone).toHaveLength(0);
    expect(coverage.shared).toHaveLength(6);
  });

  it('코드를 넣었다 빼면 처음으로 돌아온다', () => {
    const once = toggleCode({}, 'purpose', 'Narrative');
    expect(isDecided(once, 'purpose')).toBe(true);
    const twice = toggleCode(once, 'purpose', 'Narrative');
    expect(isDecided(twice, 'purpose')).toBe(false);
    expect(Object.keys(twice)).toHaveLength(0);
  });

  it('한 차원에 코드를 여럿 둘 수 있다', () => {
    const picks = toggleCode(toggleCode({}, 'purpose', 'Narrative'), 'purpose', 'Persuasive');
    expect(picks.purpose).toEqual(['Narrative', 'Persuasive']);
    // 그래도 차원 하나는 하나로 센다.
    expect(coverageOf(picks).decided).toBe(1);
  });
});
