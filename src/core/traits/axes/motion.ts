/** 모션 축. (30개 값) */

import { axis, label, v } from '../model';

export const MOTION_CHARACTER = axis(
  'motion-character',
  'motion',
  label('움직임 성격', 'Motion character', '動きの性格'),
  [
    v('none', '없음', 'None', 'なし'),
    v('subtle-fade', '옅은 페이드', 'Subtle fade', '淡いフェード'),
    v('spring', '스프링', 'Spring', 'スプリング'),
    v('snappy', '기민한', 'Snappy', '機敏'),
    v('slow-drift', '느린 표류', 'Slow drift', 'ゆるやかな漂い'),
    v('elastic', '탄성', 'Elastic', '弾性'),
    v('mechanical', '기계적', 'Mechanical', '機械的'),
    v('organic', '유기적', 'Organic', '有機的'),
    v('cinematic', '영화적', 'Cinematic', '映画的'),
    v('glitch', '글리치', 'Glitch', 'グリッチ'),
    v('parallax', '패럴랙스', 'Parallax', 'パララックス'),
    v('morph', '모프', 'Morph', 'モーフ'),
    v('kinetic-type', '키네틱 타이포', 'Kinetic type', 'キネティックタイポ'),
    v('physics', '물리 기반', 'Physics-based', '物理ベース'),
  ],
);

export const MOTION_DURATION = axis(
  'motion-duration',
  'motion',
  label('지속 시간', 'Duration', '持続時間'),
  [
    v('instant', '즉시', 'Instant', '瞬時'),
    v('quick', '빠름', 'Quick', '速い'),
    v('measured', '적당', 'Measured', '中庸'),
    v('languid', '느림', 'Languid', '緩慢'),
  ],
);

export const EASING = axis(
  'easing',
  'motion',
  label('가감속', 'Easing', 'イージング'),
  [
    v('linear', '등속', 'Linear', '等速'),
    v('ease-out', '감속', 'Ease out', 'イーズアウト'),
    v('ease-in-out', '가감속', 'Ease in-out', 'イーズインアウト'),
    v('overshoot', '오버슈트', 'Overshoot', 'オーバーシュート'),
    v('anticipate', '예비 동작', 'Anticipate', '予備動作'),
    v('step', '계단', 'Step', 'ステップ'),
  ],
);

export const ENTRANCE = axis(
  'entrance',
  'motion',
  label('등장 방식', 'Entrance', '登場'),
  [
    v('none', '없음', 'None', 'なし'),
    v('fade', '페이드', 'Fade', 'フェード'),
    v('rise', '위로 떠오름', 'Rise', '浮上'),
    v('scale', '확대', 'Scale', '拡大'),
    v('stagger', '순차', 'Stagger', '順次'),
    v('wipe', '와이프', 'Wipe', 'ワイプ'),
  ],
);

export const MOTION_AXES = [MOTION_CHARACTER, MOTION_DURATION, EASING, ENTRANCE];
