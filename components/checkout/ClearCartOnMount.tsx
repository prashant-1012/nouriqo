"use client";

import { useEffect, useRef } from "react";
import { useCart } from "@/lib/cart-context";

/** Clears the cart once, on mount — used only on the order-success page,
 * after payment is already confirmed server-side. Waits for
 * CartProvider's hasHydrated flag: child effects fire before parent
 * effects on mount, so clearing before CartProvider's own localStorage
 * hydration effect has run would just get overwritten by it reading the
 * still-stale stored cart right after. */
export function ClearCartOnMount() {
  const { clearCart, hasHydrated } = useCart();
  const hasCleared = useRef(false);

  useEffect(() => {
    if (!hasHydrated || hasCleared.current) return;
    hasCleared.current = true;
    clearCart();
  }, [hasHydrated, clearCart]);

  return null;
}
