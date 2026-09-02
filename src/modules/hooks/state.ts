/**
 * 엉킨 갈고리의 화면 상태와 URL 직렬화 규칙.
 *
 * 찾기 놀이의 진행(고른 요소들)이 곧 작업물이라 링크 하나로 남에게 넘어가야 한다.
 * 고른 요소는 그래프의 추출 순서 코드(0-9a-z 한 글자씩)로 실린다. 붙여 넣은
 * 코드는 MAX_URL_TEXT 이하일 때만 URL에 실리고, 넘으면 이 브라우저에만 남는다.
 */

import { booleanField, encodeField, readField, stringField, writeFields } from '../../kit';
import { SAMPLE_IDS, type SampleId } from './config';

export type SampleChoice = SampleId | 'custom';
const SAMPLE_CHOICES: readonly SampleChoice[] = [...SAMPLE_IDS, 'custom'];

export type ViewChoice = 'code' | 'graph';

export interface HooksState {
  sample: SampleChoice;
  /** custom일 때의 코드 본문. 견본일 때는 빈 문자열. */
  text: string;
  /** 의심 표시한 요소들의 한 글자 코드 이어 붙임. */
  picked: string;
  view: ViewChoice;
  /** 검출기의 정답(빨간 칠)을 켰는가. */
  warn: boolean;
}

const FIELDS = {
  sample: stringField('sample', 'planted', SAMPLE_CHOICES),
  text: stringField('text', ''),
  picked: stringField('picked', ''),
  view: stringField('view', 'code', ['code', 'graph']),
  warn: booleanField('warn', false),
} as const;

export function readState(params: URLSearchParams): HooksState {
  const picked = readField(params, FIELDS.picked);
  return {
    sample: readField(params, FIELDS.sample) as SampleChoice,
    text: readField(params, FIELDS.text),
    // 손으로 고친 URL에 엉뚱한 글자가 있으면 통째로 기본값으로 돌린다.
    picked: /^[0-9a-z]*$/.test(picked) ? picked : '',
    view: readField(params, FIELDS.view) as ViewChoice,
    warn: readField(params, FIELDS.warn),
  };
}

export function writeState(state: HooksState): string {
  return writeFields([
    encodeField(FIELDS.sample, state.sample),
    encodeField(FIELDS.text, state.text),
    encodeField(FIELDS.picked, state.picked),
    encodeField(FIELDS.view, state.view),
    encodeField(FIELDS.warn, state.warn),
  ]);
}
