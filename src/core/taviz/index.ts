/**
 * 그림 계획의 순수 계산.
 *
 * 논문(표 1)이 CHI 149편에서 센 "자료 유형 × 부호"의 출현 수를 잣대로,
 * 사용자가 짠 그림 계획(결과 유형마다 부호 하나)을 비춘다. 판정 점수는
 * 지어내지 않는다 - 그 짝이 말뭉치에서 몇 번 나왔는지, 그 유형에서 가장
 * 흔한 부호가 무엇인지, 논문 5장의 관찰 중 무엇이 이 계획에 닿는지만 센다.
 */

import {
  CATEGORIES,
  DATA_TYPES,
  ENCODINGS,
  type CategoryId,
  type DataTypeId,
  type DataTypeRow,
  type EncodingId,
  type ObservationId,
} from './config';

export * from './config';

const ROW_BY_ID = new Map<DataTypeId, DataTypeRow>(DATA_TYPES.map((row) => [row.id, row]));

export function rowOf(id: DataTypeId): DataTypeRow {
  const row = ROW_BY_ID.get(id);
  if (!row) throw new Error(`알 수 없는 자료 유형: ${id}`);
  return row;
}

/** 행의 부호 출현 합. 총계(Tot.)와 다를 수 있다 - 겸하는 그림과 표의 어긋남 참조. */
export function encodingSum(row: DataTypeRow): number {
  return ENCODINGS.reduce((sum, encoding) => sum + row.counts[encoding], 0);
}

export interface Pairing {
  dataType: DataTypeId;
  encoding: EncodingId;
  /** 이 짝의 말뭉치 출현 수. */
  count: number;
  /** 이 유형이 실린 그림의 총계(표의 Tot.). */
  rowTotal: number;
  /** 이 유형에서 가장 흔한 부호(들). 동률이면 여럿이다. */
  topEncodings: EncodingId[];
  isTop: boolean;
  /** 말뭉치에서 한 번도 안 나온 짝. */
  isUnseen: boolean;
}

export function pairing(dataType: DataTypeId, encoding: EncodingId): Pairing {
  const row = rowOf(dataType);
  const count = row.counts[encoding];
  const max = Math.max(...ENCODINGS.map((candidate) => row.counts[candidate]));
  const topEncodings = ENCODINGS.filter((candidate) => row.counts[candidate] === max && max > 0);
  return {
    dataType,
    encoding,
    count,
    rowTotal: row.total,
    topEncodings,
    isTop: count === max && max > 0,
    isUnseen: count === 0,
  };
}

export interface PlanItem {
  dataType: DataTypeId;
  encoding: EncodingId;
}

/** URL 직렬화: 자료 유형은 a~k(표 순서), 부호는 0~4. 항목마다 두 글자. */
const TYPE_ALPHABET = 'abcdefghijk';

export function encodePlan(items: readonly PlanItem[]): string {
  return items
    .map((item) => {
      const typeIndex = DATA_TYPES.findIndex((row) => row.id === item.dataType);
      const encodingIndex = ENCODINGS.indexOf(item.encoding);
      if (typeIndex < 0 || encodingIndex < 0) return '';
      return `${TYPE_ALPHABET[typeIndex]}${encodingIndex}`;
    })
    .join('');
}

export function decodePlan(raw: string): PlanItem[] {
  const items: PlanItem[] = [];
  for (let i = 0; i + 1 < raw.length; i += 2) {
    const typeIndex = TYPE_ALPHABET.indexOf(raw[i]);
    const encodingIndex = Number(raw[i + 1]);
    if (typeIndex < 0 || !Number.isInteger(encodingIndex) || encodingIndex < 0 || encodingIndex >= ENCODINGS.length) {
      continue;
    }
    items.push({ dataType: DATA_TYPES[typeIndex].id, encoding: ENCODINGS[encodingIndex] });
  }
  return items;
}

export interface PlanSummary {
  itemCount: number;
  byCategory: Record<CategoryId, number>;
  /** 핵심 질적 발견(Theme·Concept)을 그린 항목 수. 5.1절의 잣대다. */
  qualitativeCount: number;
  tableCount: number;
  /** 말뭉치에서 한 번도 안 나온 짝들. */
  unseenPairings: PlanItem[];
  /** 이 계획에 닿는 논문 5장의 관찰들. */
  touchedObservations: ObservationId[];
}

export function summarizePlan(items: readonly PlanItem[]): PlanSummary {
  const byCategory = Object.fromEntries(CATEGORIES.map((category) => [category, 0])) as Record<CategoryId, number>;
  let tableCount = 0;
  const unseenPairings: PlanItem[] = [];
  for (const item of items) {
    byCategory[rowOf(item.dataType).category] += 1;
    if (item.encoding === 'table') tableCount += 1;
    if (pairing(item.dataType, item.encoding).isUnseen) unseenPairings.push(item);
  }
  const qualitativeCount = byCategory.theme + byCategory.concept;

  const touchedObservations: ObservationId[] = [];
  // 5.2: 모든 항목이 표면 - 말뭉치의 표 의존을 그대로 되풀이하는 계획이다.
  if (items.length > 0 && tableCount === items.length) touchedObservations.push('tablesDominate');
  // 5.1: 질적 발견이 하나도 없으면, 그림 노력이 핵심 밖으로 가는 그 패턴이다.
  if (items.length > 0 && qualitativeCount === 0) touchedObservations.push('halfNotQualitative');
  // 5.4: 개념을 그리는데 도해가 하나도 없다 - 말뭉치의 지배적 선택과 다르다.
  const conceptItems = items.filter((item) => rowOf(item.dataType).category === 'concept');
  if (conceptItems.length > 0 && !conceptItems.some((item) => item.encoding === 'diagram')) {
    touchedObservations.push('diagramsForConcepts');
  }
  // 5.5: 수치·빈도 밖에 차트를 쓴다 - 말뭉치에서 차트는 그 둘에 국한됐다.
  const chartOutside = items.some(
    (item) =>
      item.encoding === 'chart' &&
      rowOf(item.dataType).category !== 'quant' &&
      item.dataType !== 'frequency',
  );
  if (chartOutside) touchedObservations.push('chartsForQuant');
  // 5.3: 주제의 예시를 이미지 아닌 것으로만 그린다면, 말뭉치의 주된 길과 다르다.
  const exampleItems = items.filter((item) => item.dataType === 'example');
  if (exampleItems.length > 0 && !exampleItems.some((item) => item.encoding === 'image')) {
    touchedObservations.push('imagesForExamples');
  }

  return { itemCount: items.length, byCategory, qualitativeCount, tableCount, unseenPairings, touchedObservations };
}
