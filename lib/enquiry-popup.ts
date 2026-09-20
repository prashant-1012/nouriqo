/**
 * Configuration for the timed enquiry popup (`components/enquiry/EnquiryPopup.tsx`).
 *
 * Kept separate from the component so the timing, the storage key, and the
 * suppression list are all readable in one place without scrolling through
 * modal/focus-trap code.
 */

/**
 * sessionStorage key marking "this visitor has already been shown the popup
 * during this browsing session."
 *
 * Deliberately sessionStorage, not localStorage (client's call): the popup
 * reappears on a genuinely new session, but never twice within one. The flag
 * is set the moment the popup is SHOWN, not when it's dismissed, so closing
 * it via the X, Escape, or the backdrop all behave identically — and so does
 * submitting it.
 *
 * Versioned suffix so the rule can be changed later without old flags in a
 * returning visitor's browser silently suppressing the new behaviour.
 */
export const ENQUIRY_POPUP_SESSION_KEY = "nouriqo-enquiry-popup-v1";

/** Delay after landing before the popup opens. Client-specified. */
export const ENQUIRY_POPUP_DELAY_MS = 5000;

/**
 * Routes the popup must never interrupt.
 *
 * - `/checkout` (and its sub-routes) and `/order-success` are mid-payment or
 *   just-paid states. Covering those with an enquiry form risks costing a
 *   real order, which is strictly worse than missing one enquiry.
 * - `/contact` already renders the same enquiry form inline
 *   (`components/sections/EnquiryForm.tsx`), so popping up a near-identical
 *   copy over it is just noise.
 *
 * `/admin/*` needs no entry here: it's a separate root layout
 * (`app/admin/layout.tsx`) and this component only mounts in `app/(site)/`,
 * so it can never render there in the first place.
 */
const SUPPRESSED_PREFIXES = ["/checkout", "/order-success", "/contact"];

/** Prefix match, so `/checkout/failed` is suppressed along with `/checkout`. */
export function isEnquiryPopupSuppressed(pathname: string): boolean {
  return SUPPRESSED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}
