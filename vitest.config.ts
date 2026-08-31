import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';

// 테스트는 순수 코어(브라우저/Next 비의존)만 대상으로 한다.
// UI 계층 테스트를 추가할 때 environment를 파일별 주석(@vitest-environment)으로 올린다.
export default defineConfig({
  test: {
    environment: 'node',
    include: ['tests/**/*.test.ts'],
  },
  resolve: {
    alias: {
      '@core': fileURLToPath(new URL('./src/core', import.meta.url)),
      '@modules': fileURLToPath(new URL('./src/modules', import.meta.url)),
      '@llm': fileURLToPath(new URL('./src/llm', import.meta.url)),
      '@shell': fileURLToPath(new URL('./src/shell', import.meta.url)),
    },
  },
});
