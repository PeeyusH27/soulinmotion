'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Badge from './Badge';
import ChakraRail from './ChakraRail';
import RegisterButton from './RegisterButton';
import { DATE_SHORT } from '@/lib/event';

const NAV = [
  { label: 'The session', href: '#about' },
  { label: 'What we cover', href: '#flow' },
  { label: 'Shradha', href: '#host' },
  { label: 'Questions', href: '#register' },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  /* on phones the menu is a full-screen sheet: lock the page behind it and
     let Escape close it */
  useEffect(() => {
    document.body.classList.toggle('nav-locked', open);
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
    <header className={`site-header${open ? ' menu-open' : ''}`} id="header">
      <div className="wrap header-inner">
        <Link className="brand" href="#home" aria-label="Soul in Motion home" onClick={() => setOpen(false)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/emblem.png" alt="" aria-hidden="true" />
          <span>
            <span className="brand-name">Soul in Motion</span>
            <span className="brand-tag">Transform from within</span>
          </span>
        </Link>

        <nav className="nav" aria-label="Site">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href}>{item.label}</Link>
          ))}
        </nav>

        <div className="header-actions">
          <RegisterButton size="sm">Save my seat</RegisterButton>
          <button
            className="nav-toggle"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="site-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <line className="l1" x1="4" y1="8.5" x2="20" y2="8.5" />
              <line className="l2" x1="4" y1="15.5" x2="20" y2="15.5" />
            </svg>
          </button>
        </div>
      </div>
      <ChakraRail />
    </header>

    {/* phones: the menu is a full-screen sheet, a sibling of the header so the
        header's blur can't clip it */}
    <nav className={`sheet${open ? ' is-open' : ''}`} id="site-nav" aria-label="Site" aria-hidden={!open}>
      <div className="sheet-links">
        {NAV.map((item) => (
          <Link key={item.href} href={item.href} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
            {item.label}
          </Link>
        ))}
      </div>
      <div className="sheet-foot">
        <small>Free · 90 minutes · {DATE_SHORT}</small>
        <div className="badges">
          <Badge kind="free">Free</Badge>
          <Badge kind="time">90 min</Badge>
          <Badge kind="zoom">Live on Zoom</Badge>
        </div>
        <RegisterButton size="lg">Save my free seat</RegisterButton>
      </div>
    </nav>
    </>
  );
}
