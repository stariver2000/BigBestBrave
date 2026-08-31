/**
 * 페이지 트리의 노드 모델.
 *
 * 노드는 "무엇을 하는 페이지인가"에 대한 순수 데이터이며, 화면 컴포넌트를 알지 못한다.
 * 컴포넌트 연결은 상위 계층(modules)에서 id로 이뤄진다.
 */

import type { Locale } from '../i18n';
import type { TraitVector } from '../traits';

export interface PageNode {
  id: string;
  /**
   * 부모 아래에서의 경로 조각. 루트만 빈 문자열이며,
   * 전체 URL은 조상들의 slug를 이어 붙여 만든다.
   */
  slug: string;
  parentId: string | null;
  title: Record<Locale, string>;
  /** 목록과 커맨드 팔레트에 뜨는 한 줄 설명. */
  summary: Record<Locale, string>;
  /**
   * 이 페이지가 파는 단 하나의 기능.
   *
   * 화면에는 노출하지 않는다. 페이지를 추가할 때 "이 페이지가 파는 기능이 무엇인가"를
   * 반드시 한 줄로 적게 만드는 계약이며, tests/modules/page-contract.test.ts가 이 선언을 강제한다.
   */
  capability: Record<Locale, string>;
  traits: TraitVector;
  /**
   * 이 노드의 자식들이 어떤 기준으로 갈라지는지 나타내는 축 id.
   * 트리를 더 내려가며 주제를 쪼갤 때 "무엇으로 쪼갰는가"를 데이터로 남기기 위한 필드다.
   * 아직 자식이 없으면 비워 둔다.
   */
  splitAxis?: string;
  /**
   * 이 페이지가 입는 룩(look) id. 특성에서 계산되지 않는 미감(팔레트·형태·그림자)을 고른다.
   * 비워 두면 기본 룩이 적용된다. 룩 정의는 src/looks/ 에 있다.
   */
  look?: string;
  /** 커맨드 팔레트 검색어. 제목/설명에 없는 별칭을 넣는다. */
  keywords?: string[];
}
