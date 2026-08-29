import type { Metadata } from 'next';
import { Fraunces, JetBrains_Mono, Manrope } from 'next/font/google';
import Motion from '@/components/Motion';
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

export const metadata: Metadata = {
  title: 'Soul in Motion — See clearly. Question deeply. Live freely.',
  description:
    'A live 90-minute webinar with Shradha Saha: a journey from patterns to awareness through the power of your mind and the wisdom of the chakras. Live on Zoom, limited seats only.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${manrope.variable} ${mono.variable}`}>
      <body>
        {children}
        <Motion />
      </body>
    </html>
  );
}
