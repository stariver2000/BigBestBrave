/**
 * 원문 스캔: 켜져 있는 탐지기로 후보를 찾고, 체크섬으로 걸러낸 뒤 겹침을 정리한다.
 *
 * 겹침 정리가 필요한 이유: "901010-1234567"은 주민등록번호이면서 전화번호 패턴에도 걸린다.
 * 우선순위가 높은 쪽을 남기지 않으면 같은 자리를 두 번 가리며 글자 수가 어긋난다.
 */

import { isBrnValid, isLuhnValid, isRrnValid } from './checksums';
import { DETECTORS, type DetectorSpec } from './config';
import type { DetectorId, Match } from './types';

const VALIDATORS = {
  luhn: isLuhnValid,
  rrn: isRrnValid,
  brn: isBrnValid,
} as const;

function passesValidator(spec: DetectorSpec, value: string): boolean {
  if (!spec.validator) return true;
  return VALIDATORS[spec.validator](value);
}

/** 한 탐지기로 원문 전체를 훑는다. */
function scanOne(text: string, spec: DetectorSpec): Match[] {
  // 원본 정규식에 g를 붙인 사본을 만든다. 공유 객체에 lastIndex 상태를 남기지 않기 위함이다.
  const pattern = new RegExp(spec.pattern.source, `${spec.pattern.flags}g`);
  const found: Match[] = [];

  let hit = pattern.exec(text);
  while (hit !== null) {
    const value = hit[0];
    if (passesValidator(spec, value)) {
      found.push({ detector: spec.id, start: hit.index, end: hit.index + value.length, value });
    }
    // 길이 0 매치가 나오면 무한 반복이 되므로 강제로 한 칸 민다.
    if (hit.index === pattern.lastIndex) pattern.lastIndex += 1;
    hit = pattern.exec(text);
  }
  return found;
}

/** 우선순위 -> 길이 -> 앞선 위치 순으로 남길 것을 고른다. */
function resolveOverlaps(matches: Match[]): Match[] {
  const priority = new Map<DetectorId, number>(DETECTORS.map((spec) => [spec.id, spec.priority]));
  const ranked = [...matches].sort((a, b) => {
    const byPriority = (priority.get(b.detector) ?? 0) - (priority.get(a.detector) ?? 0);
    if (byPriority !== 0) return byPriority;
    const byLength = b.end - b.start - (a.end - a.start);
    if (byLength !== 0) return byLength;
    return a.start - b.start;
  });

  const kept: Match[] = [];
  for (const candidate of ranked) {
    const overlaps = kept.some((match) => candidate.start < match.end && match.start < candidate.end);
    if (!overlaps) kept.push(candidate);
  }
  // 치환은 앞에서 뒤로 진행되므로 위치 순으로 되돌려 준다.
  return kept.sort((a, b) => a.start - b.start);
}

export function scan(text: string, enabled: readonly DetectorId[]): Match[] {
  const active = DETECTORS.filter((spec) => enabled.includes(spec.id));
  const found = active.flatMap((spec) => scanOne(text, spec));
  return resolveOverlaps(found);
}

export function detectorSpec(id: DetectorId): DetectorSpec | undefined {
  return DETECTORS.find((spec) => spec.id === id);
}

/** 처음 화면에서 켜져 있어야 할 탐지기 목록. */
export function defaultDetectors(): DetectorId[] {
  return DETECTORS.filter((spec) => spec.defaultOn).map((spec) => spec.id);
}

export function allDetectorIds(): DetectorId[] {
  return DETECTORS.map((spec) => spec.id);
}
