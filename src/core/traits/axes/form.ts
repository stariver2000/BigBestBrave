/** 형태 축: 레이아웃·밀도·표면. (67개 값) */

import { axis, label, v } from '../model';

export const LAYOUT = axis(
  'layout',
  'form',
  label('레이아웃 원형', 'Layout archetype', 'レイアウト原型'),
  [
    v('single-column', '단일 컬럼', 'Single column', '単一カラム'),
    v('split-screen', '분할 화면', 'Split screen', '分割画面'),
    v('sidebar-left', '좌측 사이드바', 'Left sidebar', '左サイドバー'),
    v('sidebar-right', '우측 사이드바', 'Right sidebar', '右サイドバー'),
    v('three-pane', '3분할', 'Three pane', '三分割'),
    v('grid-gallery', '격자 갤러리', 'Grid gallery', 'グリッドギャラリー'),
    v('masonry', '메이슨리', 'Masonry', 'メーソンリー'),
    v('canvas', '자유 캔버스', 'Free canvas', '自由キャンバス'),
    v('timeline', '타임라인', 'Timeline', 'タイムライン'),
    v('dashboard', '대시보드', 'Dashboard', 'ダッシュボード'),
    v('kiosk', '키오스크', 'Kiosk', 'キオスク'),
    v('terminal', '터미널', 'Terminal', 'ターミナル'),
    v('magazine', '매거진', 'Magazine', 'マガジン'),
    v('card-stack', '카드 스택', 'Card stack', 'カードスタック'),
    v('carousel', '캐러셀', 'Carousel', 'カルーセル'),
    v('scrollytelling', '스크롤 내러티브', 'Scrollytelling', 'スクロールテリング'),
    v('map', '지도', 'Map', '地図'),
    v('tree-explorer', '트리 탐색기', 'Tree explorer', 'ツリーエクスプローラ'),
    v('workbench', '작업대', 'Workbench', 'ワークベンチ'),
    v('feed', '피드', 'Feed', 'フィード'),
  ],
);

export const DENSITY = axis(
  'density',
  'form',
  label('밀도', 'Density', '密度'),
  [
    v('airy', '성긴', 'Airy', '疎な'),
    v('spacious', '여유로운', 'Spacious', 'ゆとりある'),
    v('comfortable', '편안한', 'Comfortable', '快適な'),
    v('compact', '조밀한', 'Compact', 'コンパクト'),
    v('dense', '빽빽한', 'Dense', '高密度'),
    v('packed', '과밀', 'Packed', '過密'),
  ],
);

export const RHYTHM = axis(
  'rhythm',
  'form',
  label('리듬', 'Rhythm', 'リズム'),
  [
    v('uniform', '균일', 'Uniform', '均一'),
    v('modular', '모듈', 'Modular', 'モジュラー'),
    v('syncopated', '엇박', 'Syncopated', 'シンコペーション'),
    v('crescendo', '점층', 'Crescendo', 'クレッシェンド'),
    v('fragmented', '파편적', 'Fragmented', '断片的'),
  ],
);

export const ALIGNMENT = axis(
  'alignment',
  'form',
  label('정렬', 'Alignment', '整列'),
  [
    v('left', '좌측', 'Left', '左'),
    v('centered', '중앙', 'Centered', '中央'),
    v('justified', '양끝', 'Justified', '両端'),
    v('ragged', '불규칙', 'Ragged', '不揃い'),
  ],
);

export const GRID = axis(
  'grid',
  'form',
  label('그리드', 'Grid system', 'グリッド'),
  [
    v('col-4', '4컬럼', '4 columns', '4カラム'),
    v('col-8', '8컬럼', '8 columns', '8カラム'),
    v('col-12', '12컬럼', '12 columns', '12カラム'),
    v('col-16', '16컬럼', '16 columns', '16カラム'),
    v('fluid', '유동', 'Fluid', '流動'),
    v('asymmetric', '비대칭', 'Asymmetric', '非対称'),
  ],
);

export const CORNER = axis(
  'corner',
  'form',
  label('모서리', 'Corner', '角'),
  [
    v('sharp', '직각', 'Sharp', '直角'),
    v('subtle', '미세한 곡률', 'Subtle', '微かな丸み'),
    v('rounded', '둥근', 'Rounded', '丸い'),
    v('pill', '알약형', 'Pill', 'ピル'),
    v('mixed', '혼합', 'Mixed', '混合'),
    v('organic', '유기적', 'Organic', '有機的'),
  ],
);

export const BORDER = axis(
  'border',
  'form',
  label('테두리', 'Border', '境界線'),
  [
    v('none', '없음', 'None', 'なし'),
    v('hairline', '헤어라인', 'Hairline', 'ヘアライン'),
    v('solid', '실선', 'Solid', '実線'),
    v('heavy', '굵은', 'Heavy', '太線'),
    v('double', '이중선', 'Double', '二重線'),
  ],
);

export const ELEVATION = axis(
  'elevation',
  'form',
  label('입체감', 'Elevation', '立体感'),
  [
    v('flat', '평면', 'Flat', 'フラット'),
    v('subtle', '옅은 그림자', 'Subtle shadow', '薄い影'),
    v('layered', '층위', 'Layered', '層状'),
    v('floating', '부유', 'Floating', '浮遊'),
    v('dramatic', '극적', 'Dramatic', '劇的'),
  ],
);

export const SURFACE = axis(
  'surface',
  'form',
  label('표면 질감', 'Surface texture', '表面の質感'),
  [
    v('plain', '민무늬', 'Plain', '無地'),
    v('paper', '종이', 'Paper', '紙'),
    v('noise', '노이즈', 'Noise', 'ノイズ'),
    v('grain', '그레인', 'Grain', 'グレイン'),
    v('gradient-mesh', '그라디언트 메시', 'Gradient mesh', 'グラデーションメッシュ'),
    v('glass', '유리', 'Glass', 'ガラス'),
    v('metal', '금속', 'Metal', '金属'),
    v('fabric', '직물', 'Fabric', '布'),
    v('concrete', '콘크리트', 'Concrete', 'コンクリート'),
    v('holographic', '홀로그램', 'Holographic', 'ホログラム'),
  ],
);

export const FORM_AXES = [LAYOUT, DENSITY, RHYTHM, ALIGNMENT, GRID, CORNER, BORDER, ELEVATION, SURFACE];
