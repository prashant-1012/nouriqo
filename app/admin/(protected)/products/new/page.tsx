import type { Metadata } from "next";
import { ProductForm } from "@/components/admin/ProductForm";

export const metadata: Metadata = { title: "Add Product" };

export default function NewProductPage() {
  return (
    <div>
      <h1 className="font-display text-2xl text-ink">Add Product</h1>
      <div className="mt-6">
        <ProductForm />
      </div>
    </div>
  );
}
