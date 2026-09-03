import { describe, expect, it } from 'vitest';
import { makeDataset } from '@core/brushing';
import { DATA_SEED } from '../../../src/modules/brush/config';
import {
  decodePicked,
  encodePicked,
  readState,
  writeState,
  type BrushState,
} from '../../../src/modules/brush/state';

const TOTAL = makeDataset(DATA_SEED).rows.length;

describe('칠한 점의 비트열', () => {
  it('빈 집합은 빈 글자열이다 - 주소가 깨끗하게 남는다', () => {
    expect(encodePicked(new Set(), TOTAL)).toBe('');
    expect(decodePicked('', TOTAL).size).toBe(0);
  });

  it('접었다 펴면 그대로 돌아온다', () => {
    for (const picked of [
      new Set([0]),
      new Set([TOTAL - 1]),
      new Set([0, 1, 2, 3, 4]),
      new Set([5, 17, 42, 99, 178]),
      new Set(Array.from({ length: TOTAL }, (_, i) => i)),
    ]) {
      expect(decodePicked(encodePicked(picked, TOTAL), TOTAL)).toEqual(picked);
    }
  });

  it('점 하나에 한 비트라 주소가 짧다', () => {
    const all = new Set(Array.from({ length: TOTAL }, (_, i) => i));
    // 인덱스를 늘어놓으면 수백 글자지만, 비트열이면 다섯 점에 한 글자다.
    expect(encodePicked(all, TOTAL).length).toBe(Math.ceil(TOTAL / 5));
  });

  it('범위 밖 비트는 버린다', () => {
    // 마지막 글자에 남는 비트가 있어도 없는 점을 만들어 내지 않는다.
    const decoded = decodePicked('v'.repeat(Math.ceil(TOTAL / 5)), TOTAL);
    expect(Math.max(...decoded)).toBeLessThan(TOTAL);
  });

  it('모르는 글자가 섞이면 통째로 비운다', () => {
    expect(decodePicked('zz!', TOTAL).size).toBe(0);
  });
});

describe('URL 상태', () => {
  it('기본값이면 질의문자열이 빈다', () => {
    const state: BrushState = { projection: 'pca', mode: 'plain', target: 0, picked: '', reveal: false };
    expect(writeState(state)).toBe('');
  });

  it('쓴 것을 그대로 되읽는다', () => {
    const state: BrushState = { projection: 'random', mode: 'aware', target: 4, picked: '3a0v', reveal: true };
    expect(readState(new URLSearchParams(writeState(state)))).toEqual(state);
  });

  it('엉뚱한 값은 기본값으로 돌린다', () => {
    expect(readState(new URLSearchParams('?proj=zzz&mode=nope&target=99&picked=!!&reveal=7'))).toEqual({
      projection: 'pca',
      mode: 'plain',
      target: 0,
      picked: '',
      reveal: false,
    });
  });
});
