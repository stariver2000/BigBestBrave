import { describe, expect, it } from 'vitest';
import {
  AWAY_RESTLESS,
  composeEntry,
  nextStayBand,
  upsertEntry,
  hourBand,
  moodOf,
  renderEntry,
  returnBand,
  stayBand,
  vocabularySize,
  type Observation,
} from '@core/diary';

const HOUR = 1000 * 60 * 60;
const DAY = HOUR * 24;

const visit = (over: Partial<Observation> = {}): Observation => ({
  visitCount: 3,
  hour: 14,
  sinceLast: DAY,
  stay: 1000 * 40,
  away: 0,
  ...over,
});

describe('시간대 나누기', () => {
  it('하루를 다섯 구간으로 접는다', () => {
    expect(hourBand(5)).toBe('dawn');
    expect(hourBand(9)).toBe('morning');
    expect(hourBand(15)).toBe('afternoon');
    expect(hourBand(20)).toBe('evening');
  });

  it('자정을 넘어가는 밤을 제대로 잡는다', () => {
    // 밤 구간만 시작이 끝보다 크다. 여기서 자주 실수가 난다.
    expect(hourBand(23)).toBe('night');
    expect(hourBand(0)).toBe('night');
    expect(hourBand(3)).toBe('night');
  });
});

describe('다시 오기까지', () => {
  it('첫 방문은 따로 본다', () => {
    expect(returnBand(null)).toBe('first');
  });

  it('간격에 따라 구간이 달라진다', () => {
    expect(returnBand(HOUR)).toBe('soon');
    expect(returnBand(DAY)).toBe('daily');
    expect(returnBand(DAY * 4)).toBe('long');
    expect(returnBand(DAY * 60)).toBe('distant');
  });
});

describe('머문 시간', () => {
  it('짧게·보통·길게로 나눈다', () => {
    expect(stayBand(1000 * 5)).toBe('brief');
    expect(stayBand(1000 * 60)).toBe('normal');
    expect(stayBand(1000 * 60 * 10)).toBe('long');
  });
});

describe('기분', () => {
  it('첫 방문에는 궁금해한다', () => {
    expect(moodOf(visit({ sinceLast: null }))).toBe('curious');
  });

  it('금방 다시 오면 들뜬다', () => {
    expect(moodOf(visit({ sinceLast: HOUR }))).toBe('restless');
  });

  it('오래 안 오면 쓸쓸해한다', () => {
    expect(moodOf(visit({ sinceLast: DAY * 60 }))).toBe('lonely');
  });

  it('오래 머물면 흡족해한다', () => {
    expect(moodOf(visit({ stay: 1000 * 60 * 10 }))).toBe('content');
  });
});

