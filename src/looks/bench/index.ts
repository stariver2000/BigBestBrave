/** 'bench' 룩 — 실험대. 상관 행렬의 양과 음이 같은 무게로 읽히도록 지면을 가운데로 끌어왔다. */

import './look.css';
import { CSS_VAR_PREFIX } from '../../core/traits';
import { BENCH_HEAT, BENCH_PALETTE, BENCH_SHAPE, BENCH_TYPE } from './config';

export function benchVariables(): Record<string, string> {
  return {
    [`${CSS_VAR_PREFIX}-bg`]: BENCH_PALETTE.bg,
    [`${CSS_VAR_PREFIX}-surface`]: BENCH_PALETTE.surface,
    [`${CSS_VAR_PREFIX}-surface-raised`]: BENCH_PALETTE.surfaceRaised,
    [`${CSS_VAR_PREFIX}-border-color`]: BENCH_PALETTE.border,
    [`${CSS_VAR_PREFIX}-border-strong`]: BENCH_PALETTE.borderStrong,
    [`${CSS_VAR_PREFIX}-fg`]: BENCH_PALETTE.fg,
    [`${CSS_VAR_PREFIX}-fg-muted`]: BENCH_PALETTE.fgMuted,
    [`${CSS_VAR_PREFIX}-accent`]: BENCH_PALETTE.accent,
    [`${CSS_VAR_PREFIX}-accent-fg`]: BENCH_PALETTE.accentFg,
    [`${CSS_VAR_PREFIX}-accent-soft`]: BENCH_PALETTE.accentSoft,
    [`${CSS_VAR_PREFIX}-accent-glow`]: BENCH_PALETTE.accentGlow,
    [`${CSS_VAR_PREFIX}-focus`]: BENCH_PALETTE.focus,
    [`${CSS_VAR_PREFIX}-radius-sm`]: BENCH_SHAPE.radiusSm,
    [`${CSS_VAR_PREFIX}-radius-md`]: BENCH_SHAPE.radiusMd,
    [`${CSS_VAR_PREFIX}-radius-lg`]: BENCH_SHAPE.radiusLg,
    [`${CSS_VAR_PREFIX}-shadow-sm`]: BENCH_SHAPE.shadowSm,
    [`${CSS_VAR_PREFIX}-shadow-md`]: BENCH_SHAPE.shadowMd,
    [`${CSS_VAR_PREFIX}-shadow-lg`]: BENCH_SHAPE.shadowLg,
    [`${CSS_VAR_PREFIX}-font-heading`]: BENCH_TYPE.heading,
    [`${CSS_VAR_PREFIX}-font-body`]: BENCH_TYPE.body,
    [`${CSS_VAR_PREFIX}-font-mono`]: BENCH_TYPE.mono,
    // 이 룩만 쓰는 값. 화면이 투명도를 붙여 쓴다.
    [`${CSS_VAR_PREFIX}-heat-pos`]: BENCH_HEAT.positive,
    [`${CSS_VAR_PREFIX}-heat-neg`]: BENCH_HEAT.negative,
  };
}
