/**
 * 'serene' 룩 — 부드럽고 우아하며 청순한 화면.
 *
 * 룩은 "특성에서 계산되지 않는 미감"을 담는 계층이다. 특성 엔진이 공급한 토큰 위에
 * 이 값들을 덮어써서, 같은 구조의 페이지가 전혀 다른 인상을 갖게 만든다.
 */

import { CSS_VAR_PREFIX } from '../../core/traits';
import { SERENE_PALETTE, SERENE_SHAPE, SERENE_WASH } from './config';

/** 이 룩이 덮어쓰는 CSS 변수. PageFrame이 파생 토큰 위에 병합한다. */
export function sereneVariables(): Record<string, string> {
  return {
    [`${CSS_VAR_PREFIX}-bg`]: SERENE_PALETTE.bg,
    [`${CSS_VAR_PREFIX}-surface`]: SERENE_PALETTE.surface,
    [`${CSS_VAR_PREFIX}-surface-raised`]: SERENE_PALETTE.surfaceRaised,
    [`${CSS_VAR_PREFIX}-border-color`]: SERENE_PALETTE.border,
    [`${CSS_VAR_PREFIX}-border-strong`]: SERENE_PALETTE.borderStrong,
    [`${CSS_VAR_PREFIX}-fg`]: SERENE_PALETTE.fg,
    [`${CSS_VAR_PREFIX}-fg-muted`]: SERENE_PALETTE.fgMuted,
    [`${CSS_VAR_PREFIX}-accent`]: SERENE_PALETTE.accent,
    [`${CSS_VAR_PREFIX}-accent-fg`]: SERENE_PALETTE.accentFg,
    [`${CSS_VAR_PREFIX}-accent-soft`]: SERENE_PALETTE.accentSoft,
    [`${CSS_VAR_PREFIX}-accent-glow`]: SERENE_PALETTE.accentGlow,
    [`${CSS_VAR_PREFIX}-focus`]: SERENE_PALETTE.focus,
    [`${CSS_VAR_PREFIX}-radius-sm`]: SERENE_SHAPE.radiusSm,
    [`${CSS_VAR_PREFIX}-radius-md`]: SERENE_SHAPE.radiusMd,
    [`${CSS_VAR_PREFIX}-radius-lg`]: SERENE_SHAPE.radiusLg,
    [`${CSS_VAR_PREFIX}-shadow-sm`]: SERENE_SHAPE.shadowSm,
    [`${CSS_VAR_PREFIX}-shadow-md`]: SERENE_SHAPE.shadowMd,
    [`${CSS_VAR_PREFIX}-shadow-lg`]: SERENE_SHAPE.shadowLg,
    '--look-wash-a': SERENE_WASH.a,
    '--look-wash-b': SERENE_WASH.b,
    '--look-wash-c': SERENE_WASH.c,
  };
}
