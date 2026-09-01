/** 'atlas' 룩 — 접었다 편 종이 지도. 길은 초록, 내 자취는 자홍. */

import './look.css';
import { CSS_VAR_PREFIX } from '../../core/traits';
import { ATLAS_PALETTE, ATLAS_ROAD, ATLAS_SHAPE, ATLAS_TYPE } from './config';

export function atlasVariables(): Record<string, string> {
  return {
    [`${CSS_VAR_PREFIX}-bg`]: ATLAS_PALETTE.bg,
    [`${CSS_VAR_PREFIX}-surface`]: ATLAS_PALETTE.surface,
    [`${CSS_VAR_PREFIX}-surface-raised`]: ATLAS_PALETTE.surfaceRaised,
    [`${CSS_VAR_PREFIX}-border-color`]: ATLAS_PALETTE.border,
    [`${CSS_VAR_PREFIX}-border-strong`]: ATLAS_PALETTE.borderStrong,
    [`${CSS_VAR_PREFIX}-fg`]: ATLAS_PALETTE.fg,
    [`${CSS_VAR_PREFIX}-fg-muted`]: ATLAS_PALETTE.fgMuted,
    [`${CSS_VAR_PREFIX}-accent`]: ATLAS_PALETTE.accent,
    [`${CSS_VAR_PREFIX}-accent-fg`]: ATLAS_PALETTE.accentFg,
    [`${CSS_VAR_PREFIX}-accent-soft`]: ATLAS_PALETTE.accentSoft,
    [`${CSS_VAR_PREFIX}-accent-glow`]: ATLAS_PALETTE.accentGlow,
    [`${CSS_VAR_PREFIX}-focus`]: ATLAS_PALETTE.focus,
    [`${CSS_VAR_PREFIX}-radius-sm`]: ATLAS_SHAPE.radiusSm,
    [`${CSS_VAR_PREFIX}-radius-md`]: ATLAS_SHAPE.radiusMd,
    [`${CSS_VAR_PREFIX}-radius-lg`]: ATLAS_SHAPE.radiusLg,
    [`${CSS_VAR_PREFIX}-shadow-sm`]: ATLAS_SHAPE.shadowSm,
    [`${CSS_VAR_PREFIX}-shadow-md`]: ATLAS_SHAPE.shadowMd,
    [`${CSS_VAR_PREFIX}-shadow-lg`]: ATLAS_SHAPE.shadowLg,
    [`${CSS_VAR_PREFIX}-font-heading`]: ATLAS_TYPE.heading,
    [`${CSS_VAR_PREFIX}-font-body`]: ATLAS_TYPE.body,
    [`${CSS_VAR_PREFIX}-font-mono`]: ATLAS_TYPE.mono,
    [`${CSS_VAR_PREFIX}-road`]: ATLAS_ROAD.road,
    [`${CSS_VAR_PREFIX}-road-soft`]: ATLAS_ROAD.roadSoft,
  };
}
