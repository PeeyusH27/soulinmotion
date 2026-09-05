'use client';

import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import RegisterModal from './RegisterModal';
import { USE_MODAL } from '@/lib/register';

type Ctx = {
  open: boolean;
  /** `source` is stored with the row, so you can see which CTA earned the seat */
  openRegister: (source?: string) => void;
  closeRegister: () => void;
  source: string;
};

const RegisterCtx = createContext<Ctx | null>(null);

/**
 * Mounted once in the root layout. Every register button on the page calls
 * `openRegister()` through this rather than owning its own dialog, so there is
 * exactly one form instance and one place that knows whether it is showing.
 */
export default function RegisterProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [source, setSource] = useState('unknown');

  const openRegister = useCallback((from = 'unknown') => {
    setSource(from);
    setOpen(true);
  }, []);

  const closeRegister = useCallback(() => setOpen(false), []);

  const value = useMemo(
    () => ({ open, openRegister, closeRegister, source }),
    [open, openRegister, closeRegister, source],
  );

  return (
    <RegisterCtx.Provider value={value}>
      {children}
      {USE_MODAL && <RegisterModal />}
    </RegisterCtx.Provider>
  );
}

/**
 * Safe outside the provider: server components and the link-mode build never
 * mount it, and a no-op opener is better than a crash on a button whose href
 * is doing the real work anyway.
 */
export function useRegister(): Ctx {
  return (
    useContext(RegisterCtx) ?? {
      open: false,
      openRegister: () => {},
      closeRegister: () => {},
      source: 'unknown',
    }
  );
}
