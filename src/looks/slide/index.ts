/** 'slide' 룩 - 현미경의 어두운 시야. 검푸른 지면에 호박빛 렌즈 하나. */

import './look.css';
import { CSS_VAR_PREFIX } from '../../core/traits';
import { SLIDE_PALETTE, SLIDE_SHAPE, SLIDE_TYPE } from './config';

export function slideVariables(): Record<string, string> {
  return {
    [`${CSS_VAR_PREFIX}-bg`]: SLIDE_PALETTE.bg,
    [`${CSS_VAR_PREFIX}-surface`]: SLIDE_PALETTE.surface,
    [`${CSS_VAR_PREFIX}-surface-raised`]: SLIDE_PALETTE.surfaceRaised,
    [`${CSS_VAR_PREFIX}-border-color`]: SLIDE_PALETTE.border,
    [`${CSS_VAR_PREFIX}-border-strong`]: SLIDE_PALETTE.borderStrong,
    [`${CSS_VAR_PREFIX}-fg`]: SLIDE_PALETTE.fg,
    [`${CSS_VAR_PREFIX}-fg-muted`]: SLIDE_PALETTE.fgMuted,
    [`${CSS_VAR_PREFIX}-accent`]: SLIDE_PALETTE.accent,
    [`${CSS_VAR_PREFIX}-accent-fg`]: SLIDE_PALETTE.accentFg,
    [`${CSS_VAR_PREFIX}-accent-soft`]: SLIDE_PALETTE.accentSoft,
    [`${CSS_VAR_PREFIX}-accent-glow`]: SLIDE_PALETTE.accentGlow,
    [`${CSS_VAR_PREFIX}-focus`]: SLIDE_PALETTE.focus,
    [`${CSS_VAR_PREFIX}-radius-sm`]: SLIDE_SHAPE.radiusSm,
    [`${CSS_VAR_PREFIX}-radius-md`]: SLIDE_SHAPE.radiusMd,
    [`${CSS_VAR_PREFIX}-radius-lg`]: SLIDE_SHAPE.radiusLg,
    [`${CSS_VAR_PREFIX}-shadow-sm`]: SLIDE_SHAPE.shadowSm,
    [`${CSS_VAR_PREFIX}-shadow-md`]: SLIDE_SHAPE.shadowMd,
    [`${CSS_VAR_PREFIX}-shadow-lg`]: SLIDE_SHAPE.shadowLg,
    [`${CSS_VAR_PREFIX}-font-heading`]: SLIDE_TYPE.heading,
    [`${CSS_VAR_PREFIX}-font-body`]: SLIDE_TYPE.body,
    [`${CSS_VAR_PREFIX}-font-mono`]: SLIDE_TYPE.mono,
  };
}
