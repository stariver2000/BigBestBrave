/**
 * Chroma Lab의 화면 상태와 URL 직렬화 규칙.
 *
 * 상태를 URL에 싣기 때문에 "지금 보고 있는 팔레트"를 링크 하나로 넘길 수 있다.
 * 경로는 트리 좌표로 고정돼 있으므로 질의문자열만 바뀐다.
 */

import { HARMONY_KINDS, type HarmonyKind } from '../../core/color';
import {
  EXPORT_FORMATS,
  booleanField,
  encodeField,
  numberField,
  readField,
  stringField,
  writeFields,
  type ExportFormat,
} from '../../kit';
import {
  CVD_CHOICES,
  DEFAULT_CVD_SEVERITY,
  DEFAULT_CONTRAST_PAIR,
  DEFAULT_EXPORT_FORMAT,
  DEFAULT_EXPORT_PREFIX,
  DEFAULT_HARMONY,
  DEFAULT_SEED,
  type CvdChoice,
} from './config';

export interface ChromaState {
  seed: string;
  harmony: HarmonyKind;
  cvd: CvdChoice;
  severity: number;
  textStep: number;
  backgroundStep: number;
  /** 대비 검사에서 글자 색을 고르는 트랙(조화 색 중 몇 번째). */
  textTrack: number;
  backgroundTrack: number;
  format: ExportFormat;
  prefix: string;
  /** 램프에 색각 이상 시뮬레이션을 적용해 볼지. 끄면 대비 검사에만 참고로 쓰인다. */
  simulateRamp: boolean;
}

const FIELDS = {
  seed: stringField('seed', DEFAULT_SEED),
  harmony: stringField('harmony', DEFAULT_HARMONY, HARMONY_KINDS),
  cvd: stringField('cvd', 'none', CVD_CHOICES),
  severity: numberField('sev', DEFAULT_CVD_SEVERITY, 0, 1),
  textStep: numberField('ts', DEFAULT_CONTRAST_PAIR.text, 0, 1000),
  backgroundStep: numberField('bs', DEFAULT_CONTRAST_PAIR.background, 0, 1000),
  textTrack: numberField('tt', 0, 0, 16),
  backgroundTrack: numberField('bt', 0, 0, 16),
  format: stringField('fmt', DEFAULT_EXPORT_FORMAT, EXPORT_FORMATS),
  prefix: stringField('prefix', DEFAULT_EXPORT_PREFIX),
  simulateRamp: booleanField('simramp', true),
} as const;

export function readState(params: URLSearchParams): ChromaState {
  return {
    seed: readField(params, FIELDS.seed),
    harmony: readField(params, FIELDS.harmony) as HarmonyKind,
    cvd: readField(params, FIELDS.cvd) as CvdChoice,
    severity: readField(params, FIELDS.severity),
    textStep: readField(params, FIELDS.textStep),
    backgroundStep: readField(params, FIELDS.backgroundStep),
    textTrack: readField(params, FIELDS.textTrack),
    backgroundTrack: readField(params, FIELDS.backgroundTrack),
    format: readField(params, FIELDS.format) as ExportFormat,
    prefix: readField(params, FIELDS.prefix),
    simulateRamp: readField(params, FIELDS.simulateRamp),
  };
}

export function writeState(state: ChromaState): string {
  return writeFields([
    encodeField(FIELDS.seed, state.seed),
    encodeField(FIELDS.harmony, state.harmony),
    encodeField(FIELDS.cvd, state.cvd),
    encodeField(FIELDS.severity, state.severity),
    encodeField(FIELDS.textStep, state.textStep),
    encodeField(FIELDS.backgroundStep, state.backgroundStep),
    encodeField(FIELDS.textTrack, state.textTrack),
    encodeField(FIELDS.backgroundTrack, state.backgroundTrack),
    encodeField(FIELDS.format, state.format),
    encodeField(FIELDS.prefix, state.prefix),
    encodeField(FIELDS.simulateRamp, state.simulateRamp),
  ]);
}
