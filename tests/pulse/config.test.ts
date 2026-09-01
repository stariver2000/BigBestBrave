import { describe, expect, it } from 'vitest';
import { readPulseConfig } from '../../src/pulse';

/** 시험은 환경변수 몇 개만 준다. 나머지가 없어도 설정 읽기는 제 몫을 해야 한다. */
const env = (values: Record<string, string>) => values as unknown as NodeJS.ProcessEnv;

/**
 * 저장 방식은 환경변수 하나로 갈린다. 오타로 적힌 값 때문에 조용히 다른 저장소를 쓰면
 * 로컬에서는 쌓이는데 배포에서는 사라지는 식으로 어긋나고, 그 어긋남은 한참 뒤에 발견된다.
 */
describe('맥 저장 설정', () => {
  it('아무것도 없으면 파일에 쌓는다', () => {
    expect(readPulseConfig(env({})).driver).toBe('file');
  });

  it('아는 이름만 받는다', () => {
    expect(readPulseConfig(env({ PULSE_DRIVER: 'http' })).driver).toBe('http');
    expect(readPulseConfig(env({ PULSE_DRIVER: 'memory' })).driver).toBe('memory');
    expect(readPulseConfig(env({ PULSE_DRIVER: 'redis' })).driver).toBe('file');
  });

  it('주소 끝의 빗금을 떼어 //pulse가 되지 않게 한다', () => {
    const config = readPulseConfig(env({ PULSE_URL: 'http://127.0.0.1:9000/' }));
    expect(config.url).toBe('http://127.0.0.1:9000');
  });
});

describe('postgres를 골랐을 때', () => {
  it('접속 문자열이 있으면 그대로 쓴다', () => {
    const config = readPulseConfig(
      env({ PULSE_DRIVER: 'postgres', PULSE_DATABASE_URL: 'postgres://localhost/bbb' }),
    );
    expect(config.driver).toBe('postgres');
    expect(config.databaseUrl).toBe('postgres://localhost/bbb');
  });

  it('접속 문자열이 없으면 파일로 물러난다', () => {
    // postgres라고 적어 두고 주소를 빠뜨리면 아무것도 저장되지 않는다. 그 상태를 만들지 않는다.
    expect(readPulseConfig(env({ PULSE_DRIVER: 'postgres' })).driver).toBe('file');
  });

  it('DATABASE_URL도 받아 준다', () => {
    const config = readPulseConfig(env({ PULSE_DRIVER: 'postgres', DATABASE_URL: 'postgres://x/y' }));
    expect(config.databaseUrl).toBe('postgres://x/y');
  });
});
