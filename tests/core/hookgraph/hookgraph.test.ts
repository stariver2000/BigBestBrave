import { describe, expect, it } from 'vitest';
import {
  DESIGN_SESSIONS,
  PROJECTS,
  STUDY,
  TABLE2,
  analyze,
  codesToIds,
  countWord,
  depthsOf,
  diagramEdges,
  idToCode,
  layoutDiagram,
  matchBracket,
  maxSampleSd,
  parseApp,
  scoreSelection,
  selectableItems,
  truthIds,
} from '@core/hookgraph';

/** 세 앤티패턴이 하나씩 심긴 최소 견본. 모듈의 견본과 별개로, 규칙 자체를 시험한다. */
const PLANTED = `
function App() {
  const [items, setItems] = useState([]);
  const [ghost, setGhost] = useState(0);
  const [mark, setMark] = useState('a');
  const [seen, setSeen] = useState(null);
  return (
    <div>
      <Mid items={items} mark={mark} />
      <Watch items={items} onSeen={setSeen} />
      <p>{items.length} {seen}</p>
    </div>
  );
}
function Mid({ items, mark }) {
  return <Leaf label={items.length} mark={mark} />;
}
function Leaf({ label, mark }) {
  return <em data-mark={mark}>{label}</em>;
}
function Watch({ items, onSeen }) {
  useEffect(() => {
    onSeen(items.length);
  }, [items]);
  return <span />;
}
`;

describe('추출기 (교본 문법)', () => {
  const app = parseApp(PLANTED);

  it('네 컴포넌트를 끝까지 읽는다', () => {
    expect(app.errors).toEqual([]);
    expect(app.components.map((component) => component.name)).toEqual(['App', 'Mid', 'Leaf', 'Watch']);
  });

  it('상태·프롭·이펙트·자식을 뽑는다', () => {
    const appDecl = app.components[0];
    expect(appDecl.states.map((state) => state.value)).toEqual(['items', 'ghost', 'mark', 'seen']);
    expect(appDecl.children.map((child) => child.component)).toEqual(['Mid', 'Watch']);
    const watch = app.components[3];
    expect(watch.props).toEqual(['items', 'onSeen']);
    expect(watch.effects).toHaveLength(1);
    expect(watch.effects[0].deps).toEqual(['items']);
    expect(watch.effects[0].calls).toContain('onSeen');
  });

  it('중괄호 짝 맞추기는 문자열 안의 괄호를 무시한다', () => {
    const text = `{ a: '}', b: { c: 1 } }`;
    expect(matchBracket(text, 0)).toBe(text.length - 1);
  });

  it('낱말 세기는 부분 일치를 세지 않는다', () => {
    expect(countWord('plants PlantList plants.length setPlants', 'plants')).toBe(2);
  });

  it('화살표 함수 컴포넌트도 읽는다', () => {
    const parsed = parseApp('const Tiny = ({ x }) => { return <b>{x}</b>; }');
    expect(parsed.components).toHaveLength(1);
    expect(parsed.components[0].props).toEqual(['x']);
  });
});

describe('검출기 (2.2절의 세 규칙)', () => {
  const graph = analyze(parseApp(PLANTED));

  it('안 쓰는 상태를 잡는다: ghost', () => {
    const unused = graph.findings.filter((finding) => finding.detail === 'unusedState');
    expect(unused).toHaveLength(1);
    expect(unused[0]).toMatchObject({ component: 'App', item: 'ghost', pattern: 'unreferenced' });
  });

  it('넘기기만 하는 프롭과 드릴링 경로를 잡는다: mark가 Mid를 그냥 지난다', () => {
    const forwarded = graph.findings.filter((finding) => finding.detail === 'forwardedOnly');
    expect(forwarded).toHaveLength(1);
    expect(forwarded[0]).toMatchObject({ component: 'Mid', item: 'mark' });
    const drilled = graph.findings.filter((finding) => finding.detail === 'drilled');
    expect(drilled).toHaveLength(1);
    expect(drilled[0].path).toEqual(['App', 'Mid', 'Leaf']);
    expect(drilled[0].origin).toEqual({ component: 'App', state: 'mark' });
  });

  it('부모 상태를 고치는 이펙트를 잡는다: Watch의 onSeen', () => {
    const setter = graph.findings.filter((finding) => finding.detail === 'setterInEffect');
    expect(setter).toHaveLength(1);
    expect(setter[0]).toMatchObject({
      component: 'Watch',
      item: 'onSeen',
      origin: { component: 'App', state: 'seen' },
    });
  });

  it('심긴 것 밖에는 아무것도 잡지 않는다 (사슬 하나가 forwardedOnly와 drilled 둘을 만든다)', () => {
    expect(graph.findings).toHaveLength(4);
  });

  it('속성 이름과 식별자가 같아도 드릴링을 놓치지 않는다', () => {
    // mark={mark} 표기에서 속성명 mark를 사용으로 세면 forwardedOnly가 사라진다.
    const usage = graph.usage.Mid.mark;
    expect(usage.uses).toBe(0);
    expect(usage.passes).toBe(1);
  });

  it('깨끗한 앱에서는 아무것도 잡지 않는다', () => {
    const clean = analyze(
      parseApp(`
function App() {
  const [n, setN] = useState(0);
  return <Kid n={n} bump={setN} />;
}
function Kid({ n, bump }) {
  return <button onClick={() => bump(n + 1)}>{n}</button>;
}
`),
    );
    expect(clean.findings).toEqual([]);
    expect(clean.roots).toEqual(['App']);
  });
});

