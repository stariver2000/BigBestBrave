/**
 * 명세에서 코드 블록을 짓는다.
 *
 * 논문 3.2.2절: 코드 블록은 사람이 쓴 소스를 해석해 얻는 것이 아니라 지금의
 * 차트 상태에서 나온다. 그래서 블록과 시각 요소가 같은 상태 마디로 풀리고
 * 둘의 대응이 늘 맞는다. 여기서도 같은 규칙을 쓴다 - 블록마다 nodeId를 달고,
 * 화면은 그 id로 코드와 그림을 잇는다(DG1).
 *
 * 만들어지는 코드는 D3를 닮은 모양이지만 실행되지 않는다. 이 페이지는 코드를
 * 돌리지 않고, 명세에서 그림과 코드를 나란히 만들 뿐이다. 화면에 밝힌다.
 */

import { CATEGORIES } from './config';
import { effectiveMax, type NodeId, type Spec } from './spec';

export interface CodeBlock {
  nodeId: NodeId;
  lines: string[];
}

const quote = (text: string) => `'${text.replace(/'/g, "\\'")}'`;

export function generateCode(spec: Spec): CodeBlock[] {
  const blocks: CodeBlock[] = [];

  blocks.push({
    nodeId: 'title',
    lines: [
      `svg.append('text')`,
      `  .attr('class', 'title')`,
      `  .text(${quote(spec.title)});`,
    ],
  });

  blocks.push({
    nodeId: 'xAxis',
    lines: [
      `const x = d3.scaleBand()`,
      `  .domain([${CATEGORIES.map(quote).join(', ')}])`,
      `  .range([0, width])`,
      `  .padding(0.2);`,
    ],
  });

  const max = effectiveMax(spec);
  blocks.push({
    nodeId: 'yAxis',
    lines: [
      `const y = d3.scaleLinear()`,
      // 손으로 고정한 위끝인지 자료에서 나온 것인지 코드에도 드러낸다.
      `  .domain([0, ${max}])${spec.yMax === null ? '' : ' // 손으로 고정'}`,
      `  .range([height, 0]);`,
    ],
  });

  if (spec.mode === 'grouped') {
    blocks.push({
      nodeId: 'marks',
      lines: [
        `const xSeries = d3.scaleBand()`,
        `  .domain([${spec.order.map(quote).join(', ')}])`,
        `  .range([0, x.bandwidth()]);`,
        ``,
        `svg.selectAll('g.group')`,
        `  .data(data).join('g')`,
        `  .selectAll('rect')`,
        `  .data(d => series.map(s => ({ key: s, value: d[s] })))`,
        `  .join('rect')`,
        `    .attr('x', d => xSeries(d.key))`,
        `    .attr('y', d => y(d.value))`,
        `    .attr('height', d => height - y(d.value));`,
      ],
    });
  } else {
    blocks.push({
      nodeId: 'marks',
      lines: [
        `const stack = d3.stack()`,
        `  .keys([${spec.order.map(quote).join(', ')}]);`,
        ``,
        `svg.selectAll('g.layer')`,
        `  .data(stack(data)).join('g')`,
        `  .selectAll('rect')`,
        `  .data(d => d)`,
        `  .join('rect')`,
        `    .attr('y', d => y(d[1]))`,
        `    .attr('height', d => y(d[0]) - y(d[1]));`,
      ],
    });
  }

  if (spec.legend) {
    blocks.push({
      nodeId: 'legend',
      lines: [
        `svg.append('g').attr('class', 'legend')`,
        `  .selectAll('g')`,
        `  .data([${spec.order.map(quote).join(', ')}])`,
        `  .join('g');`,
      ],
    });
  }

  if (spec.interaction === 'clickDim') {
    blocks.push({
      nodeId: 'interaction',
      lines: [
        `svg.selectAll('rect').on('click', (event, d) => {`,
        `  svg.selectAll('rect')`,
        `    .attr('opacity', o => (o.key === d.key ? 1 : 0.25));`,
        `});`,
      ],
    });
  } else if (spec.interaction === 'hoverTooltip') {
    blocks.push({
      nodeId: 'interaction',
      lines: [
        `svg.selectAll('rect')`,
        `  .on('mouseenter', (event, d) => tooltip.show(d))`,
        `  .on('mouseleave', () => tooltip.hide());`,
      ],
    });
  }

  return blocks;
}

/** 코드 줄 수. "손짓 한 번이 코드 몇 줄을 바꾸나"를 셀 때 쓴다. */
export function lineCount(blocks: readonly CodeBlock[]): number {
  return blocks.reduce((sum, block) => sum + block.lines.length, 0);
}

/**
 * 두 코드 사이에서 바뀐 줄 수. 블록을 nodeId로 맞대어 세되, 한쪽에만 있는
 * 블록은 그 줄 수를 전부 센다(생기거나 사라진 것이다).
 */
export function changedLines(before: readonly CodeBlock[], after: readonly CodeBlock[]): number {
  const beforeMap = new Map(before.map((block) => [block.nodeId, block.lines]));
  const afterMap = new Map(after.map((block) => [block.nodeId, block.lines]));
  let changed = 0;
  for (const nodeId of new Set([...beforeMap.keys(), ...afterMap.keys()])) {
    const a = beforeMap.get(nodeId);
    const b = afterMap.get(nodeId);
    if (!a) {
      changed += b?.length ?? 0;
      continue;
    }
    if (!b) {
      changed += a.length;
      continue;
    }
    const longer = Math.max(a.length, b.length);
    for (let i = 0; i < longer; i += 1) {
      if (a[i] !== b[i]) changed += 1;
    }
  }
  return changed;
}
