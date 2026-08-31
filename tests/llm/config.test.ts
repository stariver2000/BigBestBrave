import { describe, expect, it } from 'vitest';
import { isConfigured, loadLlmConfig } from '@llm/config';

describe('LLM 설정', () => {
  it('엔드포인트가 없으면 미설정 상태다', () => {
    const config = loadLlmConfig({});
    expect(isConfigured(config)).toBe(false);
    expect(config.maxConcurrency).toBe(1);
  });

  it('빈 문자열은 미설정으로 본다', () => {
    expect(isConfigured(loadLlmConfig({ LLM_BASE_URL: '   ' }))).toBe(false);
  });

  it('잘못된 숫자는 기본값으로 되돌린다', () => {
    const config = loadLlmConfig({ LLM_BASE_URL: 'http://x/v1', LLM_MAX_CONCURRENCY: '-3' });
    expect(config.maxConcurrency).toBe(1);
  });
});
