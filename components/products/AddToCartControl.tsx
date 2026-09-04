"use client";

import { useState } from "react";
import { Check, ShoppingBag } from "lucide-react";
import clsx from "clsx";
import { useCart } from "@/lib/cart-context";
import { formatINR } from "@/lib/currency";
import type { Product } from "@/lib/products";

export function AddToCartControl({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [selectedWeight, setSelectedWeight] = useState(
    product.weightOptions[0].weight
  );
  const [justAdded, setJustAdded] = useState(false);

  const selectedOption =
    product.weightOptions.find((option) => option.weight === selectedWeight) ??
    product.weightOptions[0];

  function handleAdd() {
    addItem(product.slug, selectedOption.weight, 1);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1600);
  }

  return (
    <div>
      <p className="font-display text-xl text-ink">
        {formatINR(selectedOption.price)}
      </p>

      <div className="mt-3 flex items-center gap-2">
        <select
          value={selectedWeight}
          onChange={(event) => setSelectedWeight(event.target.value)}
          aria-label={`Pack size for ${product.name}`}
          className="h-11 flex-1 rounded-full border border-ink/15 bg-ivory px-4 text-sm text-ink transition-colors hover:border-ink/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-800"
        >
          {product.weightOptions.map((option) => (
            <option key={option.weight} value={option.weight}>
              {option.weight}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={handleAdd}
          className={clsx(
            "flex h-11 flex-1 items-center justify-center gap-1.5 rounded-full px-4 text-sm font-medium transition-colors",
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
            <>
              <ShoppingBag size={15} /> Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  );
}
