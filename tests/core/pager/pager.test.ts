import { describe, expect, it } from 'vitest';
import { CODEBOOK, MAX_DIGITS, codeOfDay, encode, literalReading, onlyDigits, segmentations } from '@core/pager';

describe('숫자 읽기', () => {
  it('한자음으로 그대로 읽는다', () => {
    expect(literalReading('8282')).toBe('팔이팔이');
    expect(literalReading('1004')).toBe('일공공사');
  });

  it('숫자가 아닌 글자는 걸러 낸다', () => {
    expect(onlyDigits('82-82 빨리')).toBe('8282');
  });
});

describe('해독', () => {
  it('코드집에 있는 숫자를 뜻으로 읽는다', () => {
    const first = segmentations('8282')[0];
    expect(first.pieces).toHaveLength(1);
    expect(first.pieces[0].reading).toBe('빨리빨리');
  });

  it('한 숫자를 여러 갈래로 읽어 낸다', () => {
    // 1004는 '천사'로도, '백(100)과 사(4)'로도 읽힌다. 그 여러 갈래를 보여 주는 것이 이 도구다.
    const results = segmentations('1004');
    expect(results.length).toBeGreaterThan(1);
    expect(results[0].pieces[0].reading).toBe('천사');
    const alternatives = results.slice(1).flatMap((s) => s.pieces.map((p) => p.reading));
    expect(alternatives).toContain('백(빽)');
  });

  it('코드집에 걸린 자릿수가 많은 해석을 먼저 보여 준다', () => {
    const results = segmentations('82821004');
    expect(results[0].matched).toBeGreaterThanOrEqual(results[results.length - 1].matched);
  });

  it('코드가 하나도 없으면 통째로 읽는다', () => {
    const [only] = segmentations('333');
    expect(only.pieces).toHaveLength(1);
    expect(only.pieces[0].reading).toBe('삼삼삼');
    expect(only.matched).toBe(0);
  });

  it('빈 입력은 결과가 하나(빈 해석)다', () => {
    expect(segmentations('')).toHaveLength(1);
  });

  it('모든 해석은 원래 숫자를 그대로 복원한다', () => {
    for (const segmentation of segmentations('10048282178')) {
      expect(segmentation.pieces.map((piece) => piece.digits).join('')).toBe('10048282178');
    }
  });
});

describe('숫자로 옮기기', () => {
  it('코드집에 있는 말은 코드로 옮긴다', () => {
    const result = encode('사랑해');
    expect(result.digits).toBe('486');
    expect(result.coverage).toBe(1);
  });

  it('긴 뜻을 먼저 찾는다', () => {
    // '빨리빨리'가 있는데 '빨리'로 두 번 끊으면 안 된다.
    expect(encode('빨리빨리').pieces).toHaveLength(1);
  });

  it('숫자로 읽히는 글자는 한 자리씩 옮긴다', () => {
    expect(encode('오').digits).toBe('5');
  });

  it('옮기지 못한 부분을 감추지 않는다', () => {
    const result = encode('보고싶어');
    expect(result.digits).toBe('');
    expect(result.coverage).toBe(0);
    expect(result.pieces.every((piece) => piece.via === 'lost')).toBe(true);
  });

  it('잃어버린 글자들은 한 조각으로 묶는다', () => {
    const lost = encode('보고싶어').pieces.filter((piece) => piece.via === 'lost');
    expect(lost).toHaveLength(1);
    expect(lost[0].text).toBe('보고싶어');
  });

  it('공백은 잃은 것으로 세지 않는다', () => {
    expect(encode('사랑해 사랑해').coverage).toBe(1);
  });

  it('자릿수 한도를 넘으면 잘라 내고 알린다', () => {
    const result = encode('열렬히 사모 열렬히 사모 열렬히 사모');
    expect(result.overflow).toBe(true);
    expect(result.digits.length).toBe(MAX_DIGITS);
  });

  it('빈 입력에서는 0을 돌려준다', () => {
    expect(encode('   ').coverage).toBe(0);
  });
});

describe('오늘의 암호', () => {
  it('날짜가 같으면 같은 암호가 나온다', () => {
    const date = new Date(2026, 7, 31);
    expect(codeOfDay(date)).toBe(codeOfDay(new Date(2026, 7, 31)));
  });

  it('코드집 범위 안의 자리를 가리킨다', () => {
    for (let day = 1; day <= 28; day += 1) {
      const index = codeOfDay(new Date(2026, 0, day));
      expect(index).toBeGreaterThanOrEqual(0);
      expect(index).toBeLessThan(CODEBOOK.length);
    }
  });
});

describe('코드집', () => {
  it('숫자가 겹치지 않는다', () => {
    const digits = CODEBOOK.map((entry) => entry.digits);
    expect(new Set(digits).size).toBe(digits.length);
  });

  it('모든 항목이 세 언어의 뜻과 설명을 갖는다', () => {
    for (const entry of CODEBOOK) {
      for (const locale of ['ko', 'en', 'ja'] as const) {
        expect(entry.meaning[locale].trim(), `${entry.digits}/${locale}`).toBeTruthy();
        expect(entry.reason[locale].trim(), `${entry.digits}/${locale}`).toBeTruthy();
      }
    }
  });
});
