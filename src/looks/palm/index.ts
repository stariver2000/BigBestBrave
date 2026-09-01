/** 'palm' 룩 — 손바닥의 온기. 눈이 보는 것은 장미빛, 손이 쥔 것은 청회색. */

import './look.css';
import { CSS_VAR_PREFIX } from '../../core/traits';
import { PALM_PALETTE, PALM_SHAPE, PALM_TOUCH, PALM_TYPE } from './config';

export function palmVariables(): Record<string, string> {
  return {
    [`${CSS_VAR_PREFIX}-bg`]: PALM_PALETTE.bg,
    [`${CSS_VAR_PREFIX}-surface`]: PALM_PALETTE.surface,
    [`${CSS_VAR_PREFIX}-surface-raised`]: PALM_PALETTE.surfaceRaised,
    [`${CSS_VAR_PREFIX}-border-color`]: PALM_PALETTE.border,
    [`${CSS_VAR_PREFIX}-border-strong`]: PALM_PALETTE.borderStrong,
    [`${CSS_VAR_PREFIX}-fg`]: PALM_PALETTE.fg,
    [`${CSS_VAR_PREFIX}-fg-muted`]: PALM_PALETTE.fgMuted,
    [`${CSS_VAR_PREFIX}-accent`]: PALM_PALETTE.accent,
    [`${CSS_VAR_PREFIX}-accent-fg`]: PALM_PALETTE.accentFg,
    [`${CSS_VAR_PREFIX}-accent-soft`]: PALM_PALETTE.accentSoft,
    [`${CSS_VAR_PREFIX}-accent-glow`]: PALM_PALETTE.accentGlow,
    [`${CSS_VAR_PREFIX}-focus`]: PALM_PALETTE.focus,
    [`${CSS_VAR_PREFIX}-radius-sm`]: PALM_SHAPE.radiusSm,
    [`${CSS_VAR_PREFIX}-radius-md`]: PALM_SHAPE.radiusMd,
    [`${CSS_VAR_PREFIX}-radius-lg`]: PALM_SHAPE.radiusLg,
    [`${CSS_VAR_PREFIX}-shadow-sm`]: PALM_SHAPE.shadowSm,
    [`${CSS_VAR_PREFIX}-shadow-md`]: PALM_SHAPE.shadowMd,
    [`${CSS_VAR_PREFIX}-shadow-lg`]: PALM_SHAPE.shadowLg,
    [`${CSS_VAR_PREFIX}-font-heading`]: PALM_TYPE.heading,
    [`${CSS_VAR_PREFIX}-font-body`]: PALM_TYPE.body,
    [`${CSS_VAR_PREFIX}-font-mono`]: PALM_TYPE.mono,
    [`${CSS_VAR_PREFIX}-touch`]: PALM_TOUCH.touch,
    [`${CSS_VAR_PREFIX}-touch-soft`]: PALM_TOUCH.touchSoft,
  };
}