describe('채점과 URL 코드', () => {
  const graph = analyze(parseApp(PLANTED));
  const items = selectableItems(graph);
  const truth = truthIds(graph.findings);

  it('정답 요소는 셋이다: ghost 상태, mark 사슬(상태+프롭), 이펙트', () => {
    expect(truth.sort()).toEqual(
      ['App.state.ghost', 'App.state.mark', 'Mid.prop.mark', 'Watch.effect.0'].sort(),
    );
  });

  it('전부 맞히면 1, 절반 고르면 재현율이 절반이다', () => {
    const perfect = scoreSelection(truth, truth);
    expect(perfect).toMatchObject({ precision: 1, recall: 1, f1: 1 });
    const half = scoreSelection(truth, truth.slice(0, 2));
    expect(half.precision).toBe(1);
    expect(half.recall).toBeCloseTo(2 / truth.length, 10);
  });

  it('아무것도 안 고르면 전부 0이고, 0으로 나누지 않는다', () => {
    expect(scoreSelection(truth, [])).toMatchObject({ precision: 0, recall: 0, f1: 0 });
    expect(scoreSelection([], ['x'])).toMatchObject({ recall: 0 });
  });

  it('요소 코드는 왕복된다', () => {
    const codes = items.map((item) => idToCode(items, item.id)).join('');
    expect(codesToIds(items, codes)).toEqual(items.map((item) => item.id));
    expect(codesToIds(items, 'ZZ!')).toEqual([]);
  });
});

describe('그림 배치', () => {
  const graph = analyze(parseApp(PLANTED));
  const layout = layoutDiagram(graph);

  it('깊이는 부모보다 한 열 오른쪽이다', () => {
    expect(depthsOf(graph)).toEqual({ App: 0, Mid: 1, Watch: 1, Leaf: 2 });
  });

  it('같은 열의 상자는 겹치지 않는다', () => {
    const mid = layout.boxes.Mid;
    const watch = layout.boxes.Watch;
    expect(mid.x).toBe(watch.x);
    const [upper, lower] = mid.y < watch.y ? [mid, watch] : [watch, mid];
    expect(upper.y + upper.height).toBeLessThanOrEqual(lower.y);
  });

  it('모든 요소가 제 상자 안에 슬롯을 갖는다', () => {
    for (const item of selectableItems(graph)) {
      const slot = layout.slots[item.id];
      const box = layout.boxes[item.component];
      expect(slot, item.id).toBeDefined();
      expect(slot.y).toBeGreaterThan(box.y);
      expect(slot.y).toBeLessThan(box.y + box.height);
    }
  });

  it('간선은 흐름 넷과 의존·호출을 그린다', () => {
    const edges = diagramEdges(graph);
    const flows = edges.filter((edge) => edge.kind === 'flow');
    // items→Mid, mark→Mid, items→Watch, onSeen(세터)→Watch, mark→Leaf, label(값 표현식이라 흐름 없음)
    expect(flows.map((edge) => `${edge.fromId}>${edge.toId}`).sort()).toEqual(
      [
        'App.state.items>Mid.prop.items',
        'App.state.items>Watch.prop.items',
        'App.state.mark>Mid.prop.mark',
        'App.state.seen>Watch.prop.onSeen',
        'Mid.prop.mark>Leaf.prop.mark',
      ].sort(),
    );
    expect(edges.some((edge) => edge.kind === 'set' && edge.toId === 'Watch.prop.onSeen')).toBe(true);
    expect(edges.some((edge) => edge.kind === 'dep' && edge.toId === 'Watch.effect.0')).toBe(true);
  });
});

describe('논문의 셈', () => {
  it('표 1: 두 프로젝트의 이펙트 앤티패턴 수는 2로 같고 드릴링도 11로 같다', () => {
    expect(PROJECTS[0].antiPatterns.effectParent).toBe(PROJECTS[1].antiPatterns.effectParent);
    expect(PROJECTS[0].antiPatterns.drilling).toBe(PROJECTS[1].antiPatterns.drilling);
  });

  it('표 2: 세 앤티패턴 모두 HookLens의 F1이 VS Code보다 높다', () => {
    for (const key of ['unreferenced', 'drilling', 'effectParent'] as const) {
      expect(TABLE2[key].hooklens.f1).toBeGreaterThan(TABLE2[key].vscode.f1);
      expect(TABLE2[key].hooklens.precision).toBeGreaterThan(TABLE2[key].vscode.precision);
      expect(TABLE2[key].hooklens.recall).toBeGreaterThan(TABLE2[key].vscode.recall);
    }
  });

  it('참가자 셈이 맞물린다: 8+4 = 6+6 = 12', () => {
    expect(STUDY.males + STUDY.females).toBe(STUDY.participants);
    expect(STUDY.noviceCount + STUDY.intermediateCount).toBe(STUDY.participants);
  });

  it('붙든 오기: 나이 표기 21-30 [25±9]의 SD는 수학적 상한 4.70을 넘는다', () => {
    const bound = maxSampleSd(STUDY.ageMin, STUDY.ageMax, STUDY.participants);
    expect(bound).toBeCloseTo(4.7, 1);
    expect(STUDY.printedAgeSd).toBeGreaterThan(bound);
  });

  it('붙든 오기: 나이 표기 22-31 [27±5]의 SD도 상한 4.81을 넘는다', () => {
    const session = DESIGN_SESSIONS.feedback;
    const bound = maxSampleSd(session.ageMin, session.ageMax, session.n);
    expect(bound).toBeCloseTo(4.81, 2);
    expect(session.printedAgeSd).toBeGreaterThan(bound);
  });

  it('예비 면접의 나이 셋은 표기 범위를 벗어나지 않는다', () => {
    for (const age of DESIGN_SESSIONS.preliminary.ages) {
      expect(age).toBeGreaterThanOrEqual(28);
      expect(age).toBeLessThanOrEqual(34);
    }
  });
});
