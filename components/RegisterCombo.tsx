'use client';

import { useEffect, useId, useMemo, useRef, useState } from 'react';

type Props = {
  id: string;
  value: string;
  onChange: (v: string) => void;
  onBlur: () => void;
  options: readonly string[];
  /** extra terms an option should match on, keyed by the option itself */
  aliases?: Record<string, readonly string[]>;
  placeholder?: string;
  invalid?: boolean;
  maxLength?: number;
  autoComplete?: string;
  /** how many suggestions to show before the list scrolls */
  max?: number;
};

/**
 * A dropdown you can also type into. It is deliberately NOT a <select>: the
 * options are suggestions, and whatever is typed wins — a closed list would
 * turn "my town is not on it" into "I cannot register".
 *
 * Follows the ARIA combobox pattern: the input keeps focus throughout and
 * announces the active option through aria-activedescendant, so arrowing the
 * list never moves focus away from what you are typing into.
 */
export default function RegisterCombo({
  id, value, onChange, onBlur, options, aliases, placeholder, invalid, maxLength, autoComplete, max = 60,
}: Props) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  /* Suggestions are filtered against what you type — but only once you have
     typed something *since opening*. Picking "Pune" and reopening should show
     the whole list again, not the one option that matches "Pune". */
  const [query, setQuery] = useState<string | null>(null);

  const uid = useId();
  const listId = `${id}-list`;
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);

  const matches = useMemo(() => {
    const q = (query ?? '').trim().toLowerCase();
    if (!q) return options.slice(0, max);
    // a name that begins with what you typed outranks one that merely contains
    // it, and an alias hit ranks with the name it belongs to
    const starts: string[] = [];
    const contains: string[] = [];
    for (const o of options) {
      const terms = [o.toLowerCase(), ...(aliases?.[o] ?? [])];
      if (terms.some((t) => t.startsWith(q))) starts.push(o);
      else if (terms.some((t) => t.includes(q))) contains.push(o);
    }
    return [...starts, ...contains].slice(0, max);
  }, [options, aliases, query, max]);

  // close when the click lands anywhere else
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [open]);

  // keep the highlighted option in view while arrowing
  useEffect(() => {
    if (!open || active < 0) return;
    listRef.current?.children[active]?.scrollIntoView({ block: 'nearest' });
  }, [active, open]);

  /* Both frames that hold this form clip their overflow — the dialog scrolls,
     the inline card crops its watermark — so a list opened near the bottom
     would be cut off. Pull it into view instead of letting the frame win. */
  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => {
      listRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }, 180);
    return () => window.clearTimeout(t);
  }, [open]);

  function commit(v: string) {
    onChange(v);
    setQuery(null);
    setOpen(false);
    setActive(-1);
    inputRef.current?.focus();
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (!open) { setOpen(true); setActive(e.key === 'ArrowDown' ? 0 : matches.length - 1); return; }
      const step = e.key === 'ArrowDown' ? 1 : -1;
      setActive((i) => {
        const n = i + step;
        if (n < 0) return matches.length - 1;
        if (n >= matches.length) return 0;
        return n;
      });
      return;
    }
    if (e.key === 'Enter' && open && active >= 0 && matches[active]) {
      // only swallow Enter when it is actually picking something, so the form
      // still submits on Enter from a closed field
      e.preventDefault();
      commit(matches[active]);
      return;
    }
    if (e.key === 'Escape' && open) {
      e.preventDefault();
      setOpen(false);
      setActive(-1);
      return;
    }
    if (e.key === 'Tab') { setOpen(false); setActive(-1); }
  }

  return (
    <div className={`rf-combo${open ? ' is-open' : ''}`} ref={wrapRef}>
      <input
        id={id}
        ref={inputRef}
        className="rf-combo-input rf-glass"
        type="text"
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={open && active >= 0 ? `${uid}-opt-${active}` : undefined}
        autoComplete={autoComplete}
        maxLength={maxLength}
        placeholder={placeholder}
        value={value}
        aria-invalid={invalid}
        onChange={(e) => {
          onChange(e.target.value);
          setQuery(e.target.value);
          setOpen(true);
          setActive(-1);
        }}
        onFocus={() => setOpen(true)}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
      />

      <button
        type="button"
        className="rf-combo-caret"
        // the input is the control; this is a shortcut, not a second tab stop
        tabIndex={-1}
        aria-hidden="true"
        onClick={() => {
          setQuery(null);
          setOpen((o) => !o);
          inputRef.current?.focus();
        }}
      >
        <span />
      </button>

      {open && matches.length > 0 && (
        <ul className="rf-combo-list" id={listId} role="listbox" ref={listRef}>
          {matches.map((opt, i) => (
            <li
              key={opt}
              id={`${uid}-opt-${i}`}
              role="option"
              aria-selected={opt === value}
              className={`rf-combo-opt${i === active ? ' is-active' : ''}${opt === value ? ' is-chosen' : ''}`}
              // mousedown, not click: blur would close the list first
              onMouseDown={(e) => { e.preventDefault(); commit(opt); }}
              onMouseEnter={() => setActive(i)}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
