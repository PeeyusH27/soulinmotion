/**
 * Every "register" button on the page points here. Set the Google Form's
 * share link as NEXT_PUBLIC_REGISTER_URL. When it is unset the buttons fall
 * back to scrolling to the register section, which explains what is missing.
 */
export const REGISTER_URL = process.env.NEXT_PUBLIC_REGISTER_URL?.trim() || '';

export const HAS_FORM = REGISTER_URL.length > 0;

/** the same form, but in the embeddable layout Google offers */
export const EMBED_URL = HAS_FORM
  ? REGISTER_URL.replace(/\/viewform.*$/, '') + '/viewform?embedded=true'
  : '';

export const REGISTER_HREF = HAS_FORM ? REGISTER_URL : '#register';
