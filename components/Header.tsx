'use client';

import Link from 'next/link';
import { useState } from 'react';

const NAV = [
  { label: 'The webinar', href: '#about' },
  { label: 'Chakras', href: '#chakras' },
  { label: 'Flow', href: '#flow' },
  { label: 'Host', href: '#host' },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header" id="header">
      <div className="wrap header-inner">
        <Link className="brand" href="#home" aria-label="Soul in Motion home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/logo.png" alt="" aria-hidden="true" />
          <span>
            <span className="brand-name">Soul in Motion</span>
            <span className="brand-tag">Transform from within</span>
          </span>
        </Link>

        <nav className={`nav${open ? ' is-open' : ''}`} onClick={() => setOpen(false)}>
          {NAV.map((item) => (
            <Link key={item.href} href={item.href}>{item.label}</Link>
          ))}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link className="btn btn--sm header-cta" href="#booking">Reserve your spot</Link>
          <button
            className="nav-toggle"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span /><span />
          </button>
        </div>
      </div>
    </header>
  );
}
