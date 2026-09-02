/** 'plate' 룩 - 도판 보관실. 회백 종이와 잉크, 자두빛 도장 하나. */

import './look.css';
import { CSS_VAR_PREFIX } from '../../core/traits';
import { PLATE_PALETTE, PLATE_SHAPE, PLATE_TYPE } from './config';

export function plateVariables(): Record<string, string> {
  return {
    [`${CSS_VAR_PREFIX}-bg`]: PLATE_PALETTE.bg,
    [`${CSS_VAR_PREFIX}-surface`]: PLATE_PALETTE.surface,
    [`${CSS_VAR_PREFIX}-surface-raised`]: PLATE_PALETTE.surfaceRaised,
    [`${CSS_VAR_PREFIX}-border-color`]: PLATE_PALETTE.border,
    [`${CSS_VAR_PREFIX}-border-strong`]: PLATE_PALETTE.borderStrong,
    [`${CSS_VAR_PREFIX}-fg`]: PLATE_PALETTE.fg,
    [`${CSS_VAR_PREFIX}-fg-muted`]: PLATE_PALETTE.fgMuted,
    [`${CSS_VAR_PREFIX}-accent`]: PLATE_PALETTE.accent,
    [`${CSS_VAR_PREFIX}-accent-fg`]: PLATE_PALETTE.accentFg,
    [`${CSS_VAR_PREFIX}-accent-soft`]: PLATE_PALETTE.accentSoft,
    [`${CSS_VAR_PREFIX}-accent-glow`]: PLATE_PALETTE.accentGlow,
    [`${CSS_VAR_PREFIX}-focus`]: PLATE_PALETTE.focus,
    [`${CSS_VAR_PREFIX}-radius-sm`]: PLATE_SHAPE.radiusSm,
    [`${CSS_VAR_PREFIX}-radius-md`]: PLATE_SHAPE.radiusMd,
    [`${CSS_VAR_PREFIX}-radius-lg`]: PLATE_SHAPE.radiusLg,
    [`${CSS_VAR_PREFIX}-shadow-sm`]: PLATE_SHAPE.shadowSm,
    [`${CSS_VAR_PREFIX}-shadow-md`]: PLATE_SHAPE.shadowMd,
    [`${CSS_VAR_PREFIX}-shadow-lg`]: PLATE_SHAPE.shadowLg,
    [`${CSS_VAR_PREFIX}-font-heading`]: PLATE_TYPE.heading,
    [`${CSS_VAR_PREFIX}-font-body`]: PLATE_TYPE.body,
    [`${CSS_VAR_PREFIX}-font-mono`]: PLATE_TYPE.mono,
  };
}
