import { describe, expect, it } from 'vitest';
import {
  CATEGORIES,
  CATEGORY_STATS,
  DATASET,
  DIFFERENCES,
  STUDY,
  TIME_STATS,
  TYPES,
  TYPE_STATS,
  advise,
  categoryOf,
  composition,
  decodeLabels,
  encodeLabels,
  placement,
  splitScript,
  suggestType,
  typesOf,
  verdictAgainst,
  type Label,
} from '@core/howto';

/**
 * 옮겨 적기 검증.
 *
 * 논문(CHI 2023, doi:10.1145/3544548.3581126)의 표 1·4·5·6과 본문 수치를
 * 다른 표기에서 되짚는다. 유형 평균의 합은 갈래 평균과, 조각 수는 총계와,
 * 비율은 개수에서 앞으로. 어긋나는 곳은 고치지 않고 어긋남 자체를 붙든다.
 */
describe('갈래표 옮겨 적기', () => {
  it('여덟 갈래 아래 스물한 유형이 있다', () => {
    expect(CATEGORIES).toHaveLength(8);
    expect(TYPES).toHaveLength(21);
  });

  it('갈래별 유형 수가 표 1과 같다 (2·3·3·2·2·3·2·4)', () => {
    const counts = CATEGORIES.map((category) => typesOf(category).length);
    expect(counts).toEqual([2, 3, 3, 2, 2, 3, 2, 4]);
  });

  it('모든 유형의 갈래가 갈래 목록에 있다', () => {
    for (const type of TYPES) {
      expect(CATEGORIES).toContain(categoryOf(type.id));
    }
  });
});

describe('표 4·5 옮겨 적기', () => {
  it('갈래 평균의 합이 100.0%다', () => {
    const total = CATEGORIES.reduce((sum, category) => sum + CATEGORY_STATS[category].mean, 0);
    expect(total).toBeCloseTo(100.0, 5);
  });

  it('유형 평균의 합이 갈래 평균과 반올림 오차(0.1) 안에서 맞는다', () => {
    for (const category of CATEGORIES) {
      const typeSum = typesOf(category).reduce((sum, type) => sum + TYPE_STATS[type].mean, 0);
      expect(Math.abs(typeSum - CATEGORY_STATS[category].mean), category).toBeLessThanOrEqual(0.100001);
    }
  });

  it('greeting·overview·method·description은 유형 합이 갈래 평균과 정확히 같다', () => {
    for (const category of ['greeting', 'overview', 'method', 'description'] as const) {
      const typeSum = typesOf(category).reduce((sum, type) => sum + TYPE_STATS[type].mean, 0);
      expect(typeSum, category).toBeCloseTo(CATEGORY_STATS[category].mean, 5);
    }
  });

  it('평균이 최댓값을 넘지 않고, 최솟값이 최댓값을 넘지 않는다', () => {
    for (const category of CATEGORIES) {
      const stats = CATEGORY_STATS[category];
      expect(stats.mean, category).toBeLessThanOrEqual(stats.max);
      expect(stats.min, category).toBeLessThanOrEqual(stats.max);
    }
    for (const type of TYPES) {
      const stats = TYPE_STATS[type.id];
      expect(stats.mean, type.id).toBeLessThanOrEqual(stats.max);
      expect(stats.min, type.id).toBeLessThanOrEqual(stats.max);
    }
  });

  it('briefing만 최솟값이 평균보다 크다 (표의 각주: 최솟값은 그 유형이 있는 영상에서만)', () => {
    // 인쇄된 그대로: 평균 0.7 < 최솟값 1.9. 옮겨 적기 실수가 아니라 계산 모집단이 다르다.
    expect(TYPE_STATS.briefing.mean).toBeLessThan(TYPE_STATS.briefing.min);
    for (const type of TYPES) {
      if (type.id === 'briefing') continue;
      expect(TYPE_STATS[type.id].mean, type.id).toBeGreaterThanOrEqual(TYPE_STATS[type.id].min);
    }
    for (const category of CATEGORIES) {
      expect(CATEGORY_STATS[category].mean, category).toBeGreaterThanOrEqual(CATEGORY_STATS[category].min);
    }
  });
});

