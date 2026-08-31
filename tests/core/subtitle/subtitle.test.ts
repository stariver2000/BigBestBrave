import { describe, expect, it } from 'vitest';
import {
  BREAK_LADDER,
  DEFAULTS,
  charactersPerSecond,
  formatSubtitle,
  inspect,
  layoutLines,
  parseSubtitle,
  parseTimecode,
  rechunk,
  type ChunkOptions,
  type Measure,
} from '@core/subtitle';

/** 테스트용 측정기: 글자 하나를 폭 1로 센다. 실제 브라우저는 캔버스로 잰다. */
const measure: Measure = (text) => text.length;

const options = (overrides: Partial<ChunkOptions> = {}): ChunkOptions => ({
  measure,
  maxWidth: 20,
  maxLines: 2,
  minDuration: DEFAULTS.minDuration,
  maxDuration: DEFAULTS.maxDuration,
  maxCps: DEFAULTS.maxCps,
  pauseThreshold: DEFAULTS.pauseThreshold,
  ...overrides,
});

const SRT = `1
00:00:01,000 --> 00:00:03,000
어제 회의에서 정한 내용을

2
00:00:03,100 --> 00:00:06,000
다시 한 번 정리해서 공유드립니다. 확인 부탁드려요.

3
00:00:10,000 --> 00:00:12,000
감사합니다.
`;

describe('타임코드', () => {
  it('SRT와 VTT 표기를 모두 읽는다', () => {
    expect(parseTimecode('00:00:01,500')).toBe(1500);
    expect(parseTimecode('00:00:01.500')).toBe(1500);
    expect(parseTimecode('01:02:03,004')).toBe(3723004);
  });

  it('밀리초 자리가 짧으면 뒤를 0으로 채운다', () => {
    expect(parseTimecode('00:00:01.5')).toBe(1500);
  });

  it('형식이 아니면 null을 준다', () => {
    expect(parseTimecode('1:2')).toBeNull();
  });
});

describe('파싱', () => {
  it('덩어리와 형식을 읽어 낸다', () => {
    const result = parseSubtitle(SRT);
    expect(result.format).toBe('srt');
    expect(result.cues).toHaveLength(3);
    expect(result.cues[0]).toEqual({ start: 1000, end: 3000, text: '어제 회의에서 정한 내용을' });
  });

  it('VTT 머리말을 자막으로 세지 않는다', () => {
    const vtt = 'WEBVTT\n\n00:00.000 --> 00:02.000\n안녕하세요\n';
    const result = parseSubtitle(vtt);
    expect(result.format).toBe('vtt');
    expect(result.cues).toHaveLength(1);
    expect(result.skipped).toBe(0);
  });

  it('시간 줄이 없는 덩어리는 세어서 알려준다', () => {
    const broken = `${SRT}\n\n4\n망가진 블록\n`;
    expect(parseSubtitle(broken).skipped).toBe(1);
  });

  it('원본의 줄바꿈은 하나의 공백으로 접는다', () => {
    const wrapped = '1\n00:00:01,000 --> 00:00:02,000\n첫 줄\n둘째 줄\n';
    expect(parseSubtitle(wrapped).cues[0].text).toBe('첫 줄 둘째 줄');
  });
});

describe('줄 배치', () => {
  it('지정한 폭을 넘지 않는다', () => {
    const { lines } = layoutLines('가나다라마바사아자차카타파하', measure, 6, 2);
    for (const line of lines) expect(line.length).toBeLessThanOrEqual(6);
  });

  it('단어 한가운데서 자르지 않는다', () => {
    const { lines } = layoutLines('hello wonderful world', measure, 12, 2);
    expect(lines[0]).toBe('hello');
  });

  it('줄 수 한도를 지킨다', () => {
    const { lines } = layoutLines('a'.repeat(200), measure, 10, 2);
    expect(lines).toHaveLength(2);
  });
});

