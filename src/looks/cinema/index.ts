/** 'cinema' 룩 — 불 꺼진 상영관의 화면. 자막을 실제 조건에서 보기 위한 룩이다. */

import { CSS_VAR_PREFIX } from '../../core/traits';
import { CINEMA_FILM, CINEMA_PALETTE, CINEMA_SHAPE, CINEMA_TYPE } from './config';

export function cinemaVariables(): Record<string, string> {
  return {
    [`${CSS_VAR_PREFIX}-bg`]: CINEMA_PALETTE.bg,
    [`${CSS_VAR_PREFIX}-surface`]: CINEMA_PALETTE.surface,
    [`${CSS_VAR_PREFIX}-surface-raised`]: CINEMA_PALETTE.surfaceRaised,
    [`${CSS_VAR_PREFIX}-border-color`]: CINEMA_PALETTE.border,
    [`${CSS_VAR_PREFIX}-border-strong`]: CINEMA_PALETTE.borderStrong,
    [`${CSS_VAR_PREFIX}-fg`]: CINEMA_PALETTE.fg,
    [`${CSS_VAR_PREFIX}-fg-muted`]: CINEMA_PALETTE.fgMuted,
    [`${CSS_VAR_PREFIX}-accent`]: CINEMA_PALETTE.accent,
    [`${CSS_VAR_PREFIX}-accent-fg`]: CINEMA_PALETTE.accentFg,
    [`${CSS_VAR_PREFIX}-accent-soft`]: CINEMA_PALETTE.accentSoft,
    [`${CSS_VAR_PREFIX}-accent-glow`]: CINEMA_PALETTE.accentGlow,
    [`${CSS_VAR_PREFIX}-focus`]: CINEMA_PALETTE.focus,
    [`${CSS_VAR_PREFIX}-radius-sm`]: CINEMA_SHAPE.radiusSm,
    [`${CSS_VAR_PREFIX}-radius-md`]: CINEMA_SHAPE.radiusMd,
    [`${CSS_VAR_PREFIX}-radius-lg`]: CINEMA_SHAPE.radiusLg,
    [`${CSS_VAR_PREFIX}-shadow-sm`]: CINEMA_SHAPE.shadowSm,
    [`${CSS_VAR_PREFIX}-shadow-md`]: CINEMA_SHAPE.shadowMd,
    [`${CSS_VAR_PREFIX}-shadow-lg`]: CINEMA_SHAPE.shadowLg,
    [`${CSS_VAR_PREFIX}-font-heading`]: CINEMA_TYPE.heading,
    [`${CSS_VAR_PREFIX}-font-body`]: CINEMA_TYPE.body,
    '--look-letterbox': CINEMA_FILM.letterbox,
    '--look-grain': CINEMA_FILM.grain,
  };
}
