/**
 * React 함수 컴포넌트의 어림 추출기.
 *
 * 논문의 HookLens는 Espree와 TypeScript 컴파일러 API로 완전한 AST를 만들어
 * 규칙을 돌렸다(6.1절). 여기서는 브라우저 안에서 의존성 없이 돌아가는 가벼운
 * 문자열 추출기를 쓴다 - 이 페이지가 스스로 더한 부분이며, 아래 "교본 문법"
 * 만 알아듣는다는 것을 화면에도 밝힌다.
 *
 * 알아듣는 문법:
 *   - 컴포넌트: `function 이름(...) { ... }` 또는 `const 이름 = (...) => { ... }`
 *     (이름은 대문자로 시작해야 컴포넌트로 본다)
 *   - Props: 매개변수의 구조 분해 `{ a, b }` 또는 `props` 식별자(props.x 접근)
 *   - State: `const [값, 세터] = useState(...)`
 *   - Effect: `useEffect(() => { ... }, [의존성])` (의존성 배열은 없어도 된다)
 *   - 자식: JSX의 `<자식 attr={식별자} ... />` (대문자 시작 태그만)
 *
 * 문자열 리터럴 속 중괄호나 주석까지 완전히 다루지는 않는다. 지원 범위를
 * 넘는 코드는 조용히 틀리는 대신 최대한 그럴듯하게 읽되, 결과 화면이 곧
 * 검산지가 되도록 컴포넌트마다 원문 조각을 함께 돌려준다.
 */

export interface StateDecl {
  value: string;
  setter: string | null;
}

export interface EffectDecl {
  /** 컴포넌트 안에서 몇 번째 useEffect인지 (0부터). */
  index: number;
  /** 의존성 배열의 식별자들. 배열 자체가 없으면 null. */
  deps: string[] | null;
  /** 콜백 본문 원문. */
  body: string;
  /** 콜백 안에서 이름(…) 꼴로 호출된 식별자들. */
  calls: string[];
}

/** JSX에서 자식에게 넘긴 속성 하나. value는 중괄호 안 원문이다. */
export interface ChildPass {
  attr: string;
  value: string;
  /** value가 단일 식별자면 그 이름, 아니면 null. */
  identifier: string | null;
}

export interface ChildUse {
  component: string;
  passes: ChildPass[];
}

export interface ComponentDecl {
  name: string;
  props: string[];
  /** 매개변수가 `props` 식별자였는지. 그러면 props.x 접근을 prop으로 센다. */
  usesPropsObject: boolean;
  states: StateDecl[];
  effects: EffectDecl[];
  children: ChildUse[];
  /** 함수 본문 원문 (여는 중괄호 안쪽). */
  body: string;
  /** 원문에서 선언 머리의 시작 오프셋과 본문 끝 오프셋. 코드 뷰어 하이라이트용. */
  start: number;
  end: number;
}

export interface ParsedApp {
  components: ComponentDecl[];
  /** 읽다가 포기한 곳의 설명. 비어 있으면 끝까지 읽은 것이다. */
  errors: string[];
}

/** openIndex의 여는 괄호와 짝이 되는 닫는 괄호의 오프셋. 없으면 -1. */
export function matchBracket(text: string, openIndex: number): number {
  const open = text[openIndex];
  const close = open === '{' ? '}' : open === '(' ? ')' : open === '[' ? ']' : null;
  if (close === null) return -1;
  let depth = 0;
  let inString: string | null = null;
  for (let i = openIndex; i < text.length; i += 1) {
    const char = text[i];
    if (inString !== null) {
      if (char === '\\') i += 1;
      else if (char === inString) inString = null;
      continue;
    }
    if (char === "'" || char === '"' || char === '`') inString = char;
    else if (char === open) depth += 1;
    else if (char === close) {
      depth -= 1;
      if (depth === 0) return i;
    }
  }
  return -1;
}

