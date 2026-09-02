/**
 * 빌드 디렉토리를 세션·포트마다 가르는 이유
 *
 * 이 저장소는 여러 세션이 동시에 서버를 띄운다. 그런데 next 프로세스 둘이 같은
 * 빌드 디렉토리를 물면 서로의 청크를 덮어 **모든 라우트가 500으로 죽는다**
 * (2026-09-03에 실제로 났다: `Cannot find module './331.js'`).
 * tsc도 vitest도 초록인데 화면만 죽으므로 원인을 찾기 어렵다.
 *
 * 규칙으로만 두면 지키는 쪽이 아니라 **잊은 쪽이 남을 죽인다.** 그래서 기본값
 * 자체를 갈랐다.
 *   - 개발 서버는 포트마다 다른 디렉토리를 쓴다(`.next-dev-3002`).
 *     한 포트에 두 서버가 못 뜨므로, 개발 서버끼리 부딪히는 일이 없어진다.
 *   - `next build`/`next start`만 `.next`를 쓴다. 배포 경로는 그대로다.
 *   - 개발 서버가 기본 `.next`를 건드리지 않으므로, 오래 띄워 둔 운영 서버가
 *     누군가의 `npm run dev` 한 번에 죽는 일이 사라진다.
 *   - `NEXT_DIST_DIR`로 덮어쓸 수 있다.
 *
 * `.next-*`는 `.gitignore`에 있다.
 */

import { PHASE_DEVELOPMENT_SERVER } from 'next/constants.js';

/** 개발 서버가 뜬 포트. `--port`/`-p` 플래그가 PORT 환경변수보다 앞선다. */
function devPort() {
  const flagAt = process.argv.findIndex((arg) => arg === '--port' || arg === '-p');
  const fromFlag = flagAt >= 0 ? process.argv[flagAt + 1] : undefined;
  return fromFlag ?? process.env.PORT ?? '3000';
}

/** @type {import('next').NextConfig} */
const baseConfig = {
  reactStrictMode: true,
  // 트리가 10층까지 깊어져도 URL은 단일 도메인 하위 경로로만 갈라진다.
  // 리라이트/리다이렉트를 쓰지 않는 이유: 경로 자체가 트리의 정규 주소이기 때문.
  trailingSlash: false,
};

export default function config(phase) {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  return {
    ...baseConfig,
    distDir: process.env.NEXT_DIST_DIR ?? (isDev ? `.next-dev-${devPort()}` : '.next'),
  };
}
