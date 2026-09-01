/** 'hindsight' 룩 — 되짚어 보는 빛. 있었던 일과 있었을 수도 있던 일에 색을 하나씩 준다. */

import './look.css';
import { CSS_VAR_PREFIX } from '../../core/traits';
import { HINDSIGHT_COUNTER, HINDSIGHT_PALETTE, HINDSIGHT_SHAPE, HINDSIGHT_TYPE } from './config';

export function hindsightVariables(): Record<string, string> {
  return {
    [`${CSS_VAR_PREFIX}-bg`]: HINDSIGHT_PALETTE.bg,
    [`${CSS_VAR_PREFIX}-surface`]: HINDSIGHT_PALETTE.surface,
    [`${CSS_VAR_PREFIX}-surface-raised`]: HINDSIGHT_PALETTE.surfaceRaised,
    [`${CSS_VAR_PREFIX}-border-color`]: HINDSIGHT_PALETTE.border,
    [`${CSS_VAR_PREFIX}-border-strong`]: HINDSIGHT_PALETTE.borderStrong,
    [`${CSS_VAR_PREFIX}-fg`]: HINDSIGHT_PALETTE.fg,
    [`${CSS_VAR_PREFIX}-fg-muted`]: HINDSIGHT_PALETTE.fgMuted,
    [`${CSS_VAR_PREFIX}-accent`]: HINDSIGHT_PALETTE.accent,
    [`${CSS_VAR_PREFIX}-accent-fg`]: HINDSIGHT_PALETTE.accentFg,
    [`${CSS_VAR_PREFIX}-accent-soft`]: HINDSIGHT_PALETTE.accentSoft,
    [`${CSS_VAR_PREFIX}-accent-glow`]: HINDSIGHT_PALETTE.accentGlow,
    [`${CSS_VAR_PREFIX}-focus`]: HINDSIGHT_PALETTE.focus,
    [`${CSS_VAR_PREFIX}-radius-sm`]: HINDSIGHT_SHAPE.radiusSm,
    [`${CSS_VAR_PREFIX}-radius-md`]: HINDSIGHT_SHAPE.radiusMd,
    [`${CSS_VAR_PREFIX}-radius-lg`]: HINDSIGHT_SHAPE.radiusLg,
    [`${CSS_VAR_PREFIX}-shadow-sm`]: HINDSIGHT_SHAPE.shadowSm,
    [`${CSS_VAR_PREFIX}-shadow-md`]: HINDSIGHT_SHAPE.shadowMd,
    [`${CSS_VAR_PREFIX}-shadow-lg`]: HINDSIGHT_SHAPE.shadowLg,
    [`${CSS_VAR_PREFIX}-font-heading`]: HINDSIGHT_TYPE.heading,
    [`${CSS_VAR_PREFIX}-font-body`]: HINDSIGHT_TYPE.body,
    [`${CSS_VAR_PREFIX}-font-mono`]: HINDSIGHT_TYPE.mono,
    [`${CSS_VAR_PREFIX}-counter`]: HINDSIGHT_COUNTER.counter,
    [`${CSS_VAR_PREFIX}-counter-soft`]: HINDSIGHT_COUNTER.counterSoft,
  };
}
