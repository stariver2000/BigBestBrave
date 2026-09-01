/**
 * 옮겨 적기가 옳았는지 되짚는 시험.
 *
 * 표 3은 pdftotext에서 밑줄이 사라져 어느 칸이 기준값인지 헷갈리기 쉽다. 실제로 옮기다
 * 길이 행의 첫 칸(-2.253, 위치가 흔들릴 때의 개선값)을 기준값으로 잘못 읽을 뻔했다.
 * 그래서 대각선과 본문 서술의 맞물림을 시험으로 붙든다: 대각선은 4장의 정확도 기준값과
 * 같아야 하고, 본문이 말한 방향(위치가 길이를 개선, 넓이가 기울기를 무너뜨림)이
 * 행렬에서 그대로 읽혀야 한다.
 */

import { describe, expect, it } from 'vitest';
import {
  ACCURACY_BASELINE,
  CHANCE_LOG_ERROR,
  POPOUT_ACCURACY,
  POWER_CORRECTION,
  SEPARABILITY,
  TILT_EQUIVALENCE,
  WEBER_FITS,
  WORST_PAIR,
  accuracyRanking,
  curve,
  dissociation,
  leftSlope,
  makeTrial,
  minimalDifference,
  popoutRanking,
  rightSlope,
  separabilityBaseline,
  separabilityShift,
  worstPairGapToChance,
  type WeberParams,
} from '../../../src/core/channels';

describe('표 3 - 분리성 행렬', () => {
  it('대각선이 4장의 정확도 기준값과 같다', () => {
    for (const [channel, baseline] of Object.entries(ACCURACY_BASELINE)) {
      expect(separabilityBaseline(channel), channel).toBe(baseline);
    }
  });

  it('본문의 방향이 행렬에서 그대로 읽힌다: 위치는 길이를 낫게 한다', () => {
    // "Position variation improved length performance" - 개선이므로 음의 이동이어야 한다.
    const shift = separabilityShift('length', 'position');
    expect(shift).not.toBeNull();
    expect(shift as number).toBeLessThan(0);
    expect(SEPARABILITY.length.position).toBe(-2.253);
    expect(SEPARABILITY.length.length).toBe(-2.086);
  });

  it('가장 큰 무너짐은 넓이가 흔들릴 때의 기울기 판단이다', () => {
    expect(separabilityShift('tilt', 'area')).toBeCloseTo(WORST_PAIR.to - WORST_PAIR.from, 10);
    // 행렬의 모든 (양수) 이동 가운데 이것이 가장 크다.
    let biggest = -Infinity;
    let where = '';
    for (const primary of Object.keys(SEPARABILITY)) {
      for (const secondary of Object.keys(SEPARABILITY[primary])) {
        if (secondary === primary) continue;
        const shift = separabilityShift(primary, secondary);
        if (shift !== null && shift > biggest) {
          biggest = shift;
          where = `${primary}/${secondary}`;
        }
      }
    }
    expect(where).toBe('tilt/area');
  });

  it('그 무너진 값은 찍기 수준 언저리다', () => {
    // 본문: "bringing tilt performance near the chance level (~ -1.33)"
    expect(worstPairGapToChance()).toBeLessThan(0.05);
    expect(WORST_PAIR.to).toBeGreaterThan(CHANCE_LOG_ERROR - 0.05);
  });

  it('길이 판단은 어떤 채널이 흔들려도 기준값 언저리에 남는다', () => {
    // 본문: "Length judgments remain close to baseline across all tested secondary channels"
    for (const secondary of Object.keys(SEPARABILITY.length)) {
      const shift = separabilityShift('length', secondary);
      if (shift === null) continue;
      expect(Math.abs(shift), secondary).toBeLessThan(0.2);
    }
  });

  it('시험하지 않은 짝은 null이고 0으로 채우지 않았다', () => {
    expect(SEPARABILITY.tilt.position).toBeNull();
    expect(SEPARABILITY.area.length).toBeNull();
    expect(separabilityShift('tilt', 'position')).toBeNull();
  });
});

describe('정확도와 거듭제곱 보정', () => {
  it('정확도 순위는 기울기-길이-곡률-채도-넓이-밝기 순이고 위치가 값 없이 맨 위다', () => {
    const ranking = accuracyRanking();
    expect(ranking.map((entry) => entry.id)).toEqual([
      'position', 'tilt', 'length', 'curvature', 'saturation', 'area', 'luminance',
    ]);
    expect(ranking[0].value).toBeNull();
  });

  it('기울기와 위치의 동치 폭은 채널 간 큰 격차보다 작다', () => {
    // +-0.2의 동치 폭이 뜻을 가지려면 채널 사이 격차가 그보다 커야 한다.
    expect(ACCURACY_BASELINE.tilt - ACCURACY_BASELINE.luminance).toBeLessThan(-TILT_EQUIVALENCE.margin);
  });

  it('넓이의 보정 지수가 신뢰구간 안에 있고, 절반 어림(0.5)이 구간 위끝 근처에 있다', () => {
    const { alpha, ciLow, ciHigh } = POWER_CORRECTION.area;
    expect(alpha).toBeGreaterThan(ciLow);
    expect(alpha).toBeLessThan(ciHigh);
    // 본문: 변 길이 어림이 내놓는 0.5보다 "조금 아래"다.
    expect(alpha).toBeLessThan(0.5);
  });

  it('색 채널의 보정 이득은 넓이의 십분의 일 크기다', () => {
    // 본문: "an order of magnitude smaller than area's 0.531-unit improvement"
    expect(POWER_CORRECTION.saturation.improvement * 10).toBeLessThanOrEqual(POWER_CORRECTION.area.improvement + 0.1);
    expect(POWER_CORRECTION.luminance.improvement).toBeLessThan(POWER_CORRECTION.area.improvement / 10);
  });

  it('길이는 과대추정 쪽으로 굽는다(alpha < 1)', () => {
    expect(POWER_CORRECTION.length.alpha).toBeLessThan(1);
    expect(POWER_CORRECTION.length.alpha).toBeGreaterThan(POWER_CORRECTION.area.alpha);
  });
});

