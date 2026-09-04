"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import clsx from "clsx";
import { QuantityStepper } from "@/components/products/QuantityStepper";
import { useCart } from "@/lib/cart-context";
import type { Product } from "@/lib/products";

export function AddToCartControl({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  function handleAdd() {
    addItem(product.slug, quantity);
    setJustAdded(true);
    setQuantity(1);
    window.setTimeout(() => setJustAdded(false), 1600);
  }

  return (
    <div className="flex items-center gap-3">
      <QuantityStepper value={quantity} onChange={setQuantity} />
      <button
        type="button"
        onClick={handleAdd}
        className={clsx(
          "flex flex-1 items-center justify-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors",
          justAdded
            ? "bg-emerald-700 text-ivory"
            : "bg-emerald-800 text-ivory hover:bg-emerald-700"
        )}
      >
        {justAdded ? (
          <>
            <Check size={15} /> Added
          </>
        ) : (
          "Add to Cart"
        )}
      </button>
    </div>
  );
}
