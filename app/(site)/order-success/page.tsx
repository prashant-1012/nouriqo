import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { formatINR } from "@/lib/currency";
import { prisma } from "@/lib/db";
import { ClearCartOnMount } from "@/components/checkout/ClearCartOnMount";

export const metadata: Metadata = {
  title: "Order Confirmed",
};

export default async function OrderSuccessPage({
  searchParams,
}: PageProps<"/order-success">) {
  const { order: orderNumber } = await searchParams;

  if (typeof orderNumber !== "string") {
    notFound();
  }

  const order = await prisma.order.findUnique({
    where: { orderNumber },
    include: { items: true },
  });

  if (!order || order.paymentStatus !== "PAID") {
    notFound();
  }

  return (
    <section className="bg-ivory py-16 sm:py-24">
      <Container className="max-w-2xl">
        <ClearCartOnMount />
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-gold-700">
          Order Confirmed
        </p>
        <h1 className="mt-3 font-display text-3xl leading-tight text-ink sm:text-4xl">
          Thank you, {order.customerName.split(" ")[0]}!
        </h1>
        <p className="mt-3 text-base leading-relaxed text-ink-soft">
          Your order <span className="font-medium text-ink">{order.orderNumber}</span>{" "}
          is confirmed. We&apos;ll be in touch with delivery updates via
          WhatsApp/email.
        </p>

        <ul className="mt-8 divide-y divide-ink/10 rounded-2xl border border-ink/10">
          {order.items.map((item) => (
            <li key={item.id} className="flex items-center justify-between gap-4 p-4 text-sm">
              <div>
                <p className="font-medium text-ink">{item.productName}</p>
                <p className="text-xs text-ink-soft">
                  {item.variant} &middot; {item.weight} &middot; Qty {item.quantity}
                </p>
              </div>
              <span className="font-medium text-ink">{formatINR(item.lineTotal)}</span>
            </li>
          ))}
        </ul>

        <div className="mt-4 space-y-2 border-t border-ink/10 pt-4 text-sm">
          <div className="flex justify-between text-ink-soft">
            <span>Subtotal</span>
            <span>{formatINR(order.subtotal)}</span>
          </div>
          <div className="flex justify-between text-ink-soft">
            <span>Shipping</span>
            <span>{formatINR(order.shippingCharge)}</span>
          </div>
          <div className="flex justify-between pt-2 font-display text-lg text-ink">
            <span>Total Paid</span>
            <span>{formatINR(order.total)}</span>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-ink/10 bg-beige/30 p-5 text-sm text-ink-soft">
          <p className="font-medium text-ink">Delivering to</p>
          <p className="mt-1">
            {order.shippingAddressLine1}
            {order.shippingAddressLine2 ? `, ${order.shippingAddressLine2}` : ""},{" "}
            {order.shippingCity}, {order.shippingState} {order.shippingPostalCode}
          </p>
        </div>

        <Link
          href="/sweets"
          className="mt-10 inline-flex items-center justify-center rounded-full bg-emerald-800 px-7 py-3.5 text-sm font-medium text-ivory transition-colors hover:bg-emerald-700"
        >
          Continue Shopping
        </Link>
      </Container>
    </section>
  );
}
