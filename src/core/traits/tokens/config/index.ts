/**
 * 토큰 매핑표의 공개 진입점.
 *
 * 표가 다루는 대상별로 파일을 나눠 두고 여기서 한 번에 내보낸다.
 * 새 표를 추가할 때는 파일을 하나 만들고 이 파일에 한 줄 더한다.
 */

export * from './color';
export * from './layout';
export * from './text';
export * from './motion';
export * from './fallbacks';
