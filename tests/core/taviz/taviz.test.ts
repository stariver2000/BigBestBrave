import { describe, expect, it } from 'vitest';
import {
  CATEGORIES,
  COLUMN_TOTALS,
  CORPUS,
  DATA_TYPES,
  ENCODINGS,
  PROSE_VS_TABLE,
  ROWS_SUM_SHORT,
  decodePlan,
  encodePlan,
  encodingSum,
  pairing,
  rowOf,
  summarizePlan,
  type PlanItem,
} from '@core/taviz';

/**
 * 옮겨 적기 검증.
 *
 * 논문(CHI EA 2026, doi:10.1145/3772363.3798541) 표 1의 다섯 열 합계를 셀에서
 * 재계산하고, 3장의 수집 셈을 앞방향으로 되짚는다. 표 자체의 어긋남(행 합이
 * 총계보다 1 작은 두 행, 본문과 표의 서로 다른 셈)은 고치지 않고 붙든다.
 */
describe('표 1 옮겨 적기', () => {
  it('열한 유형이 네 갈래에 속한다', () => {
    expect(DATA_TYPES).toHaveLength(11);
    for (const row of DATA_TYPES) {
      expect(CATEGORIES).toContain(row.category);
    }
    // 갈래별 유형 수: Theme 5, Concept 3, Quant 2, Misc 1
    const counts = CATEGORIES.map((category) => DATA_TYPES.filter((row) => row.category === category).length);
    expect(counts).toEqual([5, 3, 2, 1]);
  });

  it('다섯 열의 총계가 셀에서 재계산된다 (252·196·77·112·12)', () => {
    for (const encoding of ENCODINGS) {
      const sum = DATA_TYPES.reduce((total, row) => total + row.counts[encoding], 0);
      expect(sum, encoding).toBe(COLUMN_TOTALS[encoding]);
    }
  });

  it('행의 부호 합은 총계 이상이다 - 표가 스스로 어긋난 두 행만 빼고', () => {
    for (const row of DATA_TYPES) {
      const sum = encodingSum(row);
      if (ROWS_SUM_SHORT.includes(row.id)) {
        // otherTheme: 20 < 21, designInsight: 29 < 30. 정확히 1씩 모자란다.
        expect(sum, row.id).toBe(row.total - 1);
      } else {
        expect(sum, row.id).toBeGreaterThanOrEqual(row.total);
      }
    }
  });

  it('수치 갈래의 두 행은 합이 총계와 정확히 같다 (겸하는 부호가 없다)', () => {
    expect(encodingSum(rowOf('selfReported'))).toBe(71);
    expect(encodingSum(rowOf('objective'))).toBe(88);
  });
});

describe('말뭉치 셈 옮겨 적기', () => {
  it('검색 셈이 앞으로 되짚어진다: 150 + 39 - 중복 2 = 187', () => {
    expect(CORPUS.titleAbstractHits + CORPUS.supplementaryHits - CORPUS.papers).toBe(2);
  });

  it('여과의 방향이 맞다: 572 <= 1052, 149 <= 187 - 4', () => {
    expect(CORPUS.resultVisuals).toBeLessThanOrEqual(CORPUS.extractedVisuals);
    expect(CORPUS.resultPapers).toBeLessThanOrEqual(CORPUS.papers - CORPUS.papersWithoutVisuals);
  });

  it('핵심 질적 발견의 비율이 본문 말대로 절반이 안 된다 (406/1052)', () => {
    expect(CORPUS.coreQualitativeVisuals / CORPUS.coreQualitativeDenominator).toBeLessThan(0.5);
  });

  it('Krippendorff 알파 셋이 0과 1 사이다', () => {
    for (const alpha of Object.values(CORPUS.krippendorff)) {
      expect(alpha).toBeGreaterThan(0);
      expect(alpha).toBeLessThanOrEqual(1);
    }
  });

  it('본문과 표의 셈이 다른 곳을 그대로 들고 있다', () => {
    // 5.3절의 138/173 대 표의 144/196. 어느 쪽 셈인지 논문이 밝히지 않는다.
    expect(PROSE_VS_TABLE.exampleImagesProse.count).not.toBe(PROSE_VS_TABLE.exampleImagesTable.count);
    expect(rowOf('example').counts.image).toBe(PROSE_VS_TABLE.exampleImagesTable.count);
    // 5.5절 "차트의 절반 가까이"는 표의 열 합 112로는 39%다.
    expect(PROSE_VS_TABLE.barVariantCount / PROSE_VS_TABLE.chartColumnTotal).toBeLessThan(0.5);
  });
});

