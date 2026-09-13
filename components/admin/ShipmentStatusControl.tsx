"use client";

import { useState, useTransition } from "react";
import { Check } from "lucide-react";
import { updateShipmentStatus } from "@/app/admin/(protected)/orders/actions";
import type { OrderShipmentStatus } from "@/generated/prisma/client";

const options: OrderShipmentStatus[] = ["NOT_SHIPPED", "SHIPPED", "DELIVERED"];

function label(status: OrderShipmentStatus): string {
  return status
    .toLowerCase()
    .split("_")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

export function ShipmentStatusControl({
  orderId,
  initialStatus,
}: {
  orderId: string;
  initialStatus: OrderShipmentStatus;
}) {
  const [status, setStatus] = useState(initialStatus);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleChange(next: OrderShipmentStatus) {
    setStatus(next);
    setSaved(false);
    setError(null);
    startTransition(async () => {
      const result = await updateShipmentStatus(orderId, next);
      if (result?.error) {
        setError(result.error);
      } else {
        setSaved(true);
        window.setTimeout(() => setSaved(false), 2000);
      }
    });
  }

  return (
    <div className="flex items-center gap-3">
      <select
        value={status}
        disabled={isPending}
        onChange={(event) => handleChange(event.target.value as OrderShipmentStatus)}
        className="h-10 rounded-lg border border-ink/15 bg-ivory px-3 text-sm text-ink outline-none focus:border-emerald-800"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {label(option)}
          </option>
        ))}
      </select>
      {saved && (
        <span className="flex items-center gap-1 text-xs font-medium text-emerald-800">
          <Check size={14} /> Saved
        </span>
      )}
      {error && <span className="text-xs text-red-700">{error}</span>}
    </div>
  );
}
