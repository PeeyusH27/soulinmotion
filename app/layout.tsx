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
  title: 'Free live webinar: the patterns running your life — Soul in Motion',
  description:
    'Why do you keep ending up in the same argument, the same job, the same 3 a.m. spiral? A free 90-minute live session with Shradha Saha on the patterns underneath it — and the chakra and NLP work that interrupts them. Live on Zoom, recording sent to everyone who registers.',
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
