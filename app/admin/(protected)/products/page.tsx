import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil } from "lucide-react";
import { prisma } from "@/lib/db";
import { formatINR } from "@/lib/currency";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteProduct } from "./actions";

export const metadata: Metadata = { title: "Products" };

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    include: { weightOptions: { orderBy: { sortOrder: "asc" } } },
    orderBy: { createdAt: "asc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl text-ink">Products</h1>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-1.5 rounded-full bg-emerald-800 px-5 py-2.5 text-sm font-medium text-ivory hover:bg-emerald-700"
        >
          <Plus size={16} /> Add Product
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-ink/10 bg-ivory">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-ink/10 text-xs uppercase tracking-wide text-ink-soft">
            <tr>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Pack sizes</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-ink/10">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-white ring-1 ring-ink/5 ring-inset">
                      <Image src={product.imageSrc} alt="" fill sizes="48px" className="object-cover" />
                    </div>
                    <div>
                      <p className="font-medium text-ink">{product.name}</p>
                      <p className="text-xs text-ink-soft">{product.variant}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-ink-soft">
                  {product.weightOptions.map((o) => `${o.weight} (${formatINR(o.price)})`).join(", ")}
                </td>
                <td className="px-4 py-3 text-ink-soft">{product.slug}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-4">
                    <Link
                      href={`/admin/products/${product.id}/edit`}
                      className="flex items-center gap-1.5 text-sm font-medium text-emerald-800 hover:text-emerald-700"
                    >
                      <Pencil size={14} /> Edit
                    </Link>
                    <DeleteButton
                      action={deleteProduct.bind(null, product.id)}
                      confirmMessage={`Delete "${product.name}"? This cannot be undone.`}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {products.length === 0 && (
          <p className="p-6 text-center text-sm text-ink-soft">No products yet.</p>
        )}
      </div>
    </div>
  );
}
