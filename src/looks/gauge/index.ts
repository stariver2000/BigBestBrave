/** 'gauge' 룩 — 밤에 켜 둔 계측기. 눈이 좇을 것이 커서 하나뿐이도록 지면을 내렸다. */

import './look.css';
import { CSS_VAR_PREFIX } from '../../core/traits';
import { GAUGE_PALETTE, GAUGE_SHAPE, GAUGE_SIGNAL, GAUGE_TYPE } from './config';

export function gaugeVariables(): Record<string, string> {
  return {
    [`${CSS_VAR_PREFIX}-bg`]: GAUGE_PALETTE.bg,
    [`${CSS_VAR_PREFIX}-surface`]: GAUGE_PALETTE.surface,
    [`${CSS_VAR_PREFIX}-surface-raised`]: GAUGE_PALETTE.surfaceRaised,
    [`${CSS_VAR_PREFIX}-border-color`]: GAUGE_PALETTE.border,
    [`${CSS_VAR_PREFIX}-border-strong`]: GAUGE_PALETTE.borderStrong,
    [`${CSS_VAR_PREFIX}-fg`]: GAUGE_PALETTE.fg,
    [`${CSS_VAR_PREFIX}-fg-muted`]: GAUGE_PALETTE.fgMuted,
    [`${CSS_VAR_PREFIX}-accent`]: GAUGE_PALETTE.accent,
    [`${CSS_VAR_PREFIX}-accent-fg`]: GAUGE_PALETTE.accentFg,
    [`${CSS_VAR_PREFIX}-accent-soft`]: GAUGE_PALETTE.accentSoft,
    [`${CSS_VAR_PREFIX}-accent-glow`]: GAUGE_PALETTE.accentGlow,
    [`${CSS_VAR_PREFIX}-focus`]: GAUGE_PALETTE.focus,
    [`${CSS_VAR_PREFIX}-radius-sm`]: GAUGE_SHAPE.radiusSm,
    [`${CSS_VAR_PREFIX}-radius-md`]: GAUGE_SHAPE.radiusMd,
    [`${CSS_VAR_PREFIX}-radius-lg`]: GAUGE_SHAPE.radiusLg,
    [`${CSS_VAR_PREFIX}-shadow-sm`]: GAUGE_SHAPE.shadowSm,
    [`${CSS_VAR_PREFIX}-shadow-md`]: GAUGE_SHAPE.shadowMd,
    [`${CSS_VAR_PREFIX}-shadow-lg`]: GAUGE_SHAPE.shadowLg,
    [`${CSS_VAR_PREFIX}-font-heading`]: GAUGE_TYPE.heading,
    [`${CSS_VAR_PREFIX}-font-body`]: GAUGE_TYPE.body,
    [`${CSS_VAR_PREFIX}-font-mono`]: GAUGE_TYPE.mono,
    // 이 룩만 쓰는 값.
    [`${CSS_VAR_PREFIX}-ok`]: GAUGE_SIGNAL.ok,
    [`${CSS_VAR_PREFIX}-ok-soft`]: GAUGE_SIGNAL.okSoft,
    [`${CSS_VAR_PREFIX}-miss`]: GAUGE_SIGNAL.miss,
    [`${CSS_VAR_PREFIX}-miss-soft`]: GAUGE_SIGNAL.missSoft,
  };
}
