import { describe, expect, it } from 'vitest';
import {
  CATEGORIES,
  DEFAULT_SPEC,
  DESIGN_GOALS,
  SERIES,
  STUDY,
  SURVEY_ITEMS,
  TASKS,
  TARGET_SPEC,
  VALUES,
  applyEdit,
  autoMax,
  categoryTotal,
  changedLines,
  effectiveMax,
  generateCode,
  layoutBars,
  lineCount,
  reachedTarget,
  remainingEdits,
  sameSpec,
  touchedNodes,
  type Spec,
} from '@core/chartspec';

/**
 * 옮겨 적기와 계산 검증.
 *
 * 논문(PacificVis 2026, doi:10.1109/pacificvis68791.2026.00014)의 수치를
 * 다른 표기에서 되짚고, 명세→코드→그림이 한 상태에서 나오는지 확인한다.
 * 그림 4·5의 막대값은 옮기지 않았으므로 검사하지 않는다.
 */
describe('논문 수치 옮겨 적기', () => {
  it('참가자 셈이 총계와 맞는다', () => {
    expect(STUDY.males + STUDY.females).toBe(STUDY.participants);
    const { fivePlus, threeToFour, oneToTwo } = STUDY.codingYears;
    expect(fivePlus + threeToFour + oneToTwo).toBe(STUDY.participants);
    expect(STUDY.d3Experience.yes + STUDY.d3Experience.no).toBe(STUDY.participants);
  });

  it('성공한 사람 수가 참가자 수를 넘지 않는다', () => {
    for (const subtask of [STUDY.success.subtask1, STUDY.success.subtask2]) {
      expect(subtask.baseline).toBeLessThanOrEqual(STUDY.participants);
      expect(subtask.directVis).toBeLessThanOrEqual(STUDY.participants);
    }
  });

  it('결과가 뒤섞여 있다 - 소과제 1은 DirectVis가 낫고 소과제 2는 아니다', () => {
    // 논문이 정직하게 보고한 혼합 결과다. 페이지도 이것을 앞쪽에 적는다.
    expect(STUDY.success.subtask1.directVis).toBeGreaterThan(STUDY.success.subtask1.baseline);
    expect(STUDY.success.subtask2.directVis).toBeLessThan(STUDY.success.subtask2.baseline);
    expect(STUDY.time.subtask1.directVis.mean).toBeLessThan(STUDY.time.subtask1.baseline.mean);
    expect(STUDY.time.subtask2.directVis.mean).toBeGreaterThan(STUDY.time.subtask2.baseline.mean);
  });

  it('전체 상호작용 수는 유의하지 않은데 소과제 1만 유의하다', () => {
    // p = .055는 관례의 문턱을 아슬아슬하게 넘지 못한다. 그대로 옮긴다.
    expect(STUDY.totalInteractions.all.p).toBeGreaterThan(0.05);
    expect(STUDY.totalInteractions.subtask1.p).toBeLessThanOrEqual(0.05);
    expect(STUDY.totalInteractions.subtask2.p).toBeGreaterThan(0.05);
  });

  it('자연어 프롬프트는 어느 소과제에서나 DirectVis가 적다', () => {
    for (const key of ['all', 'subtask1', 'subtask2'] as const) {
      const row = STUDY.prompts[key];
      expect(row.directVis.mean, key).toBeLessThan(row.baseline.mean);
      expect(row.p, key).toBeLessThanOrEqual(0.05);
    }
  });

  it('소과제별 평균의 합이 전체 평균과 어긋나지 않는다', () => {
    // 소과제 둘의 합이 전체와 같아야 한다(같은 사람의 같은 시행을 나눈 것이다).
    const close = (a: number, b: number) => Math.abs(a - b) < 0.02;
    for (const family of [STUDY.totalInteractions, STUDY.prompts, STUDY.codeEdits]) {
      expect(
        close(family.subtask1.baseline.mean + family.subtask2.baseline.mean, family.all.baseline.mean),
      ).toBe(true);
      expect(
        close(family.subtask1.directVis.mean + family.subtask2.directVis.mean, family.all.directVis.mean),
      ).toBe(true);
    }
  });

  it('설문 여섯 문항이 유의·비유의로 정확히 갈린다', () => {
    expect(SURVEY_ITEMS).toHaveLength(6);
    const split = [...STUDY.surveySignificant, ...STUDY.surveyNotSignificant];
    expect(new Set(split).size).toBe(SURVEY_ITEMS.length);
    for (const item of SURVEY_ITEMS) {
      expect(split).toContain(item);
    }
  });

  it('설계 목표 셋과 과제 둘이 있다', () => {
    expect(DESIGN_GOALS).toHaveLength(3);
    expect(TASKS).toHaveLength(2);
    for (const task of TASKS) {
      expect(task.subtask1).toBeTruthy();
      expect(task.subtask2).toBeTruthy();
    }
  });

  it('시각화 경험 평균이 밝힌 범위 안에 있다', () => {
    const [low, high] = STUDY.visExperience.range;
    expect(STUDY.visExperience.mean).toBeGreaterThanOrEqual(low);
    expect(STUDY.visExperience.mean).toBeLessThanOrEqual(high);
  });
});