describe('표 6 옮겨 적기', () => {
  it('모든 갈래에서 q5 < 평균 < q95이고 값이 [0, 1000] 안이다', () => {
    for (const category of CATEGORIES) {
      const stats = TIME_STATS[category];
      expect(stats.q5, category).toBeGreaterThanOrEqual(0);
      expect(stats.q95, category).toBeLessThanOrEqual(1000);
      expect(stats.q5, category).toBeLessThan(stats.q95);
      expect(stats.mean, category).toBeGreaterThanOrEqual(stats.q5);
      expect(stats.mean, category).toBeLessThanOrEqual(stats.q95);
    }
  });

  it('머리말은 앞머리(q95=238), 맺음말은 끝머리(q5=720)에 놓인다', () => {
    expect(TIME_STATS.overview.q95).toBe(238);
    expect(TIME_STATS.conclusion.q5).toBe(720);
  });
});

describe('자료집 짜임 옮겨 적기', () => {
  it('조각 수의 합이 총계와 맞는다', () => {
    const { taskCounts, narrationCounts } = DATASET;
    expect(taskCounts.creating + taskCounts.fixing + taskCounts.using).toBe(DATASET.videos);
    expect(narrationCounts.realTime + narrationCounts.dubbed).toBe(DATASET.videos);
    expect(DATASET.genres * DATASET.perGenre).toBe(DATASET.videos);
    expect(DATASET.constructionVideos + DATASET.annotationVideos).toBe(DATASET.videos);
  });

  it('전체 자료집의 비율(%)이 개수에서 앞으로 되짚어진다', () => {
    const { taskCounts, narrationCounts, videos } = DATASET;
    expect(Math.abs((taskCounts.creating / videos) * 100 - DATASET.taskShare.entire.creating)).toBeLessThan(0.0500001);
    expect(Math.abs((taskCounts.fixing / videos) * 100 - DATASET.taskShare.entire.fixing)).toBeLessThan(0.0500001);
    expect(Math.abs((taskCounts.using / videos) * 100 - DATASET.taskShare.entire.using)).toBeLessThan(0.0500001);
    expect(Math.abs((narrationCounts.realTime / videos) * 100 - DATASET.narrationShare.entire.realTime)).toBeLessThan(0.0500001);
    expect(Math.abs((narrationCounts.dubbed / videos) * 100 - DATASET.narrationShare.entire.dubbed)).toBeLessThan(0.0500001);
  });

  it('구성 자료집(48편)의 비율이 정수 편수(34·9·5, 30·18)로 되짚어진다', () => {
    const n = DATASET.constructionVideos;
    expect(Math.abs((34 / n) * 100 - DATASET.taskShare.construction.creating)).toBeLessThan(0.0500001);
    expect(Math.abs((9 / n) * 100 - DATASET.taskShare.construction.fixing)).toBeLessThan(0.0500001);
    expect(Math.abs((5 / n) * 100 - DATASET.taskShare.construction.using)).toBeLessThan(0.0500001);
    expect(34 + 9 + 5).toBe(n);
    expect(Math.abs((30 / n) * 100 - DATASET.narrationShare.construction.realTime)).toBeLessThan(0.0500001);
    expect(Math.abs((18 / n) * 100 - DATASET.narrationShare.construction.dubbed)).toBeLessThan(0.0500001);
    expect(30 + 18).toBe(n);
  });

  it('비율 묶음은 각각 100%로 닫힌다', () => {
    for (const share of [DATASET.taskShare.construction, DATASET.taskShare.entire]) {
      expect(share.creating + share.fixing + share.using).toBeCloseTo(100, 5);
    }
    for (const share of [DATASET.narrationShare.construction, DATASET.narrationShare.entire]) {
      expect(share.realTime + share.dubbed).toBeCloseTo(100, 5);
    }
  });
});

describe('5.2.2절 차이 옮겨 적기', () => {
  it('context의 차이는 본문 문장(5.4%p)과 표의 값(11.6-6.2)이 맞는다', () => {
    const { share, statedGap } = DIFFERENCES.byTask.context;
    expect(share.fixing - share.creating).toBeCloseTo(statedGap, 5);
  });

  it('instruction의 차이는 본문 문장(8.1%p)과 값(45.0-36.9)이 맞는다', () => {
    const { share, statedGap } = DIFFERENCES.byNarration.instruction;
    expect(share.dubbed - share.realTime).toBeCloseTo(statedGap, 5);
  });

  it('Tool Specification은 논문 자체가 어긋난다: 본문은 실시간이 더 많다는데 수치는 반대다', () => {
    // 인쇄된 그대로 둔다. 실시간 4.2% < 후시녹음 5.9%인데 본문 서술은 실시간이 크다고 한다.
    const { printedShare, proseSaysRealTimeHigher } = DIFFERENCES.byNarration.toolSpec;
    expect(proseSaysRealTimeHigher).toBe(true);
    expect(printedShare.realTime).toBeLessThan(printedShare.dubbed);
  });
});

