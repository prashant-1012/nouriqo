import { WHATSAPP_ORDER_NUMBER } from "@/lib/config";
import { formatINR } from "@/lib/currency";

export type OrderLine = {
  name: string;
  quantity: number;
  price: number;
};

export function buildOrderMessage(lines: OrderLine[]): string {
  const itemLines = lines
    .map(
      (line, index) =>
        `${index + 1}. ${line.name} x${line.quantity} — ${formatINR(line.price * line.quantity)}`
    )
    .join("\n");

  const total = lines.reduce(
    (sum, line) => sum + line.price * line.quantity,
    0
  );

  return `Hi Nouriqo! I'd like to order:\n\n${itemLines}\n\nTotal: ${formatINR(total)}`;
}

export function buildWhatsAppOrderUrl(lines: OrderLine[]): string {
  const message = buildOrderMessage(lines);
  return `https://wa.me/${WHATSAPP_ORDER_NUMBER}?text=${encodeURIComponent(message)}`;
}
