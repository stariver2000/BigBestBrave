/** 타이포그래피 축. (38개 값) */

import { axis, label, v } from '../model';

export const TYPE_VOICE = axis(
  'type-voice',
  'typography',
  label('서체 성격', 'Type voice', '書体の性格'),
  [
    v('grotesk', '그로테스크', 'Grotesk', 'グロテスク'),
    v('humanist', '휴머니스트', 'Humanist', 'ヒューマニスト'),
    v('geometric', '기하학', 'Geometric', 'ジオメトリック'),
    v('transitional-serif', '트랜지셔널 세리프', 'Transitional serif', 'トランジショナル'),
    v('editorial-serif', '에디토리얼 세리프', 'Editorial serif', 'エディトリアル明朝'),
    v('old-style-serif', '올드스타일 세리프', 'Old-style serif', 'オールドスタイル'),
    v('didone', '디도네', 'Didone', 'ディドネ'),
    v('slab', '슬랩', 'Slab', 'スラブ'),
    v('mono', '고정폭', 'Monospace', '等幅'),
    v('condensed', '장체', 'Condensed', 'コンデンス'),
    v('display', '디스플레이', 'Display', 'ディスプレイ'),
    v('script', '필기체', 'Script', 'スクリプト'),
    v('blackletter', '블랙레터', 'Blackletter', 'ブラックレター'),
    v('pixel', '픽셀', 'Pixel', 'ピクセル'),
    v('stencil', '스텐실', 'Stencil', 'ステンシル'),
    v('rounded', '둥근 고딕', 'Rounded', '丸ゴシック'),
    v('brush', '붓글씨', 'Brush', '筆書き'),
  ],
);

export const TYPE_SCALE = axis(
  'type-scale',
  'typography',
  label('타입 스케일', 'Type scale', 'タイプスケール'),
  [
    v('minor-second', '단2도 1.067', 'Minor second 1.067', '短2度 1.067'),
    v('major-second', '장2도 1.125', 'Major second 1.125', '長2度 1.125'),
    v('minor-third', '단3도 1.2', 'Minor third 1.2', '短3度 1.2'),
    v('major-third', '장3도 1.25', 'Major third 1.25', '長3度 1.25'),
    v('perfect-fourth', '완전4도 1.333', 'Perfect fourth 1.333', '完全4度 1.333'),
    v('golden', '황금비 1.618', 'Golden 1.618', '黄金比 1.618'),
  ],
);

export const TYPE_CONTRAST = axis(
  'type-contrast',
  'typography',
  label('굵기 대비', 'Weight contrast', 'ウェイト対比'),
  [
    v('flat', '단일 굵기', 'Single weight', '単一ウェイト'),
    v('gentle', '완만', 'Gentle', '緩やか'),
    v('strong', '강한', 'Strong', '強い'),
    v('extreme', '극단', 'Extreme', '極端'),
  ],
);

export const TRACKING = axis(
  'tracking',
  'typography',
  label('자간', 'Letter spacing', '字間'),
  [
    v('tight', '좁게', 'Tight', '詰め'),
    v('normal', '보통', 'Normal', '標準'),
    v('loose', '넓게', 'Loose', '広め'),
    v('wide', '아주 넓게', 'Wide', '極広'),
  ],
);

export const LEADING = axis(
  'leading',
  'typography',
  label('행간', 'Line height', '行間'),
  [
    v('tight', '좁게', 'Tight', '詰め'),
    v('normal', '보통', 'Normal', '標準'),
    v('relaxed', '느슨하게', 'Relaxed', 'ゆったり'),
    v('airy', '아주 넓게', 'Airy', '広々'),
  ],
);

export const CASING = axis(
  'casing',
  'typography',
  label('대소문자 처리', 'Casing', '大文字処理'),
  [
    v('sentence', '문장식', 'Sentence case', '文章形式'),
    v('title', '제목식', 'Title case', 'タイトル形式'),
    v('upper', '전부 대문자', 'All caps', '全大文字'),
    v('lower', '전부 소문자', 'All lowercase', '全小文字'),
  ],
);

export const TYPOGRAPHY_AXES = [TYPE_VOICE, TYPE_SCALE, TYPE_CONTRAST, TRACKING, LEADING, CASING];
