/**
 * 찾아낸 조각을 실제로 가린다.
 *
 * 원문을 직접 수정하지 않고 조각을 이어 붙여 새 문자열을 만든다.
 * 문자열을 제자리에서 바꾸면 앞쪽 치환이 뒤쪽 위치를 밀어 계산이 어긋나기 때문이다.
 */

import { detectorSpec, scan } from './detectors';
import { MASK, PSEUDONYM_START } from './config';
import type { DetectorId, Match, MaskStyle, RedactionResult } from './types';

/** 원문 길이를 그대로 드러내지 않도록 기호 개수에 상·하한을 둔다. */
function maskBar(length: number): string {
  const clamped = Math.min(Math.max(length, MASK.minLength), MASK.maxLength);
  return MASK.character.repeat(clamped);
}

/** partial: 설정된 만큼 앞뒤를 남기고 가운데를 덮는다. */
function maskPartial(value: string, detector: DetectorId): string {
  const spec = detectorSpec(detector);
  const head = spec?.keep.head ?? 0;
  const tail = spec?.keep.tail ?? 0;
  if (head + tail >= value.length) return maskBar(value.length);
  const prefix = value.slice(0, head);
  const suffix = tail > 0 ? value.slice(value.length - tail) : '';
  return `${prefix}${maskBar(value.length - head - tail)}${suffix}`;
}

/**
 * 라벨 텍스트를 만드는 함수는 밖에서 주입한다.
 * 코어가 특정 언어의 문구를 알면 안 되기 때문이다(화면이 로케일에 맞는 라벨을 넘긴다).
 */
export type LabelResolver = (detector: DetectorId) => string;

export interface RedactOptions {
  enabled: readonly DetectorId[];
  style: MaskStyle;
  label: LabelResolver;
}

function replacementFor(
  match: Match,
  style: MaskStyle,
  label: LabelResolver,
  pseudonyms: Map<string, number>,
): string {
  if (style === 'full') return maskBar(match.value.length);
  if (style === 'partial') return maskPartial(match.value, match.detector);
  if (style === 'label') return `[${label(match.detector)}]`;

  // pseudonym: 같은 값에는 같은 번호를 준다. 문서 안의 "같은 사람"이라는 관계가 남는다.
  const key = `${match.detector}:${match.value}`;
  const existing = pseudonyms.get(key);
  const number = existing ?? pseudonyms.size + PSEUDONYM_START;
  if (existing === undefined) pseudonyms.set(key, number);
  return `[${label(match.detector)}#${number}]`;
}

export function redact(text: string, options: RedactOptions): RedactionResult {
  const matches = scan(text, options.enabled);
  const pseudonyms = new Map<string, number>();
  const counts: Record<string, number> = {};

  const pieces: string[] = [];
  let cursor = 0;
  for (const match of matches) {
    pieces.push(text.slice(cursor, match.start));
    pieces.push(replacementFor(match, options.style, options.label, pseudonyms));
    cursor = match.end;
    counts[match.detector] = (counts[match.detector] ?? 0) + 1;
  }
  pieces.push(text.slice(cursor));

  return { text: pieces.join(''), matches, counts };
}
