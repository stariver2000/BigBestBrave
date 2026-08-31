/**
 * 코드집을 규칙별로 들여다보기.
 *
 * 코드집은 외워야 할 목록이 아니라 규칙이 있는 언어였다. 규칙을 알면 목록에 없는 숫자도 읽힌다.
 * 그래서 화면은 낱말을 늘어놓는 대신 규칙별로 묶어 보여 준다. 여기 있는 것은 그 묶는 계산이다.
 */

import { CODEBOOK, HANGUL_SYLLABLE_COUNT, READING_RULES, SYLLABLE_TO_DIGIT } from './config';
import type { CodebookEntry, ReadingRule } from './config';

export interface RuleGroup {
  rule: ReadingRule;
  name: { ko: string; en: string; ja: string };
  note: { ko: string; en: string; ja: string };
  entries: CodebookEntry[];
}

/**
 * 규칙 표의 순서대로 항목을 묶는다.
 * 항목이 하나도 없는 규칙은 내보내지 않는다. 빈 제목만 뜨면 규칙이 있다는 인상만 주고 보여 줄 것이 없다.
 */
export function groupByRule(entries: readonly CodebookEntry[] = CODEBOOK): RuleGroup[] {
  const groups: RuleGroup[] = [];
  for (const rule of READING_RULES) {
    const matched = entries.filter((entry) => entry.rule === rule.id);
    if (matched.length === 0) continue;
    groups.push({ rule: rule.id, name: rule.name, note: rule.note, entries: matched });
  }
  return groups;
}

/**
 * 앞 절반과 뒤 절반이 같은 숫자인가. 8282, 0404, 9999가 그렇다.
 *
 * 겹치기는 이 언어의 문법에 가깝다. 같은 조각을 두 번 쓰면 뜻이 강해지거나(빨리 → 빨리빨리),
 * 되풀이되는 동작이 된다(이륙 이륙). 한 자리는 겹쳐도 겹친 티가 나지 않으므로 두 자리부터 본다.
 */
export function isRepeated(digits: string): boolean {
  if (digits.length < 4 || digits.length % 2 !== 0) return false;
  const half = digits.length / 2;
  return digits.slice(0, half) === digits.slice(half);
}

export function repeatedEntries(entries: readonly CodebookEntry[] = CODEBOOK): CodebookEntry[] {
  return entries.filter((entry) => isRepeated(entry.digits));
}

/** 숫자라는 문을 지나갈 수 있는 것의 수. */
export interface Passable {
  /** 통째로 지나가는 말 — 코드집에 있는 뜻. */
  codes: number;
  /** 한 글자씩 지나가는 글자 — 숫자를 읽는 음절(공·영·일·이…구). */
  syllables: number;
  /** 견줄 대상: 한글 음절 전체. */
  hangul: number;
}

/**
 * 대부분의 말이 왜 못 가는지를 수로 말한다.
 *
 * 숫자만 보낼 수 있는 화면에는 문이 둘뿐이다. 코드집에 있는 뜻은 통째로 지나가고,
 * 숫자를 읽는 음절은 한 글자씩 지나간다. 나머지는 전부 문 앞에서 멈춘다.
 * 이 셋을 나란히 놓으면 "전해지는 정도" 막대가 왜 늘 낮은지가 설명된다.
 */
export function whatPasses(): Passable {
  return {
    codes: CODEBOOK.length,
    syllables: Object.keys(SYLLABLE_TO_DIGIT).length,
    hangul: HANGUL_SYLLABLE_COUNT,
  };
}
