import { describe, expect, it } from 'vitest';
import { TAIL_AFTER_LAST, advance, blockAt, buildTimeline, nearestBlock, widestLine } from '@core/subtitle';
import type { Cue } from '@core/subtitle';

const cues: Cue[] = [
  { start: 0, end: 1000, text: '첫 줄' },
  // 앞 자막과 200ms 붙어 있다. 기본 기준(300ms)으로는 쉼이 아니다.
  { start: 1200, end: 2000, text: '둘째 줄' },
  // 여기서 1초를 쉰다. 이 자리가 자를 자리로 우선된다.
  { start: 3000, end: 4000, text: '셋째 줄' },
];

describe('시간축 만들기', () => {
  it('기준을 넘는 빈 시간만 쉼으로 본다', () => {
    const timeline = buildTimeline(cues, 300);
    expect(timeline.pauses).toEqual([{ start: 2000, end: 3000 }]);
  });

  it('기준을 낮추면 짧은 빈 시간도 쉼이 된다', () => {
    const timeline = buildTimeline(cues, 100);
    expect(timeline.pauses).toHaveLength(2);
  });

  it('재생 길이는 마지막 자막 뒤로 여운을 남긴다', () => {
    expect(buildTimeline(cues, 300).duration).toBe(4000 + TAIL_AFTER_LAST);
  });

  it('자막이 없으면 재생할 것도 없다', () => {
    expect(buildTimeline([], 300)).toEqual({ duration: 0, pauses: [] });
  });
});

describe('지금 떠 있는 자막 찾기', () => {
  it('구간 안이면 그 자리를 준다', () => {
    expect(blockAt(cues, 0)).toBe(0);
    expect(blockAt(cues, 1500)).toBe(1);
    expect(blockAt(cues, 3999)).toBe(2);
  });

  it('구간 사이(빈 시간)와 끝난 뒤에는 아무것도 뜨지 않는다', () => {
    expect(blockAt(cues, 1100)).toBe(-1);
    expect(blockAt(cues, 2500)).toBe(-1);
    expect(blockAt(cues, 9000)).toBe(-1);
  });

  it('구간의 끝나는 순간은 이미 사라진 뒤다', () => {
    expect(blockAt(cues, 1000)).toBe(-1);
  });
});

describe('재생 시각 흐르기', () => {
  it('속도를 곱해 흐른다', () => {
    expect(advance(1000, 100, 2, 5000)).toBe(1200);
  });

  it('끝에 닿으면 처음으로 돌아간다', () => {
    expect(advance(4900, 200, 1, 5000)).toBe(0);
  });

  it('재생할 것이 없으면 0에 머문다', () => {
    expect(advance(0, 100, 1, 0)).toBe(0);
  });
});

describe('가장 긴 줄', () => {
  it('줄 중 가장 넓은 폭을 준다', () => {
    const chunk = { start: 0, end: 1000, lines: ['짧다', '조금 더 길다'] };
    expect(widestLine(chunk, (text) => text.length)).toBe(7);
  });
});

describe('멈춰 있을 때 보여 줄 자막', () => {
  it('떠 있는 것이 있으면 그것을 준다', () => {
    expect(nearestBlock(cues, 1500)).toBe(1);
  });

  it('빈 시간에는 다음에 뜰 것을 미리 준다', () => {
    expect(nearestBlock(cues, 0)).toBe(0);
    expect(nearestBlock(cues, 2500)).toBe(2);
  });

  it('다 끝난 뒤에는 마지막 것을 남겨 둔다', () => {
    expect(nearestBlock(cues, 9000)).toBe(2);
  });

  it('자막이 없으면 보여 줄 것도 없다', () => {
    expect(nearestBlock([], 0)).toBe(-1);
  });
});
