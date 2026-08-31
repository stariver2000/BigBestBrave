import { describe, expect, it } from 'vitest';
import { roundTrip } from '@core/pager';

/**
 * 말 → 숫자 → 다시 말. 이 왕복이 그 시절 소통의 실제 모습이었다.
 * 여기서 검사하는 것은 "옳은 번역"이 아니라 "무엇이 남고 무엇이 사라지는가"다.
 */
describe('되돌아온 말', () => {
  it('코드집에 있는 말은 숫자를 지나 그대로 돌아온다', () => {
    const echo = roundTrip('천사');
    expect(echo.sent.digits).toBe('1004');
    expect(echo.returned).toBe('천사');
    expect(echo.intact).toBe(true);
  });

  it('숫자로 옮길 수 없는 말은 아무것도 가지 못한다', () => {
    const echo = roundTrip('보고싶어');
    expect(echo.sent.digits).toBe('');
    expect(echo.returned).toBe('');
    expect(echo.intact).toBe(false);
    expect(echo.sent.pieces.every((piece) => piece.via === 'lost')).toBe(true);
  });

  it('읽는 갈래가 여럿이면 모두 들고 온다', () => {
    const echo = roundTrip('천사');
    expect(echo.readings.length).toBeGreaterThan(1);
  });

  it('빈 글에는 돌아올 말도 없다', () => {
    const echo = roundTrip('   ');
    expect(echo.sent.digits).toBe('');
    expect(echo.intact).toBe(false);
  });
});