describe('짝 살피기', () => {
  it('유형마다 가장 흔한 부호가 표와 맞는다', () => {
    expect(pairing('taxonomy', 'table').isTop).toBe(true); // 41
    expect(pairing('example', 'image').isTop).toBe(true); // 144
    expect(pairing('model', 'diagram').isTop).toBe(true); // 32
    expect(pairing('selfReported', 'chart').isTop).toBe(true); // 44
    expect(pairing('frequency', 'table').isTop).toBe(true); // 44 (차트 18보다 흔하다)
  });

  it('한 번도 안 나온 짝을 안다', () => {
    expect(pairing('taxonomy', 'chart').isUnseen).toBe(true); // 0
    expect(pairing('selfReported', 'image').isUnseen).toBe(true); // 0
    expect(pairing('definition', 'diagram').isUnseen).toBe(false); // 3
  });

  it('출현 수가 표의 셀 그대로다', () => {
    expect(pairing('designInsight', 'image').count).toBe(12);
    expect(pairing('miscResult', 'image').count).toBe(9);
  });
});

describe('계획 직렬화', () => {
  it('되돌리기가 성립한다', () => {
    const items: PlanItem[] = [
      { dataType: 'taxonomy', encoding: 'table' },
      { dataType: 'objective', encoding: 'chart' },
      { dataType: 'example', encoding: 'image' },
    ];
    expect(decodePlan(encodePlan(items))).toEqual(items);
  });

  it('엉뚱한 글자는 항목이 되지 않는다', () => {
    expect(decodePlan('z9')).toEqual([]);
    expect(decodePlan('a5')).toEqual([]); // 부호는 0~4뿐
    expect(decodePlan('a0x')).toEqual([{ dataType: 'taxonomy', encoding: 'table' }]);
  });

  it('빈 계획은 빈 문자열이다', () => {
    expect(encodePlan([])).toBe('');
    expect(decodePlan('')).toEqual([]);
  });
});

describe('계획 진단', () => {
  it('전부 표인 계획은 표 의존 관찰에 닿는다', () => {
    const summary = summarizePlan([
      { dataType: 'taxonomy', encoding: 'table' },
      { dataType: 'definition', encoding: 'table' },
    ]);
    expect(summary.touchedObservations).toContain('tablesDominate');
    expect(summary.tableCount).toBe(2);
  });

  it('질적 발견이 없는 계획은 5.1절 관찰에 닿는다', () => {
    const summary = summarizePlan([{ dataType: 'selfReported', encoding: 'chart' }]);
    expect(summary.qualitativeCount).toBe(0);
    expect(summary.touchedObservations).toContain('halfNotQualitative');
  });

  it('도해 없는 개념 계획은 5.4절 관찰에 닿는다', () => {
    const summary = summarizePlan([{ dataType: 'model', encoding: 'table' }]);
    expect(summary.touchedObservations).toContain('diagramsForConcepts');
    const withDiagram = summarizePlan([{ dataType: 'model', encoding: 'diagram' }]);
    expect(withDiagram.touchedObservations).not.toContain('diagramsForConcepts');
  });

  it('수치·빈도 밖의 차트는 5.5절 관찰에 닿는다', () => {
    const summary = summarizePlan([{ dataType: 'definition', encoding: 'chart' }]);
    expect(summary.touchedObservations).toContain('chartsForQuant');
    // 빈도의 차트는 말뭉치에도 있으니(18회) 닿지 않는다.
    const frequency = summarizePlan([{ dataType: 'frequency', encoding: 'chart' }]);
    expect(frequency.touchedObservations).not.toContain('chartsForQuant');
  });

  it('말뭉치에 없던 짝을 골라낸다', () => {
    const summary = summarizePlan([{ dataType: 'taxonomy', encoding: 'chart' }]);
    expect(summary.unseenPairings).toHaveLength(1);
  });

  it('빈 계획은 아무 관찰에도 닿지 않는다', () => {
    const summary = summarizePlan([]);
    expect(summary.touchedObservations).toEqual([]);
    expect(summary.itemCount).toBe(0);
  });
});
