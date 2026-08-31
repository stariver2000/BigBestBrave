/**
 * 동시 실행 제한 큐(세마포어).
 *
 * 쓰는 곳이 둘이다.
 *   - LLM 게이트웨이: 여러 페이지가 로컬 모델 한 대를 공유하므로 요청을 직렬화한다.
 *   - 댓글 파일 저장소: 읽고-고치고-쓰는 사이에 다른 쓰기가 끼면 글이 사라진다.
 * FIFO 큐로 순서를 보장하고, 대기가 한도를 넘으면 기다리던 쪽을 먼저 거절해 즉시 알린다.
 *
 * 주의: 이 락은 프로세스 내부 범위다. 서버리스에서 인스턴스가 여러 개 뜨면 인스턴스마다
 * 큐가 생기므로, 전역 직렬화가 필요해지면 외부 저장소 기반 락으로 교체해야 한다.
 */

export class QueueTimeoutError extends Error {
  constructor(waitedMs: number) {
    super(`대기열에서 ${waitedMs}ms를 기다렸지만 차례가 오지 않았습니다.`);
    this.name = 'QueueTimeoutError';
  }
}

interface Waiter {
  resolve: () => void;
  reject: (error: Error) => void;
  timer: ReturnType<typeof setTimeout> | null;
}

export interface LockStats {
  active: number;
  waiting: number;
  maxConcurrency: number;
}

export class ConcurrencyLock {
  private active = 0;
  private readonly waiters: Waiter[] = [];

  constructor(
    private readonly maxConcurrency: number,
    private readonly queueTimeoutMs: number,
  ) {}

  stats(): LockStats {
    return { active: this.active, waiting: this.waiters.length, maxConcurrency: this.maxConcurrency };
  }

  /** 자리를 얻을 때까지 기다린다. 한도 안이면 즉시 통과한다. */
  private acquire(): Promise<void> {
    if (this.active < this.maxConcurrency) {
      this.active += 1;
      return Promise.resolve();
    }
    return new Promise<void>((resolve, reject) => {
      const waiter: Waiter = { resolve, reject, timer: null };
      // 타임아웃이 먼저 오면 대기열에서 자신을 빼고 거절한다.
      waiter.timer = setTimeout(() => {
        const index = this.waiters.indexOf(waiter);
        if (index >= 0) this.waiters.splice(index, 1);
        reject(new QueueTimeoutError(this.queueTimeoutMs));
      }, this.queueTimeoutMs);
      this.waiters.push(waiter);
    });
  }

  /** 자리를 반납하고 다음 대기자를 깨운다. */
  private release(): void {
    const next = this.waiters.shift();
    if (!next) {
      this.active -= 1;
      return;
    }
    // active는 그대로 둔다. 자리를 다음 대기자에게 그대로 넘기는 것이기 때문이다.
    if (next.timer !== null) clearTimeout(next.timer);
    next.resolve();
  }

  /** 작업을 락 안에서 실행한다. 성공·실패와 무관하게 자리를 반드시 반납한다. */
  async run<T>(task: () => Promise<T>): Promise<T> {
    await this.acquire();
    try {
      return await task();
    } finally {
      this.release();
    }
  }
}
