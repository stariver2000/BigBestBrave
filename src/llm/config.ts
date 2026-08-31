/**
 * 로컬 LLM 게이트웨이 설정.
 *
 * 값은 전부 환경변수에서 주입한다. 코드에 엔드포인트나 모델명을 박지 않는 이유:
 * 로컬(Ollama)·사내 서버·터널 등 실행 위치가 배포 환경마다 다르기 때문이다.
 * LLM_BASE_URL이 비어 있으면 LLM 기능 전체가 "사용 불가" 상태로 내려가고,
 * 페이지들은 LLM 없이도 정상 동작해야 한다.
 */

export interface LlmConfig {
  baseUrl: string | null;
  model: string;
  apiKey: string | null;
  maxConcurrency: number;
  queueTimeoutMs: number;
  requestTimeoutMs: number;
}

const DEFAULTS = {
  model: 'qwen2.5:7b-instruct',
  /** 로컬 모델은 보통 한 번에 한 요청만 제대로 소화한다. 기본은 직렬화. */
  maxConcurrency: 1,
  queueTimeoutMs: 20_000,
  requestTimeoutMs: 60_000,
} as const;

function readNumber(raw: string | undefined, fallback: number): number {
  if (!raw) return fallback;
  const parsed = Number(raw);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function readText(raw: string | undefined): string | null {
  const trimmed = raw?.trim();
  return trimmed && trimmed.length > 0 ? trimmed : null;
}

/** process.env를 직접 읽지 않고 주입받을 수 있게 해서 테스트에서 가짜 환경을 넣는다. */
export function loadLlmConfig(env: Record<string, string | undefined> = process.env): LlmConfig {
  return {
    baseUrl: readText(env.LLM_BASE_URL),
    model: readText(env.LLM_MODEL) ?? DEFAULTS.model,
    apiKey: readText(env.LLM_API_KEY),
    maxConcurrency: readNumber(env.LLM_MAX_CONCURRENCY, DEFAULTS.maxConcurrency),
    queueTimeoutMs: readNumber(env.LLM_QUEUE_TIMEOUT_MS, DEFAULTS.queueTimeoutMs),
    requestTimeoutMs: readNumber(env.LLM_REQUEST_TIMEOUT_MS, DEFAULTS.requestTimeoutMs),
  };
}

export function isConfigured(config: LlmConfig): boolean {
  return config.baseUrl !== null;
}
