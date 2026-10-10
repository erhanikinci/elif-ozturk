import type { Metadata, Viewport } from 'next';
import { SiteShell } from '@/components/law-site';
import './globals.css';
export const metadata: Metadata = {
  metadataBase: new URL('https://elifozturk.av.tr'),
  title: { default: 'Av. Elif Öztürk | İstanbul Barosu', template: '%s | Av. Elif Öztürk' },
  description: 'Av. Elif Öztürk. İstanbul Barosu sicil 96132. Mesleki bilgiler, hukuki çalışma alanları ve Arnavutköy büro iletişim bilgileri.',
  applicationName: 'Av. Elif Öztürk',
  robots: { index: false, follow: false },
  openGraph: { type: 'website', locale: 'tr_TR', siteName: 'Av. Elif Öztürk', title: 'Av. Elif Öztürk', description: 'Mesleki bilgiler, çalışma alanları ve iletişim.' },
  icons: { icon: '/favicon.svg', shortcut: '/favicon.svg' },
};
export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#0c2530' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="tr"><head>
    <link rel="preload" href="/fonts/manrope-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
    <link rel="preload" href="/fonts/cormorant-garamond-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
  </head><body><SiteShell>{children}</SiteShell></body></html>;
}
