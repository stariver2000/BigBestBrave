import { describe, expect, it } from 'vitest';
import { encodePlan } from '@core/taviz';
import { DEFAULT_PLAN, MAX_PLAN_ITEMS } from '../../../src/modules/figure/config';
import { readState, writeState } from '../../../src/modules/figure/state';

/**
 * URL 직렬화의 계약.
 *
 * 계획은 링크로 넘어가는 작업물이라, 되돌리기가 온전해야 하고 손으로 고친
 * URL이 화면을 무너뜨리면 안 된다.
 */
describe('그림 계획의 URL 상태', () => {
  it('기본 계획은 URL을 비워 둔다', () => {
    const query = writeState({ items: [...DEFAULT_PLAN], cell: '' });
    expect(query).toBe('');
  });

  it('계획과 칸이 오간다', () => {
    const items = [
      { dataType: 'model' as const, encoding: 'diagram' as const },
      { dataType: 'frequency' as const, encoding: 'chart' as const },
    ];
    const query = writeState({ items, cell: 'f2' });
    const params = new URLSearchParams(query.replace(/^\?/, ''));
    const state = readState(params);
    expect(state.items).toEqual(items);
    expect(state.cell).toBe('f2');
  });

  it('빈 계획은 기본 계획과 구별된다', () => {
    const query = writeState({ items: [], cell: '' });
    const params = new URLSearchParams(query.replace(/^\?/, ''));
    expect(params.has('plan')).toBe(true);
    expect(readState(params).items).toEqual([]);
  });

  it('엉뚱한 칸·항목은 기본으로 돌린다', () => {
    const params = new URLSearchParams('plan=z9a0&cell=q9');
    const state = readState(params);
    expect(state.items).toEqual([{ dataType: 'taxonomy', encoding: 'table' }]);
    expect(state.cell).toBe('');
  });

  it('항목 수는 상한에서 잘린다', () => {
    const many = Array.from({ length: MAX_PLAN_ITEMS + 5 }, () => ({
      dataType: 'taxonomy' as const,
      encoding: 'table' as const,
    }));
    const params = new URLSearchParams(`plan=${encodePlan(many)}`);
    expect(readState(params).items).toHaveLength(MAX_PLAN_ITEMS);
  });

  it('기본 계획은 이 논문 스스로의 선택 셋이다', () => {
    expect(DEFAULT_PLAN).toHaveLength(3);
    expect(DEFAULT_PLAN.map((item) => `${item.dataType}:${item.encoding}`)).toEqual([
      'taxonomy:table',
      'objective:chart',
      'example:image',
    ]);
  });
});
