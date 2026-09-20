"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useCart } from "@/lib/cart-context";

/**
 * Hands the cart off to Wix's hosted checkout.
 *
 * Only rendered when NEXT_PUBLIC_WIX_CHECKOUT_ENABLED is on — CartDrawer falls
 * back to the WhatsApp link otherwise. Until the client connects a payment
 * method in Wix, sending a live customer to Wix checkout would strand them,
 * so production keeps this off. See docs/WIX_INTEGRATION.md.
 */
export function CheckoutButton() {
  const { lines } = useCart();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCheckout() {
    setIsRedirecting(true);
    setError(null);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lines }),
      });

      const data = (await response.json()) as {
        checkoutUrl?: string;
        error?: string;
      };

      if (!response.ok || !data.checkoutUrl) {
        setError(data.error ?? "Could not start checkout. Please try again.");
        setIsRedirecting(false);
        return;
      }

      // Deliberately not resetting isRedirecting: the browser is leaving, and
      // flipping the button back to idle mid-navigation just looks broken.
      window.location.href = data.checkoutUrl;
    } catch {
      setError("Could not reach checkout. Check your connection and retry.");
      setIsRedirecting(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={handleCheckout}
        disabled={isRedirecting || lines.length === 0}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-emerald-800 px-6 py-3 text-sm font-medium text-ivory transition-colors hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isRedirecting ? (
          <>
            <Loader2 size={15} className="animate-spin" />
            Taking you to checkout…
          </>
        ) : (
          "Checkout"
        )}
      </button>

      {error && (
        <p role="alert" className="mt-2 text-center text-xs text-rose-700">
          {error}
        </p>
      )}
    </>
  );
}
