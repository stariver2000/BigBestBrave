import { describe, expect, it } from 'vitest';
import { defaultDetectors, redact, scan, type DetectorId } from '@core/redaction';

/** 코어는 문구를 모르므로 테스트가 라벨을 넘긴다. */
const label = (detector: DetectorId) => detector;
const options = (style: 'full' | 'partial' | 'label' | 'pseudonym', enabled = defaultDetectors()) => ({
  enabled,
  style,
  label,
});

describe('탐지', () => {
  it('이메일과 전화번호를 찾는다', () => {
    const found = scan('연락처: bae@example.com / 010-1234-5678', defaultDetectors());
    expect(found.map((match) => match.detector).sort()).toEqual(['email', 'phone-kr']);
  });

  it('체크섬을 통과하지 못한 카드번호는 잡지 않는다', () => {
    const good = scan('카드 4242 4242 4242 4242', ['card']);
    const bad = scan('카드 4242 4242 4242 4243', ['card']);
    expect(good).toHaveLength(1);
    expect(bad).toHaveLength(0);
  });

  it('꺼 둔 탐지기는 동작하지 않는다', () => {
    expect(scan('bae@example.com', ['card'])).toHaveLength(0);
  });

  it('겹치는 후보는 우선순위가 높은 하나만 남긴다', () => {
    // 주민등록번호는 전화번호 패턴과도 겹치지만 한 번만 잡혀야 한다.
    const text = '901010-1234567';
    const found = scan(text, ['rrn', 'phone-kr', 'account']);
    const covered = found.reduce((total, match) => total + (match.end - match.start), 0);
    expect(covered).toBeLessThanOrEqual(text.length);
    expect(found.every((a) => found.every((b) => a === b || a.end <= b.start || b.end <= a.start))).toBe(true);
  });

  it('찾은 위치가 원문과 정확히 맞는다', () => {
    const text = '메일은 bae@example.com 입니다';
    const [match] = scan(text, ['email']);
    expect(text.slice(match.start, match.end)).toBe(match.value);
  });
});

describe('가림', () => {
  const text = '메일 bae@example.com, 전화 010-1234-5678';

  it('partial은 앞부분을 남긴다', () => {
    const result = redact(text, options('partial'));
    expect(result.text).toContain('ba');
    expect(result.text).not.toContain('bae@example.com');
    expect(result.text).toContain('010');
    expect(result.text).not.toContain('1234-5678');
  });

  it('full은 아무것도 남기지 않는다', () => {
    const result = redact(text, options('full'));
    expect(result.text).not.toContain('bae');
    expect(result.text).not.toContain('010');
  });

  it('label은 유형만 남긴다', () => {
    expect(redact(text, options('label')).text).toContain('[email]');
  });

  it('pseudonym은 같은 값에 같은 번호를 준다', () => {
    const repeated = 'a@b.com 그리고 a@b.com 그리고 c@d.com';
    const result = redact(repeated, options('pseudonym'));
    expect(result.text.match(/\[email#1\]/g)).toHaveLength(2);
    expect(result.text).toContain('[email#2]');
  });

  it('가리지 않는 부분은 원문 그대로 남는다', () => {
    const result = redact(text, options('label'));
    expect(result.text.startsWith('메일 ')).toBe(true);
    expect(result.text).toContain(', 전화 ');
  });

  it('탐지기별 개수를 센다', () => {
    const result = redact('a@b.com c@d.com 010-1234-5678', options('full'));
    expect(result.counts.email).toBe(2);
    expect(result.counts['phone-kr']).toBe(1);
  });

  it('개인정보가 없으면 원문을 그대로 돌려준다', () => {
    const plain = '오늘 날씨가 좋습니다.';
    expect(redact(plain, options('full')).text).toBe(plain);
  });
});
