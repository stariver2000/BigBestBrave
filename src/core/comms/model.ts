/**
 * 말할 틈의 셈.
 *
 * 한 문장으로 줄이면 이렇다. 어떤 말이든 **닿을 때쯤이면 이미 값이 줄어 있고**,
 * 그동안 내 손은 멈춰 있었고, 말했다는 사실 자체가 뒤에 위험을 남긴다.
 * 이 셋을 더해 0보다 크면 할 만한 말이고, 아니면 입을 다무는 편이 낫다.
 *
 *   기대값 = 값(닿는 시각) × 뜻이 통할 확률 × 내 말의 무게
 *          − 손이 멈춘 값
 *          − 나중에 팀이 깨질 위험의 값
 *
 * 논문은 숫자를 재지 않았다. 여기 있는 것은 논문이 말한 **구조**를 숫자로 옮긴 것이고,
 * 그 사실을 화면에도 적는다.
 */

import {
  ATTENTION_PRICE,
  CHANNELS,
  COMMIT_MULTIPLIER,
  FRICTION_PRICE,
  HORIZON_SECONDS,
  STANDING_FLOOR,
  STEP_SECONDS,
  TEAMMATES,
} from './config';
import type { Advice, Channel, ChannelId, ChannelVerdict, Situation } from './types';

export interface Weights {
  /** 지금 내 성적(0~1). 낮으면 같은 말도 덜 먹힌다. */
  standing: number;
  /** 팀이 얼마나 깨어 있는가(0~1). 알아챌 확률에 곱해진다. */
  attention: number;
}

/** 값은 시간이 지나며 반으로 준다. 반감기가 짧을수록 급한 정보다. */
export function valueAt(situation: Situation, seconds: number): number {
  return situation.importance * Math.pow(2, -seconds / situation.halfLifeSeconds);
}

/** n명 중 k명 이상이 응할 확률. 투표에만 쓴다. */
export function atLeast(n: number, k: number, p: number): number {
  if (k <= 0) return 1;
  if (k > n) return 0;
  let total = 0;
  for (let i = k; i <= n; i += 1) {
    let coefficient = 1;
    for (let j = 0; j < i; j += 1) coefficient = (coefficient * (n - j)) / (j + 1);
    total += coefficient * Math.pow(p, i) * Math.pow(1 - p, n - i);
  }
  return total;
}

/** 내 말의 무게. 성적이 나쁘면 바닥값까지 줄어든다. */
export function weightOf(standing: number): number {
  return STANDING_FLOOR + (1 - STANDING_FLOOR) * Math.min(1, Math.max(0, standing));
}

/** 필요한 만큼의 팀원에게 닿을 확률. 여러 명이 응해야 하는 통로는 그 문턱까지 넘어야 한다. */
export function reachRate(channel: Channel, attention: number): number {
  const noticed = channel.notice * Math.min(1, Math.max(0, attention));
  if (channel.needed <= 1) return 1 - Math.pow(1 - noticed, TEAMMATES);
  return atLeast(TEAMMATES, channel.needed, noticed);
}

/**
 * 뜻이 제대로 설 값. 잘 읽힐 확률에서, 잘못 읽혔을 때의 손해를 뺀다.
 *
 * 이 항이 있어야 사람들이 굳이 타이핑을 하는 까닭이 설명된다. 잘못 읽힌 핑은
 * 아무 일도 안 일어나는 것이 아니라 팀원을 엉뚱한 곳으로 보낸다. 그래서 오해가 비싼 자리에서는
 * 뜻이 흐릿한 통로가 침묵보다도 못해진다(이 값이 음수가 된다).
 */
export function clarityOf(channel: Channel, situation: Situation): number {
  return channel.fidelity - (1 - channel.fidelity) * situation.misreadCost;
}

/**
 * 통로 하나를 `delay`초 뒤에 시작했을 때의 기대값.
 * 침묵은 언제나 0이다. 그래서 다른 통로가 0 아래로 내려가는 순간이 곧 '입 다물 때'다.
 */
export function expectedValue(
  channel: Channel,
  situation: Situation,
  weights: Weights,
  delay = 0,
): number {
  if (channel.id === 'silence') return 0;
  const lands = delay + channel.composeSeconds;
  const commit = channel.needed > 1 ? COMMIT_MULTIPLIER : 1;
  const gain =
    valueAt(situation, lands) *
    reachRate(channel, weights.attention) *
    clarityOf(channel, situation) *
    weightOf(weights.standing) *
    commit;
  const attention = channel.composeSeconds * situation.busyness * ATTENTION_PRICE;
  const friction = channel.socialRisk * FRICTION_PRICE;
  return gain - attention - friction;
}

/**
 * 지금부터 몇 초 안에 시작해야 기대값이 0 위인가.
 * 기대값은 시간이 갈수록 줄기만 하므로, 앞에서부터 훑다가 처음 0 아래로 내려가는 지점이 답이다.
 */
function windowOf(channel: Channel, situation: Situation, weights: Weights): number | null {
  if (channel.id === 'silence') return null;
  if (expectedValue(channel, situation, weights, 0) <= 0) return null;
  for (let delay = 0; delay <= HORIZON_SECONDS; delay += STEP_SECONDS) {
    if (expectedValue(channel, situation, weights, delay) <= 0) return delay;
  }
  return HORIZON_SECONDS;
}

function verdictOf(channel: Channel, situation: Situation, weights: Weights): ChannelVerdict {
  const lands = channel.composeSeconds;
  return {
    channel: channel.id,
    expected: expectedValue(channel, situation, weights, 0),
    landsAt: lands,
    remaining: situation.importance === 0 ? 0 : valueAt(situation, lands) / situation.importance,
    reach: reachRate(channel, weights.attention),
    clarity: clarityOf(channel, situation),
    attentionCost: channel.composeSeconds * situation.busyness * ATTENTION_PRICE,
    frictionCost: channel.socialRisk * FRICTION_PRICE,
    windowSeconds: windowOf(channel, situation, weights),
  };
}

export function advise(situation: Situation, weights: Weights): Advice {
  const verdicts = CHANNELS.map((channel) => verdictOf(channel, situation, weights));
  const best = verdicts.reduce((a, b) => (b.expected > a.expected ? b : a));

  // 말할 값이 있는 통로들 가운데 가장 늦게까지 열려 있는 창이, 곧 침묵이 이기는 시각이다.
  const windows = verdicts
    .filter((verdict) => verdict.channel !== 'silence' && verdict.windowSeconds !== null)
    .map((verdict) => verdict.windowSeconds as number);

  return {
    verdicts,
    best: best.channel,
    silenceAfterSeconds: windows.length === 0 ? 0 : Math.max(...windows),
  };
}

/** 시간에 따른 기대값 곡선. 화면이 그림으로 그린다. */
export function curveOf(
  channelId: ChannelId,
  situation: Situation,
  weights: Weights,
  horizon = HORIZON_SECONDS,
  step = 0.1,
): { at: number; expected: number }[] {
  const channel = CHANNELS.find((entry) => entry.id === channelId);
  if (!channel) return [];
  const points: { at: number; expected: number }[] = [];
  for (let at = 0; at <= horizon + 1e-9; at += step) {
    points.push({ at, expected: expectedValue(channel, situation, weights, at) });
  }
  return points;
}
