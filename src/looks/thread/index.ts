/** 'thread' 룩 - 대화창. 풀린 말은 파랑, 막힌 말은 녹슨 주황. */

import './look.css';
import { CSS_VAR_PREFIX } from '../../core/traits';
import { THREAD_PALETTE, THREAD_SHAPE, THREAD_STUCK, THREAD_TYPE } from './config';

export function threadVariables(): Record<string, string> {
  return {
    [`${CSS_VAR_PREFIX}-bg`]: THREAD_PALETTE.bg,
    [`${CSS_VAR_PREFIX}-surface`]: THREAD_PALETTE.surface,
    [`${CSS_VAR_PREFIX}-surface-raised`]: THREAD_PALETTE.surfaceRaised,
    [`${CSS_VAR_PREFIX}-border-color`]: THREAD_PALETTE.border,
    [`${CSS_VAR_PREFIX}-border-strong`]: THREAD_PALETTE.borderStrong,
    [`${CSS_VAR_PREFIX}-fg`]: THREAD_PALETTE.fg,
    [`${CSS_VAR_PREFIX}-fg-muted`]: THREAD_PALETTE.fgMuted,
    [`${CSS_VAR_PREFIX}-accent`]: THREAD_PALETTE.accent,
    [`${CSS_VAR_PREFIX}-accent-fg`]: THREAD_PALETTE.accentFg,
    [`${CSS_VAR_PREFIX}-accent-soft`]: THREAD_PALETTE.accentSoft,
    [`${CSS_VAR_PREFIX}-accent-glow`]: THREAD_PALETTE.accentGlow,
    [`${CSS_VAR_PREFIX}-focus`]: THREAD_PALETTE.focus,
    [`${CSS_VAR_PREFIX}-radius-sm`]: THREAD_SHAPE.radiusSm,
    [`${CSS_VAR_PREFIX}-radius-md`]: THREAD_SHAPE.radiusMd,
    [`${CSS_VAR_PREFIX}-radius-lg`]: THREAD_SHAPE.radiusLg,
    [`${CSS_VAR_PREFIX}-shadow-sm`]: THREAD_SHAPE.shadowSm,
    [`${CSS_VAR_PREFIX}-shadow-md`]: THREAD_SHAPE.shadowMd,
    [`${CSS_VAR_PREFIX}-shadow-lg`]: THREAD_SHAPE.shadowLg,
    [`${CSS_VAR_PREFIX}-font-heading`]: THREAD_TYPE.heading,
    [`${CSS_VAR_PREFIX}-font-body`]: THREAD_TYPE.body,
    [`${CSS_VAR_PREFIX}-font-mono`]: THREAD_TYPE.mono,
    [`${CSS_VAR_PREFIX}-stuck`]: THREAD_STUCK.stuck,
    [`${CSS_VAR_PREFIX}-stuck-fg`]: THREAD_STUCK.stuckFg,
    [`${CSS_VAR_PREFIX}-stuck-soft`]: THREAD_STUCK.stuckSoft,
  };
}
