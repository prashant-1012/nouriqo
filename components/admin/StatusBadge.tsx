import clsx from "clsx";

const styles: Record<string, string> = {
  PENDING: "bg-gold-400/20 text-gold-700",
  PAID: "bg-emerald-800/10 text-emerald-800",
  FAILED: "bg-red-100 text-red-700",
  REFUNDED: "bg-ink/10 text-ink-soft",
  NOT_SHIPPED: "bg-gold-400/20 text-gold-700",
  SHIPPED: "bg-lilac-200/50 text-ink",
  DELIVERED: "bg-emerald-800/10 text-emerald-800",
  INITIATED: "bg-gold-400/20 text-gold-700",
  SUCCESS: "bg-emerald-800/10 text-emerald-800",
  FAILURE: "bg-red-100 text-red-700",
};

function label(status: string): string {
  return status
    .toLowerCase()
    .split("_")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        "inline-flex rounded-full px-2.5 py-1 text-xs font-medium",
        styles[status] ?? "bg-ink/10 text-ink-soft"
      )}
    >
      {label(status)}
    </span>
  );
}
