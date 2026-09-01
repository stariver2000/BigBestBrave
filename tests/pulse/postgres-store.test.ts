import { describe, expect, it } from 'vitest';
import { PostgresPulseStore, type Queryable } from '../../src/pulse';

/**
 * 진짜 데이터베이스 없이 확인할 수 있는 것만 여기서 본다 — 무엇을 묻는가, 답을 어떻게 읽는가.
 * 스키마가 지켜지는지는 데이터베이스가 볼 일이고(기본 키·enum·CHECK), 이 시험이 대신하지 않는다.
 */
function fake(rows: Record<string, unknown>[] = []) {
  const asked: { text: string; values?: unknown[] }[] = [];
  const db: Queryable = {
    async query(text, values) {
      asked.push({ text, values });
      return { rows };
    },
  };
  return { db, asked };
}

describe('Postgres 저장소', () => {
  it('한 페이지의 줄들을 셈 하나로 접는다', async () => {
    const { db } = fake([
      { kind: 'view', count: '12' },
      { kind: 'touch', count: '5' },
    ]);
    const tally = await new PostgresPulseStore(db).read('/beeper');
    // 큰 수는 문자열로 오므로 수로 바꿔 담아야 한다.
    expect(tally).toEqual({ view: 12, touch: 5, reach: 0, stay: 0 });
  });

  it('모르는 종류가 섞여 와도 셈이 오염되지 않는다', async () => {
    const { db } = fake([{ kind: 'ghost', count: '9' }]);
    expect(await new PostgresPulseStore(db).read('/beeper')).toEqual({
      view: 0, touch: 0, reach: 0, stay: 0,
    });
  });

  it('전체를 읽으면 페이지별로 나눠 담는다', async () => {
    const { db } = fake([
      { path: '/a', kind: 'view', count: '3' },
      { path: '/a', kind: 'touch', count: '1' },
      { path: '/b', kind: 'view', count: '7' },
    ]);
    const pages = await new PostgresPulseStore(db).readAll();
    expect(pages['/a'].touch).toBe(1);
    expect(pages['/b'].view).toBe(7);
  });

  it('올릴 때 아는 종류만 넘긴다', async () => {
    const { db, asked } = fake();
    await new PostgresPulseStore(db).bump('/beeper', ['view', 'ghost', 'touch']);
    // enum이 거절할 이름을 데이터베이스까지 들고 가지 않는다.
    expect(asked[0].values).toEqual(['/beeper', ['view', 'touch']]);
  });

  it('올릴 것이 하나도 없으면 쓰지 않고 읽기만 한다', async () => {
    const { db, asked } = fake();
    await new PostgresPulseStore(db).bump('/beeper', ['ghost']);
    expect(asked).toHaveLength(1);
    expect(asked[0].text).toContain('SELECT');
  });

  it('같은 종류가 두 번 와도 한 문장으로 끝낸다', async () => {
    const { db, asked } = fake();
    await new PostgresPulseStore(db).bump('/beeper', ['view', 'view']);
    // 한 줄을 두 번 고치면 Postgres가 거절하므로, 넣기 전에 종류별로 세어 둔다.
    expect(asked[0].text).toContain('GROUP BY kind');
    expect(asked[0].text).toContain('count = pulse.count + EXCLUDED.count');
  });
});
