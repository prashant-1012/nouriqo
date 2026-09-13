import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { formatINR } from "@/lib/currency";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { ShipmentStatusControl } from "@/components/admin/ShipmentStatusControl";

export const metadata: Metadata = { title: "Order Detail" };

function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

export default async function AdminOrderDetailPage({
  params,
}: PageProps<"/admin/orders/[id]">) {
  const { id } = await params;
  const order = await prisma.order.findUnique({
    where: { id },
    include: { items: true, payments: { orderBy: { createdAt: "desc" } } },
  });

  if (!order) {
    notFound();
  }

  return (
    <div className="max-w-3xl">
      <Link
        href="/admin/orders"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-800 hover:text-emerald-700"
      >
        <ArrowLeft size={16} /> Back to Orders
      </Link>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-2xl text-ink">{order.orderNumber}</h1>
        <div className="flex items-center gap-2">
          <StatusBadge status={order.paymentStatus} />
          <StatusBadge status={order.shipmentStatus} />
        </div>
      </div>
      <p className="mt-1 text-sm text-ink-soft">Placed {formatDateTime(order.createdAt)}</p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-ink/10 bg-ivory p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-ink-soft">Customer</p>
          <p className="mt-2 text-sm text-ink">{order.customerName}</p>
          <p className="text-sm text-ink-soft">{order.customerPhone}</p>
          <p className="text-sm text-ink-soft">{order.customerEmail}</p>
        </div>
        <div className="rounded-2xl border border-ink/10 bg-ivory p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-ink-soft">
            Delivering To
          </p>
          <p className="mt-2 text-sm text-ink-soft">
            {order.shippingAddressLine1}
            {order.shippingAddressLine2 ? `, ${order.shippingAddressLine2}` : ""},{" "}
            {order.shippingCity}, {order.shippingState} {order.shippingPostalCode}
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-ink/10 bg-ivory p-5">
        <p className="text-xs font-medium uppercase tracking-wide text-ink-soft">
          Shipment Status
        </p>
        <div className="mt-3">
          <ShipmentStatusControl orderId={order.id} initialStatus={order.shipmentStatus} />
        </div>
      </div>

      <div className="mt-6 divide-y divide-ink/10 rounded-2xl border border-ink/10 bg-ivory">
        {order.items.map((item) => (
          <div key={item.id} className="flex items-center justify-between gap-4 p-4 text-sm">
            <div>
              <p className="font-medium text-ink">{item.productName}</p>
              <p className="text-xs text-ink-soft">
                {item.variant} &middot; {item.weight} &middot; Qty {item.quantity}
              </p>
            </div>
            <span className="font-medium text-ink">{formatINR(item.lineTotal)}</span>
          </div>
        ))}
        <div className="space-y-1.5 p-4 text-sm">
          <div className="flex justify-between text-ink-soft">
            <span>Subtotal</span>
            <span>{formatINR(order.subtotal)}</span>
          </div>
          <div className="flex justify-between text-ink-soft">
            <span>Shipping</span>
            <span>{formatINR(order.shippingCharge)}</span>
          </div>
          <div className="flex justify-between pt-1 font-display text-base text-ink">
            <span>Total</span>
            <span>{formatINR(order.total)}</span>
          </div>
        </div>
      </div>

      {order.payments.length > 0 && (
        <div className="mt-6">
          <p className="text-xs font-medium uppercase tracking-wide text-ink-soft">
            Payment Attempts
          </p>
          <div className="mt-2 divide-y divide-ink/10 rounded-2xl border border-ink/10 bg-ivory">
            {order.payments.map((payment) => (
              <div key={payment.id} className="flex items-center justify-between gap-4 p-4 text-sm">
                <div>
                  <p className="text-ink">{payment.providerTxnId}</p>
                  <p className="text-xs text-ink-soft">{formatDateTime(payment.createdAt)}</p>
                </div>
                <StatusBadge status={payment.status} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
