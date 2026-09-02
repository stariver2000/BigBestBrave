import { describe, expect, it } from 'vitest';
import { LOCALES } from '@core/i18n';
import { TYPES, decodeLabels, encodeLabels, splitScript, suggestType } from '@core/howto';
import { MAX_URL_TEXT, SAMPLES, SAMPLE_IDS } from '../../../src/modules/script/config';
import { filterToSet, toggleFilter } from '../../../src/modules/script/state';

/**
 * 견본 대본의 계약.
 *
 * 라벨은 URL을 타고 언어를 넘어 다닌다 - 한국어로 라벨을 단 링크를 영어 화면에서
 * 열어도 같은 문장에 같은 라벨이 붙어야 한다. 그러려면 세 언어의 견본이
 * 문장 수까지 똑같아야 한다. 이 시험이 그 약속을 강제한다.
 */
describe.each(SAMPLE_IDS)('견본 %s', (id) => {
  const sample = SAMPLES[id];

  it('세 언어의 문장 수가 같고 라벨 수와도 같다', () => {
    const counts = LOCALES.map((locale) => splitScript(sample.text[locale]).length);
    for (const count of counts) {
      expect(count, `문장 수 ${counts.join('/')}`).toBe(sample.labels.length);
    }
  });

  it('라벨이 전부 실제 유형이다', () => {
    const ids = new Set(TYPES.map((type) => type.id));
    for (const label of sample.labels) {
      expect(label === null || ids.has(label)).toBe(true);
    }
  });

  it('라벨이 URL 문자열로 온전히 오간다', () => {
    const encoded = encodeLabels(sample.labels);
    expect(decodeLabels(encoded, sample.labels.length)).toEqual([...sample.labels]);
  });

  it('여덟 유형 이상을 쓴다 - 견본은 갈래표를 보여 주는 자리다', () => {
    expect(new Set(sample.labels.filter((label) => label !== null)).size).toBeGreaterThanOrEqual(8);
  });

  it('견본 본문이 URL 상한보다 짧다 - 견본은 sample= 하나로 재현되지만, 상한은 붙여 넣은 대본의 기준선이다', () => {
    for (const locale of LOCALES) {
      expect(sample.text[locale].length).toBeLessThan(MAX_URL_TEXT);
    }
  });
});

describe('필터 직렬화', () => {
  it('빈 문자열은 전부 보임이고, 토글이 오간다', () => {
    expect(filterToSet('').size).toBe(8);
    const one = toggleFilter('', 'misc');
    expect(filterToSet(one).has('misc')).toBe(false);
    expect(filterToSet(one).size).toBe(7);
    expect(toggleFilter(one, 'misc')).toBe('');
  });

  it('마지막 갈래를 끄면 전부 보임으로 돌아간다 - 빈 화면을 만들지 않는다', () => {
    let filter = '';
    for (const category of ['greeting', 'overview', 'method', 'supplementary', 'explanation', 'description', 'conclusion'] as const) {
      filter = toggleFilter(filter, category);
    }
    expect(filterToSet(filter).size).toBe(1);
    expect(toggleFilter(filter, 'misc')).toBe('');
  });
});

describe('견본과 추천의 관계', () => {
  it('만들기 견본의 마지막 문장은 자기 홍보로 추천된다 (구독 단서)', () => {
    const sentences = splitScript(SAMPLES.creating.text.ko);
    const last = sentences[sentences.length - 1];
    expect(suggestType(last.text, 990)?.type).toBe('selfPromotion');
  });
});