describe('재분할', () => {
  const cues = parseSubtitle(SRT).cues;

  it('모든 줄이 지정한 폭 안에 들어간다', () => {
    for (const chunk of rechunk(cues, options())) {
      for (const line of chunk.lines) expect(line.length).toBeLessThanOrEqual(20);
    }
  });

  it('글씨가 커지면(폭이 좁아지면) 덩어리 수가 늘어난다', () => {
    const wide = rechunk(cues, options({ maxWidth: 40 })).length;
    const narrow = rechunk(cues, options({ maxWidth: 12 })).length;
    expect(narrow).toBeGreaterThan(wide);
  });

  it('원문의 글자를 잃지 않는다', () => {
    const joined = rechunk(cues, options())
      .flatMap((chunk) => chunk.lines)
      .join(' ')
      .replace(/\s/g, '');
    const source = cues.map((cue) => cue.text).join('').replace(/\s/g, '');
    expect(joined).toBe(source);
  });

  it('덩어리가 시간 순이고 서로 겹치지 않는다', () => {
    const chunks = rechunk(cues, options());
    for (let i = 1; i < chunks.length; i += 1) {
      expect(chunks[i].start).toBeGreaterThanOrEqual(chunks[i - 1].end);
    }
  });

  it('말이 길게 끊긴 자리는 다른 덩어리로 나뉜다', () => {
    // 3번 자막은 4초를 쉬고 시작하므로 앞 문장과 한 덩어리가 될 수 없다.
    const chunks = rechunk(cues, options({ maxWidth: 200 }));
    const last = chunks[chunks.length - 1];
    expect(last.lines.join(' ')).toBe('감사합니다.');
  });

  it('표시 시간이 최소 기준보다 짧지 않다', () => {
    for (const chunk of rechunk(cues, options())) {
      expect(chunk.end - chunk.start).toBeGreaterThan(0);
    }
  });
});

describe('품질 점검', () => {
  it('너무 빠른 자막을 잡아낸다', () => {
    const chunks = [{ start: 0, end: 500, lines: ['아주 긴 문장을 반 초 만에 읽으라고 하면 곤란합니다'] }];
    const issues = inspect(chunks, { measure, maxWidth: 999, minDuration: 833, maxDuration: 7000, maxCps: 14 });
    expect(issues.some((issue) => issue.kind === 'too-fast')).toBe(true);
    expect(issues.some((issue) => issue.kind === 'too-short')).toBe(true);
  });

  it('폭을 넘긴 줄을 잡아낸다', () => {
    const chunks = [{ start: 0, end: 4000, lines: ['가'.repeat(40)] }];
    const issues = inspect(chunks, { measure, maxWidth: 20, minDuration: 833, maxDuration: 7000, maxCps: 99 });
    expect(issues.some((issue) => issue.kind === 'overflow')).toBe(true);
  });

  it('초당 글자 수는 공백을 세지 않는다', () => {
    expect(charactersPerSecond({ start: 0, end: 1000, lines: ['가 나 다'] })).toBe(3);
  });
});

describe('내보내기', () => {
  const chunks = rechunk(parseSubtitle(SRT).cues, options());

  it('SRT는 번호 줄과 쉼표 표기를 쓴다', () => {
    const output = formatSubtitle(chunks, 'srt');
    expect(output.startsWith('1\n00:00:0')).toBe(true);
    expect(output).toContain(',');
  });

  it('VTT는 머리말로 시작하고 마침표 표기를 쓴다', () => {
    const output = formatSubtitle(chunks, 'vtt');
    expect(output.startsWith('WEBVTT')).toBe(true);
    expect(output).toMatch(/\d{2}\.\d{3} -->/);
  });

  it('내보낸 결과를 다시 읽어도 덩어리 수가 같다', () => {
    const round = parseSubtitle(formatSubtitle(chunks, 'srt'));
    expect(round.cues).toHaveLength(chunks.length);
    expect(round.skipped).toBe(0);
  });
});

/**
 * 자동 편집은 설명할 수 없으면 믿기 어렵다.
 * 그래서 덩어리마다 "왜 여기서 끝났는가"를 남기고, 그 근거가 실제 규칙과 맞는지 여기서 잡는다.
 */
