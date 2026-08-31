import { describe, expect, it } from 'vitest';
import { LOCALES } from '@core/i18n';
import { defaultDetectors, redact, scan, type DetectorId } from '@core/redaction';
import { SAMPLE_TEXT } from '../../../src/modules/redactor/config';

/**
 * 예시 텍스트가 실제로 탐지되는지 고정한다.
 *
 * 예시에 들어간 번호들은 체크섬을 통과하도록 계산해 넣은 값이다. 누군가 문구를 손보다가
 * 한 자리만 바꿔도 검증에서 걸러져 "예시를 넣었는데 아무것도 못 찾는" 첫인상이 된다.
 * 그 사고를 여기서 막는다.
 */
const REQUIRED: DetectorId[] = ['email', 'rrn', 'card', 'brn', 'ip', 'secret', 'coordinate'];

describe.each(LOCALES.map((locale) => [locale, SAMPLE_TEXT[locale]] as const))(
  '예시 텍스트: %s',
  (_locale, text) => {
    const found = scan(text, defaultDetectors());

    it.each(REQUIRED)('%s 를 찾아낸다', (detector) => {
      expect(found.some((match) => match.detector === detector)).toBe(true);
    });

    it('전화번호를 국내 또는 국제 형식 중 하나로 찾아낸다', () => {
      const phones = found.filter((match) => match.detector.startsWith('phone-'));
      expect(phones.length).toBeGreaterThan(0);
    });

    it("'일부만' 방식에서도 주민등록번호의 생년월일이 남지 않는다", () => {
      // 앞 6자리는 그 자체로 생년월일이다. 확인 편의를 위해 남기면 가리는 의미가 사라진다.
      const partial = redact(text, {
        enabled: defaultDetectors(),
        style: 'partial',
        label: (detector) => detector,
      });
      expect(partial.text).not.toContain('880812');
    });

    it('가린 결과에 원문의 민감한 값이 남지 않는다', () => {
      const result = redact(text, {
        enabled: defaultDetectors(),
        style: 'full',
        label: (detector) => detector,
      });
      expect(result.text).not.toContain('4242 4242 4242 4242');
      expect(result.text).not.toContain('880812-1234564');
      expect(result.text).not.toContain('mins.kim@example.co.kr');
      expect(result.text).not.toContain('220-81-62517');
      expect(result.text).not.toContain('192.168.31.204');
      expect(result.text).not.toContain('sk-abcd1234efgh5678ijkl');
    });
  },
);
