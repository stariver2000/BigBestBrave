/**
 * 옮겨 적기가 옳았는지, 그리고 규칙이 표대로 도는지 되짚는 시험.
 *
 * 표 1은 여덟 칸이 전부이므로 어림하지 않고 전수로 훑는다.
 * 표 2는 열두 칸 가운데 열 칸이므로 빈 두 칸이 어디인지까지 못박는다.
 * 6.4절과 8.1절의 백분율은 개수에서 앞으로 다시 계산해 견준다.
 */

import { describe, expect, it } from 'vitest';
import {
  ALPHA,
  AXES,
  CHART_RULE,
  CLICKS,
  COMPONENTS,
  CONTEXT_GRID,
  EXPLORATION,
  MATCH_QUALITY,
  MATCH_TOTAL,
  PASSIVE_READING,
  RECOMMENDATION_QUALITY,
  chartFor,
  contextCells,
  isLine,
  parseStatement,
  shapeAfter,
  type ChartKind,
  type Multiplicity,
  type Span,
} from '../../../src/core/contextualization';

const MULTIPLICITIES: Multiplicity[] = ['single', 'multiple'];
const SPANS: Span[] = ['point', 'duration'];

describe('표 2 - 맥락을 만들 수 있는 자리', () => {
  it('열두 칸 가운데 열 칸이 채워져 있다', () => {
    let filled = 0;
    for (const component of COMPONENTS) {
      for (const axis of AXES) if (CONTEXT_GRID[component][axis]) filled += 1;
    }
    expect(COMPONENTS.length * AXES.length).toBe(12);
    expect(filled).toBe(10);
    expect(contextCells()).toHaveLength(10);
  });

  it('빈 두 칸은 지표x개인과 시점x통계다', () => {
    const empty: string[] = [];
    for (const component of COMPONENTS) {
      for (const axis of AXES) if (!CONTEXT_GRID[component][axis]) empty.push(`${component}:${axis}`);
    }
    expect(empty.sort()).toEqual(['date:statistical', 'indicator:personalized']);
  });

  it('네 축 모두 적어도 한 조각에서는 쓰인다', () => {
    for (const axis of AXES) {
      expect(COMPONENTS.some((component) => CONTEXT_GRID[component][axis])).toBe(true);
    }
  });

  it('주체는 네 축을 모두 쓴다 - 유일하게 빈 칸이 없는 조각이다', () => {
    expect(AXES.every((axis) => CONTEXT_GRID.entity[axis])).toBe(true);
    for (const component of ['indicator', 'date'] as const) {
      expect(AXES.every((axis) => CONTEXT_GRID[component][axis])).toBe(false);
    }
  });
});

describe('표 1 - 그림 고르는 규칙 (여덟 칸 전수)', () => {
  it('여덟 칸이 논문에 적힌 그대로다', () => {
    const expected: Record<string, ChartKind> = {
      'point/single/single': 'bar',
      'point/single/multiple': 'bar',
      'point/multiple/single': 'bar',
      'point/multiple/multiple': 'groupedBar',
      'duration/single/single': 'singleLine',
      'duration/single/multiple': 'multiLine',
      'duration/multiple/single': 'multiLine',
      'duration/multiple/multiple': 'multiLinePerEntity',
    };
    let counted = 0;
    for (const span of SPANS) {
      for (const entities of MULTIPLICITIES) {
        for (const indicators of MULTIPLICITIES) {
          counted += 1;
          expect(chartFor({ span, entities, indicators })).toBe(expected[`${span}/${entities}/${indicators}`]);
          expect(CHART_RULE[span][entities][indicators]).toBe(expected[`${span}/${entities}/${indicators}`]);
        }
      }
    }
    expect(counted).toBe(8);
  });

  it('한 시점이면 언제나 막대고, 기간이면 언제나 선이다', () => {
    for (const entities of MULTIPLICITIES) {
      for (const indicators of MULTIPLICITIES) {
        expect(isLine(chartFor({ span: 'point', entities, indicators }))).toBe(false);
        expect(isLine(chartFor({ span: 'duration', entities, indicators }))).toBe(true);
      }
    }
  });

  it('여덟 칸에서 나오는 그림은 다섯 가지뿐이다', () => {
    const kinds = new Set<ChartKind>();
    for (const span of SPANS) {
      for (const entities of MULTIPLICITIES) {
        for (const indicators of MULTIPLICITIES) kinds.add(chartFor({ span, entities, indicators }));
      }
    }
    expect(kinds.size).toBe(5);
  });

  it('한 시점에서는 둘 다 여럿일 때만 그림이 달라진다', () => {
    // 막대는 한 시점의 세 칸을 모두 삼키고, 묶은 막대는 한 칸에만 나온다.
    const point = MULTIPLICITIES.flatMap((entities) =>
      MULTIPLICITIES.map((indicators) => chartFor({ span: 'point', entities, indicators })),
    );
    expect(point.filter((kind) => kind === 'bar')).toHaveLength(3);
    expect(point.filter((kind) => kind === 'groupedBar')).toHaveLength(1);
  });
});

