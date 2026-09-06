import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from 'next';
import { Fraunces, JetBrains_Mono, Manrope } from 'next/font/google';
import Motion from '@/components/Motion';
import RegisterProvider from '@/components/RegisterProvider';
import StructuredData from '@/components/StructuredData';
import { OG_IMAGE, SITE_NAME, SITE_URL } from '@/lib/site';
import './globals.css';

/* Display: a soft serif, set at 500–600 so headlines carry weight. */
const fraunces = Fraunces({
  subsets: ['latin'],
  weight: 'variable',
  style: ['normal', 'italic'],
  axes: ['SOFT', 'opsz'],
  variable: '--font-fraunces',
  display: 'swap',
});

/* Body and buttons: round, wide, friendly at size. */
const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-manrope',
  display: 'swap',
});

/* Labels, badges, step numbers. */
const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
});

const TITLE = 'Free live webinar: the patterns running your life — Soul in Motion';
const DESCRIPTION =
  'Why do you keep ending up in the same argument, the same job, the same 3 a.m. spiral? A free 90-minute live session with Shradha Saha on the patterns underneath it — and the chakra and NLP work that interrupts them. Live on Zoom.';

export const metadata: Metadata = {
  /* Every relative URL below — the canonical, the OG image — resolves against
     this. Without it Next emits a relative og:image, which no scraper accepts. */
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: 'Shradha Saha' }],
  keywords: [
    'free webinar',
    'chakra healing',
    'NLP',
    'energy work',
    'breathwork',
    'limiting patterns',
    'Shradha Saha',
    'Soul in Motion',
    'live session',
    'conscious living',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
    url: '/',
    locale: 'en_IN',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${manrope.variable} ${mono.variable}`}>
      <body>
        <RegisterProvider>
          {children}
          <Motion />
        </RegisterProvider>
        <StructuredData />
        <Analytics />
      </body>
    </html>
  );
}
