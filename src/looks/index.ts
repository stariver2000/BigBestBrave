/**
 * 룩 등록기.
 *
 * 페이지 노드가 `look`으로 룩 id를 선언하면 그 룩의 변수가 파생 토큰 위에 덮인다.
 * 새 룩을 추가하는 절차: src/looks/<이름>/ 디렉토리를 만들고 아래 표에 한 줄 더한다.
 * 이 계층이 있어야 페이지가 수백 개로 늘어도 "공식이 뽑아낸 밋밋한 화면"이 반복되지 않는다.
 */

import { atlasVariables } from './atlas';
import { benchVariables } from './bench';
import { blueprintVariables } from './blueprint';
import { cinemaVariables } from './cinema';
import { dossierVariables } from './dossier';
import { dyadVariables } from './dyad';
import { galleryVariables } from './gallery';
import { gaugeVariables } from './gauge';
import { hindsightVariables } from './hindsight';
import { gardenVariables } from './garden';
import { lensVariables } from './lens';
import { pagerVariables } from './pager';
import { proofVariables } from './proof';
import { pulseVariables } from './pulse';
import { scaleVariables } from './scale';
import { sereneVariables } from './serene';
import { signalVariables } from './signal';
import { vaultVariables } from './vault';

export { frameStyleSheet, frameVariables } from './resolve';

export const DEFAULT_LOOK = 'serene';

const LOOKS: Record<string, () => Record<string, string>> = {
  serene: sereneVariables,
  dossier: dossierVariables,
  cinema: cinemaVariables,
  blueprint: blueprintVariables,
  pager: pagerVariables,
  pulse: pulseVariables,
  garden: gardenVariables,
  gallery: galleryVariables,
  proof: proofVariables,
  vault: vaultVariables,
  bench: benchVariables,
  gauge: gaugeVariables,
  signal: signalVariables,
  scale: scaleVariables,
  hindsight: hindsightVariables,
  dyad: dyadVariables,
  atlas: atlasVariables,
  lens: lensVariables,
};

/** 룩 id에 해당하는 변수. 알 수 없는 id면 기본 룩으로 떨어진다. */
export function lookVariables(lookId: string | undefined): Record<string, string> {
  const build = LOOKS[lookId ?? DEFAULT_LOOK] ?? LOOKS[DEFAULT_LOOK];
  return build();
}

export function lookIdOf(lookId: string | undefined): string {
  return lookId && lookId in LOOKS ? lookId : DEFAULT_LOOK;
}
