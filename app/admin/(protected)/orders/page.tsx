import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { formatINR } from "@/lib/currency";
import { StatusBadge } from "@/components/admin/StatusBadge";

export const metadata: Metadata = { title: "Orders" };

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="font-display text-2xl text-ink">Orders</h1>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-ink/10 bg-ivory">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-ink/10 text-xs uppercase tracking-wide text-ink-soft">
            <tr>
              <th className="px-4 py-3">Order</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Payment</th>
              <th className="px-4 py-3">Shipment</th>
              <th className="px-4 py-3">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink/10">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-beige/20">
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/orders/${order.id}`}
                    className="font-medium text-emerald-800 hover:text-emerald-700"
                  >
                    {order.orderNumber}
                  </Link>
                </td>
                <td className="px-4 py-3 text-ink">{order.customerName}</td>
                <td className="px-4 py-3 text-ink">{formatINR(order.total)}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={order.paymentStatus} />
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={order.shipmentStatus} />
                </td>
                <td className="px-4 py-3 text-ink-soft">{formatDate(order.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {orders.length === 0 && (
          <p className="p-6 text-center text-sm text-ink-soft">No orders yet.</p>
        )}
      </div>
    </div>
  );
}