describe('명세와 조작', () => {
  it('기본 명세는 묶음이고 상호작용이 없다', () => {
    expect(DEFAULT_SPEC.mode).toBe('grouped');
    expect(DEFAULT_SPEC.interaction).toBe('none');
    expect(reachedTarget(DEFAULT_SPEC)).toBe(false);
  });

  it('목표는 쌓기 + 클릭 흐리기다 (논문 과제 1)', () => {
    expect(TARGET_SPEC.mode).toBe('stacked');
    expect(TARGET_SPEC.interaction).toBe('clickDim');
  });

  it('조작이 원본을 건드리지 않는다', () => {
    const before = { ...DEFAULT_SPEC, order: [...DEFAULT_SPEC.order] };
    applyEdit(DEFAULT_SPEC, { kind: 'toMode', mode: 'stacked' });
    expect(sameSpec(DEFAULT_SPEC, before)).toBe(true);
  });

  it('모양을 바꾸면 손으로 고정한 y축은 놓아준다', () => {
    const pinned = applyEdit(DEFAULT_SPEC, { kind: 'setYMax', value: 60 });
    expect(pinned.yMax).toBe(60);
    const switched = applyEdit(pinned, { kind: 'toMode', mode: 'stacked' });
    expect(switched.yMax).toBeNull();
  });

  it('계열을 옮기면 순서가 바뀌고 개수는 그대로다', () => {
    const moved = applyEdit(DEFAULT_SPEC, { kind: 'moveSeries', series: '겨울', to: 0 });
    expect(moved.order[0]).toBe('겨울');
    expect(moved.order).toHaveLength(SERIES.length);
    expect(new Set(moved.order).size).toBe(SERIES.length);
  });

  it('없는 계열을 옮기면 아무 일도 없다', () => {
    const same = applyEdit(DEFAULT_SPEC, { kind: 'moveSeries', series: '없음', to: 0 });
    expect(sameSpec(same, DEFAULT_SPEC)).toBe(true);
  });

  it('자리를 벗어난 옮기기는 끝으로 붙는다', () => {
    const moved = applyEdit(DEFAULT_SPEC, { kind: 'moveSeries', series: '봄', to: 99 });
    expect(moved.order[moved.order.length - 1]).toBe('봄');
  });

  it('남은 조작을 다 밟으면 목표에 닿는다', () => {
    let spec: Spec = DEFAULT_SPEC;
    const edits = remainingEdits(spec);
    expect(edits.length).toBeGreaterThan(0);
    for (const edit of edits) spec = applyEdit(spec, edit);
    expect(reachedTarget(spec)).toBe(true);
    // 닿은 뒤에는 남은 조작이 없다.
    expect(remainingEdits(spec)).toHaveLength(0);
  });

  it('조작마다 건드리는 마디가 정해져 있다', () => {
    expect(touchedNodes({ kind: 'toMode', mode: 'stacked' })).toContain('marks');
    expect(touchedNodes({ kind: 'toMode', mode: 'stacked' })).toContain('yAxis');
    expect(touchedNodes({ kind: 'toggleLegend' })).toEqual(['legend']);
  });
});

