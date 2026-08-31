/**
 * LLM 게이트웨이: 페이지들이 공유하는 단일 진입점.
 *
 * 여기를 통과하지 않는 LLM 호출은 없어야 한다. 그래야 동시 실행 제한과 실패 처리를
 * 한곳에서 보장할 수 있다. 결과는 예외 대신 판별 가능한 객체로 돌려주는데,
 * 모든 페이지가 "LLM이 없어도 동작하는" 경로를 갖도록 강제하기 위해서다.
 */

import { isConfigured, loadLlmConfig, type LlmConfig } from './config';
import { ConcurrencyLock, QueueTimeoutError, type LockStats } from '../core/concurrency';
import { LlmRequestError, checkHealth, requestCompletion, type CompletionRequest, type CompletionResult } from './client';

export type LlmFailureReason = 'not-configured' | 'busy' | 'upstream-error' | 'timeout';

export type LlmOutcome =
  | { ok: true; result: CompletionResult }
  | { ok: false; reason: LlmFailureReason; message: string };

/**
 * 모듈 스코프에 락을 하나만 둔다. 라우트 핸들러는 요청마다 새로 실행되지만
 * 모듈은 프로세스 수명 동안 한 번만 초기화되므로, 같은 인스턴스의 요청들이 이 락을 공유한다.
 */
let sharedConfig: LlmConfig | null = null;
let sharedLock: ConcurrencyLock | null = null;

function gateway(): { config: LlmConfig; lock: ConcurrencyLock } {
  if (!sharedConfig || !sharedLock) {
    sharedConfig = loadLlmConfig();
    sharedLock = new ConcurrencyLock(sharedConfig.maxConcurrency, sharedConfig.queueTimeoutMs);
  }
  return { config: sharedConfig, lock: sharedLock };
}

export function llmStatus(): { configured: boolean; model: string; lock: LockStats } {
  const { config, lock } = gateway();
  return { configured: isConfigured(config), model: config.model, lock: lock.stats() };
}

export async function llmHealthy(): Promise<boolean> {
  const { config } = gateway();
  if (!isConfigured(config)) return false;
  return checkHealth(config);
}

export async function complete(request: CompletionRequest): Promise<LlmOutcome> {
  const { config, lock } = gateway();
  if (!isConfigured(config)) {
    return { ok: false, reason: 'not-configured', message: 'LLM 엔드포인트가 설정되지 않았습니다.' };
  }

  try {
    const result = await lock.run(() => requestCompletion(config, request));
    return { ok: true, result };
  } catch (error) {
    if (error instanceof QueueTimeoutError) {
      return { ok: false, reason: 'busy', message: error.message };
    }
    if (error instanceof LlmRequestError) {
      return { ok: false, reason: 'upstream-error', message: error.message };
    }
    // AbortController가 요청 타임아웃을 끊으면 DOMException(AbortError)으로 올라온다.
    if (error instanceof Error && error.name === 'AbortError') {
      return { ok: false, reason: 'timeout', message: 'LLM 응답 시간이 초과되었습니다.' };
    }
    const message = error instanceof Error ? error.message : String(error);
    return { ok: false, reason: 'upstream-error', message };
  }
}
