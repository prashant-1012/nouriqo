import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Testimonials } from "@/components/sections/Testimonials";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "Real words from people who've tasted Nouriqo.",
};

export default function TestimonialsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Testimonials"
        title="Testimonials"
        description="Real words from people who've tasted Nouriqo."
      />
      <Testimonials />
    </>
  );
}
