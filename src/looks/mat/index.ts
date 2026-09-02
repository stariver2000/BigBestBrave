/** 'mat' 룩 - 밤의 책상 매트. 회청 고무빛 지면에 형광 민트의 궤적. */

import './look.css';
import { CSS_VAR_PREFIX } from '../../core/traits';
import { MAT_PALETTE, MAT_SHAPE, MAT_TYPE } from './config';

export function matVariables(): Record<string, string> {
  return {
    [`${CSS_VAR_PREFIX}-bg`]: MAT_PALETTE.bg,
    [`${CSS_VAR_PREFIX}-surface`]: MAT_PALETTE.surface,
    [`${CSS_VAR_PREFIX}-surface-raised`]: MAT_PALETTE.surfaceRaised,
    [`${CSS_VAR_PREFIX}-border-color`]: MAT_PALETTE.border,
    [`${CSS_VAR_PREFIX}-border-strong`]: MAT_PALETTE.borderStrong,
    [`${CSS_VAR_PREFIX}-fg`]: MAT_PALETTE.fg,
    [`${CSS_VAR_PREFIX}-fg-muted`]: MAT_PALETTE.fgMuted,
    [`${CSS_VAR_PREFIX}-accent`]: MAT_PALETTE.accent,
    [`${CSS_VAR_PREFIX}-accent-fg`]: MAT_PALETTE.accentFg,
    [`${CSS_VAR_PREFIX}-accent-soft`]: MAT_PALETTE.accentSoft,
    [`${CSS_VAR_PREFIX}-accent-glow`]: MAT_PALETTE.accentGlow,
    [`${CSS_VAR_PREFIX}-focus`]: MAT_PALETTE.focus,
    [`${CSS_VAR_PREFIX}-radius-sm`]: MAT_SHAPE.radiusSm,
    [`${CSS_VAR_PREFIX}-radius-md`]: MAT_SHAPE.radiusMd,
    [`${CSS_VAR_PREFIX}-radius-lg`]: MAT_SHAPE.radiusLg,
    [`${CSS_VAR_PREFIX}-shadow-sm`]: MAT_SHAPE.shadowSm,
    [`${CSS_VAR_PREFIX}-shadow-md`]: MAT_SHAPE.shadowMd,
    [`${CSS_VAR_PREFIX}-shadow-lg`]: MAT_SHAPE.shadowLg,
    [`${CSS_VAR_PREFIX}-font-heading`]: MAT_TYPE.heading,
    [`${CSS_VAR_PREFIX}-font-body`]: MAT_TYPE.body,
    [`${CSS_VAR_PREFIX}-font-mono`]: MAT_TYPE.mono,
  };
}
