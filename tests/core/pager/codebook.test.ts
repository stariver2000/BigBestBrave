import { describe, expect, it } from 'vitest';
import {
  CODEBOOK,
  HANGUL_SYLLABLE_COUNT,
  READING_RULES,
  SYLLABLE_TO_DIGIT,
  groupByRule,
  isRepeated,
  repeatedEntries,
  whatPasses,
} from '@core/pager';

/**
 * 코드집은 낱말 목록이 아니라 규칙이 있는 언어다.
 * 그 주장이 자료에서도 참이어야 하므로, 항목과 규칙이 서로 어긋나지 않는지 여기서 잡는다.
 */
describe('코드집의 읽기 규칙', () => {
  it('모든 항목이 표에 있는 규칙 하나를 가리킨다', () => {
    const known = new Set(READING_RULES.map((rule) => rule.id));
    for (const entry of CODEBOOK) {
      expect(known.has(entry.rule), `${entry.digits}`).toBe(true);
    }
  });

  it('설명만 있고 항목이 없는 규칙은 두지 않는다', () => {
    const used = new Set(CODEBOOK.map((entry) => entry.rule));
    for (const rule of READING_RULES) {
      expect(used.has(rule.id), rule.id).toBe(true);
    }
  });

  it('규칙 설명은 세 언어 모두에 있다', () => {
    for (const rule of READING_RULES) {
      for (const locale of ['ko', 'en', 'ja'] as const) {
        expect(rule.name[locale].trim(), `${rule.id}/${locale}`).toBeTruthy();
        expect(rule.note[locale].trim(), `${rule.id}/${locale}`).toBeTruthy();
      }
    }
  });
});

describe('규칙별로 묶기', () => {
  it('묶어도 항목이 사라지거나 늘지 않는다', () => {
    const grouped = groupByRule().flatMap((group) => group.entries);
    expect(grouped).toHaveLength(CODEBOOK.length);
    expect(new Set(grouped.map((entry) => entry.digits)).size).toBe(CODEBOOK.length);
  });

  it('규칙 표의 순서를 그대로 따른다', () => {
    const order = groupByRule().map((group) => group.rule);
    const expected = READING_RULES.map((rule) => rule.id).filter((id) =>
      CODEBOOK.some((entry) => entry.rule === id),
    );
    expect(order).toEqual(expected);
  });

  it('항목이 없는 규칙은 묶음으로 나오지 않는다', () => {
    const groups = groupByRule([{ ...CODEBOOK[0], rule: 'sound' }]);
    expect(groups).toHaveLength(1);
    expect(groups[0].rule).toBe('sound');
  });
});

describe('겹치기', () => {
  it('앞뒤 절반이 같은 숫자만 겹친 것으로 본다', () => {
    expect(isRepeated('8282')).toBe(true);
    expect(isRepeated('9999')).toBe(true);
    expect(isRepeated('4486')).toBe(false);
    expect(isRepeated('1010235')).toBe(false);
  });

  it('한 자리나 두 자리는 겹쳐도 겹친 티가 나지 않으므로 세지 않는다', () => {
    expect(isRepeated('11')).toBe(false);
    expect(isRepeated('7')).toBe(false);
  });

  it('코드집에서 겹쳐 만든 항목을 골라낸다', () => {
    const digits = repeatedEntries().map((entry) => entry.digits);
    expect(digits).toContain('8282');
    expect(digits).toContain('0404');
    expect(digits).not.toContain('486');
  });
});

/**
 * "대부분의 말은 못 간다"는 이 페이지의 주장이다.
 * 주장을 수로 말하는 이상, 그 수가 자료에서 나온 것인지 여기서 확인한다.
 */
describe('숫자라는 문을 지나갈 수 있는 것', () => {
  it('통째로 지나가는 말의 수는 코드집의 크기다', () => {
    expect(whatPasses().codes).toBe(CODEBOOK.length);
  });

  it('한 글자씩 지나가는 글자는 숫자를 읽는 음절뿐이다', () => {
    const passable = Object.keys(SYLLABLE_TO_DIGIT);
    expect(whatPasses().syllables).toBe(passable.length);
    // 열 개의 숫자에 공/영 두 읽기가 겹쳐 열한 자가 된다.
    expect(passable).toHaveLength(11);
    expect(passable).toContain('공');
    expect(passable).toContain('영');
  });

  it('견주는 값은 유니코드 한글 음절 블록의 크기다', () => {
    // U+AC00(가) ~ U+D7A3(힣)
    expect(HANGUL_SYLLABLE_COUNT).toBe(11172);
    expect(whatPasses().hangul).toBe(11172);
  });
});
