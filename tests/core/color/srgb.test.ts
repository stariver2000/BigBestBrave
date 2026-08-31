import { describe, expect, it } from 'vitest';
import { channelToEncoded, channelToLinear, toHex } from '@core/color/srgb';

describe('sRGB 전달 함수', () => {
  it('선형화와 부호화는 서로의 역함수다', () => {
    for (const value of [0, 0.02, 0.04045, 0.2, 0.5, 1]) {
      const roundTrip = channelToEncoded(channelToLinear(value));
      // 정밀도를 10자리까지 요구하지 않는 이유: sRGB 표준의 두 분기점(0.04045와 0.0031308)이
      // 서로의 정확한 역이 아니라 반올림된 값이라, 경계에서 1e-8 수준의 차이가 원래 남는다.
      expect(roundTrip).toBeCloseTo(value, 7);
    }
  });

  it('분기점 아래에서는 선형 구간을 쓴다', () => {
    expect(channelToLinear(0.04)).toBeCloseTo(0.04 / 12.92, 12);
  });

  it('hex 직렬화는 알파가 1이면 6자리로 끝난다', () => {
    expect(toHex({ r: 1, g: 0, b: 0, a: 1 })).toBe('#ff0000');
    expect(toHex({ r: 0, g: 0, b: 0, a: 0.5 })).toBe('#00000080');
  });
});
