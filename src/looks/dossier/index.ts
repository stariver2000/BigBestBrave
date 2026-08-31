/**
 * 'dossier' 룩 — 서류철과 활판 인쇄물의 화면.
 *
 * serene이 부드러움을 맡는다면 이 룩은 문서의 단정함을 맡는다.
 * 같은 컴포넌트가 이 변수들 위에서 전혀 다른 인상으로 나온다.
 */

import './look.css';
import { CSS_VAR_PREFIX } from '../../core/traits';
import { DOSSIER_BAR, DOSSIER_GRAIN, DOSSIER_PALETTE, DOSSIER_SHAPE, DOSSIER_TYPE } from './config';

export function dossierVariables(): Record<string, string> {
  return {
    [`${CSS_VAR_PREFIX}-bg`]: DOSSIER_PALETTE.bg,
    [`${CSS_VAR_PREFIX}-surface`]: DOSSIER_PALETTE.surface,
    [`${CSS_VAR_PREFIX}-surface-raised`]: DOSSIER_PALETTE.surfaceRaised,
    [`${CSS_VAR_PREFIX}-border-color`]: DOSSIER_PALETTE.border,
    [`${CSS_VAR_PREFIX}-border-strong`]: DOSSIER_PALETTE.borderStrong,
    [`${CSS_VAR_PREFIX}-fg`]: DOSSIER_PALETTE.fg,
    [`${CSS_VAR_PREFIX}-fg-muted`]: DOSSIER_PALETTE.fgMuted,
    [`${CSS_VAR_PREFIX}-accent`]: DOSSIER_PALETTE.accent,
    [`${CSS_VAR_PREFIX}-accent-fg`]: DOSSIER_PALETTE.accentFg,
    [`${CSS_VAR_PREFIX}-accent-soft`]: DOSSIER_PALETTE.accentSoft,
    [`${CSS_VAR_PREFIX}-accent-glow`]: DOSSIER_PALETTE.accentGlow,
    [`${CSS_VAR_PREFIX}-focus`]: DOSSIER_PALETTE.focus,
    [`${CSS_VAR_PREFIX}-radius-sm`]: DOSSIER_SHAPE.radiusSm,
    [`${CSS_VAR_PREFIX}-radius-md`]: DOSSIER_SHAPE.radiusMd,
    [`${CSS_VAR_PREFIX}-radius-lg`]: DOSSIER_SHAPE.radiusLg,
    [`${CSS_VAR_PREFIX}-shadow-sm`]: DOSSIER_SHAPE.shadowSm,
    [`${CSS_VAR_PREFIX}-shadow-md`]: DOSSIER_SHAPE.shadowMd,
    [`${CSS_VAR_PREFIX}-shadow-lg`]: DOSSIER_SHAPE.shadowLg,
    [`${CSS_VAR_PREFIX}-font-heading`]: DOSSIER_TYPE.heading,
    [`${CSS_VAR_PREFIX}-font-body`]: DOSSIER_TYPE.body,
    '--look-bar': DOSSIER_BAR,
    '--look-grain': DOSSIER_GRAIN,
  };
}
