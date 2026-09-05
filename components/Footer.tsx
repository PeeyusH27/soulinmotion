'use client';

import Link from 'next/link';
import { HAS_FORM, REGISTER_HREF, USE_MODAL } from '@/lib/register';
import { useRegister } from './RegisterProvider';

const NAV = [
  { label: 'The webinar', href: '#about' },
  { label: 'The flow', href: '#flow' },
  { label: 'Your host', href: '#host' },
  { label: 'FAQ', href: '#register' },
];

export default function Footer() {
  const { openRegister } = useRegister();

  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-top">
          <Link className="footer-brand" href="#home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/emblem.png" alt="" aria-hidden="true" />
            <span>
              <span className="brand-name">Soul in Motion</span>
              <span className="brand-tag">Transform from within</span>
            </span>
          </Link>

          <nav className="footer-nav">
            {NAV.map((item) => (
              <Link key={item.href} href={item.href}>{item.label}</Link>
            ))}
            {USE_MODAL ? (
              <button className="is-cta" type="button" onClick={() => openRegister('footer')}>
                Save my seat →
              </button>
            ) : (
              <a
                className="is-cta"
                href={REGISTER_HREF}
                target={HAS_FORM ? '_blank' : undefined}
                rel={HAS_FORM ? 'noopener noreferrer' : undefined}
              >
                Save my seat →
              </a>
            )}
          </nav>
        </div>

        <p className="footer-privacy">
          We’ll only email you about this session. Unsubscribe any time.
        </p>

        <div className="footer-base">
          <span>© 2026 Soul in Motion. All rights reserved.</span>
          <span>Transform from within</span>
        </div>
      </div>
    </footer>
  );
}
