/** 'quilt' 룩 - 서른아홉 조각의 조각보. 내가 정한 것은 청록, 아무도 안 보는 자리는 산호색. */

import './look.css';
import { CSS_VAR_PREFIX } from '../../core/traits';
import { QUILT_GAP, QUILT_PALETTE, QUILT_SHAPE, QUILT_TYPE } from './config';

export function quiltVariables(): Record<string, string> {
  return {
    [`${CSS_VAR_PREFIX}-bg`]: QUILT_PALETTE.bg,
    [`${CSS_VAR_PREFIX}-surface`]: QUILT_PALETTE.surface,
    [`${CSS_VAR_PREFIX}-surface-raised`]: QUILT_PALETTE.surfaceRaised,
    [`${CSS_VAR_PREFIX}-border-color`]: QUILT_PALETTE.border,
    [`${CSS_VAR_PREFIX}-border-strong`]: QUILT_PALETTE.borderStrong,
    [`${CSS_VAR_PREFIX}-fg`]: QUILT_PALETTE.fg,
    [`${CSS_VAR_PREFIX}-fg-muted`]: QUILT_PALETTE.fgMuted,
    [`${CSS_VAR_PREFIX}-accent`]: QUILT_PALETTE.accent,
    [`${CSS_VAR_PREFIX}-accent-fg`]: QUILT_PALETTE.accentFg,
    [`${CSS_VAR_PREFIX}-accent-soft`]: QUILT_PALETTE.accentSoft,
    [`${CSS_VAR_PREFIX}-accent-glow`]: QUILT_PALETTE.accentGlow,
    [`${CSS_VAR_PREFIX}-focus`]: QUILT_PALETTE.focus,
    [`${CSS_VAR_PREFIX}-radius-sm`]: QUILT_SHAPE.radiusSm,
    [`${CSS_VAR_PREFIX}-radius-md`]: QUILT_SHAPE.radiusMd,
    [`${CSS_VAR_PREFIX}-radius-lg`]: QUILT_SHAPE.radiusLg,
    [`${CSS_VAR_PREFIX}-shadow-sm`]: QUILT_SHAPE.shadowSm,
    [`${CSS_VAR_PREFIX}-shadow-md`]: QUILT_SHAPE.shadowMd,
    [`${CSS_VAR_PREFIX}-shadow-lg`]: QUILT_SHAPE.shadowLg,
    [`${CSS_VAR_PREFIX}-font-heading`]: QUILT_TYPE.heading,
    [`${CSS_VAR_PREFIX}-font-body`]: QUILT_TYPE.body,
    [`${CSS_VAR_PREFIX}-font-mono`]: QUILT_TYPE.mono,
    [`${CSS_VAR_PREFIX}-gap-color`]: QUILT_GAP.gap,
    [`${CSS_VAR_PREFIX}-gap-fg`]: QUILT_GAP.gapFg,
    [`${CSS_VAR_PREFIX}-gap-soft`]: QUILT_GAP.gapSoft,
  };
}