describe('사용자 연구(7~8장) 옮겨 적기', () => {
  it('모든 리커트 점수가 1~5 사이다', () => {
    const scores = [
      STUDY.summarize.helpfulnessCategory,
      STUDY.summarize.helpfulnessType,
      STUDY.follow.helpfulnessCategory,
      STUDY.follow.helpfulnessType,
      STUDY.summarize.reflectionScore,
      STUDY.summarize.lowestScore,
      STUDY.understanding.category,
      STUDY.understanding.type,
      ...STUDY.summarize.topCategories.map((entry) => entry.score),
      ...STUDY.summarize.topTypes.map((entry) => entry.score),
      ...STUDY.follow.topCategories.map((entry) => entry.score),
      ...STUDY.follow.topTypes.map((entry) => entry.score),
    ];
    for (const score of scores) {
      expect(score).toBeGreaterThanOrEqual(1);
      expect(score).toBeLessThanOrEqual(5);
    }
  });

  it('상위 목록이 본문에 적힌 순서대로 내림차순이다', () => {
    for (const list of [STUDY.summarize.topTypes, STUDY.follow.topTypes, STUDY.follow.topCategories]) {
      for (let i = 1; i < list.length; i += 1) {
        expect(list[i].score).toBeLessThanOrEqual(list[i - 1].score);
      }
    }
  });

  it('찾기 과제의 정답 수는 세 문제를 넘지 않는다', () => {
    expect(STUDY.search.matchedOfThree).toBeLessThanOrEqual(3);
  });
});

describe('문장 나누기', () => {
  it('마침표·물음표·느낌표로 나눈다', () => {
    const result = splitScript('First one. Second one? Third one!');
    expect(result.map((sentence) => sentence.text)).toEqual(['First one.', 'Second one?', 'Third one!']);
  });

  it('이어진 경계 문자("...")는 한 경계다', () => {
    const result = splitScript('Wait... okay.');
    expect(result.map((sentence) => sentence.text)).toEqual(['Wait...', 'okay.']);
  });

  it('줄바꿈도 경계이고, 빈 조각은 버린다', () => {
    const result = splitScript('한 줄\n\n다음 줄.');
    expect(result.map((sentence) => sentence.text)).toEqual(['한 줄', '다음 줄.']);
  });

  it('전각 경계(。！？)도 나눈다', () => {
    const result = splitScript('こんにちは。始めましょう！');
    expect(result.map((sentence) => sentence.text)).toEqual(['こんにちは。', '始めましょう！']);
  });

  it('오프셋으로 원문을 되짚을 수 있다', () => {
    const text = '  앞 공백. 그리고 끝  ';
    for (const sentence of splitScript(text)) {
      expect(text.slice(sentence.start, sentence.end)).toBe(sentence.text);
    }
  });

  it('빈 문자열이면 빈 배열이다', () => {
    expect(splitScript('')).toEqual([]);
    expect(splitScript('   \n  ')).toEqual([]);
  });
});

describe('라벨 직렬화', () => {
  it('되돌리기가 성립한다', () => {
    const labels: Label[] = ['opening', null, 'instruction', 'filler', null];
    const encoded = encodeLabels(labels);
    // 꼬리의 미정은 잘리므로 개수를 주고 되살린다.
    expect(decodeLabels(encoded, labels.length)).toEqual(labels);
  });

  it('전부 미정이면 빈 문자열이다', () => {
    expect(encodeLabels([null, null, null])).toBe('');
    expect(decodeLabels('', 3)).toEqual([null, null, null]);
  });

  it('모르는 글자는 미정으로 읽는다', () => {
    expect(decodeLabels('a?z', 3)).toEqual(['opening', null, null]);
  });

  it('스물한 유형이 전부 서로 다른 글자로 나간다', () => {
    const encoded = encodeLabels(TYPES.map((type) => type.id));
    expect(new Set(encoded.split('')).size).toBe(21);
    expect(decodeLabels(encoded, 21)).toEqual(TYPES.map((type) => type.id));
  });
});

describe('구성 비율', () => {
  const sentences = splitScript('Hello there. Cut the paper. Now fold it twice.');

  it('글자 수로 가중해 라벨이 달린 부분의 100%로 닫힌다', () => {
    const comp = composition(sentences, ['opening', 'instruction', 'instruction']);
    const total = Object.values(comp.typeShare).reduce((sum, share) => sum + share, 0);
    expect(total).toBeCloseTo(100, 5);
    // 지시 두 문장(14+18자)이 인사(12자)보다 크다.
    expect(comp.typeShare.instruction).toBeGreaterThan(comp.typeShare.opening ?? 0);
    expect(comp.categoryShare.method).toBeCloseTo(comp.typeShare.instruction ?? 0, 5);
  });

  it('미정 문장은 분모에서 빠진다', () => {
    const comp = composition(sentences, ['opening', null, null]);
    expect(comp.labeledCount).toBe(1);
    expect(comp.typeShare.opening).toBeCloseTo(100, 5);
  });

  it('라벨이 하나도 없으면 비율이 비어 있다', () => {
    const comp = composition(sentences, [null, null, null]);
    expect(comp.labeledChars).toBe(0);
    expect(Object.keys(comp.typeShare)).toHaveLength(0);
  });
});

