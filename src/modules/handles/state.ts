/**
 * 손으로 고치는 차트 페이지의 화면 상태와 URL 직렬화.
 *
 * 고쳐 놓은 차트가 곧 작업물이라, 명세를 통째로 URL에 싣는다. 링크를 열면
 * 같은 그림과 같은 코드가 나온다 - 둘 다 이 명세 하나에서 나오기 때문이다.
 */

import { DEFAULT_SPEC, SERIES, type Interaction, type Mode, type Spec } from '../../core/chartspec';
import {
  booleanField,
  encodeField,
  numberField,
  readField,
  stringField,
  writeFields,
} from '../../kit';

/** 고른 마디(코드 블록이나 시각 요소). ''는 고르지 않음. */
export type Picked = string;

export interface HandlesState {
  spec: Spec;
  picked: Picked;
}

const MODES: readonly Mode[] = ['grouped', 'stacked'];
const INTERACTIONS: readonly Interaction[] = ['none', 'clickDim', 'hoverTooltip'];
const NODE_IDS = ['', 'title', 'xAxis', 'yAxis', 'marks', 'legend', 'interaction'] as const;

/** 계열 순서는 SERIES의 자리 번호를 이어 붙여 싣는다(예: '3012'). */
function encodeOrder(order: readonly string[]): string {
  return order.map((series) => String(SERIES.indexOf(series as (typeof SERIES)[number]))).join('');
}

function decodeOrder(raw: string): string[] {
  if (raw.length !== SERIES.length) return [...DEFAULT_SPEC.order];
  const seen = new Set<number>();
  const order: string[] = [];
  for (const char of raw) {
    const index = Number(char);
    if (!Number.isInteger(index) || index < 0 || index >= SERIES.length || seen.has(index)) {
      return [...DEFAULT_SPEC.order];
    }
    seen.add(index);
    order.push(SERIES[index]);
  }
  return order;
}

const FIELDS = {
  mode: stringField('m', DEFAULT_SPEC.mode, MODES),
  order: stringField('o', encodeOrder(DEFAULT_SPEC.order)),
  interaction: stringField('i', DEFAULT_SPEC.interaction, INTERACTIONS),
  legend: booleanField('lg', DEFAULT_SPEC.legend),
  /** 0이면 자료에서 저절로 정한다는 뜻이다. */
  yMax: numberField('y', 0, 0, 400),
  title: stringField('t', DEFAULT_SPEC.title),
  picked: stringField('p', '', NODE_IDS),
} as const;

export function readState(params: URLSearchParams): HandlesState {
  const yMax = Math.round(readField(params, FIELDS.yMax));
  return {
    spec: {
      mode: readField(params, FIELDS.mode) as Mode,
      order: decodeOrder(readField(params, FIELDS.order)),
      interaction: readField(params, FIELDS.interaction) as Interaction,
      legend: readField(params, FIELDS.legend),
      yMax: yMax > 0 ? yMax : null,
      title: readField(params, FIELDS.title),
    },
    picked: readField(params, FIELDS.picked),
  };
}

export function writeState(state: HandlesState): string {
  return writeFields([
    encodeField(FIELDS.mode, state.spec.mode),
    encodeField(FIELDS.order, encodeOrder(state.spec.order)),
    encodeField(FIELDS.interaction, state.spec.interaction),
    encodeField(FIELDS.legend, state.spec.legend),
    encodeField(FIELDS.yMax, state.spec.yMax ?? 0),
    encodeField(FIELDS.title, state.spec.title),
    encodeField(FIELDS.picked, state.picked),
  ]);
}