describe('맥락을 고르면 모양이 정해진다', () => {
  it('고른 조각만 여럿이 되고 나머지는 하나로 남는다', () => {
    for (const cell of contextCells()) {
      const shape = shapeAfter(cell, 'point');
      expect(shape.entities === 'multiple').toBe(cell.component === 'entity');
      expect(shape.indicators === 'multiple').toBe(cell.component === 'indicator');
      expect(shape.span === 'duration').toBe(cell.component === 'date');
    }
  });

  it('원래 문장이 기간이면 어느 맥락을 골라도 기간 그대로다', () => {
    for (const cell of contextCells()) {
      expect(shapeAfter(cell, 'duration').span).toBe('duration');
    }
  });

  it('열 칸이 부르는 그림은 세 가지로 갈린다', () => {
    const fromPoint = new Set(contextCells().map((cell) => chartFor(shapeAfter(cell, 'point'))));
    // 주체 쪽과 지표 쪽 맥락은 한 시점이므로 막대, 시점 쪽 맥락은 기간이므로 선이 된다.
    expect(fromPoint).toEqual(new Set(['bar', 'singleLine']));
    const fromDuration = new Set(contextCells().map((cell) => chartFor(shapeAfter(cell, 'duration'))));
    expect(fromDuration).toEqual(new Set(['singleLine', 'multiLine']));
  });
});

describe('6.4절 - 파이프라인이 자료를 얼마나 맞췄는가', () => {
  it('백분율이 개수와 77에서 다시 계산된다', () => {
    for (const key of ['entity', 'date', 'indicator', 'all'] as const) {
      const cell = MATCH_QUALITY[key];
      expect(Math.abs((cell.matched / MATCH_TOTAL) * 100 - cell.percent)).toBeLessThan(0.06);
    }
  });

  it('셋을 모두 맞춘 문장은 셋 각각보다 많을 수 없다', () => {
    for (const key of ['entity', 'date', 'indicator'] as const) {
      expect(MATCH_QUALITY.all.matched).toBeLessThanOrEqual(MATCH_QUALITY[key].matched);
    }
  });

  /**
   * 셋 가운데 하나라도 틀린 문장은 많아야 각각 틀린 수의 합이다.
   * 한 문장이 둘 이상에서 틀리면 그만큼 겹쳐 세어지기 때문이다.
   */
  it('셋을 모두 맞추지 못한 문장 수가 각각의 실패 수의 합을 넘지 않는다', () => {
    const failures = (['entity', 'date', 'indicator'] as const).reduce(
      (sum, key) => sum + (MATCH_TOTAL - MATCH_QUALITY[key].matched),
      0,
    );
    expect(MATCH_TOTAL - MATCH_QUALITY.all.matched).toBeLessThanOrEqual(failures);
  });

  it('지표는 77개 문장에서 하나도 놓치지 않았다', () => {
    expect(MATCH_QUALITY.indicator.matched).toBe(MATCH_TOTAL);
    expect(MATCH_QUALITY.indicator.percent).toBe(100);
    // 가장 많이 틀린 것은 나라다. 논문도 그 까닭을 두 가지로 나누어 적었다.
    expect(MATCH_QUALITY.entity.matched).toBeLessThan(MATCH_QUALITY.date.matched);
  });

  it('다섯 점 만점의 평균은 모두 눈금 안에 있다', () => {
    for (const key of ['entity', 'date', 'indicator'] as const) {
      expect(MATCH_QUALITY[key].rating).toBeGreaterThan(1);
      expect(MATCH_QUALITY[key].rating).toBeLessThanOrEqual(5);
    }
    for (const key of ['meaningful', 'diverse', 'interesting', 'individual'] as const) {
      expect(RECOMMENDATION_QUALITY[key].mean).toBeGreaterThan(1);
      expect(RECOMMENDATION_QUALITY[key].mean).toBeLessThanOrEqual(5);
    }
  });

  it('상위 다섯 물음의 평균은 전체 평균을 감싼다', () => {
    const { individual } = RECOMMENDATION_QUALITY;
    expect(individual.topFiveLow).toBeLessThanOrEqual(individual.mean);
    expect(individual.topFiveHigh).toBeGreaterThanOrEqual(individual.mean);
  });

  it('가장 낮은 점수를 받은 것은 다양성이다', () => {
    const set = [RECOMMENDATION_QUALITY.meaningful.mean, RECOMMENDATION_QUALITY.interesting.mean];
    for (const other of set) expect(RECOMMENDATION_QUALITY.diverse.mean).toBeLessThan(other);
  });
});