describe('축 눈금', () => {
  it('묶음의 위끝은 가장 큰 값 하나다', () => {
    // VALUES의 최댓값은 남쪽 여름 47이다.
    expect(autoMax(DEFAULT_SPEC)).toBe(47);
  });

  it('쌓기의 위끝은 가장 큰 합계다', () => {
    const stacked = applyEdit(DEFAULT_SPEC, { kind: 'toMode', mode: 'stacked' });
    // 북쪽 32+18+27+45 = 122, 가운데 114, 남쪽 107 -> 122
    expect(autoMax(stacked)).toBe(122);
    expect(categoryTotal(stacked, '북쪽')).toBe(122);
  });

  it('손으로 고정하면 그 값을 쓴다', () => {
    const pinned = applyEdit(DEFAULT_SPEC, { kind: 'setYMax', value: 80 });
    expect(effectiveMax(pinned)).toBe(80);
    expect(effectiveMax(DEFAULT_SPEC)).toBe(autoMax(DEFAULT_SPEC));
  });
});

describe('막대 자리', () => {
  it('묶음은 칸마다 계열 수만큼 막대가 선다', () => {
    const bars = layoutBars(DEFAULT_SPEC);
    expect(bars).toHaveLength(CATEGORIES.length * SERIES.length);
    for (const bar of bars) {
      expect(bar.y).toBe(0);
      expect(bar.height).toBeGreaterThan(0);
      expect(bar.height).toBeLessThanOrEqual(1);
      expect(bar.x).toBeGreaterThanOrEqual(0);
      expect(bar.x + bar.width).toBeLessThanOrEqual(1.0001);
    }
  });

  it('쌓기는 같은 칸의 막대가 위로 쌓인다', () => {
    const stacked = applyEdit(DEFAULT_SPEC, { kind: 'toMode', mode: 'stacked' });
    const bars = layoutBars(stacked).filter((bar) => bar.category === '북쪽');
    expect(bars).toHaveLength(SERIES.length);
    // 아래 막대의 꼭대기가 다음 막대의 바닥이다.
    for (let i = 1; i < bars.length; i += 1) {
      expect(bars[i].y).toBeCloseTo(bars[i - 1].y + bars[i - 1].height, 12);
    }
    // 가장 큰 칸은 꼭대기가 정확히 1이다.
    const top = bars[bars.length - 1];
    expect(top.y + top.height).toBeCloseTo(1, 12);
  });

  it('쌓기에서 같은 칸의 막대는 폭과 x가 같다', () => {
    const stacked = applyEdit(DEFAULT_SPEC, { kind: 'toMode', mode: 'stacked' });
    const bars = layoutBars(stacked).filter((bar) => bar.category === '가운데');
    for (const bar of bars) {
      expect(bar.x).toBeCloseTo(bars[0].x, 12);
      expect(bar.width).toBeCloseTo(bars[0].width, 12);
    }
  });

  it('막대 높이가 값에 비례한다', () => {
    const bars = layoutBars(DEFAULT_SPEC);
    const max = autoMax(DEFAULT_SPEC);
    for (const bar of bars) {
      expect(bar.height).toBeCloseTo(VALUES[bar.category][bar.series] / max, 12);
    }
  });

  it('계열 순서를 바꾸면 막대 차례가 바뀐다', () => {
    const moved = applyEdit(DEFAULT_SPEC, { kind: 'moveSeries', series: '겨울', to: 0 });
    const bars = layoutBars(moved).filter((bar) => bar.category === '북쪽');
    expect(bars[0].series).toBe('겨울');
  });
});

