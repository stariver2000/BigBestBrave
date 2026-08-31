import { describe, expect, it } from 'vitest';
import { parseCsv } from '@core/table';
import { evaluate, projectToPlane, standardize } from '@core/projection';
import { SAMPLE } from '../../../src/modules/projection/config';
import { sampleCsv } from '../../../src/modules/projection/sample';

/**
 * 예시 자료는 이 도구가 잡아내려는 상황을 실제로 담고 있어야 한다.
 * 가까운 두 덩어리가 PCA에서 겹치면서 신뢰도가 연속성보다 낮아지는 것이 그 상황이다.
 * 예시를 손보다가 이 성질이 깨지면 첫인상이 "아무 문제 없음"이 되어 도구가 설명되지 않는다.
 */
describe('예시 자료', () => {
  const table = parseCsv(sampleCsv());
  const features = table.rows.map((row) => row.slice(0, -1).map(Number));
  const labels = table.rows.map((row) => row[row.length - 1]);

  it('군집 수와 행 수가 설정과 맞는다', () => {
    expect(table.rows).toHaveLength(SAMPLE.centers.length * SAMPLE.perCluster);
    expect(new Set(labels).size).toBe(SAMPLE.centers.length);
  });

  it('모든 특징 열이 숫자다', () => {
    expect(features.every((row) => row.every((value) => Number.isFinite(value)))).toBe(true);
  });

  it('같은 씨앗이므로 항상 같은 자료가 나온다', () => {
    expect(sampleCsv()).toBe(sampleCsv());
  });

  it('PCA로 눌러 담으면 신뢰도가 연속성보다 낮아진다', () => {
    const low = projectToPlane(standardize(features));
    const { metrics } = evaluate({ high: features, low, labels }, 15, true);
    expect(metrics.trustworthiness).toBeLessThan(metrics.continuity);
  });

  it('고차원에서는 군집이 뚜렷해 이웃 적중률이 높다', () => {
    // 원본 공간에서는 잘 나뉘어 있다는 것을 확인해 둔다. 문제는 2차원으로 눌렀을 때 생긴다.
    const { metrics } = evaluate({ high: features, low: features.map((r) => [r[0], r[1]] as [number, number]), labels }, 15, true);
    expect(metrics.neighborhoodHit).not.toBeNull();
  });
});

/**
 * 화면은 "지금 보고 있는 것이 예시인가"를 문자열 비교로 판단하고,
 * 예시일 때만 그 자료가 무엇을 보여 주려는 것인지 설명한다. 그 판단이 성립하려면
 * 같은 예시를 두 번 만들었을 때 같은 문자열이 나와야 한다.
 */
describe('예시는 언제나 같은 문자열이다', () => {
  it('두 번 불러도 같다', () => {
    expect(sampleCsv()).toBe(sampleCsv());
  });
});
