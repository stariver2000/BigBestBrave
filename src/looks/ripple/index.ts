/** 'ripple' 룩 — 어두운 유리 아래의 떨림. 보이는 것은 보랏빛, 느껴지는 것은 초록빛. */

import './look.css';
import { CSS_VAR_PREFIX } from '../../core/traits';
import { RIPPLE_FELT, RIPPLE_PALETTE, RIPPLE_SHAPE, RIPPLE_TYPE } from './config';

export function rippleVariables(): Record<string, string> {
  return {
    [`${CSS_VAR_PREFIX}-bg`]: RIPPLE_PALETTE.bg,
    [`${CSS_VAR_PREFIX}-surface`]: RIPPLE_PALETTE.surface,
    [`${CSS_VAR_PREFIX}-surface-raised`]: RIPPLE_PALETTE.surfaceRaised,
    [`${CSS_VAR_PREFIX}-border-color`]: RIPPLE_PALETTE.border,
    [`${CSS_VAR_PREFIX}-border-strong`]: RIPPLE_PALETTE.borderStrong,
    [`${CSS_VAR_PREFIX}-fg`]: RIPPLE_PALETTE.fg,
    [`${CSS_VAR_PREFIX}-fg-muted`]: RIPPLE_PALETTE.fgMuted,
    [`${CSS_VAR_PREFIX}-accent`]: RIPPLE_PALETTE.accent,
    [`${CSS_VAR_PREFIX}-accent-fg`]: RIPPLE_PALETTE.accentFg,
    [`${CSS_VAR_PREFIX}-accent-soft`]: RIPPLE_PALETTE.accentSoft,
    [`${CSS_VAR_PREFIX}-accent-glow`]: RIPPLE_PALETTE.accentGlow,
    [`${CSS_VAR_PREFIX}-focus`]: RIPPLE_PALETTE.focus,
    [`${CSS_VAR_PREFIX}-radius-sm`]: RIPPLE_SHAPE.radiusSm,
    [`${CSS_VAR_PREFIX}-radius-md`]: RIPPLE_SHAPE.radiusMd,
    [`${CSS_VAR_PREFIX}-radius-lg`]: RIPPLE_SHAPE.radiusLg,
    [`${CSS_VAR_PREFIX}-shadow-sm`]: RIPPLE_SHAPE.shadowSm,
    [`${CSS_VAR_PREFIX}-shadow-md`]: RIPPLE_SHAPE.shadowMd,
    [`${CSS_VAR_PREFIX}-shadow-lg`]: RIPPLE_SHAPE.shadowLg,
    [`${CSS_VAR_PREFIX}-font-heading`]: RIPPLE_TYPE.heading,
    [`${CSS_VAR_PREFIX}-font-body`]: RIPPLE_TYPE.body,
    [`${CSS_VAR_PREFIX}-font-mono`]: RIPPLE_TYPE.mono,
    [`${CSS_VAR_PREFIX}-felt`]: RIPPLE_FELT.felt,
    [`${CSS_VAR_PREFIX}-felt-soft`]: RIPPLE_FELT.feltSoft,
  };
}
