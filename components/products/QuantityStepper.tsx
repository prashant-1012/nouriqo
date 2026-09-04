"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import clsx from "clsx";

export function QuantityStepper({
  initialValue = 1,
  min = 1,
  max = 20,
  className,
}: {
  initialValue?: number;
  min?: number;
  max?: number;
  className?: string;
}) {
  const [quantity, setQuantity] = useState(initialValue);

  return (
    <div
      className={clsx(
        "inline-flex items-center rounded-full border border-ink/15",
        className
      )}
    >
      <button
        type="button"
        onClick={() => setQuantity((q) => Math.max(min, q - 1))}
        disabled={quantity <= min}
        aria-label="Decrease quantity"
        className="flex h-8 w-8 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-emerald-800/5 disabled:opacity-30 disabled:hover:bg-transparent"
      >
        <Minus size={14} />
      </button>
      <span
        className="w-6 text-center text-sm font-medium tabular-nums text-ink"
        aria-live="polite"
      >
        {quantity}
      </span>
      <button
        type="button"
        onClick={() => setQuantity((q) => Math.min(max, q + 1))}
        disabled={quantity >= max}
        aria-label="Increase quantity"
        className="flex h-8 w-8 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-emerald-800/5 disabled:opacity-30 disabled:hover:bg-transparent"
      >
        <Plus size={14} />
      </button>
    </div>
  );
}
