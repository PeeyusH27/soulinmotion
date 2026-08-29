/**
 * Every "register" button on the page points here. Set the Google Form's
 * share link as NEXT_PUBLIC_REGISTER_URL. When it is unset the buttons fall
 * back to scrolling to the register section, which explains what is missing.
 */
export const REGISTER_URL = process.env.NEXT_PUBLIC_REGISTER_URL?.trim() || '';

export const HAS_FORM = REGISTER_URL.length > 0;

/**
 * The same form in Google's embeddable layout. Only a full
 * docs.google.com/forms/…/viewform link can be embedded — a forms.gle short
 * link opens fine in a tab but cannot be framed, so the embed is skipped for it.
 */
export const EMBED_URL = (() => {
  if (!HAS_FORM) return '';
  const m = REGISTER_URL.match(/^(https:\/\/docs\.google\.com\/forms\/[^?#]*?)\/viewform/);
  return m ? `${m[1]}/viewform?embedded=true` : '';
})();

export const CAN_EMBED = EMBED_URL.length > 0;

export const REGISTER_HREF = HAS_FORM ? REGISTER_URL : '#register';
