/** 'reel' 룩 - 편집자의 책상. 따뜻한 종이와 잉크, 구릿빛 검수 도장 하나. */

import './look.css';
import { CSS_VAR_PREFIX } from '../../core/traits';
import { REEL_PALETTE, REEL_SHAPE, REEL_TYPE } from './config';

export function reelVariables(): Record<string, string> {
  return {
    [`${CSS_VAR_PREFIX}-bg`]: REEL_PALETTE.bg,
    [`${CSS_VAR_PREFIX}-surface`]: REEL_PALETTE.surface,
    [`${CSS_VAR_PREFIX}-surface-raised`]: REEL_PALETTE.surfaceRaised,
    [`${CSS_VAR_PREFIX}-border-color`]: REEL_PALETTE.border,
    [`${CSS_VAR_PREFIX}-border-strong`]: REEL_PALETTE.borderStrong,
    [`${CSS_VAR_PREFIX}-fg`]: REEL_PALETTE.fg,
    [`${CSS_VAR_PREFIX}-fg-muted`]: REEL_PALETTE.fgMuted,
    [`${CSS_VAR_PREFIX}-accent`]: REEL_PALETTE.accent,
    [`${CSS_VAR_PREFIX}-accent-fg`]: REEL_PALETTE.accentFg,
    [`${CSS_VAR_PREFIX}-accent-soft`]: REEL_PALETTE.accentSoft,
    [`${CSS_VAR_PREFIX}-accent-glow`]: REEL_PALETTE.accentGlow,
    [`${CSS_VAR_PREFIX}-focus`]: REEL_PALETTE.focus,
    [`${CSS_VAR_PREFIX}-radius-sm`]: REEL_SHAPE.radiusSm,
    [`${CSS_VAR_PREFIX}-radius-md`]: REEL_SHAPE.radiusMd,
    [`${CSS_VAR_PREFIX}-radius-lg`]: REEL_SHAPE.radiusLg,
    [`${CSS_VAR_PREFIX}-shadow-sm`]: REEL_SHAPE.shadowSm,
    [`${CSS_VAR_PREFIX}-shadow-md`]: REEL_SHAPE.shadowMd,
    [`${CSS_VAR_PREFIX}-shadow-lg`]: REEL_SHAPE.shadowLg,
    [`${CSS_VAR_PREFIX}-font-heading`]: REEL_TYPE.heading,
    [`${CSS_VAR_PREFIX}-font-body`]: REEL_TYPE.body,
    [`${CSS_VAR_PREFIX}-font-mono`]: REEL_TYPE.mono,
  };
}
