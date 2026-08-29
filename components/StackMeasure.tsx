'use client';

import { useEffect } from 'react';

/**
 * On phones the §3 heading is sticky and the cards stack beneath it, so the
 * cards need to know how tall the pinned heading actually is.
 */
export default function StackMeasure() {
  useEffect(() => {
    const head = document.querySelector<HTMLElement>('.stack-head');
    const stack = document.querySelector<HTMLElement>('.stack');
    if (!head || !stack) return;
    const measure = () => stack.style.setProperty('--stack-head', `${head.offsetHeight}px`);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(head);
    return () => ro.disconnect();
  }, []);
  return null;
}
