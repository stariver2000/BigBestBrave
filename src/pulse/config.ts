/**
 * 맥 저장 설정.
 *
 * 댓글과 같은 방식으로 환경변수에서 읽는다. 저장 위치를 코드에 박으면 로컬과 배포에서
 * 다른 일을 하게 되고, 그때부터는 어느 쪽이 진짜인지 알 수 없게 된다.
 */

export interface PulseConfig {
  /**
   * file은 로컬, memory는 쓰기가 막힌 환경의 임시 동작,
   * http는 바깥의 작은 서비스(services/pulse)에 맡기는 방식이다.
   */
  driver: 'file' | 'memory' | 'http';
  filePath: string;
  /** driver가 http일 때 두드릴 주소. */
  url: string;
  /** 한 번의 요청에서 받아 주는 사건 수. 이보다 많으면 자른다. */
  maxKindsPerRequest: number;
}

const DEFAULTS = {
  filePath: '.data/pulse.json',
  url: 'http://127.0.0.1:8787',
  maxKindsPerRequest: 8,
} as const;

/** 아는 이름만 받는다. 오타로 적힌 값 때문에 조용히 다른 저장소를 쓰는 일이 없어야 한다. */
function driverOf(value: string | undefined): PulseConfig['driver'] {
  if (value === 'memory' || value === 'http') return value;
  return 'file';
}

export function readPulseConfig(env: NodeJS.ProcessEnv = process.env): PulseConfig {
  return {
    driver: driverOf(env.PULSE_DRIVER),
    filePath: env.PULSE_FILE ?? DEFAULTS.filePath,
    // 끝의 빗금은 붙는 경로와 겹쳐 //pulse가 된다. 받는 쪽에서 떼어 둔다.
    url: (env.PULSE_URL ?? DEFAULTS.url).replace(/\/$/, ''),
    maxKindsPerRequest: DEFAULTS.maxKindsPerRequest,
  };
}
