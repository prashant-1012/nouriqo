import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { formatINR } from "@/lib/currency";

export const metadata: Metadata = { title: "Dashboard" };

export default async function AdminDashboardPage() {
  const [productCount, orderCount, pendingOrders, paidOrders] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    prisma.order.count({ where: { paymentStatus: "PENDING" } }),
    prisma.order.findMany({ where: { paymentStatus: "PAID" }, select: { total: true } }),
  ]);
  const revenue = paidOrders.reduce((sum, order) => sum + order.total, 0);

  const stats = [
    { label: "Products", value: productCount, href: "/admin/products" },
    { label: "Total Orders", value: orderCount, href: "/admin/orders" },
    { label: "Pending Payment", value: pendingOrders, href: "/admin/orders" },
    { label: "Revenue (Paid Orders)", value: formatINR(revenue), href: "/admin/orders" },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl text-ink">Dashboard</h1>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="rounded-2xl border border-ink/10 bg-ivory p-5 transition-colors hover:border-emerald-800/30"
          >
            <p className="text-xs font-medium uppercase tracking-wide text-ink-soft">
              {stat.label}
            </p>
            <p className="mt-2 font-display text-2xl text-ink">{stat.value}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
