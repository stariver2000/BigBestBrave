/**
 * 주제 분석 결과 시각화 갈래표의 상수.
 *
 * 근거가 된 연구: A Scoping Review on How HCI Researchers Visualize Results of
 * Thematic Analysis (Seokweon Jung(KAIST·SNU), Jiwon Song, Yumin Song,
 * Jinwook Seo(SNU), Ha-Kyung Hidy Kong(RIT)), CHI EA 2026,
 * doi:10.1145/3772363.3798541. 전문은 연구실이 직접 올린
 * hcil.snu.ac.kr/cms/uploads 의 공개 PDF로 읽었다.
 *
 * 옮겨 적은 것
 *   - DATA_TYPES / ENCODINGS / MATRIX: 표 1 (자료 유형 11갈래 × 부호 5열의
 *     출현 수). 다섯 열의 합 252·196·77·112·12를 시험이 셀에서 재계산한다.
 *   - CORPUS: 3장의 수집 셈(150+39-중복=187, 그림 없는 4편 제외, 1,052 →
 *     결과 단계만 걸러 572점/149편)과 Krippendorff 알파 셋.
 *   - OBSERVATIONS: 5장의 관찰들(표의 지배, 예시용 이미지, 개념용 도해,
 *     수치용 차트, 핵심 질적 발견은 절반 미만).
 *   - ENCODING_KINDS: 4.2절이 나열한 부호의 세부 갈래 이름들.
 *
 * 표 1의 다섯째 열은 캡션이 네 부호(표·이미지·도해·차트)만 이름 붙이고
 * 글자 추출에서 글리프가 깨져 이름을 읽을 수 없다. 열 합계 12는 표의 총계
 * 행과 맞으므로 '그 밖'으로 두고 그 사실을 화면에 밝힌다.
 *
 * 논문이 결과를 공개한 사이트(taresultvis.github.io)의 색인 수는 표 1과
 * 다르다(예: Taxonomy 127 대 59). 여과 전 1,052점 전체를 세는 것으로
 * 보이나 사이트가 셈법을 밝히지 않아, 인쇄된 표 1을 정본으로 쓰고
 * 사이트 수치는 옮기지 않는다.
 */

/** 자료 유형의 큰 갈래 넷. */
export const CATEGORIES = ['theme', 'concept', 'quant', 'misc'] as const;
export type CategoryId = (typeof CATEGORIES)[number];

/** 부호 다섯 열. other는 위 머리말에서 말한 이름 없는 다섯째 열이다. */
export const ENCODINGS = ['table', 'image', 'diagram', 'chart', 'other'] as const;
export type EncodingId = (typeof ENCODINGS)[number];

export interface DataTypeRow {
  id: string;
  category: CategoryId;
  /** 표 1의 총계(Tot.). 부호 합과 다를 수 있다 - 한 그림이 여러 부호를 겸한다. */
  total: number;
  /** 부호별 출현 수. ENCODINGS 순서. */
  counts: Record<EncodingId, number>;
}

/** 표 1. 순서도 표 그대로다. */
export const DATA_TYPES = [
  { id: 'taxonomy', category: 'theme', total: 59, counts: { table: 41, image: 1, diagram: 18, chart: 0, other: 3 } },
  { id: 'definition', category: 'theme', total: 55, counts: { table: 31, image: 20, diagram: 3, chart: 0, other: 2 } },
  { id: 'example', category: 'theme', total: 187, counts: { table: 35, image: 144, diagram: 10, chart: 1, other: 4 } },
  { id: 'frequency', category: 'theme', total: 62, counts: { table: 44, image: 2, diagram: 2, chart: 18, other: 0 } },
  { id: 'otherTheme', category: 'theme', total: 21, counts: { table: 11, image: 0, diagram: 6, chart: 3, other: 0 } },
  { id: 'model', category: 'concept', total: 42, counts: { table: 7, image: 6, diagram: 32, chart: 1, other: 0 } },
  { id: 'designInsight', category: 'concept', total: 30, counts: { table: 12, image: 12, diagram: 4, chart: 0, other: 1 } },
  { id: 'otherConcept', category: 'concept', total: 5, counts: { table: 0, image: 2, diagram: 2, chart: 0, other: 1 } },
  { id: 'selfReported', category: 'quant', total: 71, counts: { table: 27, image: 0, diagram: 0, chart: 44, other: 0 } },
  { id: 'objective', category: 'quant', total: 88, counts: { table: 43, image: 0, diagram: 0, chart: 45, other: 0 } },
  { id: 'miscResult', category: 'misc', total: 9, counts: { table: 1, image: 9, diagram: 0, chart: 0, other: 1 } },
] as const satisfies readonly DataTypeRow[];

