/**
 * 개인정보 지우개 페이지 설정.
 *
 * 이 페이지의 기본값·한도·예시 텍스트는 여기에만 있다. UI 파일에는 숫자와 문장을 두지 않는다.
 */

import { DEFAULT_MASK_STYLE } from '../../core/redaction';
import type { MaskStyle } from '../../core/redaction';

export const DEFAULT_STYLE: MaskStyle = DEFAULT_MASK_STYLE;

/** 붙여넣기 상한. 브라우저에서 한 번에 훑기에 무리가 없는 크기로 잡았다. */
export const MAX_INPUT_LENGTH = 200_000;

/** 결과 파일로 내려받을 때 쓰는 이름. */
export const DOWNLOAD_FILENAME = 'redacted.txt';

/**
 * 예시 텍스트.
 *
 * 여기 담긴 값들은 전부 가짜이되 체크섬은 실제로 통과하도록 만들었다.
 * 검증을 통과하지 못하는 값을 예시로 쓰면 "아무것도 못 찾는" 첫인상을 주기 때문이다.
 *   - 카드번호: 카드사가 공개한 테스트 번호
 *   - 주민등록번호: 검증 자리를 계산해 맞춘 가상의 번호
 *   - 사업자등록번호: 형식 예시로 널리 쓰이는 번호
 */
export const SAMPLE_TEXT = {
  ko: `[상담 기록 #4412]
고객: 김민서 (mins.kim@example.co.kr, 010-2345-6789)
생년월일 확인용 주민등록번호: 880812-1234564
결제 카드: 4242 4242 4242 4242 (승인 완료)
사업자등록번호: 220-81-62517
접속 IP: 192.168.31.204
내부 메모: 배송지 좌표 37.566500, 126.977900 로 재확인 필요
연동 키: sk-abcd1234efgh5678ijkl 사용 중`,
  en: `[Support ticket #4412]
Customer: Minseo Kim (mins.kim@example.co.kr, +82-10-2345-6789)
National ID on file: 880812-1234564
Card on file: 4242 4242 4242 4242 (approved)
Business number: 220-81-62517
Client IP: 192.168.31.204
Note: confirm delivery point at 37.566500, 126.977900
Integration key in use: sk-abcd1234efgh5678ijkl`,
  ja: `[対応記録 #4412]
お客様: キム・ミンソ (mins.kim@example.co.kr, 010-2345-6789)
本人確認番号: 880812-1234564
決済カード: 4242 4242 4242 4242 (承認済み)
事業者番号: 220-81-62517
接続IP: 192.168.31.204
メモ: 配送地点 37.566500, 126.977900 の再確認が必要
連携キー: sk-abcd1234efgh5678ijkl を使用中`,
} as const;