/** 온전한 낱말로서의 등장 횟수. 식별자 경계는 \w 밖이다. */
export function countWord(text: string, word: string): number {
  if (word.length === 0) return 0;
  const pattern = new RegExp(`\\b${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'g');
  return (text.match(pattern) ?? []).length;
}

function parseParams(raw: string): { props: string[]; usesPropsObject: boolean } {
  const trimmed = raw.trim();
  if (trimmed === '') return { props: [], usesPropsObject: false };
  if (/^\{/.test(trimmed)) {
    const inner = trimmed.replace(/^\{|\}$/g, '');
    const props = inner
      .split(',')
      .map((piece) => piece.split(/[=:]/)[0].trim())
      .filter((name) => /^\w+$/.test(name));
    return { props, usesPropsObject: false };
  }
  if (/^\w+$/.test(trimmed)) return { props: [], usesPropsObject: true };
  return { props: [], usesPropsObject: false };
}

function parseStates(body: string): StateDecl[] {
  const states: StateDecl[] = [];
  const pattern = /const\s*\[\s*(\w+)\s*,?\s*(\w*)\s*\]\s*=\s*useState/g;
  for (const match of body.matchAll(pattern)) {
    states.push({ value: match[1], setter: match[2] === '' ? null : match[2] });
  }
  return states;
}

const CALL_KEYWORDS = new Set([
  'if', 'for', 'while', 'switch', 'return', 'useEffect', 'useState', 'catch', 'function',
]);

function parseEffects(body: string, errors: string[], componentName: string): EffectDecl[] {
  const effects: EffectDecl[] = [];
  let cursor = 0;
  let index = 0;
  for (;;) {
    const at = body.indexOf('useEffect', cursor);
    if (at < 0) break;
    const openParen = body.indexOf('(', at);
    if (openParen < 0) break;
    const closeParen = matchBracket(body, openParen);
    if (closeParen < 0) {
      errors.push(`${componentName}: useEffect의 괄호가 닫히지 않는다`);
      break;
    }
    const call = body.slice(openParen + 1, closeParen);
    // 콜백 본문: 첫 => 뒤의 { ... } (표현식 본문이면 => 뒤 전체를 콜백으로 본다)
    const arrow = call.indexOf('=>');
    let effectBody = '';
    let afterBody = 0;
    if (arrow >= 0) {
      const braceAt = call.indexOf('{', arrow);
      if (braceAt >= 0) {
        const braceEnd = matchBracket(call, braceAt);
        if (braceEnd > braceAt) {
          effectBody = call.slice(braceAt + 1, braceEnd);
          afterBody = braceEnd + 1;
        }
      }
      if (effectBody === '') {
        effectBody = call.slice(arrow + 2);
        afterBody = call.length;
      }
    }
    // 의존성 배열: 콜백 뒤에 오는 최상위 [ ... ]
    let deps: string[] | null = null;
    const depsAt = call.indexOf('[', afterBody);
    if (depsAt >= 0) {
      const depsEnd = matchBracket(call, depsAt);
      if (depsEnd > depsAt) {
        deps = call
          .slice(depsAt + 1, depsEnd)
          .split(',')
          .map((piece) => piece.trim())
          .filter((name) => /^\w+$/.test(name));
      }
    }
    const calls = [...effectBody.matchAll(/(\w+)\s*\(/g)]
      .map((match) => match[1])
      .filter((name) => !CALL_KEYWORDS.has(name));
    effects.push({ index, deps, body: effectBody, calls });
    index += 1;
    cursor = closeParen + 1;
  }
  return effects;
}

function parseChildren(body: string): ChildUse[] {
  const children: ChildUse[] = [];
  const tagPattern = /<([A-Z]\w*)/g;
  for (const tag of body.matchAll(tagPattern)) {
    const name = tag[1];
    const attrStart = (tag.index ?? 0) + tag[0].length;
    // 태그 끝(>)까지가 속성 자리다. 중괄호 안의 >는 건너뛴다.
    let i = attrStart;
    let end = body.length;
    while (i < body.length) {
      const char = body[i];
      if (char === '{') {
        const close = matchBracket(body, i);
        if (close < 0) break;
        i = close + 1;
        continue;
      }
      if (char === '>') {
        end = i;
        break;
      }
      i += 1;
    }
    const attrText = body.slice(attrStart, end);
    const passes: ChildPass[] = [];
    const attrPattern = /(\w+)\s*=\s*\{/g;
    for (const attr of attrText.matchAll(attrPattern)) {
      const braceAt = (attr.index ?? 0) + attr[0].length - 1;
      const braceEnd = matchBracket(attrText, braceAt);
      if (braceEnd < 0) continue;
      const value = attrText.slice(braceAt + 1, braceEnd).trim();
      passes.push({
        attr: attr[1],
        value,
        identifier: /^\w+$/.test(value) ? value : null,
      });
    }
    children.push({ component: name, passes });
  }
  return children;
}

/** 원문 전체를 읽어 컴포넌트들을 뽑는다. */
export function parseApp(source: string): ParsedApp {
  const components: ComponentDecl[] = [];
  const errors: string[] = [];
  const headPattern =
    /(?:function\s+([A-Z]\w*)\s*\(([^)]*)\)\s*\{)|(?:const\s+([A-Z]\w*)\s*=\s*\(([^)]*)\)\s*=>\s*\{)/g;
  for (const head of source.matchAll(headPattern)) {
    const name = head[1] ?? head[3];
    const rawParams = head[2] ?? head[4] ?? '';
    const braceAt = (head.index ?? 0) + head[0].length - 1;
    const braceEnd = matchBracket(source, braceAt);
    if (braceEnd < 0) {
      errors.push(`${name}: 함수 본문의 중괄호가 닫히지 않는다`);
      continue;
    }
    const body = source.slice(braceAt + 1, braceEnd);
    const { props, usesPropsObject } = parseParams(rawParams);
    // props 객체 접근(props.x)을 prop 이름으로 승격한다.
    const propSet = new Set(props);
    if (usesPropsObject) {
      for (const access of body.matchAll(/\bprops\.(\w+)/g)) propSet.add(access[1]);
    }
    components.push({
      name,
      props: [...propSet],
      usesPropsObject,
      states: parseStates(body),
      effects: parseEffects(body, errors, name),
      children: parseChildren(body),
      body,
      start: head.index ?? 0,
      end: braceEnd + 1,
    });
  }
  return { components, errors };
}
