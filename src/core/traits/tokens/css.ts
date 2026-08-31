/**
 * 디자인 토큰 -> CSS 커스텀 프로퍼티.
 *
 * 변수 이름 접두사를 한곳에 두는 이유: 페이지가 수백 개로 늘어도 전역 네임스페이스 충돌이 없도록,
 * 그리고 나중에 접두사를 바꿔야 할 때 이 파일만 고치면 되도록.
 */

import { MIN_FONT_SIZE } from './config';
import type { DesignTokens } from './types';

export const CSS_VAR_PREFIX = '--bbb';

/**
 * 타입 스케일 단계. 본문(0) 기준으로 위아래 몇 단계를 미리 계산해 둘지.
 * 5, 6단계를 두는 이유: 히어로 제목처럼 본문과 낙차가 커야 하는 자리가 필요하기 때문이다.
 * 단계가 본문 언저리에만 몰려 있으면 화면에 위계가 생기지 않는다.
 */
export const TYPE_STEPS = [-2, -1, 0, 1, 2, 3, 4, 5, 6] as const;

export function toCssVariables(tokens: DesignTokens): Record<string, string> {
  const vars: Record<string, string> = {
    [`${CSS_VAR_PREFIX}-bg`]: tokens.color.bg,
    [`${CSS_VAR_PREFIX}-surface`]: tokens.color.surface,
    [`${CSS_VAR_PREFIX}-surface-raised`]: tokens.color.surfaceRaised,
    [`${CSS_VAR_PREFIX}-border-color`]: tokens.color.border,
    [`${CSS_VAR_PREFIX}-border-strong`]: tokens.color.borderStrong,
    [`${CSS_VAR_PREFIX}-fg`]: tokens.color.fg,
    [`${CSS_VAR_PREFIX}-fg-muted`]: tokens.color.fgMuted,
    [`${CSS_VAR_PREFIX}-accent`]: tokens.color.accent,
    [`${CSS_VAR_PREFIX}-accent-fg`]: tokens.color.accentFg,
    [`${CSS_VAR_PREFIX}-accent-soft`]: tokens.color.accentSoft,
    [`${CSS_VAR_PREFIX}-accent-glow`]: tokens.color.accentGlow,
    [`${CSS_VAR_PREFIX}-focus`]: tokens.color.focus,
    [`${CSS_VAR_PREFIX}-content-width`]: `${tokens.space.contentWidth}px`,
    [`${CSS_VAR_PREFIX}-radius-sm`]: tokens.radius.sm,
    [`${CSS_VAR_PREFIX}-radius-md`]: tokens.radius.md,
    [`${CSS_VAR_PREFIX}-radius-lg`]: tokens.radius.lg,
    [`${CSS_VAR_PREFIX}-radius-pill`]: tokens.radius.pill,
    [`${CSS_VAR_PREFIX}-font-heading`]: tokens.text.fontHeading,
    [`${CSS_VAR_PREFIX}-font-body`]: tokens.text.fontBody,
    [`${CSS_VAR_PREFIX}-font-mono`]: tokens.text.fontMono,
    [`${CSS_VAR_PREFIX}-tracking`]: tokens.text.tracking,
    [`${CSS_VAR_PREFIX}-leading`]: String(tokens.text.leading),
    [`${CSS_VAR_PREFIX}-case`]: tokens.text.transform,
    [`${CSS_VAR_PREFIX}-weight-heading`]: String(tokens.text.headingWeight),
    [`${CSS_VAR_PREFIX}-weight-body`]: String(tokens.text.bodyWeight),
    [`${CSS_VAR_PREFIX}-duration-fast`]: tokens.motion.fast,
    [`${CSS_VAR_PREFIX}-duration-base`]: tokens.motion.base,
    [`${CSS_VAR_PREFIX}-duration-slow`]: tokens.motion.slow,
    [`${CSS_VAR_PREFIX}-easing`]: tokens.motion.easing,
    [`${CSS_VAR_PREFIX}-border-width`]: tokens.edge.width,
    [`${CSS_VAR_PREFIX}-border-style`]: tokens.edge.style,
    [`${CSS_VAR_PREFIX}-shadow-sm`]: tokens.edge.shadowSm,
    [`${CSS_VAR_PREFIX}-shadow-md`]: tokens.edge.shadowMd,
    [`${CSS_VAR_PREFIX}-shadow-lg`]: tokens.edge.shadowLg,
    [`${CSS_VAR_PREFIX}-texture`]: tokens.edge.texture,
  };

  tokens.space.scale.forEach((value, index) => {
    vars[`${CSS_VAR_PREFIX}-space-${index}`] = `${Number(value.toFixed(2))}px`;
  });

  // 타입 스케일은 공비의 거듭제곱으로 계산해 미리 변수로 굳혀 둔다.
  // (CSS 안에서 pow를 쓸 수 없어 여기서 계산해야 한다.)
  TYPE_STEPS.forEach((step) => {
    // 아래 단계는 바닥을 두어 라벨·각주가 읽을 수 없을 만큼 작아지지 않게 한다.
    const scaled = tokens.text.baseSize * Math.pow(tokens.text.ratio, step);
    const size = step < 0 ? Math.max(scaled, MIN_FONT_SIZE) : scaled;
    const name = step < 0 ? `n${Math.abs(step)}` : String(step);
    vars[`${CSS_VAR_PREFIX}-text-${name}`] = `${Number(size.toFixed(2))}px`;
  });

  return vars;
}

/** style 속성에 그대로 넣을 수 있는 객체 형태(React CSSProperties 호환). */
export function toStyleObject(tokens: DesignTokens): Record<string, string> {
  return toCssVariables(tokens);
}
