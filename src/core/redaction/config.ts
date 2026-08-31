/**
 * 탐지기 정의와 가림 설정.
 *
 * 패턴·우선순위·기본 켜짐 여부를 여기에만 둔다. 새 탐지기를 추가할 때 고치는 유일한 파일이며,
 * 로직(detectors.ts, redact.ts)에는 정규식이나 숫자를 두지 않는다.
 */

import type { DetectorId, MaskStyle } from './types';

export interface DetectorSpec {
  id: DetectorId;
  /** 전역 검색용 정규식. g 플래그는 스캔 단계에서 붙이므로 여기서는 넣지 않는다. */
  pattern: RegExp;
  /**
   * 정규식이 찾은 값이 진짜인지 다시 확인하는 검증기 이름.
   * 체크섬이 있는 항목만 지정하고, 나머지는 undefined로 둔다.
   */
  validator?: 'luhn' | 'rrn' | 'brn';
  /**
   * 겹칠 때의 우선순위. 큰 값이 이긴다.
   * 예: 주민등록번호는 전화번호보다 먼저 잡혀야 한다(둘 다 숫자열이라 겹친다).
   */
  priority: number;
  /** 처음 페이지를 열었을 때 켜져 있을지. 오탐이 잦은 항목은 꺼 둔다. */
  defaultOn: boolean;
  /** partial 방식에서 앞뒤로 남길 글자 수. */
  keep: { head: number; tail: number };
}

/**
 * 탐지기 목록.
 *
 * 순서는 의미가 없다(우선순위는 priority가 정한다). 패턴이 서로 겹치는 것을 전제로 쓰였고,
 * 겹침은 redact.ts가 우선순위와 길이로 정리한다.
 */
export const DETECTORS: readonly DetectorSpec[] = [
  {
    id: 'rrn',
    // 주민등록번호: 생년월일 6자리 + 구분자 + 7자리. 체크섬으로 최종 판정한다.
    pattern: /\b\d{6}[-\s]?[1-8]\d{6}\b/,
    validator: 'rrn',
    priority: 100,
    defaultOn: true,
    // 앞 6자리는 생년월일 그 자체다. '일부만' 방식에서도 남기지 않는다.
    // 가장 민감한 항목에서는 확인 편의보다 안전을 택한다.
    keep: { head: 0, tail: 0 },
  },
  {
    id: 'card',
    // 신용카드: 4자리씩 끊어 쓰거나 붙여 쓴 13~19자리. 룬 검증으로 확정한다.
    pattern: /\b(?:\d[ -]?){12,18}\d\b/,
    validator: 'luhn',
    priority: 95,
    defaultOn: true,
    keep: { head: 0, tail: 4 },
  },
  {
    id: 'brn',
    pattern: /\b\d{3}-?\d{2}-?\d{5}\b/,
    validator: 'brn',
    priority: 90,
    defaultOn: true,
    keep: { head: 3, tail: 0 },
  },
  {
    id: 'email',
    pattern: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/,
    priority: 85,
    defaultOn: true,
    keep: { head: 2, tail: 0 },
  },
  {
    id: 'secret',
    // API 키·토큰. 알려진 접두사와 "충분히 긴 무작위 문자열" 두 가지로 잡는다.
    pattern:
      /\b(?:sk-[A-Za-z0-9]{16,}|ghp_[A-Za-z0-9]{20,}|xox[baprs]-[A-Za-z0-9-]{10,}|AKIA[0-9A-Z]{16}|eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,})\b/,
    priority: 80,
    defaultOn: true,
    keep: { head: 4, tail: 0 },
  },
  {
    id: 'phone-kr',
    // 국내 휴대전화·지역번호. 국가번호(+82) 표기까지 받는다.
    pattern: /(?:\+?82[-\s]?)?0?1[0-9][-\s]?\d{3,4}[-\s]?\d{4}\b|\b0[2-6][0-9]?[-\s]?\d{3,4}[-\s]?\d{4}\b/,
    priority: 70,
    defaultOn: true,
    keep: { head: 3, tail: 0 },
  },
  {
    id: 'phone-intl',
    pattern: /\+\d{1,3}[-\s]?\d{2,4}[-\s]?\d{3,4}[-\s]?\d{3,4}\b/,
    priority: 65,
    defaultOn: true,
    keep: { head: 3, tail: 0 },
  },
  {
    id: 'passport-kr',
    pattern: /\b[MSRODmsrod]\d{8}\b/,
    priority: 60,
    defaultOn: true,
    keep: { head: 1, tail: 0 },
  },
  {
    id: 'ip',
    pattern: /\b(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\b/,
    priority: 50,
    defaultOn: true,
    keep: { head: 0, tail: 0 },
  },
  {
    id: 'coordinate',
    // 위경도 쌍. 사진·문서에 남은 위치를 잡는다.
    pattern: /\b-?(?:[0-8]?\d|90)\.\d{4,}\s*,\s*-?(?:1[0-7]\d|[0-9]?\d)\.\d{4,}\b/,
    priority: 45,
    defaultOn: true,
    keep: { head: 0, tail: 0 },
  },
  {
    id: 'account',
    // 계좌번호는 은행마다 자릿수가 달라 형태만으로는 오탐이 많다. 기본으로 꺼 둔다.
    pattern: /\b\d{2,6}-\d{2,6}-\d{2,8}\b/,
    priority: 20,
    defaultOn: false,
    keep: { head: 0, tail: 3 },
  },
];

/** 가림에 쓰는 기호와 최소·최대 길이. 원문 길이를 그대로 노출하지 않도록 상한을 둔다. */
export const MASK = {
  character: '●',
  minLength: 4,
  maxLength: 12,
} as const;

export const MASK_STYLES: readonly MaskStyle[] = ['full', 'partial', 'label', 'pseudonym'];

export const DEFAULT_MASK_STYLE: MaskStyle = 'partial';

/** 가명 번호의 시작값. [이메일#1]부터 매긴다. */
export const PSEUDONYM_START = 1;
