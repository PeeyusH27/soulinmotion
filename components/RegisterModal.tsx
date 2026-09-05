'use client';

import { useEffect, useRef } from 'react';
import RegisterForm from './RegisterForm';
import { RegisterGlow } from './RegisterPetals';
import { useRegister } from './RegisterProvider';
import { Cross } from './Icons';

/**
 * Native <dialog> rather than a hand-built overlay: showModal() gives the focus
 * trap, the Escape key, inertness of the page behind and top-layer stacking for
 * free — all of which are easy to get subtly wrong by hand.
 */
export default function RegisterModal() {
  const { open, closeRegister, source } = useRegister();
  const ref = useRef<HTMLDialogElement | null>(null);
  const closing = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (open && !el.open) {
      el.showModal();
      // the page behind must not scroll under the dialog on iOS
      document.body.style.overflow = 'hidden';
    } else if (!open && el.open) {
      closing.current = true;
      el.classList.add('is-closing');
      const done = () => {
        el.classList.remove('is-closing');
        el.close();
        closing.current = false;
      };
      // let the exit animation finish, but never hang if it never fires
      const t = window.setTimeout(done, 240);
      return () => window.clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    if (!open) document.body.style.overflow = '';
  }, [open]);

  useEffect(() => () => { document.body.style.overflow = ''; }, []);

  return (
    <dialog
      className="rf-dialog"
      ref={ref}
      aria-labelledby="rf-dialog-title"
      // Esc fires `cancel`; route it through the provider so state stays in sync
      onCancel={(e) => { e.preventDefault(); closeRegister(); }}
      onClose={closeRegister}
      // a click that lands on the dialog element itself is a click on the backdrop
      onMouseDown={(e) => { if (e.target === ref.current) closeRegister(); }}
    >
      <div className="rf-dialog-inner">
        {/* on the shell, not the form: the form is the scroller */}
        <RegisterGlow />
        <h2 className="rf-dialog-title" id="rf-dialog-title">Save your seat</h2>
        <button type="button" className="rf-close" onClick={closeRegister} aria-label="Close">
          <Cross />
        </button>
        {open && <RegisterForm variant="modal" source={source} />}
      </div>
    </dialog>
  );
}
