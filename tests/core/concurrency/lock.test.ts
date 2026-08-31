import { describe, expect, it } from 'vitest';
import { ConcurrencyLock, QueueTimeoutError } from '@core/concurrency';

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

describe('동시 실행 제한 큐', () => {
  it('한도 이상으로 동시에 실행하지 않는다', async () => {
    const lock = new ConcurrencyLock(1, 1000);
    const order: string[] = [];
    let peak = 0;
    let running = 0;

    const task = (name: string) =>
      lock.run(async () => {
        running += 1;
        peak = Math.max(peak, running);
        await delay(10);
        order.push(name);
        running -= 1;
      });

    await Promise.all([task('a'), task('b'), task('c')]);
    expect(peak).toBe(1);
    expect(order).toEqual(['a', 'b', 'c']);
  });

  it('한도가 2면 두 개까지 겹쳐 돈다', async () => {
    const lock = new ConcurrencyLock(2, 1000);
    let peak = 0;
    let running = 0;
    const task = () =>
      lock.run(async () => {
        running += 1;
        peak = Math.max(peak, running);
        await delay(10);
        running -= 1;
      });
    await Promise.all([task(), task(), task(), task()]);
    expect(peak).toBe(2);
  });

  it('대기 시간이 한도를 넘으면 기다리던 요청을 거절한다', async () => {
    const lock = new ConcurrencyLock(1, 20);
    const held = lock.run(() => delay(80));
    await expect(lock.run(async () => 'never')).rejects.toBeInstanceOf(QueueTimeoutError);
    await held;
  });

  it('작업이 실패해도 자리를 반납한다', async () => {
    const lock = new ConcurrencyLock(1, 100);
    await expect(
      lock.run(async () => {
        throw new Error('실패');
      }),
    ).rejects.toThrow('실패');
    await expect(lock.run(async () => 'ok')).resolves.toBe('ok');
    expect(lock.stats().active).toBe(0);
  });
});
