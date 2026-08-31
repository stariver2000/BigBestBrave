/** 셸 계층의 공개 진입점. app/ 라우트는 여기만 import한다. */

export { PageFrame } from './PageFrame';
export { currentLocale } from './locale-server';
export { shellDictionary, type ShellKey } from './dictionary';
export { LocaleProvider, useLocale, useTranslator } from './locale-context';
