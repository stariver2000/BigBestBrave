/**
 * 맥 저장 설정.
 *
 * 댓글과 같은 방식으로 환경변수에서 읽는다. 저장 위치를 코드에 박으면 로컬과 배포에서
 * 다른 일을 하게 되고, 그때부터는 어느 쪽이 진짜인지 알 수 없게 된다.
 */

export interface PulseConfig {
  /** file은 로컬, memory는 쓰기가 막힌 환경(서버리스)의 임시 동작. */
  driver: 'file' | 'memory';
  filePath: string;
  /** 한 번의 요청에서 받아 주는 사건 수. 이보다 많으면 자른다. */
  maxKindsPerRequest: number;
}

const DEFAULTS = {
  filePath: '.data/pulse.json',
  maxKindsPerRequest: 8,
} as const;

export function readPulseConfig(env: NodeJS.ProcessEnv = process.env): PulseConfig {
  const driver = env.PULSE_DRIVER === 'memory' ? 'memory' : 'file';
  return {
    driver,
    filePath: env.PULSE_FILE ?? DEFAULTS.filePath,
    maxKindsPerRequest: DEFAULTS.maxKindsPerRequest,
  };
}
