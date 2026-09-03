/**
 * 견본 그래프와 최단경로 거리.
 *
 * 논문은 627개의 합성·실제 그래프를 썼다(3장). 그 자료집은 이 페이지가 가질 수
 * 없으므로 세 가지 짜임(뭉치·격자·나무)을 결정론적으로 짓는다. 짜임을 셋 둔
 * 이유는 미적 지표와 충실도의 긴장이 짜임마다 다르게 나타나기 때문이다.
 *
 * 충실도는 그래프 최단경로 거리를 "높은 차원의 참값"으로 삼아 잰다. 논문은
 * Isomap으로 고른 내재 차원의 KK 배치를 참값으로 썼지만, 그 배치 역시 최단경로
 * 거리를 보존하려는 것이므로 여기서는 거리 자체를 참값으로 둔다. 화면에 밝힌다.
 */

import { createRandom } from '../random/seeded';
import { SAMPLES, type SampleId } from './config';

export interface Graph {
  nodeCount: number;
  /** [a, b] 쌍. a < b이고 중복이 없다. */
  edges: [number, number][];
}

/** 이웃 목록. 최단경로를 여러 번 재므로 한 번 만들어 둔다. */
export function adjacency(graph: Graph): number[][] {
  const list: number[][] = Array.from({ length: graph.nodeCount }, () => []);
  for (const [a, b] of graph.edges) {
    list[a].push(b);
    list[b].push(a);
  }
  return list;
}

/** 모든 쌍의 최단경로 거리(BFS). 이어지지 않은 쌍은 지름 + 1로 둔다. */
export function shortestPaths(graph: Graph): number[][] {
  const neighbors = adjacency(graph);
  const n = graph.nodeCount;
  const distances: number[][] = [];
  let longest = 1;
  for (let start = 0; start < n; start += 1) {
    const row = new Array(n).fill(-1);
    row[start] = 0;
    const queue = [start];
    for (let head = 0; head < queue.length; head += 1) {
      const node = queue[head];
      for (const next of neighbors[node]) {
        if (row[next] < 0) {
          row[next] = row[node] + 1;
          longest = Math.max(longest, row[next]);
          queue.push(next);
        }
      }
    }
    distances.push(row);
  }
  // 끊긴 쌍은 가장 먼 것보다 한 걸음 더 먼 것으로 친다. 무한대를 두면 셈이 무너진다.
  for (const row of distances) {
    for (let i = 0; i < n; i += 1) {
      if (row[i] < 0) row[i] = longest + 1;
    }
  }
  return distances;
}

function addEdge(edges: Set<string>, a: number, b: number): void {
  if (a === b) return;
  edges.add(a < b ? `${a},${b}` : `${b},${a}`);
}

function toGraph(nodeCount: number, edges: Set<string>): Graph {
  return {
    nodeCount,
    edges: [...edges]
      .map((key) => key.split(',').map(Number) as [number, number])
      .sort((p, q) => p[0] - q[0] || p[1] - q[1]),
  };
}

/**
 * 견본 그래프를 짓는다. 씨앗 난수기는 반복문 밖에서 한 번만 만든다.
 *   clusters - 세 뭉치가 안쪽으로 촘촘하고 뭉치끼리는 다리 하나씩
 *   grid     - 6x6 격자. 간선이 이미 축에 맞아 있어 직교성이 높다
 *   tree     - 뿌리에서 갈라지는 나무. 교차가 없고 지역 구조가 뚜렷하다
 */
export function buildGraph(id: SampleId): Graph {
  const sample = SAMPLES.find((entry) => entry.id === id) ?? SAMPLES[0];
  const random = createRandom(sample.seed);
  const edges = new Set<string>();

  if (id === 'grid') {
    const side = Math.round(Math.sqrt(sample.nodes));
    for (let row = 0; row < side; row += 1) {
      for (let col = 0; col < side; col += 1) {
        const node = row * side + col;
        if (col + 1 < side) addEdge(edges, node, node + 1);
        if (row + 1 < side) addEdge(edges, node, node + side);
      }
    }
    return toGraph(side * side, edges);
  }

  if (id === 'tree') {
    // 각 노드를 앞선 노드 하나에 붙인다. 가지가 두셋으로 갈라지게 부모를 고른다.
    for (let node = 1; node < sample.nodes; node += 1) {
      const parent = Math.floor(random() * Math.max(1, Math.floor(node / 2)));
      addEdge(edges, parent, node);
    }
    return toGraph(sample.nodes, edges);
  }

  // clusters: 세 뭉치. 뭉치 안은 촘촘하게, 뭉치 사이는 다리 하나씩.
  const groupSize = Math.floor(sample.nodes / 3);
  for (let group = 0; group < 3; group += 1) {
    const start = group * groupSize;
    const end = group === 2 ? sample.nodes : start + groupSize;
    for (let a = start; a < end; a += 1) {
      // 뭉치 안에서 이웃 둘과 잇고, 가끔 하나 더 잇는다.
      addEdge(edges, a, a + 1 < end ? a + 1 : start);
      if (random() < 0.55) {
        const b = start + Math.floor(random() * (end - start));
        addEdge(edges, a, b);
      }
    }
  }
  for (let group = 0; group < 3; group += 1) {
    const from = group * groupSize;
    const to = ((group + 1) % 3) * groupSize;
    addEdge(edges, from, to);
  }
  return toGraph(sample.nodes, edges);
}
