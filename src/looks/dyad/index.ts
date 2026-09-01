/** 'dyad' 룩 — 둘이 마주 앉은 저녁의 방. 나와 상대에게 색을 하나씩 준다. */

import './look.css';
import { CSS_VAR_PREFIX } from '../../core/traits';
import { DYAD_OTHER, DYAD_PALETTE, DYAD_SHAPE, DYAD_TYPE } from './config';

export function dyadVariables(): Record<string, string> {
  return {
    [`${CSS_VAR_PREFIX}-bg`]: DYAD_PALETTE.bg,
    [`${CSS_VAR_PREFIX}-surface`]: DYAD_PALETTE.surface,
    [`${CSS_VAR_PREFIX}-surface-raised`]: DYAD_PALETTE.surfaceRaised,
    [`${CSS_VAR_PREFIX}-border-color`]: DYAD_PALETTE.border,
    [`${CSS_VAR_PREFIX}-border-strong`]: DYAD_PALETTE.borderStrong,
    [`${CSS_VAR_PREFIX}-fg`]: DYAD_PALETTE.fg,
    [`${CSS_VAR_PREFIX}-fg-muted`]: DYAD_PALETTE.fgMuted,
    [`${CSS_VAR_PREFIX}-accent`]: DYAD_PALETTE.accent,
    [`${CSS_VAR_PREFIX}-accent-fg`]: DYAD_PALETTE.accentFg,
    [`${CSS_VAR_PREFIX}-accent-soft`]: DYAD_PALETTE.accentSoft,
    [`${CSS_VAR_PREFIX}-accent-glow`]: DYAD_PALETTE.accentGlow,
    [`${CSS_VAR_PREFIX}-focus`]: DYAD_PALETTE.focus,
    [`${CSS_VAR_PREFIX}-radius-sm`]: DYAD_SHAPE.radiusSm,
    [`${CSS_VAR_PREFIX}-radius-md`]: DYAD_SHAPE.radiusMd,
    [`${CSS_VAR_PREFIX}-radius-lg`]: DYAD_SHAPE.radiusLg,
    [`${CSS_VAR_PREFIX}-shadow-sm`]: DYAD_SHAPE.shadowSm,
    [`${CSS_VAR_PREFIX}-shadow-md`]: DYAD_SHAPE.shadowMd,
    [`${CSS_VAR_PREFIX}-shadow-lg`]: DYAD_SHAPE.shadowLg,
    [`${CSS_VAR_PREFIX}-font-heading`]: DYAD_TYPE.heading,
    [`${CSS_VAR_PREFIX}-font-body`]: DYAD_TYPE.body,
    [`${CSS_VAR_PREFIX}-font-mono`]: DYAD_TYPE.mono,
    [`${CSS_VAR_PREFIX}-other`]: DYAD_OTHER.other,
    [`${CSS_VAR_PREFIX}-other-soft`]: DYAD_OTHER.otherSoft,
  };
}