describe('일기 짓기', () => {
  const at = new Date(2026, 7, 31, 14, 30).getTime();

  it('다섯 줄로 짓는다', () => {
    expect(composeEntry(visit(), at).lines).toHaveLength(5);
  });

  it('같은 방문에는 같은 일기가 나온다', () => {
    // 새로고침할 때마다 어제 일기가 바뀌면 일기가 아니라 뽑기다.
    expect(composeEntry(visit(), at)).toEqual(composeEntry(visit(), at));
  });

  it('방문 횟수가 다르면 다른 일기가 나온다', () => {
    const third = composeEntry(visit({ visitCount: 3 }), at);
    const fourth = composeEntry(visit({ visitCount: 4 }), at);
    expect(JSON.stringify(fourth.lines)).not.toBe(JSON.stringify(third.lines));
  });

  it('관찰한 구간에 맞는 묶음에서 고른다', () => {
    const entry = composeEntry(visit({ hour: 3, sinceLast: null, stay: 1000 * 5 }), at);
    const pools = entry.lines.map((line) => line.pool);
    expect(pools).toEqual(['opening:night', 'return:first', 'stay:brief', 'inner', 'intent']);
  });

  it('세 언어 모두로 다시 읽힌다', () => {
    // 문장 대신 자리를 저장하기 때문에 언어를 바꿔도 지난 일기가 살아난다.
    const entry = composeEntry(visit(), at);
    for (const locale of ['ko', 'en', 'ja'] as const) {
      const lines = renderEntry(entry, locale);
      expect(lines).toHaveLength(5);
      expect(lines.every((line) => line.trim().length > 0)).toBe(true);
    }
  });

  it('없어진 묶음이 있으면 그 줄만 건너뛴다', () => {
    const entry = composeEntry(visit(), at);
    const broken = { ...entry, lines: [...entry.lines, { pool: 'gone', index: 0 }] };
    expect(renderEntry(broken, 'ko')).toHaveLength(5);
  });

  it('같은 방문의 일기는 쌓이지 않고 갈아 끼워진다', () => {
    // 머무는 동안 일기가 다시 쓰이는데, 그때마다 쌓으면 한 번의 방문이 여러 장으로 남는다.
    const first = composeEntry(visit({ stay: 1000 * 5 }), at);
    const later = composeEntry(visit({ stay: 1000 * 60 * 10 }), at);
    const kept = upsertEntry(upsertEntry([], first), later);
    expect(kept).toHaveLength(1);
    expect(kept[0].lines[2].pool).toBe('stay:long');
  });

  it('다른 방문의 일기는 방문 순서대로 남는다', () => {
    const second = composeEntry(visit({ visitCount: 2 }), at);
    const third = composeEntry(visit({ visitCount: 3 }), at);
    const kept = upsertEntry(upsertEntry([], third), second);
    expect(kept.map((entry) => entry.visitCount)).toEqual([2, 3]);
  });

  it('어휘가 좁다', () => {
    // 좁은 어휘가 이 사물의 성격이다. 넓어지면 사물이 아니라 비서가 된다.
    const size = vocabularySize();
    expect(size).toBeGreaterThan(20);
    expect(size).toBeLessThan(60);
  });
});

/**
 * 사물이 느낄 수 있어야 하는 것: 당신이 자리를 비웠다 왔다는 사실.
 * 자료형에만 있고 아무 데도 쓰이지 않으면 그것은 감각이 아니라 빈칸이다.
 */
describe('자리를 비우면 사물이 안절부절못한다', () => {
  const watching = (away: number, stay: number): Observation => ({
    visitCount: 3,
    hour: 14,
    // 어제 왔다 온 간격. 'soon'도 'distant'도 아닌 자리를 골라 away만 보이게 한다.
    sinceLast: 1000 * 60 * 60 * 20,
    stay,
    away,
  });

  it('한 번 비운 것은 그러려니 한다', () => {
    expect(moodOf(watching(AWAY_RESTLESS - 1, 1000 * 200))).toBe('content');
  });

  it('두 번째부터는 오래 머물렀어도 차분해지지 않는다', () => {
    expect(moodOf(watching(AWAY_RESTLESS, 1000 * 200))).toBe('restless');
  });

  it('다시 온 간격이 먼저 걸리면 그쪽이 이긴다', () => {
    const justCameBack: Observation = { ...watching(5, 1000), sinceLast: 1000 * 60 };
    expect(moodOf(justCameBack)).toBe('restless');
  });
});

describe('다음 구간까지', () => {
  it('남은 시간을 알려 준다', () => {
    // 20초까지가 'brief'이므로, 5초 머문 지금은 15초 뒤에 구간이 바뀐다.
    expect(nextStayBand(5000)).toEqual({ id: 'normal', inMs: 15000 });
  });

  it('구간이 막 바뀌면 다음 것을 가리킨다', () => {
    expect(nextStayBand(21000)?.id).toBe('long');
  });

  it('마지막 구간에서는 더 넘어갈 곳이 없다', () => {
    expect(nextStayBand(1000 * 60 * 60)).toBeNull();
  });
});
