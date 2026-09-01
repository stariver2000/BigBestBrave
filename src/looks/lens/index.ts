/** 'lens' 룩 — 렌즈 코팅의 청록빛. 눈앞의 화면은 청록, 손안의 화면은 호박색. */

import './look.css';
import { CSS_VAR_PREFIX } from '../../core/traits';
import { LENS_PALETTE, LENS_SHAPE, LENS_TYPE, LENS_WARM } from './config';

export function lensVariables(): Record<string, string> {
  return {
    [`${CSS_VAR_PREFIX}-bg`]: LENS_PALETTE.bg,
    [`${CSS_VAR_PREFIX}-surface`]: LENS_PALETTE.surface,
    [`${CSS_VAR_PREFIX}-surface-raised`]: LENS_PALETTE.surfaceRaised,
    [`${CSS_VAR_PREFIX}-border-color`]: LENS_PALETTE.border,
    [`${CSS_VAR_PREFIX}-border-strong`]: LENS_PALETTE.borderStrong,
    [`${CSS_VAR_PREFIX}-fg`]: LENS_PALETTE.fg,
    [`${CSS_VAR_PREFIX}-fg-muted`]: LENS_PALETTE.fgMuted,
    [`${CSS_VAR_PREFIX}-accent`]: LENS_PALETTE.accent,
    [`${CSS_VAR_PREFIX}-accent-fg`]: LENS_PALETTE.accentFg,
    [`${CSS_VAR_PREFIX}-accent-soft`]: LENS_PALETTE.accentSoft,
    [`${CSS_VAR_PREFIX}-accent-glow`]: LENS_PALETTE.accentGlow,
    [`${CSS_VAR_PREFIX}-focus`]: LENS_PALETTE.focus,
    [`${CSS_VAR_PREFIX}-radius-sm`]: LENS_SHAPE.radiusSm,
    [`${CSS_VAR_PREFIX}-radius-md`]: LENS_SHAPE.radiusMd,
    [`${CSS_VAR_PREFIX}-radius-lg`]: LENS_SHAPE.radiusLg,
    [`${CSS_VAR_PREFIX}-shadow-sm`]: LENS_SHAPE.shadowSm,
    [`${CSS_VAR_PREFIX}-shadow-md`]: LENS_SHAPE.shadowMd,
    [`${CSS_VAR_PREFIX}-shadow-lg`]: LENS_SHAPE.shadowLg,
    [`${CSS_VAR_PREFIX}-font-heading`]: LENS_TYPE.heading,
    [`${CSS_VAR_PREFIX}-font-body`]: LENS_TYPE.body,
    [`${CSS_VAR_PREFIX}-font-mono`]: LENS_TYPE.mono,
    [`${CSS_VAR_PREFIX}-warm`]: LENS_WARM.warm,
    [`${CSS_VAR_PREFIX}-warm-soft`]: LENS_WARM.warmSoft,
  };
}
