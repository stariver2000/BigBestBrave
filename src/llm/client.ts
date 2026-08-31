/**
 * OpenAI 호환 채팅 완성 엔드포인트 클라이언트.
 *
 * Ollama(`/v1/chat/completions`), llama.cpp 서버, vLLM 등이 같은 스키마를 쓰므로
 * 어댑터 하나로 로컬 런타임을 바꿔 낄 수 있다. 스트리밍은 아직 쓰지 않는다
 * (첫 페이지의 LLM 사용이 짧은 한 문장 생성이라 스트리밍 이득이 없다).
 */

import type { LlmConfig } from './config';

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface CompletionRequest {
  messages: ChatMessage[];
  /** 창의성. 호출부가 용도에 맞게 정한다. */
  temperature?: number;
  maxTokens?: number;
}

export interface CompletionResult {
  text: string;
  model: string;
  /** 서버가 알려준 경우의 토큰 사용량. 로컬 런타임은 생략하기도 한다. */
  totalTokens?: number;
}

export class LlmRequestError extends Error {
  constructor(
    message: string,
    readonly status?: number,
  ) {
    super(message);
    this.name = 'LlmRequestError';
  }
}

function buildHeaders(config: LlmConfig): HeadersInit {
  const headers: Record<string, string> = { 'content-type': 'application/json' };
  // 로컬 런타임은 대개 키를 요구하지 않는다. 설정된 경우에만 붙인다.
  if (config.apiKey) headers.authorization = `Bearer ${config.apiKey}`;
  return headers;
}

async function fetchWithTimeout(url: string, init: RequestInit, timeoutMs: number): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

export async function requestCompletion(
  config: LlmConfig,
  request: CompletionRequest,
): Promise<CompletionResult> {
  if (!config.baseUrl) {
    throw new LlmRequestError('LLM 엔드포인트가 설정되지 않았습니다.');
  }
  const url = `${config.baseUrl.replace(/\/$/, '')}/chat/completions`;
  const body = JSON.stringify({
    model: config.model,
    messages: request.messages,
    temperature: request.temperature,
    max_tokens: request.maxTokens,
    stream: false,
  });

  const response = await fetchWithTimeout(
    url,
    { method: 'POST', headers: buildHeaders(config), body },
    config.requestTimeoutMs,
  );
  if (!response.ok) {
    const detail = await response.text().catch(() => '');
    throw new LlmRequestError(`LLM 요청 실패 (${response.status}): ${detail.slice(0, 200)}`, response.status);
  }

  const payload = (await response.json()) as {
    model?: string;
    choices?: { message?: { content?: string } }[];
    usage?: { total_tokens?: number };
  };
  const text = payload.choices?.[0]?.message?.content;
  if (typeof text !== 'string') {
    throw new LlmRequestError('LLM 응답에서 본문을 찾지 못했습니다.');
  }
  return { text: text.trim(), model: payload.model ?? config.model, totalTokens: payload.usage?.total_tokens };
}

/** 엔드포인트가 살아 있는지만 확인한다. 모델 목록 조회가 가장 가볍다. */
export async function checkHealth(config: LlmConfig, timeoutMs = 3000): Promise<boolean> {
  if (!config.baseUrl) return false;
  const url = `${config.baseUrl.replace(/\/$/, '')}/models`;
  try {
    const response = await fetchWithTimeout(url, { method: 'GET', headers: buildHeaders(config) }, timeoutMs);
    return response.ok;
  } catch {
    return false;
  }
}
