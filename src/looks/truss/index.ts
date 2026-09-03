/** 'truss' 룩 - 어두운 제도판 위의 뼈대. 읽기 좋음은 호박빛, 충실함은 청록빛. */

import './look.css';
import { CSS_VAR_PREFIX } from '../../core/traits';
import { TRUSS_PALETTE, TRUSS_SECOND, TRUSS_SHAPE, TRUSS_TYPE } from './config';

export function trussVariables(): Record<string, string> {
  return {
    [`${CSS_VAR_PREFIX}-bg`]: TRUSS_PALETTE.bg,
    [`${CSS_VAR_PREFIX}-surface`]: TRUSS_PALETTE.surface,
    [`${CSS_VAR_PREFIX}-surface-raised`]: TRUSS_PALETTE.surfaceRaised,
    [`${CSS_VAR_PREFIX}-border-color`]: TRUSS_PALETTE.border,
    [`${CSS_VAR_PREFIX}-border-strong`]: TRUSS_PALETTE.borderStrong,
    [`${CSS_VAR_PREFIX}-fg`]: TRUSS_PALETTE.fg,
    [`${CSS_VAR_PREFIX}-fg-muted`]: TRUSS_PALETTE.fgMuted,
    [`${CSS_VAR_PREFIX}-accent`]: TRUSS_PALETTE.accent,
    [`${CSS_VAR_PREFIX}-accent-fg`]: TRUSS_PALETTE.accentFg,
    [`${CSS_VAR_PREFIX}-accent-soft`]: TRUSS_PALETTE.accentSoft,
    [`${CSS_VAR_PREFIX}-accent-glow`]: TRUSS_PALETTE.accentGlow,
    [`${CSS_VAR_PREFIX}-focus`]: TRUSS_PALETTE.focus,
    [`${CSS_VAR_PREFIX}-radius-sm`]: TRUSS_SHAPE.radiusSm,
    [`${CSS_VAR_PREFIX}-radius-md`]: TRUSS_SHAPE.radiusMd,
    [`${CSS_VAR_PREFIX}-radius-lg`]: TRUSS_SHAPE.radiusLg,
    [`${CSS_VAR_PREFIX}-shadow-sm`]: TRUSS_SHAPE.shadowSm,
    [`${CSS_VAR_PREFIX}-shadow-md`]: TRUSS_SHAPE.shadowMd,
    [`${CSS_VAR_PREFIX}-shadow-lg`]: TRUSS_SHAPE.shadowLg,
    [`${CSS_VAR_PREFIX}-font-heading`]: TRUSS_TYPE.heading,
    [`${CSS_VAR_PREFIX}-font-body`]: TRUSS_TYPE.body,
    [`${CSS_VAR_PREFIX}-font-mono`]: TRUSS_TYPE.mono,
    [`${CSS_VAR_PREFIX}-second-color`]: TRUSS_SECOND.second,
    [`${CSS_VAR_PREFIX}-second-fg`]: TRUSS_SECOND.secondFg,
    [`${CSS_VAR_PREFIX}-second-soft`]: TRUSS_SECOND.secondSoft,
  };
}
