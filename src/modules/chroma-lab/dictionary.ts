/** Chroma Lab 문구 사전 (ko / en / ja). */

import type { Dictionary } from '../../core/i18n';

export type ChromaKey =
  | 'title'
  | 'summary'
  | 'capability'
  | 'seed-label'
  | 'seed-invalid'
  | 'seed-picker'
  | 'harmony-label'
  | 'cvd-label'
  | 'cvd-none'
  | 'cvd-severity'
  | 'cvd-prevalence'
  | 'ramp-title'
  | 'ramp-note'
  | 'ramp-clipped'
  | 'ramp-anchor'
  | 'ramp-copied'
  | 'contrast-title'
  | 'contrast-note'
  | 'contrast-text'
  | 'contrast-background'
  | 'contrast-swap'
  | 'contrast-ratio'
  | 'contrast-lc'
  | 'contrast-sample'
  | 'contrast-safe-title'
  | 'contrast-safe-empty'
  | 'export-title'
  | 'export-note'
  | 'export-prefix'
  | 'export-copy'
  | 'export-copied'
  | 'naming-title'
  | 'naming-note'
  | 'naming-ask'
  | 'naming-thinking'
  | 'naming-offline'
  | 'naming-busy'
  | 'naming-error'
  | 'naming-local'
  | 'level-body-preferred'
  | 'level-body-min'
  | 'level-large-text'
  | 'level-headline'
  | 'level-ui-nontext'
  | 'level-decorative'
  | 'level-invisible'
  | 'harmony-mono'
  | 'harmony-analogous'
  | 'harmony-complementary'
  | 'harmony-split-complementary'
  | 'harmony-triad'
  | 'harmony-tetrad'
  | 'sample-body'
  | 'sample-large'
  | 'sample-display';

