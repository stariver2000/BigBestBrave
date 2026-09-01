/**
 * 옮겨 적기가 옳았는지 되짚는 시험.
 * 표 3은 개수와 백분율을 함께 실었고, 개수의 합이 본문의 1,970과 정확히 맞아야 한다.
 */

import { describe, expect, it } from 'vitest';
import {
  DEMO_THRESHOLDS,
  FUNNEL,
  GESTURES,
  percentOf,
  ranked,
  totalInstances,
  validatedShare,
} from '../../../src/core/hidden';

describe('표 3 - 손짓별 분포', () => {
  it('여섯 손짓의 합이 본문의 1,970과 정확히 같다', () => {
    expect(GESTURES).toHaveLength(6);
    expect(totalInstances()).toBe(FUNNEL.validated);
  });

  it('개수에서 앞으로 계산한 백분율이 다섯 손짓에서 표기와 맞는다', () => {
    for (const gesture of GESTURES) {
      if (gesture.id === 'longPress') continue;
      expect(Math.abs(percentOf(gesture.id) - gesture.percent), gesture.id).toBeLessThan(0.06);
    }
  });

  /**
   * 길게 누름만 어긋난다. 379/1970 = 19.24%인데 논문은 19.3%라 적었다.
   * 개수의 합이 1,970과 정확히 맞으므로 개수가 옳고 백분율 쪽이 반올림 실수로 보인다.
   * 맞추려고 개수를 고치지 않고, 어긋남의 폭(0.06%p 언저리)을 그대로 붙들어 둔다.
   */
  it('길게 누름의 백분율 표기는 0.06%p쯤 어긋난다 - 개수 쪽이 옳다', () => {
    expect(percentOf('longPress')).toBeCloseTo(19.24, 2);
    const gap = Math.abs(percentOf('longPress') - 19.3);
    expect(gap).toBeGreaterThan(0.05);
    expect(gap).toBeLessThan(0.1);
  });

  it('백분율의 합이 100 언저리다', () => {
    const sum = GESTURES.reduce((acc, gesture) => acc + gesture.percent, 0);
    expect(Math.abs(sum - 100)).toBeLessThanOrEqual(0.15);
  });

  it('가장 흔한 손짓은 탭이고 가장 드문 것은 스크롤이다', () => {
    const order = ranked();
    expect(order[0]).toBe('tap');
    expect(order[order.length - 1]).toBe('scroll');
    // 겉보기와 달리 두 번째는 스와이프다 - 가로로 미는 손짓 뒤에 기능이 많이 숨는다.
    expect(order[1]).toBe('swipe');
  });

  it('방향이 있는 손짓은 스와이프(가로), 스크롤(세로), 핀치(안팎) 셋뿐이다', () => {
    const directed = GESTURES.filter((gesture) => gesture.direction !== null);
    expect(directed.map((gesture) => gesture.id).sort()).toEqual(['pinch', 'scroll', 'swipe']);
  });
});

describe('깔때기', () => {
  it('탐침 8,312건 가운데 1,970건만 남았다 - 4분의 1이 안 된다', () => {
    expect(FUNNEL.validated).toBeLessThan(FUNNEL.probed);
    expect(validatedShare()).toBeLessThan(25);
    expect(validatedShare()).toBeCloseTo(23.7, 1);
  });

  it('앱은 여든한 개다', () => {
    expect(FUNNEL.apps).toBe(81);
  });
});

describe('시연의 문턱', () => {
  it('길게 누름은 0.5초, 스와이프는 48픽셀이다 - 논문이 아니라 이 페이지의 값이다', () => {
    expect(DEMO_THRESHOLDS.longPressMs).toBe(500);
    expect(DEMO_THRESHOLDS.swipePx).toBeGreaterThan(0);
  });
});
