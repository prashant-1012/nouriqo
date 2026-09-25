"use client";

import { useState } from "react";
import { Check, ShoppingBag } from "lucide-react";
import clsx from "clsx";
import { AnimatedSelect } from "@/components/ui/AnimatedSelect";
import { useCart } from "@/lib/cart-context";
import { formatINR } from "@/lib/currency";
import type { Product } from "@/lib/products";

export function AddToCartControl({
  product,
  dropdownSide = "bottom",
}: {
  product: Product;
  /** "top" inside ProductCard, whose overflow-hidden would clip a downward list. */
  dropdownSide?: "top" | "bottom";
}) {
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
        <AnimatedSelect
          value={selectedWeight}
          onChange={setSelectedWeight}
          ariaLabel={`Pack size for ${product.name}`}
          side={dropdownSide}
          className="flex-1"
          options={product.weightOptions.map((option) => ({
            value: option.weight,
            label: option.weight,
            hint: formatINR(option.price),
          }))}
        />
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
