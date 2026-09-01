/** 'signal' 룩 — 불 꺼진 방의 계기 하나. 색은 지금 고를 것에만 남긴다. */

import './look.css';
import { CSS_VAR_PREFIX } from '../../core/traits';
import { SIGNAL_OPEN, SIGNAL_PALETTE, SIGNAL_SHAPE, SIGNAL_TYPE } from './config';

export function signalVariables(): Record<string, string> {
  return {
    [`${CSS_VAR_PREFIX}-bg`]: SIGNAL_PALETTE.bg,
    [`${CSS_VAR_PREFIX}-surface`]: SIGNAL_PALETTE.surface,
    [`${CSS_VAR_PREFIX}-surface-raised`]: SIGNAL_PALETTE.surfaceRaised,
    [`${CSS_VAR_PREFIX}-border-color`]: SIGNAL_PALETTE.border,
    [`${CSS_VAR_PREFIX}-border-strong`]: SIGNAL_PALETTE.borderStrong,
    [`${CSS_VAR_PREFIX}-fg`]: SIGNAL_PALETTE.fg,
    [`${CSS_VAR_PREFIX}-fg-muted`]: SIGNAL_PALETTE.fgMuted,
    [`${CSS_VAR_PREFIX}-accent`]: SIGNAL_PALETTE.accent,
    [`${CSS_VAR_PREFIX}-accent-fg`]: SIGNAL_PALETTE.accentFg,
    [`${CSS_VAR_PREFIX}-accent-soft`]: SIGNAL_PALETTE.accentSoft,
    [`${CSS_VAR_PREFIX}-accent-glow`]: SIGNAL_PALETTE.accentGlow,
    [`${CSS_VAR_PREFIX}-focus`]: SIGNAL_PALETTE.focus,
    [`${CSS_VAR_PREFIX}-radius-sm`]: SIGNAL_SHAPE.radiusSm,
    [`${CSS_VAR_PREFIX}-radius-md`]: SIGNAL_SHAPE.radiusMd,
    [`${CSS_VAR_PREFIX}-radius-lg`]: SIGNAL_SHAPE.radiusLg,
    [`${CSS_VAR_PREFIX}-shadow-sm`]: SIGNAL_SHAPE.shadowSm,
    [`${CSS_VAR_PREFIX}-shadow-md`]: SIGNAL_SHAPE.shadowMd,
    [`${CSS_VAR_PREFIX}-shadow-lg`]: SIGNAL_SHAPE.shadowLg,
    [`${CSS_VAR_PREFIX}-font-heading`]: SIGNAL_TYPE.heading,
    [`${CSS_VAR_PREFIX}-font-body`]: SIGNAL_TYPE.body,
    [`${CSS_VAR_PREFIX}-font-mono`]: SIGNAL_TYPE.mono,
    [`${CSS_VAR_PREFIX}-ok`]: SIGNAL_OPEN.ok,
    [`${CSS_VAR_PREFIX}-ok-soft`]: SIGNAL_OPEN.okSoft,
  };
}
