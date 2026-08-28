import Link from 'next/link';

const NAV = [
  { label: 'The webinar', href: '#about' },
  { label: 'Chakras', href: '#chakras' },
  { label: 'Flow', href: '#flow' },
  { label: 'Host', href: '#host' },
  { label: 'Book a slot', href: '#booking' },
];

export default function Footer() {
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
          </nav>

          <div className="socials">
            <a href="#" aria-label="Instagram">
              <svg viewBox="0 0 24 24">
                <rect x="4" y="4" width="16" height="16" rx="5" />
                <circle cx="12" cy="12" r="3.6" />
                <circle cx="17" cy="7" r=".8" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a href="#" aria-label="YouTube">
              <svg viewBox="0 0 24 24">
                <rect x="3" y="6" width="18" height="12" rx="4" />
                <path d="M11 10l4 2-4 2z" />
              </svg>
            </a>
            <a href="#" aria-label="WhatsApp">
              <svg viewBox="0 0 24 24">
                <path d="M4 20l1.4-4A8 8 0 1 1 8 18.6z" />
                <path d="M9 10c.6 2.4 2.6 4.4 5 5" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <p className="footer-word">Soul in <span>Motion</span></p>

      <div className="wrap">
        <div className="footer-base">
          <span>© 2026 Soul in Motion. All rights reserved.</span>
          <span>Transform from within</span>
        </div>
      </div>
    </footer>
  );
}