export type DataTypeId = (typeof DATA_TYPES)[number]['id'];

/** 표 1의 총계 행. 시험이 셀에서 재계산해 맞는지 본다. */
export const COLUMN_TOTALS: Record<EncodingId, number> = {
  table: 252,
  image: 196,
  diagram: 77,
  chart: 112,
  other: 12,
};

/**
 * 표 1에서 행의 부호 합이 총계보다 1 작은 두 행. 캡션은 "합이 총계를 넘을 수
 * 있다"(한 그림이 여러 부호)고만 말하는데, 이 두 행은 반대로 모자란다.
 * 옮겨 적기 오류가 아니라(열 합계가 전부 맞는다) 표 자체의 어긋남이므로
 * 고치지 않고 붙든다.
 */
export const ROWS_SUM_SHORT: readonly DataTypeId[] = ['otherTheme', 'designInsight'];

/** 3장의 수집 셈. */
export const CORPUS = {
  yearsFrom: 2012,
  yearsTo: 2025,
  titleAbstractHits: 150,
  supplementaryHits: 39,
  papers: 187,
  papersWithoutVisuals: 4,
  extractedVisuals: 1052,
  /** 결과 단계만 남긴 뒤. */
  resultVisuals: 572,
  resultPapers: 149,
  krippendorff: { researchStep: 0.85, dataType: 0.78, visualEncoding: 0.97 },
  /** 5.1절: 핵심 질적 발견(Theme·Concept)을 그린 그림은 절반이 안 된다. */
  coreQualitativeVisuals: 406,
  coreQualitativeDenominator: 1052,
} as const;

/**
 * 본문과 표의 셈이 다른 곳들. 어느 쪽이 옳은지 논문이 밝히지 않으므로
 * 양쪽을 그대로 들고 화면에 적는다.
 *   - 5.3절은 "예시용 이미지 138/187, 말뭉치 이미지의 138/173"이라 하는데
 *     표 1의 같은 자리는 144(Example×Image)와 열 합 196이다.
 *   - 5.5절은 막대 갈래(기본·묶음·쌓기)가 44번으로 "차트의 절반 가까이"라
 *     하는데 표 1의 차트 열 합은 112라 44는 39%다. 서로 다른 셈(고유 그림
 *     수 대 중복 계수)일 수 있다.
 */
export const PROSE_VS_TABLE = {
  exampleImagesProse: { count: 138, ofExamples: 187, ofAllImages: 173 },
  exampleImagesTable: { count: 144, imageColumnTotal: 196 },
  barVariantCount: 44,
  chartColumnTotal: 112,
} as const;

/** 4.2절이 나열한 부호의 세부 갈래. 수는 없고 이름만 있다(수는 그림·사이트에만). */
export const ENCODING_KINDS: Record<EncodingId, readonly string[]> = {
  table: ['Table', 'Matrix', 'Heatmap'],
  image: ['Photo', 'Screenshot', 'Sketch', 'Illustration'],
  diagram: ['Block', 'Network', 'Venn', 'Onion', 'Timeline', 'Other'],
  chart: ['Standard bar', 'Grouped bar', 'Stacked bar', 'Diverging bar', 'Box plot', 'Dot plot', 'Line chart', 'Range symbol', 'Other'],
  other: [],
};

/** 5장의 관찰. 화면 조언의 근거가 되는 문장들의 자리표다. */
export const OBSERVATIONS = [
  'tablesDominate', // 5.2: 표 252회로 가장 흔하다 - 풍부함은 지키지만 글이 무겁다
  'imagesForExamples', // 5.3: 이미지는 주로 주제의 예시를 보여 준다
  'diagramsForConcepts', // 5.4: 개념에는 도해의 비중이 유난히 높다
  'chartsForQuant', // 5.5: 차트는 수치와 주제 빈도에 국한된다
  'halfNotQualitative', // 5.1: 그림 노력의 절반 이상이 핵심 질적 발견 밖으로 간다
] as const;

export type ObservationId = (typeof OBSERVATIONS)[number];
