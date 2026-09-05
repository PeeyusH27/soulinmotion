/**
 * How the page registers people.
 *
 *   'modal'  — the built-in form opens in a dialog and writes to Supabase.
 *   'google' — the old behaviour: every button opens the Google Form in a tab.
 *
 * The switch exists so the Google Form stays one env var away for as long as
 * you want the escape hatch. `google` is also what the modal falls back to when
 * a submission keeps failing, so keep NEXT_PUBLIC_REGISTER_URL filled in even
 * after you have moved over.
 */
export const REGISTER_MODE =
  process.env.NEXT_PUBLIC_REGISTER_MODE?.trim() === 'google' ? 'google' : 'modal';

/** The Google Form share link. Now a fallback rather than the main path. */
export const REGISTER_URL = process.env.NEXT_PUBLIC_REGISTER_URL?.trim() || '';

export const HAS_FORM = REGISTER_URL.length > 0;

/** true when a click should open the dialog instead of navigating away */
export const USE_MODAL = REGISTER_MODE === 'modal';

/** where a link-mode button points; only meaningful when USE_MODAL is false */
export const REGISTER_HREF = HAS_FORM ? REGISTER_URL : '#register';

/**
 * The WhatsApp community every new registrant is sent to on success. Until it
 * is set the success screen shows the seat confirmation without the button,
 * rather than a link that goes nowhere.
 */
export const WHATSAPP_URL = process.env.NEXT_PUBLIC_WHATSAPP_URL?.trim() || '';

export const HAS_WHATSAPP = /^https?:\/\//.test(WHATSAPP_URL);