describe('말뭉치와 견주기', () => {
  it('평균±1SD 밖이면 위/아래, 안이면 안이다', () => {
    // instruction: 평균 39.8, SD 17.7 - [22.1, 57.5]
    expect(verdictAgainst(60, TYPE_STATS.instruction)).toBe('above');
    expect(verdictAgainst(10, TYPE_STATS.instruction)).toBe('below');
    expect(verdictAgainst(40, TYPE_STATS.instruction)).toBe('within');
  });

  it('띠의 아래끝이 0 밑이면 "아래"는 성립하지 않는다', () => {
    // sideNote: 평균 6.6, SD 7.3 - 아래끝이 음수라 0.1%도 "안"이다.
    expect(verdictAgainst(0.1, TYPE_STATS.sideNote)).toBe('within');
  });
});

describe('자리 살피기', () => {
  it('갈래의 자리가 0~1000으로 정규화되고 띠 밖이 표시된다', () => {
    // 맺음말(q5=720)을 대본 첫머리에 두면 띠 밖이다.
    const sentences = splitScript('And we are done here. Cut the paper. See you.');
    const lanes = placement(sentences, ['outcome', 'instruction', 'closing']);
    const conclusion = lanes.find((lane) => lane.category === 'conclusion');
    expect(conclusion).toBeDefined();
    expect(conclusion?.positions[0]).toBeLessThan(300);
    expect(conclusion?.outside).toHaveLength(1);
    const method = lanes.find((lane) => lane.category === 'method');
    // 지시는 가운데(q5=111, q95=854) 안에 있다.
    expect(method?.outside).toHaveLength(0);
  });

  it('문장이 없으면 빈 배열이다', () => {
    expect(placement([], [])).toEqual([]);
  });
});

describe('지은이 점검', () => {
  it('없는 유형은 missing, 넘치는 유형은 above로 나온다', () => {
    // 잡담(sideNote)이 대부분인 대본. 경고는 없다.
    const sentences = splitScript(
      'My cat did the funniest thing yesterday and I have to tell you all about it in detail. Cut here.',
    );
    const checks = advise(composition(sentences, ['sideNote', 'instruction']));
    const byId = new Map(checks.map((check) => [check.id, check]));
    expect(byId.get('warning')?.verdict).toBe('missing');
    expect(byId.get('sideNote')?.verdict).toBe('above');
    expect(byId.get('subgoal')?.verdict).toBe('missing');
  });
});

describe('유형 추천 (이 페이지의 덧붙임)', () => {
  it('구독 단서는 인사 단서보다 먼저 이긴다', () => {
    expect(suggestType("Hi everyone, don't forget to subscribe!", 10)?.type).toBe('selfPromotion');
    expect(suggestType('구독과 좋아요 눌러 주세요.', 900)?.type).toBe('selfPromotion');
  });

  it('세 언어의 단서가 통한다', () => {
    expect(suggestType('Be careful not to cut yourself.', 500)?.type).toBe('warning');
    expect(suggestType('왜냐하면 그래야 반죽이 부드러워지기 때문입니다.', 500)?.type).toBe('justification');
    expect(suggestType('材料は小麦粉と卵です。', 100)?.type).toBe('tool');
  });

  it('인사는 앞머리에서만, 맺음 인사는 끝머리에서만 추천한다', () => {
    expect(suggestType('안녕하세요 여러분.', 10)?.type).toBe('opening');
    expect(suggestType('안녕하세요 여러분.', 500)).toBeNull();
    expect(suggestType('Thanks for watching everyone.', 950)?.type).toBe('closing');
    expect(suggestType('Thanks for watching everyone.', 100)).toBeNull();
  });

  it('단서가 없으면 추천하지 않는다', () => {
    expect(suggestType('The mixture rests for ten minutes.', 500)).toBeNull();
  });

  it('무엇에 걸렸는지(cue)를 돌려준다', () => {
    expect(suggestType('오늘은 팬케이크를 만들어 보겠습니다.', 20)?.cue).toBe('오늘은');
  });
});