describe('표 1 - Anchored Harmonic Weber 적합', () => {
  it('적합도는 모두 0과 1 사이이고 채도가 가장 높다', () => {
    for (const [channel, fit] of Object.entries(WEBER_FITS)) {
      expect(fit.r2, channel).toBeGreaterThan(0);
      expect(fit.r2, channel).toBeLessThanOrEqual(1);
    }
    const best = Object.entries(WEBER_FITS).sort((a, b) => b[1].r2 - a[1].r2)[0][0];
    expect(best).toBe('saturation');
  });

  it('오른끝 기울기가 음수인 채널은 곡률과 채도뿐이다 - 그쪽 끝이 닻이 아니라는 뜻이다', () => {
    const negative = Object.entries(WEBER_FITS)
      .filter(([, fit]) => fit.right < 0)
      .map(([channel]) => channel)
      .sort();
    expect(negative).toEqual(['curvature', 'saturation']);
  });

  it('오른끝 닻이 가장 센 것은 길이다', () => {
    const strongest = Object.entries(WEBER_FITS).sort((a, b) => b[1].right - a[1].right)[0][0];
    expect(strongest).toBe('length');
    expect(WEBER_FITS.length.right).toBeCloseTo(2.0544, 4);
  });
});

describe('모형의 성질 (식 2)', () => {
  const params: WeberParams = { w0: 0.05, wL: 0.12, wR: 0.4, xmax: 100, offset: 0 };

  it('닻 항은 양 끝에서 사라진다', () => {
    expect(minimalDifference(0, params)).toBeCloseTo(0, 12);
    expect(minimalDifference(params.xmax, params)).toBeCloseTo((params.w0 * params.xmax) / params.xmax, 12);
  });

  it('끝점 기울기가 논문의 식과 수치미분으로 맞는다', () => {
    const h = 1e-6;
    const numericLeft = (minimalDifference(h, params) - minimalDifference(0, params)) / h;
    expect(numericLeft).toBeCloseTo(leftSlope(params), 3);
    const numericRight =
      (minimalDifference(params.xmax, params) - minimalDifference(params.xmax - h, params)) / h;
    // 오른끝의 '내림 비율'은 wR - w0/xmax 이고, 미분은 그 부호를 뒤집은 값이다.
    // 즉 -f'(xmax) = rightSlope 이어야 한다.
    expect(-numericRight).toBeCloseTo(rightSlope(params), 3);
  });

  it('안쪽 어딘가에서 닻 항이 봉우리를 이룬다', () => {
    const points = curve(params, 200);
    const interiorMax = Math.max(...points.slice(1, -1).map((point) => point.y));
    expect(interiorMax).toBeGreaterThan(points[0].y);
    expect(interiorMax).toBeGreaterThan(points[points.length - 1].y);
  });

  it('정의역 밖은 끝점으로 잘린다', () => {
    expect(minimalDifference(-5, params)).toBe(minimalDifference(0, params));
    expect(minimalDifference(500, params)).toBe(minimalDifference(params.xmax, params));
  });
});

describe('튀어나옴', () => {
  it('정답률 순위의 첫째는 넓이, 꼴찌는 밝기다', () => {
    const ranking = popoutRanking();
    expect(ranking[0].id).toBe('area');
    expect(ranking[ranking.length - 1].id).toBe('luminance');
    expect(ranking).toHaveLength(8);
  });

  it('정답률은 모두 찍기보다 높고 1보다 낮다', () => {
    for (const [channel, value] of Object.entries(POPOUT_ACCURACY)) {
      expect(value, channel).toBeGreaterThan(0.5);
      expect(value, channel).toBeLessThan(1);
    }
  });

  it('어긋남: 넓이는 정확도 끝줄이지만 튀어나옴 1등, 길이는 정확도 윗줄이지만 튀어나옴 중하위다', () => {
    const gap = dissociation();
    expect(gap.area.accuracyRank).toBeGreaterThanOrEqual(6);
    expect(gap.area.popoutRank).toBe(1);
    expect(gap.length.accuracyRank).toBeLessThanOrEqual(3);
    expect(gap.length.popoutRank).toBeGreaterThanOrEqual(6);
  });

  it('판 짜기는 같은 씨앗에서 같고, 다른 하나만 값이 다르다', () => {
    const a = makeTrial(11, 16, 0.3);
    const b = makeTrial(11, 16, 0.3);
    expect(a).toEqual(b);
    expect(a.values).toHaveLength(16);
    const distinct = a.values.filter((value) => value !== a.base);
    expect(distinct).toEqual([a.deviant]);
    expect(a.values[a.odd]).toBe(a.deviant);
  });

  it('차이를 키우면 다른 하나가 더 멀어진다', () => {
    const small = makeTrial(3, 16, 0.05);
    const large = makeTrial(3, 16, 0.4);
    expect(large.deviant - large.base).toBeGreaterThan(small.deviant - small.base);
  });
});