describe('코드 짓기', () => {
  it('명세가 같으면 코드도 같다 (한 상태에서 나온다)', () => {
    expect(generateCode(DEFAULT_SPEC)).toEqual(generateCode(DEFAULT_SPEC));
  });

  it('묶음과 쌓기의 마크 블록이 다르다', () => {
    const grouped = generateCode(DEFAULT_SPEC).find((block) => block.nodeId === 'marks');
    const stacked = generateCode(
      applyEdit(DEFAULT_SPEC, { kind: 'toMode', mode: 'stacked' }),
    ).find((block) => block.nodeId === 'marks');
    expect(grouped?.lines.join('\n')).toContain('scaleBand');
    expect(stacked?.lines.join('\n')).toContain('d3.stack');
  });

  it('상호작용이 없으면 그 블록도 없다', () => {
    const none = generateCode(DEFAULT_SPEC);
    expect(none.some((block) => block.nodeId === 'interaction')).toBe(false);
    const withClick = generateCode(
      applyEdit(DEFAULT_SPEC, { kind: 'setInteraction', interaction: 'clickDim' }),
    );
    expect(withClick.some((block) => block.nodeId === 'interaction')).toBe(true);
  });

  it('범례를 끄면 그 블록이 사라진다', () => {
    const off = generateCode(applyEdit(DEFAULT_SPEC, { kind: 'toggleLegend' }));
    expect(off.some((block) => block.nodeId === 'legend')).toBe(false);
  });

  it('손으로 고정한 y축은 코드에도 그렇게 적힌다', () => {
    const pinned = generateCode(applyEdit(DEFAULT_SPEC, { kind: 'setYMax', value: 80 }));
    const axis = pinned.find((block) => block.nodeId === 'yAxis');
    expect(axis?.lines.join('\n')).toContain('손으로 고정');
    expect(axis?.lines.join('\n')).toContain('80');
  });

  it('제목에 든 따옴표를 흘리지 않는다', () => {
    const tricky = generateCode(applyEdit(DEFAULT_SPEC, { kind: 'setTitle', text: "it's fine" }));
    const title = tricky.find((block) => block.nodeId === 'title');
    expect(title?.lines.join('\n')).toContain("it\\'s fine");
  });

  it('손짓 한 번이 코드 여러 줄을 바꾼다 - 이 페이지의 요점', () => {
    const before = generateCode(DEFAULT_SPEC);
    const after = generateCode(applyEdit(DEFAULT_SPEC, { kind: 'toMode', mode: 'stacked' }));
    const changed = changedLines(before, after);
    expect(changed).toBeGreaterThan(5);
    expect(lineCount(before)).toBeGreaterThan(0);
  });

  it('아무것도 안 바꾸면 바뀐 줄이 없다', () => {
    const code = generateCode(DEFAULT_SPEC);
    expect(changedLines(code, code)).toBe(0);
  });

  it('블록이 생기거나 사라지면 그 줄을 모두 센다', () => {
    const none = generateCode(DEFAULT_SPEC);
    const withClick = generateCode(
      applyEdit(DEFAULT_SPEC, { kind: 'setInteraction', interaction: 'clickDim' }),
    );
    const block = withClick.find((entry) => entry.nodeId === 'interaction');
    expect(changedLines(none, withClick)).toBe(block?.lines.length);
  });

  it('모든 블록의 마디가 알려진 것이다', () => {
    const known = new Set(['title', 'xAxis', 'yAxis', 'marks', 'legend', 'interaction']);
    for (const block of generateCode(DEFAULT_SPEC)) {
      expect(known.has(block.nodeId)).toBe(true);
      expect(block.lines.length).toBeGreaterThan(0);
    }
  });
});