export const chromaDictionary: Dictionary<ChromaKey> = {
  ko: {
    title: '크로마 랩',
    summary: 'OKLCH 위에서 팔레트를 만들고 대비와 색각 이상까지 한 화면에서 검증한다.',
    capability: '시드 색 하나로 접근성 검증까지 끝난 제품용 색 체계를 뽑아낸다',
    'seed-label': '시드 색',
    'seed-invalid': '색으로 읽을 수 없는 값입니다',
    'seed-picker': '색 선택기',
    'harmony-label': '조화 규칙',
    'cvd-label': '색각 이상 시뮬레이션',
    'cvd-none': '원본',
    'cvd-severity': '중증도',
    'cvd-prevalence': '인구 비율',
    'ramp-title': '톤 램프',
    'ramp-note': 'OKLab 명도를 고정해 만든 단계. 색을 눌러 복사합니다.',
    'ramp-clipped': 'sRGB 색역을 벗어나 채도를 낮춘 단계',
    'ramp-anchor': '시드와 가장 가까운 단계',
    'ramp-copied': '복사됨',
    'contrast-title': '대비 검사',
    'contrast-note': 'WCAG 2.1 대비비와 APCA Lc를 함께 봅니다. APCA는 밝기 극성을 반영합니다.',
    'contrast-text': '글자',
    'contrast-background': '배경',
    'contrast-swap': '뒤집기',
    'contrast-ratio': '대비비',
    'contrast-lc': 'APCA Lc',
    'contrast-sample': '미리보기',
    'contrast-safe-title': '이 배경에서 본문(Lc 75)을 통과하는 단계',
    'contrast-safe-empty': '통과하는 단계가 없습니다. 배경을 더 밝거나 어둡게 바꾸세요.',
    'export-title': '내보내기',
    'export-note': '그대로 프로젝트에 붙여 넣을 수 있는 형태로 나갑니다.',
    'export-prefix': '변수 접두사',
    'export-copy': '복사',
    'export-copied': '복사됨',
    'naming-title': '팔레트 이름',
    'naming-note': '로컬 LLM이 연결돼 있으면 이름을 새로 짓고, 없으면 색 자체에서 이름을 만듭니다.',
    'naming-ask': 'LLM으로 이름 짓기',
    'naming-thinking': '생성 중…',
    'naming-offline': '로컬 LLM이 연결돼 있지 않아 색에서 직접 만든 이름입니다.',
    'naming-busy': 'LLM이 다른 요청을 처리 중입니다. 잠시 후 다시 시도하세요.',
    'naming-error': 'LLM 호출에 실패했습니다. 아래는 색에서 직접 만든 이름입니다.',
    'naming-local': '규칙 기반 이름',
    'level-body-preferred': '본문에 넉넉함',
    'level-body-min': '본문 최소 기준',
    'level-large-text': '큰 글씨용',
    'level-headline': '제목용',
    'level-ui-nontext': '비텍스트 UI용',
    'level-decorative': '장식용',
    'level-invisible': '사실상 보이지 않음',
    'harmony-mono': '단색',
    'harmony-analogous': '유사색',
    'harmony-complementary': '보색',
    'harmony-split-complementary': '분할 보색',
    'harmony-triad': '삼색',
    'harmony-tetrad': '사색',
    'sample-body': '본문 글씨는 이 정도 크기로 읽힙니다.',
    'sample-large': '큰 글씨 미리보기',
    'sample-display': '디스플레이',
  },
  en: {
    title: 'Chroma Lab',
    summary: 'Build palettes in OKLCH and verify contrast and color vision deficiency in one view.',
    capability: 'Turn one seed color into a production color system that already passes accessibility checks',
    'seed-label': 'Seed color',
    'seed-invalid': 'Not a readable color value',
    'seed-picker': 'Color picker',
    'harmony-label': 'Harmony',
    'cvd-label': 'Color vision simulation',
    'cvd-none': 'Original',
    'cvd-severity': 'Severity',
    'cvd-prevalence': 'Population',
    'ramp-title': 'Tonal ramp',
    'ramp-note': 'Steps built on fixed OKLab lightness. Click a swatch to copy.',
    'ramp-clipped': 'Chroma reduced to fit sRGB gamut',
    'ramp-anchor': 'Closest step to the seed',
    'ramp-copied': 'Copied',
    'contrast-title': 'Contrast check',
    'contrast-note': 'WCAG 2.1 ratio and APCA Lc side by side. APCA accounts for polarity.',
    'contrast-text': 'Text',
    'contrast-background': 'Background',
    'contrast-swap': 'Swap',
    'contrast-ratio': 'Ratio',
    'contrast-lc': 'APCA Lc',
    'contrast-sample': 'Preview',
    'contrast-safe-title': 'Steps passing body text (Lc 75) on this background',
    'contrast-safe-empty': 'No step passes. Push the background lighter or darker.',
    'export-title': 'Export',
    'export-note': 'Paste straight into your project.',
    'export-prefix': 'Variable prefix',
    'export-copy': 'Copy',
    'export-copied': 'Copied',
    'naming-title': 'Palette name',
    'naming-note': 'A connected local LLM names it; otherwise the name comes from the color itself.',
    'naming-ask': 'Name it with the LLM',
    'naming-thinking': 'Generating…',
    'naming-offline': 'No local LLM connected, so this name is derived from the color.',
    'naming-busy': 'The LLM is handling another request. Try again shortly.',
    'naming-error': 'The LLM call failed. Below is the name derived from the color.',
    'naming-local': 'Rule-based name',
    'level-body-preferred': 'Comfortable for body text',
    'level-body-min': 'Body text minimum',
    'level-large-text': 'Large text',
    'level-headline': 'Headlines',
    'level-ui-nontext': 'Non-text UI',
    'level-decorative': 'Decorative only',
    'level-invisible': 'Effectively invisible',
    'harmony-mono': 'Monochrome',
    'harmony-analogous': 'Analogous',
    'harmony-complementary': 'Complementary',
    'harmony-split-complementary': 'Split complementary',
    'harmony-triad': 'Triad',
    'harmony-tetrad': 'Tetrad',
    'sample-body': 'Body copy reads at about this size.',
    'sample-large': 'Large text preview',
    'sample-display': 'Display',
  },
  ja: {
    title: 'クロマラボ',
    summary: 'OKLCH 上でパレットを作り、コントラストと色覚特性を同じ画面で検証する。',
    capability: '一つのシード色から、アクセシビリティ検証まで済んだ製品用カラーシステムを作る',
    'seed-label': 'シード色',
    'seed-invalid': '色として読み取れません',
    'seed-picker': 'カラーピッカー',
    'harmony-label': '調和規則',
    'cvd-label': '色覚シミュレーション',
    'cvd-none': '元の色',
    'cvd-severity': '重症度',
    'cvd-prevalence': '人口比',
    'ramp-title': 'トーンランプ',
    'ramp-note': 'OKLab 明度を固定して作った段階。クリックでコピーします。',
    'ramp-clipped': 'sRGB 色域を超えて彩度を下げた段階',
    'ramp-anchor': 'シードに最も近い段階',
    'ramp-copied': 'コピーしました',
    'contrast-title': 'コントラスト検査',
    'contrast-note': 'WCAG 2.1 比率と APCA Lc を並べて表示します。APCA は明暗の極性を考慮します。',
    'contrast-text': '文字',
    'contrast-background': '背景',
    'contrast-swap': '入れ替え',
    'contrast-ratio': '比率',
    'contrast-lc': 'APCA Lc',
    'contrast-sample': 'プレビュー',
    'contrast-safe-title': 'この背景で本文（Lc 75）を満たす段階',
    'contrast-safe-empty': '満たす段階がありません。背景をより明るく、または暗くしてください。',
    'export-title': '書き出し',
    'export-note': 'そのままプロジェクトに貼り付けられます。',
    'export-prefix': '変数の接頭辞',
    'export-copy': 'コピー',
    'export-copied': 'コピーしました',
    'naming-title': 'パレット名',
    'naming-note': 'ローカル LLM があれば命名し、なければ色そのものから名前を作ります。',
    'naming-ask': 'LLM で命名する',
    'naming-thinking': '生成中…',
    'naming-offline': 'ローカル LLM に接続していないため、色から作った名前です。',
    'naming-busy': 'LLM が別の要求を処理中です。しばらくして再試行してください。',
    'naming-error': 'LLM 呼び出しに失敗しました。以下は色から作った名前です。',
    'naming-local': '規則ベースの名前',
    'level-body-preferred': '本文に十分',
    'level-body-min': '本文の最低基準',
    'level-large-text': '大きな文字向け',
    'level-headline': '見出し向け',
    'level-ui-nontext': '非文字 UI 向け',
    'level-decorative': '装飾のみ',
    'level-invisible': 'ほぼ見えない',
    'harmony-mono': '単色',
    'harmony-analogous': '類似色',
    'harmony-complementary': '補色',
    'harmony-split-complementary': '分割補色',
    'harmony-triad': '三色',
    'harmony-tetrad': '四色',
    'sample-body': '本文はこの程度の大きさで読まれます。',
    'sample-large': '大きな文字のプレビュー',
    'sample-display': 'ディスプレイ',
  },
};
