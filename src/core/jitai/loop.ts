/**
 * 가장 작은 고리.
 *
 * 논문의 알맹이는 "언제 끼어들지"를 사람에게서 배우는 고리다. 이 페이지에는 그 결과(표와
 * 수치)만 있었고 고리 자체는 없었다 — 개입은 단추를 눌러야 떴다. 여기 있는 것이 그 고리를
 * 가장 작게 만든 것이다.
 *
 * 배우는 방법은 하나뿐이다. **맥락마다 사람이 받아들인 비율을 센다.** 늘 넘기던 자리에서는
 * 비율이 내려가 말을 걸지 않게 되고, 받아들이던 자리에서는 올라가 더 일찍 말을 건다.
 * 모델도 서버도 없고, 세는 일과 나누는 일뿐이다.
 *
 * 논문에서 가져온 것은 DESIGN의 두 값이다 — 5분마다 다시 재고, 개입 뒤 10분은 쉰다.
 * 나머지 값(문턱, 완충, 점수 매기는 규칙)은 이 페이지가 정했다(config의 LOOP).
 */

import { DESIGN, LOOP, type AppKind, type Band } from './config';

/** 지금 무엇을 얼마나 보고 있는가. */
export interface Use {
  /** 자정부터 몇 분이 지났는가. */
  atMin: number;
  app: AppKind;
  /** 이 앱을 이어서 본 시간(분). */
  minutesInApp: number;
}

/** 맥락마다 사람이 어떻게 답했는지. 이 페이지가 사람에게서 배운 전부다. */
export interface Memory {
  counts: Record<string, { accepted: number; dismissed: number }>;
  /** 마지막으로 말을 건 시각(분). 아직 없으면 null. */
  lastAtMin: number | null;
}

export const EMPTY_MEMORY: Memory = { counts: {}, lastAtMin: null };

/** 시각을 네 시간대 가운데 하나로. */
export function bandOf(atMin: number): Band {
  const hour = Math.floor(atMin / 60) % 24;
  if (hour < 12) return 'morning';
  if (hour < 18) return 'afternoon';
  if (hour < 23) return 'evening';
  return 'night';
}

/** 맥락의 이름. 시간대와 앱, 둘로만 가른다. 더 잘게 가르면 배울 거리가 없어진다. */
export function contextOf(use: Use): string {
  return `${bandOf(use.atMin)}:${use.app}`;
}

/**
 * 이 순간이 과사용에 얼마나 가까운가. 0~1.
 *
 * 오래 볼수록 오르고, 밤이면 더 오른다. 이것은 배운 것이 아니라 정해 둔 규칙이다.
 * 논문의 모델이 하던 일 가운데, 사람에게서 배우지 않고도 말할 수 있는 부분만 남긴 것이다.
 */
export function urge(use: Use): number {
  const long = Math.min(1, use.minutesInApp / LOOP.longMin);
  const night = bandOf(use.atMin) === 'night' ? LOOP.nightBonus : 0;
  return Math.min(1, long + night);
}

/** 이 맥락에서 사람이 받아들인 비율. 아직 물어보지 않았으면 반이다. */
export function weightOf(memory: Memory, context: string): number {
  const seen = memory.counts[context] ?? { accepted: 0, dismissed: 0 };
  return (seen.accepted + LOOP.prior) / (seen.accepted + seen.dismissed + LOOP.prior * 2);
}

/** 말을 걸지 말지 정하는 점수. 규칙이 낸 점수에 배운 무게를 곱한다. */
export function scoreOf(memory: Memory, use: Use): number {
  return urge(use) * weightOf(memory, contextOf(use));
}

/** 지금 말을 걸 것인가. 냉각 시간 안이면 아무리 점수가 높아도 걸지 않는다(논문 3.2절). */
export function shouldSpeak(memory: Memory, use: Use): boolean {
  if (memory.lastAtMin !== null && use.atMin - memory.lastAtMin < DESIGN.cooldownMin) return false;
  return scoreOf(memory, use) >= LOOP.threshold;
}

/** 사람의 대답을 받아 적는다. 받아들였는지 넘겼는지, 그 맥락에. */
export function remember(memory: Memory, use: Use, accepted: boolean): Memory {
  const context = contextOf(use);
  const seen = memory.counts[context] ?? { accepted: 0, dismissed: 0 };
  return {
    counts: {
      ...memory.counts,
      [context]: {
        accepted: seen.accepted + (accepted ? 1 : 0),
        dismissed: seen.dismissed + (accepted ? 0 : 1),
      },
    },
    lastAtMin: use.atMin,
  };
}

/**
 * 배운 것 때문에 이제 이 자리에서 말을 걸지 않게 되었는가.
 *
 * 이 페이지에서 사람이 무언가 알아차리는 자리가 여기다. 늘 넘기던 자리에서 기계가 조용해지는 것,
 * 그것이 '적응한다'는 말의 뜻이고 논문이 실제로 잰 것이다. 냉각 시간은 셈에서 뺀다 —
 * 잠깐 쉬는 것과 배워서 그만두는 것은 다른 일이다.
 */
export function silenced(before: Memory, after: Memory, use: Use): boolean {
  const seen = after.counts[contextOf(use)] ?? { accepted: 0, dismissed: 0 };
  if (seen.accepted + seen.dismissed < LOOP.patience) return false;
  const bare = (memory: Memory): Memory => ({ counts: memory.counts, lastAtMin: null });
  return shouldSpeak(bare(before), use) && !shouldSpeak(bare(after), use);
}

/** 걸음마다 흔들리지만 되풀이하면 같은 값이 나오는 수. 하루를 시험할 수 있게 한다. */
function jitter(step: number): number {
  const mixed = Math.sin(step * 12.9898) * 43758.5453;
  return Math.abs(mixed - Math.floor(mixed));
}

/** 흉내 낸 하루의 다음 걸음. 5분이 흐르고, 이따금 앱이 바뀐다. */
export function nextUse(use: Use, step: number, apps: readonly AppKind[]): Use {
  const atMin = (use.atMin + DESIGN.predictionIntervalMin) % (24 * 60);
  const roll = jitter(step);
  if (roll * 100 < LOOP.switchChance) {
    // 바꿀 때는 반드시 다른 앱으로 간다. 같은 앱으로 '바뀌면' 이어 본 시간만 까닭 없이 0이 된다.
    const others = apps.filter((app) => app !== use.app);
    const picked = others[Math.floor(jitter(step + 0.5) * others.length) % others.length];
    return { atMin, app: picked, minutesInApp: DESIGN.predictionIntervalMin };
  }
  return { atMin, app: use.app, minutesInApp: use.minutesInApp + DESIGN.predictionIntervalMin };
}
