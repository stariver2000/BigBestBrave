import { describe, expect, it } from 'vitest';
import { isBrnValid, isLuhnValid, isRrnValid } from '@core/redaction';

describe('룬 검증', () => {
  it('알려진 테스트 카드번호를 통과시킨다', () => {
    // 카드사가 공개한 테스트 번호들. 실제 발급 번호가 아니다.
    expect(isLuhnValid('4242 4242 4242 4242')).toBe(true);
    expect(isLuhnValid('5555555555554444')).toBe(true);
    expect(isLuhnValid('378282246310005')).toBe(true);
  });

  it('한 자리만 틀려도 걸러낸다', () => {
    expect(isLuhnValid('4242424242424243')).toBe(false);
  });

  it('길이가 범위를 벗어나면 거부한다', () => {
    expect(isLuhnValid('42424242')).toBe(false);
    expect(isLuhnValid('4'.repeat(25))).toBe(false);
  });
});

describe('주민등록번호 검증', () => {
  /** 앞 12자리로부터 규칙이 요구하는 마지막 자리를 계산한다. 테스트가 값을 직접 외우지 않게 한다. */
  function checkDigit(prefix: string): number {
    const weights = [2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5];
    const sum = weights.reduce((total, weight, index) => total + weight * Number(prefix[index]), 0);
    return (11 - (sum % 11)) % 10;
  }

  it('검증 자리가 맞는 값만 통과시킨다', () => {
    const prefix = '900101123456';
    const valid = checkDigit(prefix);
    expect(isRrnValid(`${prefix}${valid}`)).toBe(true);

    // 나머지 아홉 개의 끝자리는 모두 거부돼야 한다.
    for (let digit = 0; digit <= 9; digit += 1) {
      if (digit === valid) continue;
      expect(isRrnValid(`${prefix}${digit}`), `끝자리 ${digit}`).toBe(false);
    }
  });

  it('하이픈이 있든 없든 같게 판정한다', () => {
    const prefix = '900101123456';
    const value = `${prefix}${checkDigit(prefix)}`;
    expect(isRrnValid(value)).toBe(isRrnValid(`${value.slice(0, 6)}-${value.slice(6)}`));
  });

  it('달력에 없는 날짜를 거부한다', () => {
    expect(isRrnValid('901301-1234567')).toBe(false);
    expect(isRrnValid('900132-1234567')).toBe(false);
  });

  it('성별 자리가 범위를 벗어나면 거부한다', () => {
    expect(isRrnValid('900101-9234567')).toBe(false);
  });

  it('자릿수가 다르면 거부한다', () => {
    expect(isRrnValid('900101-123456')).toBe(false);
  });
});

describe('사업자등록번호 검증', () => {
  it('실제로 쓰이는 형식을 통과시킨다', () => {
    // 국세청이 예시로 공개한 형식의 값.
    expect(isBrnValid('220-81-62517')).toBe(true);
  });

  it('한 자리를 바꾸면 걸러낸다', () => {
    expect(isBrnValid('220-81-62518')).toBe(false);
  });
});
