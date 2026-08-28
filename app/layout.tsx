import type { Metadata } from 'next';
import { Fraunces, Inter, JetBrains_Mono } from 'next/font/google';
import Motion from '@/components/Motion';
import './globals.css';

/* Display: a soft modern serif, used light at large sizes. */
const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-fraunces',
  display: 'swap',
});

/* UI: neutral, tight. */
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

/* Micro-labels and indices. */
const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Soul in Motion — See clearly. Question deeply. Live freely.',
  description:
    'A live 90-minute webinar with Shradha Saha: a journey from patterns to awareness through the power of your mind and the wisdom of the chakras. Live on Zoom, limited seats only.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} ${mono.variable}`}>
      <body>
        {children}
        <Motion />
      </body>
    </html>
  );
}
