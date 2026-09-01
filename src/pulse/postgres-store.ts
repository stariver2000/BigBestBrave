/**
 * PostgreSQL 저장소.
 *
 * 스키마는 services/pulse/schema.sql 하나다. 테이블은 하나이고 컬럼은 셋인데 그중 둘이 키다 —
 * (경로, 종류) → 셈. 종류를 컬럼으로 펴지 않는 이유는 종류가 값이지 구조가 아니기 때문이다.
 *
 * 질의는 셋뿐이다: 한 페이지 읽기, 전체 읽기, 올리기. 올리기는 한 문장으로 끝난다.
 * 이 저장소가 하는 일이 늘어나면 그것은 대개 여기 담을 것이 아니라 다른 곳에 담을 것이다.
 */

import { emptyTally, isPulseKind, type PulseKind, type Tally } from '../core/pulse';
import type { PulseStore } from './store';

/** 이 저장소가 데이터베이스에게 바라는 전부. 시험은 이 자리에 가짜를 끼운다. */
export interface Queryable {
  query(text: string, values?: unknown[]): Promise<{ rows: Record<string, unknown>[] }>;
}

/**
 * 같은 종류가 한 요청에 두 번 오면 한 줄을 두 번 고치게 되어 Postgres가 거절한다.
 * 그래서 넣기 전에 종류별로 세어 둔다(GROUP BY). 셈은 그 수만큼 한 번에 오른다.
 */
const BUMP = `
  INSERT INTO pulse (path, kind, count)
  SELECT $1, kind, count(*) FROM unnest($2::pulse_kind[]) AS kind GROUP BY kind
  ON CONFLICT (path, kind) DO UPDATE SET count = pulse.count + EXCLUDED.count
`;

function tallyFrom(rows: readonly Record<string, unknown>[]): Tally {
  const tally = emptyTally();
  for (const row of rows) {
    const kind = row.kind;
    if (isPulseKind(kind)) tally[kind] = Number(row.count);
  }
  return tally;
}

export class PostgresPulseStore implements PulseStore {
  constructor(private readonly db: Queryable) {}

  async read(path: string): Promise<Tally> {
    const { rows } = await this.db.query('SELECT kind, count FROM pulse WHERE path = $1', [path]);
    return tallyFrom(rows);
  }

  async readAll(): Promise<Record<string, Tally>> {
    const { rows } = await this.db.query('SELECT path, kind, count FROM pulse');
    const pages: Record<string, Tally> = {};
    for (const row of rows) {
      const path = String(row.path);
      pages[path] ??= emptyTally();
      const kind = row.kind;
      if (isPulseKind(kind)) pages[path][kind] = Number(row.count);
    }
    return pages;
  }

  async bump(path: string, kinds: readonly string[]): Promise<Tally> {
    // 모르는 이름은 enum이 거절하므로 여기서 먼저 걸러 낸다. 셈 하나 때문에 요청이 실패하면 안 된다.
    const known = kinds.filter((kind): kind is PulseKind => isPulseKind(kind));
    if (known.length === 0) return this.read(path);
    await this.db.query(BUMP, [path, known]);
    return this.read(path);
  }
}
