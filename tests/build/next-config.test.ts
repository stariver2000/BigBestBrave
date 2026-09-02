import { describe, expect, it } from 'vitest';
import { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD } from 'next/constants.js';
// @ts-expect-error - next.config.mjs는 타입 선언이 없는 설정 파일이다.
import config, { devPort } from '../../next.config.mjs';

/**
 * 빌드 디렉토리를 가르는 규칙을 붙든다.
 *
 * next 프로세스 둘이 같은 빌드 디렉토리를 물면 서로의 청크를 덮어 모든 라우트가
 * 500으로 죽는다. 이 저장소는 여러 세션이 동시에 서버를 띄우므로, 그 사고를
 * 규칙이 아니라 이 설정으로 막는다. 여기가 깨지면 그 방어가 뚫린 것이다.
 */
const argvOf = (...args: string[]) => ['node', 'next', 'dev', ...args];

describe('개발 서버의 포트 읽기', () => {
  it('띄어쓰기 꼴을 읽는다', () => {
    expect(devPort(argvOf('--port', '3006'), {})).toBe('3006');
    expect(devPort(argvOf('-p', '3007'), {})).toBe('3007');
  });

  it('등호 꼴을 읽는다', () => {
    // 이 자리를 빠뜨리면 --port=3006과 --port=3007이 같은 디렉토리를 물고
    // 서로를 죽인다. 이 설정이 막으려는 바로 그 사고다.
    expect(devPort(argvOf('--port=3006'), {})).toBe('3006');
    expect(devPort(argvOf('-p=3007'), {})).toBe('3007');
  });

  it('플래그가 없으면 PORT 환경변수를 쓴다', () => {
    expect(devPort(argvOf(), { PORT: '3008' })).toBe('3008');
  });

  it('플래그가 환경변수를 이긴다', () => {
    expect(devPort(argvOf('--port=3009'), { PORT: '3001' })).toBe('3009');
    expect(devPort(argvOf('--port', '3009'), { PORT: '3001' })).toBe('3009');
  });

  it('아무것도 없으면 3000이다', () => {
    expect(devPort(argvOf(), {})).toBe('3000');
  });

  it('포트처럼 생긴 다른 인자에 속지 않는다', () => {
    expect(devPort(argvOf('--turbopack'), { PORT: '3010' })).toBe('3010');
    expect(devPort(argvOf('--experimental-https'), {})).toBe('3000');
  });
});

describe('빌드 디렉토리 가르기', () => {
  it('개발 서버는 포트마다 다른 디렉토리를 쓴다', () => {
    const original = process.argv;
    try {
      process.argv = argvOf('--port', '3002');
      expect(config(PHASE_DEVELOPMENT_SERVER).distDir).toBe('.next-dev-3002');
      process.argv = argvOf('--port=3003');
      expect(config(PHASE_DEVELOPMENT_SERVER).distDir).toBe('.next-dev-3003');
    } finally {
      process.argv = original;
    }
  });

  it('빌드는 .next를 그대로 쓴다 - 배포 경로가 바뀌면 안 된다', () => {
    expect(config(PHASE_PRODUCTION_BUILD).distDir).toBe('.next');
  });

  it('개발 서버는 어떤 경우에도 .next를 물지 않는다', () => {
    const original = process.argv;
    try {
      // 오래 띄워 둔 운영 서버(.next)가 누군가의 npm run dev 한 번에 죽지 않아야 한다.
      for (const args of [[], ['--port', '3000'], ['--port=3000'], ['--turbopack']]) {
        process.argv = argvOf(...args);
        expect(config(PHASE_DEVELOPMENT_SERVER).distDir).not.toBe('.next');
      }
    } finally {
      process.argv = original;
    }
  });

  it('NEXT_DIST_DIR이 있으면 그것을 따른다', () => {
    const original = process.env.NEXT_DIST_DIR;
    try {
      process.env.NEXT_DIST_DIR = '.next-custom';
      expect(config(PHASE_DEVELOPMENT_SERVER).distDir).toBe('.next-custom');
      expect(config(PHASE_PRODUCTION_BUILD).distDir).toBe('.next-custom');
    } finally {
      if (original === undefined) delete process.env.NEXT_DIST_DIR;
      else process.env.NEXT_DIST_DIR = original;
    }
  });
});
