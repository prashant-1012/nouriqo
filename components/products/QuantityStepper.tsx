"use client";

import { Minus, Plus } from "lucide-react";
import clsx from "clsx";

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 20,
  className,
}: {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "inline-flex items-center rounded-full border border-ink/15",
        className
      )}
    >
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="Decrease quantity"
        className="flex h-8 w-8 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-emerald-800/5 disabled:opacity-30 disabled:hover:bg-transparent"
      >
        <Minus size={14} />
      </button>
      <span
        className="w-6 text-center text-sm font-medium tabular-nums text-ink"
        aria-live="polite"
      >
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="Increase quantity"
        className="flex h-8 w-8 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-emerald-800/5 disabled:opacity-30 disabled:hover:bg-transparent"
      >
        <Plus size={14} />
      </button>
    </div>
  );
}
