import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';
import './globals.css';

const body = Space_Grotesk({ variable: '--font-body', subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://theedsons.com'),
  title: 'The Edsons',
  icons: { icon: '/favicon.svg' },
  description: 'The Edson family website. Nothing to see here yet, move along...',
  openGraph: {
    title: 'The Edsons',
    description: 'Nothing to see here yet move along...',
    url: '/',
    siteName: 'The Edsons',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'The Edsons' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Edsons',
    description: 'Nothing to see here yet move along...',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={body.variable}>{children}</body></html>;
}
