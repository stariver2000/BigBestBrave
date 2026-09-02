/**
 * 대본 진단의 화면 상태와 URL 직렬화 규칙.
 *
 * 라벨을 단 대본은 곧 작업물이라, 링크 하나로 남에게 그대로 넘어가야 한다.
 * 견본 대본은 sample= 만으로 재현되고, 라벨은 문장마다 한 글자(a~u, 미정 '-')로
 * 실린다. 직접 붙여 넣은 대본은 MAX_URL_TEXT 이하일 때만 URL에 실리고,
 * 넘으면 라벨만 실린 채 본문은 이 브라우저에만 남는다(화면에 그 사실을 적는다).
 */

import { CATEGORIES, type CategoryId } from '../../core/howto';
import { booleanField, encodeField, readField, stringField, writeFields } from '../../kit';
import { SAMPLE_IDS, type SampleId } from './config';

export type SampleChoice = SampleId | 'custom';
const SAMPLE_CHOICES: readonly SampleChoice[] = [...SAMPLE_IDS, 'custom'];

/**
 * labels의 기본값 '~'는 "견본이 들고 온 라벨 그대로"라는 뜻이다.
 * 빈 문자열('')과 구별해야 한다 - 빈 문자열은 사용자가 라벨을 전부 지운 상태다.
 */
export const PRESET_LABELS = '~';

export interface ScriptState {
  sample: SampleChoice;
  /** custom일 때의 대본 본문. 견본일 때는 빈 문자열. */
  text: string;
  /** 인코딩된 라벨 문자열. PRESET_LABELS면 견본의 기본 라벨을 쓴다. */
  labels: string;
  /** 보이는 갈래 필터. CATEGORIES 인덱스(0~7)를 이어 붙인 것. '' = 전부. */
  filter: string;
  /** 구성 표를 갈래로 볼지 유형으로 볼지. */
  byType: boolean;
}

const FIELDS = {
  sample: stringField('sample', 'creating', SAMPLE_CHOICES),
  text: stringField('text', ''),
  labels: stringField('labels', PRESET_LABELS),
  filter: stringField('filter', ''),
  byType: booleanField('types', false),
} as const;

export function readState(params: URLSearchParams): ScriptState {
  const labels = readField(params, FIELDS.labels);
  const filter = readField(params, FIELDS.filter);
  return {
    sample: readField(params, FIELDS.sample) as SampleChoice,
    text: readField(params, FIELDS.text),
    // 손으로 고친 URL에 엉뚱한 글자가 있으면 통째로 기본값으로 돌린다.
    labels: /^[a-u-]*$/.test(labels) || labels === PRESET_LABELS ? labels : PRESET_LABELS,
    filter: /^[0-7]*$/.test(filter) ? filter : '',
    byType: readField(params, FIELDS.byType),
  };
}

export function writeState(state: ScriptState): string {
  return writeFields([
    encodeField(FIELDS.sample, state.sample),
    encodeField(FIELDS.text, state.text),
    encodeField(FIELDS.labels, state.labels),
    encodeField(FIELDS.filter, state.filter),
    encodeField(FIELDS.byType, state.byType),
  ]);
}

/** 필터 문자열을 갈래 집합으로. 빈 문자열은 "전부 보임"이다. */
export function filterToSet(filter: string): Set<CategoryId> {
  if (filter === '') return new Set(CATEGORIES);
  const set = new Set<CategoryId>();
  for (const char of filter) {
    const category = CATEGORIES[Number(char)];
    if (category) set.add(category);
  }
  return set;
}

/** 갈래 하나를 켜고 끈 다음 필터 문자열로 되돌린다. 전부 켜지면 ''로 줄인다. */
export function toggleFilter(filter: string, category: CategoryId): string {
  const set = filterToSet(filter);
  if (set.has(category)) set.delete(category);
  else set.add(category);
  if (set.size === CATEGORIES.length || set.size === 0) return '';
  return CATEGORIES.map((id, index) => (set.has(id) ? String(index) : '')).join('');
}
