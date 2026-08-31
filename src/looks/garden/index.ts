/** 'garden' 룩 — 화분 옆의 조용한 방. 도구가 아니라 사물이 놓인 화면을 위한 룩이다. */

import './look.css';
import { CSS_VAR_PREFIX } from '../../core/traits';
import { GARDEN_EPAPER, GARDEN_PALETTE, GARDEN_SHAPE, GARDEN_TYPE } from './config';

export function gardenVariables(): Record<string, string> {
  return {
    [`${CSS_VAR_PREFIX}-bg`]: GARDEN_PALETTE.bg,
    [`${CSS_VAR_PREFIX}-surface`]: GARDEN_PALETTE.surface,
    [`${CSS_VAR_PREFIX}-surface-raised`]: GARDEN_PALETTE.surfaceRaised,
    [`${CSS_VAR_PREFIX}-border-color`]: GARDEN_PALETTE.border,
    [`${CSS_VAR_PREFIX}-border-strong`]: GARDEN_PALETTE.borderStrong,
    [`${CSS_VAR_PREFIX}-fg`]: GARDEN_PALETTE.fg,
    [`${CSS_VAR_PREFIX}-fg-muted`]: GARDEN_PALETTE.fgMuted,
    [`${CSS_VAR_PREFIX}-accent`]: GARDEN_PALETTE.accent,
    [`${CSS_VAR_PREFIX}-accent-fg`]: GARDEN_PALETTE.accentFg,
    [`${CSS_VAR_PREFIX}-accent-soft`]: GARDEN_PALETTE.accentSoft,
    [`${CSS_VAR_PREFIX}-accent-glow`]: GARDEN_PALETTE.accentGlow,
    [`${CSS_VAR_PREFIX}-focus`]: GARDEN_PALETTE.focus,
    [`${CSS_VAR_PREFIX}-radius-sm`]: GARDEN_SHAPE.radiusSm,
    [`${CSS_VAR_PREFIX}-radius-md`]: GARDEN_SHAPE.radiusMd,
    [`${CSS_VAR_PREFIX}-radius-lg`]: GARDEN_SHAPE.radiusLg,
    [`${CSS_VAR_PREFIX}-shadow-sm`]: GARDEN_SHAPE.shadowSm,
    [`${CSS_VAR_PREFIX}-shadow-md`]: GARDEN_SHAPE.shadowMd,
    [`${CSS_VAR_PREFIX}-shadow-lg`]: GARDEN_SHAPE.shadowLg,
    [`${CSS_VAR_PREFIX}-font-heading`]: GARDEN_TYPE.heading,
    [`${CSS_VAR_PREFIX}-font-body`]: GARDEN_TYPE.body,
    '--look-epaper': GARDEN_EPAPER.screen,
    '--look-epaper-ink': GARDEN_EPAPER.ink,
  };
}
