import { describe, expect, it } from 'vitest';
import { analyze, parseApp, selectableItems, truthIds } from '@core/hookgraph';
import { SAMPLES } from '../../../src/modules/hooks/config';
import { readState, writeState, type HooksState } from '../../../src/modules/hooks/state';

/**
 * 견본 앱 둘의 약속을 붙든다.
 * '심긴 것'에는 세 앤티패턴이 설계한 자리에 정확히 하나씩 있고, '고친 것'은 깨끗하다.
 * 견본 코드를 고치다 심긴 자리가 어긋나면 여기가 먼저 깨진다.
 */
describe('심긴 견본', () => {
  const graph = analyze(parseApp(SAMPLES.planted));

  it('끝까지 읽히고 다섯 컴포넌트가 나온다', () => {
    expect(graph.components.map((component) => component.name)).toEqual([
      'App', 'Header', 'PlantList', 'PlantRow', 'SyncNote',
    ]);
    expect(graph.roots).toEqual(['App']);
  });

  it('안 쓰는 값 둘: App의 theme 상태와 SyncNote의 title 프롭', () => {
    const unused = graph.findings.filter(
      (finding) => finding.detail === 'unusedState' || finding.detail === 'unusedProp',
    );
    expect(unused.map((finding) => `${finding.component}.${finding.item}`).sort()).toEqual([
      'App.theme',
      'SyncNote.title',
    ]);
  });

  it('드릴링 하나: accent가 App → PlantList → PlantRow 사슬을 그냥 지난다', () => {
    const drilled = graph.findings.filter((finding) => finding.detail === 'drilled');
    expect(drilled).toHaveLength(1);
    expect(drilled[0].path).toEqual(['App', 'PlantList', 'PlantRow']);
    const forwarded = graph.findings.filter((finding) => finding.detail === 'forwardedOnly');
    expect(forwarded.map((finding) => `${finding.component}.${finding.item}`)).toEqual([
      'PlantList.accent',
    ]);
  });

  it('부모 상태를 고치는 이펙트 하나: SyncNote가 App의 lastSynced를 고친다', () => {
    const setter = graph.findings.filter((finding) => finding.detail === 'setterInEffect');
    expect(setter).toHaveLength(1);
    expect(setter[0].origin).toEqual({ component: 'App', state: 'lastSynced' });
  });

  it('정답 요소는 다섯이고, 그 밖에는 아무것도 잡히지 않는다', () => {
    expect(truthIds(graph.findings)).toHaveLength(5);
    expect(graph.findings).toHaveLength(5);
  });

  it('고를 수 있는 요소가 URL 한 글자 코드 안(36개)에 들어간다', () => {
    expect(selectableItems(graph).length).toBeLessThanOrEqual(36);
  });
});

describe('고친 견본', () => {
  it('아무것도 잡히지 않는다', () => {
    const graph = analyze(parseApp(SAMPLES.clean));
    expect(graph.findings).toEqual([]);
    expect(graph.components).toHaveLength(4);
  });
});

describe('URL 상태', () => {
  it('기본값이면 질의문자열이 빈다', () => {
    const state: HooksState = { sample: 'planted', text: '', picked: '', view: 'code', warn: false };
    expect(writeState(state)).toBe('');
  });

  it('쓴 것을 그대로 되읽는다', () => {
    const state: HooksState = { sample: 'clean', text: '', picked: '0a3', view: 'graph', warn: true };
    const query = writeState(state);
    expect(readState(new URLSearchParams(query))).toEqual(state);
  });

  it('엉뚱한 값은 기본값으로 돌린다', () => {
    const read = readState(new URLSearchParams('?sample=zzz&picked=A!&view=movie&warn=2'));
    expect(read).toEqual({ sample: 'planted', text: '', picked: '', view: 'code', warn: false });
  });
});
