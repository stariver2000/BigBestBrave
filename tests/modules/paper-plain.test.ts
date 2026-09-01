/// <reference types="vite/client" />

import { describe, expect, it } from 'vitest';
import { LOCALES } from '@core/i18n';

/**
 * 논문에 기대는 페이지는 그 논문이 무슨 말을 하려는 것인지 스스로 설명해야 한다.
 *
 * 제목과 저자만 걸어 두면 "어려운 것에 기대고 있다"는 인상만 남고 이야기는 전해지지 않는다.
 * 그래서 PAPER를 둔 모듈은 반드시 plain 네 줄을 세 언어로 갖는다. 이 검사가 그 약속을 강제한다.
 * 새 논문 페이지를 추가할 때 이 검사가 먼저 깨지므로, 설명을 빠뜨린 채 배포할 수 없다.
 */
const configs = import.meta.glob('../../src/modules/*/config.ts', { eager: true }) as Record<
  string,
  { PAPER?: { title?: string; plain?: Record<string, Record<string, string>> } }
>;

const withPaper = Object.entries(configs).filter(([, module]) => module.PAPER !== undefined);

const nameOf = (path: string) => path.split('/').slice(-2)[0];

describe('논문 페이지의 쉬운 말 설명', () => {
  it('논문에 기댄 페이지가 실제로 있다', () => {
    expect(withPaper.length).toBeGreaterThan(0);
  });

  describe.each(withPaper.map(([path, module]) => [nameOf(path), module] as const))(
    '%s',
    (_name, module) => {
      it('네 줄을 모두 갖는다', () => {
        const plain = module.PAPER?.plain;
        expect(plain).toBeDefined();
        for (const key of ['problem', 'work', 'took', 'left']) {
          expect(plain?.[key], key).toBeDefined();
        }
      });

      it('세 언어 모두에 비어 있지 않은 문장이 있다', () => {
        const plain = module.PAPER?.plain ?? {};
        for (const key of ['problem', 'work', 'took', 'left']) {
          for (const locale of LOCALES) {
            const text = plain[key]?.[locale] ?? '';
            expect(text.trim().length, `${key}/${locale}`).toBeGreaterThan(20);
          }
        }
      });
    },
  );
});
