/** 'glow' 룩 - 불 꺼진 방의 화면빛. 붙잡는 빛은 차가운 파랑, 놓아 주는 빛은 호박색. */

import './look.css';
import { CSS_VAR_PREFIX } from '../../core/traits';
import { GLOW_PALETTE, GLOW_SHAPE, GLOW_TYPE, GLOW_WARM } from './config';

export function glowVariables(): Record<string, string> {
  return {
    [`${CSS_VAR_PREFIX}-bg`]: GLOW_PALETTE.bg,
    [`${CSS_VAR_PREFIX}-surface`]: GLOW_PALETTE.surface,
    [`${CSS_VAR_PREFIX}-surface-raised`]: GLOW_PALETTE.surfaceRaised,
    [`${CSS_VAR_PREFIX}-border-color`]: GLOW_PALETTE.border,
    [`${CSS_VAR_PREFIX}-border-strong`]: GLOW_PALETTE.borderStrong,
    [`${CSS_VAR_PREFIX}-fg`]: GLOW_PALETTE.fg,
    [`${CSS_VAR_PREFIX}-fg-muted`]: GLOW_PALETTE.fgMuted,
    [`${CSS_VAR_PREFIX}-accent`]: GLOW_PALETTE.accent,
    [`${CSS_VAR_PREFIX}-accent-fg`]: GLOW_PALETTE.accentFg,
    [`${CSS_VAR_PREFIX}-accent-soft`]: GLOW_PALETTE.accentSoft,
    [`${CSS_VAR_PREFIX}-accent-glow`]: GLOW_PALETTE.accentGlow,
    [`${CSS_VAR_PREFIX}-focus`]: GLOW_PALETTE.focus,
    [`${CSS_VAR_PREFIX}-radius-sm`]: GLOW_SHAPE.radiusSm,
    [`${CSS_VAR_PREFIX}-radius-md`]: GLOW_SHAPE.radiusMd,
    [`${CSS_VAR_PREFIX}-radius-lg`]: GLOW_SHAPE.radiusLg,
    [`${CSS_VAR_PREFIX}-shadow-sm`]: GLOW_SHAPE.shadowSm,
    [`${CSS_VAR_PREFIX}-shadow-md`]: GLOW_SHAPE.shadowMd,
    [`${CSS_VAR_PREFIX}-shadow-lg`]: GLOW_SHAPE.shadowLg,
    [`${CSS_VAR_PREFIX}-font-heading`]: GLOW_TYPE.heading,
    [`${CSS_VAR_PREFIX}-font-body`]: GLOW_TYPE.body,
    [`${CSS_VAR_PREFIX}-font-mono`]: GLOW_TYPE.mono,
    [`${CSS_VAR_PREFIX}-warm`]: GLOW_WARM.warm,
    [`${CSS_VAR_PREFIX}-warm-fg`]: GLOW_WARM.warmFg,
    [`${CSS_VAR_PREFIX}-warm-soft`]: GLOW_WARM.warmSoft,
  };
}
