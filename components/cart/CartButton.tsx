"use client";

import { ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-context";

export function CartButton() {
  const { itemCount, openCart } = useCart();

  return (
    <button
      type="button"
      onClick={openCart}
      aria-label={`Open cart${itemCount > 0 ? `, ${itemCount} item${itemCount === 1 ? "" : "s"}` : ""}`}
      className="relative flex h-10 w-10 items-center justify-center rounded-full text-emerald-900 hover:bg-emerald-800/5"
    >
      <ShoppingBag size={20} />
      {itemCount > 0 && (
        <span className="absolute -top-0.5 -right-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-emerald-800 px-1 text-[10px] font-medium leading-none text-ivory">
          {itemCount}
        </span>
      )}
    </button>
  );
}
