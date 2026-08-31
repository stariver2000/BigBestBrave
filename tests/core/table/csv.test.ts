import { describe, expect, it } from 'vitest';
import { isNumericColumn, numericColumn, parseCsv } from '@core/table';

describe('CSV 파싱', () => {
  it('머리글과 행을 읽는다', () => {
    const table = parseCsv('a,b\n1,2\n3,4');
    expect(table.columns).toEqual(['a', 'b']);
    expect(table.rows).toEqual([['1', '2'], ['3', '4']]);
  });

  it('따옴표 안의 구분자를 값으로 본다', () => {
    const table = parseCsv('name,note\n"김, 민서","줄바꿈\n포함"');
    expect(table.rows[0][0]).toBe('김, 민서');
    expect(table.rows[0][1]).toBe('줄바꿈\n포함');
  });

  it('따옴표 두 개를 하나로 되돌린다', () => {
    expect(parseCsv('a\n"그는 ""좋다"" 라고"').rows[0][0]).toBe('그는 "좋다" 라고');
  });

  it('탭 구분 파일도 읽는다', () => {
    expect(parseCsv('a\tb\n1\t2').columns).toEqual(['a', 'b']);
  });

  it('열이 모자란 행을 빈 칸으로 채운다', () => {
    expect(parseCsv('a,b,c\n1,2').rows[0]).toEqual(['1', '2', '']);
  });

  it('숫자 열을 가려낸다', () => {
    const table = parseCsv('n,s\n1,가\n2,나');
    expect(isNumericColumn(table, 0)).toBe(true);
    expect(isNumericColumn(table, 1)).toBe(false);
    expect(numericColumn(table, 0)).toEqual([1, 2]);
  });

  it('빈 입력은 빈 표가 된다', () => {
    expect(parseCsv('   ')).toEqual({ columns: [], rows: [] });
  });
});
