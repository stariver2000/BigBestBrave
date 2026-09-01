/**
 * "알려진 단어에서 몇 걸음 떨어져 있는가"를 재는 계산.
 *
 * 비밀번호를 깨는 쪽은 무작위로 찍지 않는다. 유출된 단어 사전을 빈도 순으로 놓고,
 * 각 단어에 **변형 규칙**을 씌워 훑는다. 첫 글자를 대문자로, a를 @로, 뒤에 연도를,
 * 뒤집기, 두 번 잇기. 사람이 "그래도 좀 바꿨으니까" 하고 안심하는 바로 그 손질들이
 * 규칙 목록에 이미 들어 있다.
 *
 * 여기서는 사전 단어 하나하나를 비밀번호에 **겹쳐 놓아** 본다. 겹쳐지는 자리가 있으면
 * 남는 앞뒤가 덧붙인 글자이고, 겹친 자리에서 어긋난 글자가 대문자화와 바꿔치기다.
 * 손질을 벗기는 순서를 정해 두고 하나씩 떼는 방식은 쓰지 않았다. `$unsh1ne2024!` 처럼
 * 맨 앞 기호가 덧붙인 것인지 바꿔치기한 글자인지 순서만으로는 가릴 수 없기 때문이다.
 *
 * 사전이 백여 개뿐이라 전부 겹쳐 보고 가장 싼 길을 고른다. 어림잡을 이유가 없다.
 */

import { AFFIX_PATTERN, BRANCHING, CORPUS, LEET_MAP } from './config';
import type { AppliedRule, Derivation } from './types';

/** 크래커의 바꿔치기 표에 걸리는 원래 글자들. 'a', 'e', 'o', 's' 같은 것. */
const LEETABLE_LETTERS: ReadonlySet<string> = new Set(Object.values(LEET_MAP));

function reverseOf(text: string): string {
  return [...text].reverse().join('');
}

/** 같은 조각이 두 번 이어 붙은 말이면 한 조각을 돌려준다. */
function halfOf(text: string): string | null {
  if (text.length < 2 || text.length % 2 !== 0) return null;
  const half = text.slice(0, text.length / 2);
  return text.slice(half.length) === half ? half : null;
}

/** 덧붙은 글자 한 자리가 가질 수 있는 값의 수. */
function charSpace(char: string): number {
  if (char >= '0' && char <= '9') return BRANCHING.digitSpace;
  return BRANCHING.symbolSpace;
}

function affixBranching(affix: string): number {
  return [...affix].reduce((product, char) => product * charSpace(char), 1);
}

/** 앞뒤에 덧붙은 것으로 인정할 수 있는가. 글자가 섞여 있으면 다른 단어이지 덧붙인 것이 아니다. */
function isAffix(text: string): boolean {
  return [...text].every((char) => AFFIX_PATTERN.test(char));
}

/** 사전 단어에서 크래커가 바꿔치기해 볼 수 있는 자리의 수. */
function leetSlots(word: string): number {
  return [...word].filter((char) => LEETABLE_LETTERS.has(char)).length;
}

/** 한 자리가 사전 단어의 글자와 맞는가. 맞다면 어떤 손질을 거친 것인가. */
function matchChar(actual: string, target: string): 'same' | 'case' | 'leet' | null {
  if (actual === target) return 'same';
  if (actual.toLowerCase() === target) return 'case';
  if (LEET_MAP[actual] === target) return 'leet';
  return null;
}

/** 사전 단어를 비밀번호의 i번째 자리에 겹쳐 본다. 어긋나면 null. */
function overlay(text: string, at: number, word: string): { cased: boolean; leeted: boolean } | null {
  let cased = false;
  let leeted = false;
  for (let i = 0; i < word.length; i += 1) {
    const kind = matchChar(text[at + i], word[i]);
    if (kind === null) return null;
    if (kind === 'case') cased = true;
    if (kind === 'leet') leeted = true;
  }
  return { cased, leeted };
}

function attemptsOf(baseRank: number, rules: readonly AppliedRule[]): number {
  return rules.reduce((total, rule) => total * rule.branching, baseRank);
}

/** 사전 단어 하나에 대해 이 비밀번호에 닿는 가장 싼 길. */
function deriveFromWord(
  password: string,
  word: string,
  baseRank: number,
  carried: readonly AppliedRule[],
): Derivation | null {
  let best: Derivation | null = null;
  const limit = password.length - word.length;

  for (let at = 0; at <= limit; at += 1) {
    const prefix = password.slice(0, at);
    const suffix = password.slice(at + word.length);
    if (!isAffix(prefix) || !isAffix(suffix)) continue;
    const overlaid = overlay(password, at, word);
    if (overlaid === null) continue;

    const rules: AppliedRule[] = [...carried];
    if (suffix.length > 0) {
      rules.push({ id: 'suffix', detail: suffix, branching: affixBranching(suffix) });
    }
    if (prefix.length > 0) {
      rules.push({ id: 'prefix', detail: prefix, branching: affixBranching(prefix) });
    }
    if (overlaid.cased) {
      rules.push({
        id: 'case',
        detail: password.slice(at, at + word.length),
        branching: BRANCHING.caseVariants,
      });
    }
    if (overlaid.leeted) {
      rules.push({
        id: 'leet',
        detail: password.slice(at, at + word.length),
        branching: Math.pow(BRANCHING.leetPerSlot, leetSlots(word)),
      });
    }

    const attempts = attemptsOf(baseRank, rules);
    if (best === null || attempts < best.attempts) {
      best = { base: word, baseRank, rules, attempts };
    }
  }

  return best;
}

/** 사전 단어에 닿는 가장 짧은 길을 찾는다. 못 찾으면 null. */
export function deriveFromCorpus(password: string): Derivation | null {
  if (password.length === 0) return null;
  let best: Derivation | null = null;

  const keep = (found: Derivation | null) => {
    if (found !== null && (best === null || found.attempts < best.attempts)) best = found;
  };

  // 뒤집기와 두 번 잇기는 단어 전체에 걸리는 손질이라 바깥에서 한 번만 벗긴다.
  const stages: { text: string; carried: AppliedRule[] }[] = [{ text: password, carried: [] }];
  const reversed = reverseOf(password);
  if (reversed !== password) {
    stages.push({
      text: reversed,
      carried: [{ id: 'reverse', detail: reversed, branching: BRANCHING.reverse }],
    });
  }
  for (const stage of [...stages]) {
    const half = halfOf(stage.text);
    if (half !== null) {
      stages.push({
        text: half,
        carried: [...stage.carried, { id: 'repeat', detail: half, branching: BRANCHING.repeat }],
      });
    }
  }

  for (const stage of stages) {
    for (let index = 0; index < CORPUS.length; index += 1) {
      keep(deriveFromWord(stage.text, CORPUS[index], index + 1, stage.carried));
    }
  }

  return best;
}

/** 사전에 글자 그대로 있는가. */
export function isInCorpus(password: string): boolean {
  return CORPUS.includes(password);
}

export const CORPUS_WORD_COUNT = CORPUS.length;
