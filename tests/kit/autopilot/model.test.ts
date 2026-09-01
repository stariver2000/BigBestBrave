import { describe, expect, it } from 'vitest';
import { AUTOPILOT_LABELS, nextIndex, waitFor, type AutopilotStep } from '../../../src/kit/autopilot';
import { LOCALES } from '@core/i18n';

const steps: AutopilotStep[] = [
  { wait: 100, run: () => {} },
  { wait: 200, run: () => {} },
  { wait: 300, run: () => {} },
];

describe('시연의 차례', () => {
  it('끝에 닿으면 처음으로 돌아간다', () => {
    expect(nextIndex(0, 3)).toBe(1);
    expect(nextIndex(2, 3)).toBe(0);
  });

  it('보여 줄 것이 없으면 늘 제자리다', () => {
    expect(nextIndex(0, 0)).toBe(0);
  });
});

describe('기다리는 시간', () => {
  it('첫 단계는 따로 잡은 시간을 쓴다', () => {
    // 화면이 뜨자마자 움직이면 무엇이 바뀌었는지 눈이 못 따라간다.
    expect(waitFor(steps, 0, 1400)).toBe(1400);
  });

  it('그다음부터는 단계가 정한 시간을 쓴다', () => {
    expect(waitFor(steps, 1, 1400)).toBe(200);
    expect(waitFor(steps, 2, 1400)).toBe(300);
  });

  it('한 바퀴를 돈 뒤에도 같은 시간이 나온다', () => {
    expect(waitFor(steps, 4, 1400)).toBe(200);
  });

  it('단계가 없으면 첫 시간만 남는다', () => {
    expect(waitFor([], 3, 900)).toBe(900);
  });
});

describe('시연 표시 문구', () => {
  it('세 언어 모두에 있다', () => {
    for (const key of ['running', 'stopped', 'resume'] as const) {
      for (const locale of LOCALES) {
        expect(AUTOPILOT_LABELS[key][locale].trim().length, `${key}/${locale}`).toBeGreaterThan(0);
      }
    }
  });
});
