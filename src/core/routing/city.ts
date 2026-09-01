/**
 * 격자 도시와 최단 경로.
 *
 * 자리가 열여섯, 길이 스물넷이라 다익스트라 한 번이면 정확한 답이 나온다. 어림잡을 이유가 없다.
 * 그래서 '모든 것을 알았다면 얼마였을까'를 정확히 낼 수 있고, 후회는 언제나 0 이상이 된다.
 */

import { BASE_MINUTES, GRID } from './config';
import type { City, Edge, Node, Times } from './types';

export function buildCity(): City {
  const nodes: Node[] = [];
  for (let y = 0; y < GRID; y += 1) {
    for (let x = 0; x < GRID; x += 1) nodes.push({ id: y * GRID + x, x, y });
  }

  const edges: Edge[] = [];
  const adjacency: number[][] = nodes.map(() => []);
  const add = (from: number, to: number, arterial: boolean) => {
    const id = edges.length;
    edges.push({ id, from, to, base: arterial ? BASE_MINUTES.arterial : BASE_MINUTES.street, arterial });
    adjacency[from].push(id);
    adjacency[to].push(id);
  };

  for (let y = 0; y < GRID; y += 1) {
    for (let x = 0; x < GRID; x += 1) {
      const here = y * GRID + x;
      // 가장자리 두 줄을 큰길로 둔다. 앱이 잘 아는 길이다.
      if (x + 1 < GRID) add(here, here + 1, y === 0 || y === GRID - 1);
      if (y + 1 < GRID) add(here, here + GRID, x === 0 || x === GRID - 1);
    }
  }
  return { nodes, edges, adjacency };
}

/** 길 하나의 반대편 자리. */
export function otherEnd(city: City, edgeId: number, from: number): number {
  const edge = city.edges[edgeId];
  return edge.from === from ? edge.to : edge.from;
}

export interface Route {
  /** 지나는 길의 번호. */
  path: number[];
  /** 주어진 시간표로 잰 합. */
  minutes: number;
}

/**
 * 다익스트라. `times`가 각 길의 시간이다.
 * 어떤 시간표를 넣느냐에 따라 '앱이 고른 길'도 '사람이 고른 길'도 '사실 가장 빨랐던 길'도 나온다.
 */
export function shortest(city: City, times: Times, start: number, goal: number): Route {
  const size = city.nodes.length;
  const distance = new Array<number>(size).fill(Infinity);
  const cameFrom = new Array<number>(size).fill(-1);
  const viaEdge = new Array<number>(size).fill(-1);
  const settled = new Array<boolean>(size).fill(false);
  distance[start] = 0;

  for (let step = 0; step < size; step += 1) {
    let here = -1;
    let best = Infinity;
    for (let node = 0; node < size; node += 1) {
      if (!settled[node] && distance[node] < best) {
        best = distance[node];
        here = node;
      }
    }
    if (here === -1) break;
    settled[here] = true;
    if (here === goal) break;

    for (const edgeId of city.adjacency[here]) {
      const next = otherEnd(city, edgeId, here);
      const candidate = distance[here] + times[edgeId];
      if (candidate < distance[next]) {
        distance[next] = candidate;
        cameFrom[next] = here;
        viaEdge[next] = edgeId;
      }
    }
  }

  const path: number[] = [];
  let cursor = goal;
  while (cursor !== start && viaEdge[cursor] !== -1) {
    path.push(viaEdge[cursor]);
    cursor = cameFrom[cursor];
  }
  path.reverse();
  return { path, minutes: distance[goal] };
}

/** 실제 시간표로 이 길을 갔을 때 걸리는 시간. */
export function costOf(path: readonly number[], times: Times): number {
  return path.reduce((sum, edgeId) => sum + times[edgeId], 0);
}
