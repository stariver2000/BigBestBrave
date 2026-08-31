/** 콘텐츠 축: 화면을 채우는 재료. (22개 값) */

import { axis, label, v } from '../model';

export const DATA_PRESENCE = axis(
  'data-presence',
  'content',
  label('데이터 비중', 'Data presence', 'データ比重'),
  [
    v('none', '없음', 'None', 'なし'),
    v('accent', '보조', 'Accent', '補助'),
    v('supporting', '뒷받침', 'Supporting', '裏付け'),
    v('central', '중심', 'Central', '中心'),
    v('exhaustive', '전면', 'Exhaustive', '全面'),
  ],
);

export const IMAGERY = axis(
  'imagery',
  'content',
  label('이미지 유형', 'Imagery', '画像タイプ'),
  [
    v('none', '없음', 'None', 'なし'),
    v('photography', '사진', 'Photography', '写真'),
    v('illustration', '일러스트', 'Illustration', 'イラスト'),
    v('three-d', '3D', '3D', '3D'),
    v('generative', '제너러티브', 'Generative', 'ジェネラティブ'),
    v('diagram', '다이어그램', 'Diagram', '図解'),
    v('icon-only', '아이콘만', 'Icon only', 'アイコンのみ'),
    v('ascii', '아스키', 'ASCII', 'アスキー'),
  ],
  true,
);

export const ORNAMENT = axis(
  'ornament',
  'content',
  label('장식', 'Ornament', '装飾'),
  [
    v('none', '없음', 'None', 'なし'),
    v('rule-lines', '괘선', 'Rule lines', '罫線'),
    v('dingbats', '기호', 'Dingbats', '約物'),
    v('frames', '테두리 장식', 'Frames', '枠飾り'),
    v('patterns', '패턴', 'Patterns', 'パターン'),
    v('maximal', '과잉 장식', 'Maximal', '過剰装飾'),
  ],
);

export const NUMBER_FORMAT = axis(
  'number-format',
  'content',
  label('수치 표기', 'Number format', '数値表記'),
  [
    v('plain', '평문', 'Plain', '平文'),
    v('tabular', '표 정렬', 'Tabular', '表組み'),
    v('scientific', '과학 표기', 'Scientific', '科学表記'),
  ],
);

export const CONTENT_AXES = [DATA_PRESENCE, IMAGERY, ORNAMENT, NUMBER_FORMAT];