describe('표 3 - 바깥 정보를 찾아본 횟수', () => {
  it('두 글을 합친 평균은 두 글의 평균 사이에 있다', () => {
    for (const key of ['withTool', 'baseline'] as const) {
      const low = Math.min(EXPLORATION.fertility[key], EXPLORATION.carbon[key]);
      const high = Math.max(EXPLORATION.fertility[key], EXPLORATION.carbon[key]);
      expect(EXPLORATION.total[key]).toBeGreaterThanOrEqual(low);
      expect(EXPLORATION.total[key]).toBeLessThanOrEqual(high);
    }
  });

  it('세 줄 모두 도구를 쓴 쪽이 더 많이 찾아보았다', () => {
    for (const key of ['fertility', 'carbon', 'total'] as const) {
      expect(EXPLORATION[key].withTool).toBeGreaterThan(EXPLORATION[key].baseline);
    }
  });

  /** 더 많이 찾아본 것과 그 차이가 뜻있는 것은 다른 이야기다. 한 글에서는 뜻있지 않았다. */
  it('탄소 배출 글에서는 차이가 뜻있지 않았다', () => {
    expect(EXPLORATION.carbon.p).toBeGreaterThan(ALPHA);
    expect(EXPLORATION.fertility.p).toBeLessThan(ALPHA);
    expect(EXPLORATION.total.p).toBeLessThan(ALPHA);
  });
});

describe('8.1절 - 사람들이 어디를 눌렀는가', () => {
  it('물음 누른 횟수는 지은 물음과 기본 물음으로 정확히 나뉜다', () => {
    const { total, generated, fallback } = CLICKS.questions;
    expect(generated + fallback).toBe(total);
    expect((generated / total) * 100).toBeCloseTo(68.75, 2);
    expect((fallback / total) * 100).toBeCloseTo(31.25, 2);
  });

  it('탐색을 시작한 방법 둘의 합은 전체보다 작다 - 세 번째 길이 있기 때문이다', () => {
    const { total, underline, freeForm } = CLICKS.starts;
    expect(underline + freeForm).toBeLessThan(total);
    expect(Math.abs((underline / total) * 100 - 60.8)).toBeLessThan(0.06);
  });

  it('논문이 스스로 적은 역효과의 사람 수가 참가자 수를 넘지 않는다', () => {
    for (const key of ['shallow', 'passive', 'nudged'] as const) {
      expect(PASSIVE_READING[key]).toBeLessThanOrEqual(PASSIVE_READING.participants);
    }
  });
});

describe('문장 가르기', () => {
  it('논문이 든 예를 세 조각으로 가른다', () => {
    const parsed = parseStatement("Korea's fertility rate dropped to 0.8 in 2019");
    expect(parsed.entity).toBe('Korea');
    expect(parsed.indicator).toBe('fertility rate');
    expect(parsed.date).toBe('2019');
    expect(parsed.span).toBe('point');
    expect(parsed.value).toBe('0.8');
    expect(parsed.confidence).toBe(1);
  });

  it('연도를 값으로 잘못 읽지 않는다', () => {
    // 2019가 값 자리로 새면 문장의 뜻이 통째로 뒤집힌다.
    expect(parseStatement('Korea fertility rate 2019').value).toBeNull();
  });

  it('연도가 둘이면 기간으로 본다', () => {
    const parsed = parseStatement('China population fell between 2019 and 2023');
    expect(parsed.span).toBe('duration');
    expect(parsed.date).toBe('2019–2023');
  });

  it('짧은 말이 긴 말을 가로채지 않는다', () => {
    // 'GDP'가 'GDP per capita'보다 먼저 걸리면 지표가 뭉개진다.
    expect(parseStatement('US GDP per capita in 2020').indicator).toBe('GDP per capita');
    expect(parseStatement('한국 합계출산율은 2019년 0.92였다').indicator).toBe('합계출산율');
  });

  it('못 가른 조각은 지어내지 않고 비워 둔다', () => {
    const parsed = parseStatement('그 수치는 지난해보다 크게 늘었다');
    expect(parsed.entity).toBeNull();
    expect(parsed.indicator).toBeNull();
    expect(parsed.date).toBeNull();
    expect(parsed.confidence).toBe(0);
  });

  it('확신도는 찾아낸 조각 수를 그대로 따른다', () => {
    expect(parseStatement('fertility rate').confidence).toBeCloseTo(1 / 3, 12);
    expect(parseStatement('Korea fertility rate').confidence).toBeCloseTo(2 / 3, 12);
    expect(parseStatement('').confidence).toBe(0);
  });
});
