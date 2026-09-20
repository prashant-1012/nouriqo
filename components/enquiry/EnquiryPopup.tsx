"use client";

import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Mail, MapPin, MessageSquare, Phone, Send, User, X } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { buildWhatsAppEnquiryUrl } from "@/lib/whatsapp";
import {
  ENQUIRY_POPUP_DELAY_MS,
  ENQUIRY_POPUP_SESSION_KEY,
  isEnquiryPopupSuppressed,
} from "@/lib/enquiry-popup";

/**
 * 16px inputs, not the 14px used by `/contact`'s inline form: iOS Safari
 * auto-zooms the viewport when a focused input's font-size is below 16px,
 * which on a modal is especially disorienting.
 */
const fieldWrapClass =
  "mt-1.5 flex min-h-11 items-center gap-2 rounded-full border border-ink/15 bg-ivory pl-4 transition-colors focus-within:border-emerald-800 focus-within:ring-2 focus-within:ring-emerald-800/20";
const fieldClass =
  "h-11 w-full bg-transparent pr-4 text-base text-ink outline-none placeholder:text-ink-soft/60";
const labelClass = "text-sm font-medium text-ink";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function EnquiryPopup() {
  const pathname = usePathname();
  const { isOpen: isCartOpen } = useCart();

  const [isOpen, setIsOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");

  const panelRef = useRef<HTMLDivElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  // Read inside the timer callback rather than in its dependency array, so
  // navigating or opening the cart never restarts the 5-second countdown.
  // Synced in an effect, not during render — mutating a ref while rendering
  // isn't safe under concurrent rendering (and react-hooks/refs rejects it).
  const pathnameRef = useRef(pathname);
  const cartOpenRef = useRef(isCartOpen);
  useEffect(() => {
    pathnameRef.current = pathname;
    cartOpenRef.current = isCartOpen;
  }, [pathname, isCartOpen]);

  const close = useCallback(() => setIsOpen(false), []);

  // Schedule the one-and-only open for this page load. This component lives in
  // app/(site)/layout.tsx, which Next.js keeps mounted across client-side
  // navigations — so this effect runs once per full page load, which is
  // exactly the "first page they land on" behaviour we want. It does not
  // re-arm when they navigate to another route.
  useEffect(() => {
    if (isEnquiryPopupSuppressed(pathnameRef.current)) return;

    let alreadyShown = false;
    try {
      alreadyShown =
        window.sessionStorage.getItem(ENQUIRY_POPUP_SESSION_KEY) === "1";
    } catch {
      // Private mode / blocked storage: fall through and show it. Failing
      // open is the right call — worst case it shows once more than intended.
    }
    if (alreadyShown) return;

    const timer = window.setTimeout(() => {
      // Re-check at fire time, not just at schedule time: they may have
      // navigated into checkout during the 5 seconds.
      if (isEnquiryPopupSuppressed(pathnameRef.current)) return;
      // Never stack two overlays. If the cart drawer happens to be open, skip
      // this page load entirely rather than fighting it for the foreground.
      if (cartOpenRef.current) return;

      try {
        window.sessionStorage.setItem(ENQUIRY_POPUP_SESSION_KEY, "1");
      } catch {
        // Non-fatal; see above.
      }
      setIsOpen(true);
    }, ENQUIRY_POPUP_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, []);

  // Lock body scroll while open — same approach as CartDrawer.
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Focus management + trap. CartDrawer doesn't trap focus; a form dialog
  // genuinely needs it, otherwise Tab walks straight out into the page behind
  // the scrim while the dialog still claims to be modal.
  useEffect(() => {
    if (!isOpen) return;
    const panel = panelRef.current;
    if (!panel) return;

    restoreFocusRef.current = document.activeElement as HTMLElement | null;
    // Focus the dialog itself (tabIndex={-1}) rather than the first control.
    // Screen readers then announce the dialog and its title on open, and the
    // visitor doesn't get a heavy focus ring on the close button as the very
    // first thing they see. Tab from here still lands on the close button.
    panel.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = Array.from(
        panel!.querySelectorAll<HTMLElement>(FOCUSABLE)
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      // Focus sits on the dialog container itself right after opening. Tab
      // flows into the form naturally; Shift+Tab would escape the dialog, so
      // wrap it round to the last control instead.
      if (active === panel) {
        if (event.shiftKey) {
          event.preventDefault();
          last.focus();
        }
        return;
      }

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      restoreFocusRef.current?.focus();
    };
  }, [isOpen, close]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Opened synchronously inside the submit handler so it still counts as a
    // user gesture and isn't caught by popup blockers.
    const url = buildWhatsAppEnquiryUrl({
      name,
      contact: mobile,
      email,
      address,
      message,
    });
    window.open(url, "_blank", "noopener,noreferrer");
    setSent(true);
    window.setTimeout(() => setIsOpen(false), 2200);
  }

  const prefersReducedMotion = useReducedMotion();
  const panelMotion = prefersReducedMotion
    ? {
        initial: { opacity: 1, y: 0 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 1, y: 0 },
        transition: { duration: 0 },
      }
    : {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 16 },
        transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] as const },
      };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: prefersReducedMotion ? 1 : 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: prefersReducedMotion ? 1 : 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
            className="fixed inset-0 z-[80] bg-ink/50"
            onClick={close}
            aria-hidden="true"
          />

          <div className="pointer-events-none fixed inset-0 z-[90] flex items-end justify-center sm:items-center sm:p-6">
            <motion.div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="enquiry-popup-title"
              tabIndex={-1}
              {...panelMotion}
              className="pointer-events-auto flex max-h-[90dvh] w-full flex-col overflow-hidden rounded-t-3xl bg-ivory outline-none sm:max-w-lg sm:rounded-3xl"
            >
              <div className="flex items-start justify-between gap-4 border-b border-ink/10 px-6 pb-4 pt-6 sm:px-8">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-gold-700">
                    Get in touch
                  </p>
                  <h2
                    id="enquiry-popup-title"
                    className="mt-1 font-display text-2xl leading-snug text-ink"
                  >
                    Have a question for us?
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close enquiry form"
                  className="-mr-2 -mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-ink/5"
                >
                  <X size={20} />
                </button>
              </div>

              <form
                onSubmit={handleSubmit}
                className="flex-1 space-y-4 overflow-y-auto px-6 py-5 sm:px-8"
              >
                <div>
                  <label htmlFor="popup-name" className={labelClass}>
                    Full Name
                  </label>
                  <div className={fieldWrapClass}>
                    <User size={18} className="shrink-0 text-ink-soft" />
                    <input
                      id="popup-name"
                      type="text"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      placeholder="Your full name"
                      autoComplete="name"
                      required
                      className={fieldClass}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="popup-mobile" className={labelClass}>
                    Mobile Number
                  </label>
                  <div className={fieldWrapClass}>
                    <Phone size={18} className="shrink-0 text-ink-soft" />
                    <input
                      id="popup-mobile"
                      type="tel"
                      inputMode="tel"
                      value={mobile}
                      onChange={(event) => setMobile(event.target.value)}
                      placeholder="Your mobile number"
                      autoComplete="tel"
                      required
                      className={fieldClass}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="popup-email" className={labelClass}>
                    Email Address
                  </label>
                  <div className={fieldWrapClass}>
                    <Mail size={18} className="shrink-0 text-ink-soft" />
                    <input
                      id="popup-email"
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="you@example.com"
                      autoComplete="email"
                      required
                      className={fieldClass}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="popup-address" className={labelClass}>
                    Address
                  </label>
                  <div className="mt-1.5 flex gap-2 rounded-2xl border border-ink/15 bg-ivory p-4 transition-colors focus-within:border-emerald-800 focus-within:ring-2 focus-within:ring-emerald-800/20">
                    <MapPin size={18} className="mt-0.5 shrink-0 text-ink-soft" />
                    <textarea
                      id="popup-address"
                      rows={2}
                      value={address}
                      onChange={(event) => setAddress(event.target.value)}
                      placeholder="Where should we reach you?"
                      autoComplete="street-address"
                      required
                      className="w-full resize-none bg-transparent text-base text-ink outline-none placeholder:text-ink-soft/60"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="popup-message" className={labelClass}>
                    Message
                  </label>
                  <div className="mt-1.5 flex gap-2 rounded-2xl border border-ink/15 bg-ivory p-4 transition-colors focus-within:border-emerald-800 focus-within:ring-2 focus-within:ring-emerald-800/20">
                    <MessageSquare
                      size={18}
                      className="mt-0.5 shrink-0 text-ink-soft"
                    />
                    <textarea
                      id="popup-message"
                      rows={3}
                      value={message}
                      onChange={(event) => setMessage(event.target.value)}
                      placeholder="How can we help?"
                      required
                      className="w-full resize-none bg-transparent text-base text-ink outline-none placeholder:text-ink-soft/60"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-emerald-800 px-6 text-sm font-medium text-ivory transition-colors hover:bg-emerald-700"
                >
                  {sent ? "Opened in WhatsApp" : "Send via WhatsApp"}
                  <Send size={16} />
                </button>

                <p
                  className="pb-1 text-center text-xs text-ink-soft/70"
                  aria-live="polite"
                >
                  {sent
                    ? "Just hit send in WhatsApp to reach us."
                    : "Opens WhatsApp with your message pre-filled — just hit send there to reach us."}
                </p>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