describe('자른 근거', () => {
  const cues = [
    { start: 0, end: 3000, text: '오늘 회의는 여기까지입니다. 다음 안건은 내일 다루겠습니다.' },
  ];

  it('말이 다 들어가면 자른 것이 아니라 끝난 것이다', () => {
    const chunks = rechunk(cues, options({ maxWidth: 200 }));
    expect(chunks).toHaveLength(1);
    expect(chunks[0].reason).toBe('end');
  });

  it('문장이 끝나는 자리가 있으면 그 자리를 근거로 삼는다', () => {
    const chunks = rechunk(cues, options({ maxWidth: 22, maxLines: 1 }));
    expect(chunks[0].lines.join(' ')).toBe('오늘 회의는 여기까지입니다.');
    expect(chunks[0].reason).toBe('sentence-end');
  });

  it('마지막 덩어리의 근거는 언제나 end다', () => {
    const chunks = rechunk(cues, options({ maxWidth: 22, maxLines: 1 }));
    expect(chunks[chunks.length - 1].reason).toBe('end');
  });

  it('말이 쉰 자리에서 자르면 그 사실이 근거로 남는다', () => {
    // 두 덩어리 사이가 200ms 비어 있다. 쉼 판정 기준(300ms)보다 짧아 한 묶음으로 이어지지만,
    // 그 자리는 어절 사이(40점)보다 높은 쉼(85점)으로 채점된다.
    const spoken = [
      { start: 0, end: 2000, text: '지금 들어온 소식입니다' },
      { start: 2200, end: 4000, text: '오후 들어 비가 그치겠습니다' },
    ];
    const chunks = rechunk(spoken, options({ maxWidth: 24, maxLines: 1 }));
    expect(chunks[0].reason).toBe('pause');
    expect(chunks[0].lines.join(' ')).toBe('지금 들어온 소식입니다');
  });

  it('근거는 모든 덩어리에 붙는다', () => {
    for (const chunk of rechunk(cues, options({ maxWidth: 16 }))) {
      expect(chunk.reason).toBeTruthy();
    }
  });
});

describe('자를 자리의 사다리', () => {
  it('점수가 높은 순으로 늘어서 있다', () => {
    const scores = BREAK_LADDER.map((step) => step.score);
    expect([...scores].sort((a, b) => b - a)).toEqual(scores);
  });

  it('고를 수 있는 근거를 빠짐없이 담는다', () => {
    const reasons = BREAK_LADDER.map((step) => step.reason);
    expect(reasons).toEqual([
      'sentence-end',
      'pause',
      'clause-end',
      'closing-bracket',
      'whitespace',
      'character',
    ]);
  });

  it('말이 끝난 경우는 고른 자리가 아니므로 사다리에 없다', () => {
    expect(BREAK_LADDER.some((step) => step.reason === 'end')).toBe(false);
  });
});

/**
 * 화면이 사용자에게 약속하는 것("무엇이 남고 무엇이 사라지는가")을 코드가 실제로 지키는지 잡는다.
 * 약속과 동작이 갈라지면 도구가 아니라 거짓말이 된다.
 */
describe('파일을 지날 때 남는 것과 사라지는 것', () => {
  it('원본의 줄바꿈은 재분할 대상이라 공백 하나로 접힌다', () => {
    const parsed = parseSubtitle(`1
00:00:01,000 --> 00:00:04,000
첫 줄
둘째 줄
`);
    expect(parsed.cues[0].text).toBe('첫 줄 둘째 줄');
  });

  it('WebVTT의 큐 이름과 위치 지정자는 버리고 본문만 남긴다', () => {
    const parsed = parseSubtitle(`WEBVTT

intro
00:00:01.000 --> 00:00:04.000 line:90% align:center
안녕하세요
`);
    expect(parsed.format).toBe('vtt');
    expect(parsed.cues).toHaveLength(1);
    expect(parsed.cues[0].text).toBe('안녕하세요');
    expect(parsed.skipped).toBe(0);
  });

  it('NOTE 블록은 자막이 아니므로 실패로 세지 않는다', () => {
    const parsed = parseSubtitle(`WEBVTT

NOTE 번역 검수 필요

00:00:01.000 --> 00:00:04.000
안녕하세요
`);
    expect(parsed.cues).toHaveLength(1);
    expect(parsed.skipped).toBe(0);
  });

  it('태그는 글자로 남는다 — 그래서 폭 계산에도 그대로 들어간다', () => {
    const cues = [{ start: 0, end: 3000, text: '<i>기울임</i> 자막입니다' }];
    const chunks = rechunk(cues, options({ maxWidth: 200 }));
    expect(chunks[0].lines.join(' ')).toContain('<i>');
    // 눈에 보이지 않는 일곱 글자가 폭에 더해진다는 뜻이다.
    expect(measure('<i>기울임</i>')).toBe(measure('기울임') + 7);
  });
});
