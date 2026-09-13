import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { LegalContent } from "@/components/legal/LegalContent";
import { formatLegalDate, shippingPolicy } from "@/lib/legal-pages";

export const metadata: Metadata = {
  title: shippingPolicy.title,
  description: shippingPolicy.description,
};

export default function ShippingPolicyPage() {
  return (
    <>
      <PageHeader
        eyebrow={shippingPolicy.eyebrow}
        title={shippingPolicy.title}
        description={shippingPolicy.description}
      />
      <section className="bg-ivory py-12 sm:py-16">
        <Container className="max-w-3xl">
          <p className="mb-8 text-sm text-ink-soft/70">
            Last updated: {formatLegalDate(shippingPolicy.lastUpdated)}
          </p>
          <LegalContent blocks={shippingPolicy.content} />
        </Container>
      </section>
    </>
  );
}
