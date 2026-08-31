/**
 * 루트 레이아웃.
 *
 * 여기서는 문서 뼈대와 언어 태그만 정한다. 색·간격 같은 시각 토큰은 페이지 노드의 특성에서
 * 파생되므로 PageFrame이 담당한다(같은 도메인 안에서 페이지마다 외형이 달라야 하기 때문).
 */

import type { Metadata } from 'next';
import { LOCALE_TAGS } from '../src/core/i18n';
import { currentLocale } from '../src/shell';
import './globals.css';

export const metadata: Metadata = {
  title: 'BigBestBrave',
  description: 'One domain, a branching tree of pages, one shippable tool per page.',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await currentLocale();
  return (
    <html lang={LOCALE_TAGS[locale]}>
      <body>{children}</body>
    </html>
  );
}
