/**
 * Chroma Lab 모듈의 공개 진입점.
 *
 * 트리 등록기는 여기서 노드 정의와 화면 컴포넌트만 가져간다.
 * 내부 파일(config/state/naming/ui)은 밖에서 직접 import하지 않는다.
 */

export { chromaLabNode } from './node';
export { ChromaLab } from './ui/ChromaLab';
export { buildNamingPrompt, localPaletteName, sanitizeName } from './naming';
export { NAMING } from './config';
