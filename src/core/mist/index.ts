/** 뿌린 소리 코어의 공개 진입점. */

export type { Heard, Listener, Particle } from './types';
export { ENVELOPE, HEARING, LIFETIME, LIQUIDS, MAX_PARTICLES, SPRAY, type Liquid } from './config';
export { add, spray, step } from './physics';
export { blending, envelopeAt, falloffAt, listen } from './listen';
