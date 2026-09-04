"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

const STORAGE_KEY = "nouriqo-cart-v1";
const MAX_QUANTITY = 20;

export type CartLine = {
  slug: string;
  quantity: number;
};

type CartContextValue = {
  lines: CartLine[];
  itemCount: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (slug: string, quantity: number) => void;
  updateQuantity: (slug: string, quantity: number) => void;
  removeItem: (slug: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from localStorage post-mount, not a cascading update
      if (stored) setLines(JSON.parse(stored));
    } catch {
      // Ignore malformed/inaccessible storage — cart just starts empty.
    }
    setHasHydrated(true);
  }, []);

  useEffect(() => {
    if (!hasHydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // Storage may be unavailable (private browsing, quota) — safe to skip.
    }
  }, [lines, hasHydrated]);

  function addItem(slug: string, quantity: number) {
    setLines((prev) => {
      const existing = prev.find((line) => line.slug === slug);
      if (existing) {
        return prev.map((line) =>
          line.slug === slug
            ? { ...line, quantity: Math.min(MAX_QUANTITY, line.quantity + quantity) }
            : line
        );
      }
      return [...prev, { slug, quantity: Math.min(MAX_QUANTITY, quantity) }];
    });
    setIsOpen(true);
  }

  function updateQuantity(slug: string, quantity: number) {
    setLines((prev) =>
      prev.map((line) =>
        line.slug === slug
          ? { ...line, quantity: Math.max(1, Math.min(MAX_QUANTITY, quantity)) }
          : line
      )
    );
  }

  function removeItem(slug: string) {
    setLines((prev) => prev.filter((line) => line.slug !== slug));
  }

  function clearCart() {
    setLines([]);
  }

  const itemCount = lines.reduce((sum, line) => sum + line.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        lines,
        itemCount,
        isOpen,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
