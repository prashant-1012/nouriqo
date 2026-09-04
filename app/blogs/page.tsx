import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { BlogGrid } from "@/components/blog/BlogGrid";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes on Indian sweets, ingredients, and gifting — from the Nouriqo kitchen.",
};

export default function BlogsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Journal"
        title="From the Nouriqo Kitchen"
        description="Notes on mithai, ingredients, and the small decisions behind how we make it."
      />
      <BlogGrid />
    </>
  );
}
