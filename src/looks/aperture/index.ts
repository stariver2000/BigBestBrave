/** 'aperture' 룩 - 광학대 위의 조리개. 어두운 판과 호박빛 초점 하나. */

import './look.css';
import { CSS_VAR_PREFIX } from '../../core/traits';
import { APERTURE_PALETTE, APERTURE_SHAPE, APERTURE_TYPE } from './config';

export function apertureVariables(): Record<string, string> {
  return {
    [`${CSS_VAR_PREFIX}-bg`]: APERTURE_PALETTE.bg,
    [`${CSS_VAR_PREFIX}-surface`]: APERTURE_PALETTE.surface,
    [`${CSS_VAR_PREFIX}-surface-raised`]: APERTURE_PALETTE.surfaceRaised,
    [`${CSS_VAR_PREFIX}-border-color`]: APERTURE_PALETTE.border,
    [`${CSS_VAR_PREFIX}-border-strong`]: APERTURE_PALETTE.borderStrong,
    [`${CSS_VAR_PREFIX}-fg`]: APERTURE_PALETTE.fg,
    [`${CSS_VAR_PREFIX}-fg-muted`]: APERTURE_PALETTE.fgMuted,
    [`${CSS_VAR_PREFIX}-accent`]: APERTURE_PALETTE.accent,
    [`${CSS_VAR_PREFIX}-accent-fg`]: APERTURE_PALETTE.accentFg,
    [`${CSS_VAR_PREFIX}-accent-soft`]: APERTURE_PALETTE.accentSoft,
    [`${CSS_VAR_PREFIX}-accent-glow`]: APERTURE_PALETTE.accentGlow,
    [`${CSS_VAR_PREFIX}-focus`]: APERTURE_PALETTE.focus,
    [`${CSS_VAR_PREFIX}-radius-sm`]: APERTURE_SHAPE.radiusSm,
    [`${CSS_VAR_PREFIX}-radius-md`]: APERTURE_SHAPE.radiusMd,
    [`${CSS_VAR_PREFIX}-radius-lg`]: APERTURE_SHAPE.radiusLg,
    [`${CSS_VAR_PREFIX}-shadow-sm`]: APERTURE_SHAPE.shadowSm,
    [`${CSS_VAR_PREFIX}-shadow-md`]: APERTURE_SHAPE.shadowMd,
    [`${CSS_VAR_PREFIX}-shadow-lg`]: APERTURE_SHAPE.shadowLg,
    [`${CSS_VAR_PREFIX}-font-heading`]: APERTURE_TYPE.heading,
    [`${CSS_VAR_PREFIX}-font-body`]: APERTURE_TYPE.body,
    [`${CSS_VAR_PREFIX}-font-mono`]: APERTURE_TYPE.mono,
  };
}
