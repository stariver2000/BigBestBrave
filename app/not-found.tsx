/** 아직 노드가 없는 경로. 트리는 필요할 때 자라므로 빈 자리는 오류가 아니라 상태다. */

import Link from 'next/link';
import { ROOT_PATH } from '../src/core/tree';
import { createTranslator } from '../src/core/i18n';
import { currentLocale, shellDictionary } from '../src/shell';

export default async function NotFound() {
  const locale = await currentLocale();
  const t = createTranslator(shellDictionary, locale);
  return (
    <main
      style={{
        minHeight: '100dvh',
        display: 'grid',
        placeContent: 'center',
        gap: '12px',
        padding: '24px',
        textAlign: 'center',
      }}
    >
      <h1>{t('not-found-title')}</h1>
      <p style={{ color: 'var(--bbb-fg-muted)' }}>{t('not-found-body')}</p>
      <Link href={ROOT_PATH}>{t('not-found-home')}</Link>
    </main>
  );
}
