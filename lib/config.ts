// WhatsApp number for order checkout and general enquiries — every
// WhatsApp deep link on the site is built from this single constant,
// so it only needs updating in one place.
export const WHATSAPP_ORDER_NUMBER = "919960625495";

/**
 * Flat shipping charge in whole INR rupees, applied to every order.
 * PROVISIONAL placeholder (client asked for a simple default rather than
 * a real courier-rate rule) — see TODO.md. Not a per-weight/per-distance
 * calculation; revisit once real shipping costs are known.
 */
export const SHIPPING_CHARGE = 50;

// Absolute base URL used to build PayU's surl/furl/webhook callback URLs
// (PayU needs a publicly reachable HTTPS URL — localhost won't work for
// the actual redirect round-trip). Vercel sets VERCEL_URL automatically
// on every deployment; SITE_URL can override it for a custom domain.
export const SITE_URL =
  process.env.SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");
