/**
 * 초점 맞추기 페이지의 화면 상태와 URL 직렬화 규칙.
 *
 * 손잡이를 맞춰 놓은 상태가 곧 발견이다 - "이렇게 두면 무리가 갈린다"를
 * 링크 하나로 넘길 수 있어야 한다. 가중치 여덟 개는 눈금 자리(0~8)를 한 글자씩
 * 이어 붙여 싣는다. 무리 수와 고른 질의도 함께 싣는다.
 */

import { DEFAULT_K, FEATURES, K_CHOICES, QUERIES, WEIGHT_STEP, type QueryId } from '../../core/featurespace';
import { encodeField, numberField, readField, stringField, writeFields } from '../../kit';

export interface FocusState {
  weights: number[];
  k: number;
  query: QueryId;
}

/** 모든 특징을 1로 두는 것이 시작점이다. 눈금으로는 4번째(0.25 x 4 = 1). */
export const DEFAULT_WEIGHTS = FEATURES.map(() => 1);

const QUERY_IDS = QUERIES.map((query) => query.id);

function encodeWeights(weights: readonly number[]): string {
  return weights.map((weight) => String(Math.round(weight / WEIGHT_STEP))).join('');
}

function decodeWeights(raw: string): number[] {
  if (raw.length !== FEATURES.length) return [...DEFAULT_WEIGHTS];
  const weights: number[] = [];
  for (const char of raw) {
    const step = Number(char);
    if (!Number.isInteger(step) || step < 0 || step > 8) return [...DEFAULT_WEIGHTS];
    weights.push(Number((step * WEIGHT_STEP).toFixed(4)));
  }
  return weights;
}

const FIELDS = {
  weights: stringField('w', encodeWeights(DEFAULT_WEIGHTS)),
  k: numberField('k', DEFAULT_K, K_CHOICES[0], K_CHOICES[K_CHOICES.length - 1]),
  query: stringField('q', 'findClusters', QUERY_IDS),
} as const;

export function readState(params: URLSearchParams): FocusState {
  return {
    weights: decodeWeights(readField(params, FIELDS.weights)),
    k: Math.round(readField(params, FIELDS.k)),
    query: readField(params, FIELDS.query) as QueryId,
  };
}

export function writeState(state: FocusState): string {
  return writeFields([
    encodeField(FIELDS.weights, encodeWeights(state.weights)),
    encodeField(FIELDS.k, state.k),
    encodeField(FIELDS.query, state.query),
  ]);
}
