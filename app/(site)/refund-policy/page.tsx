import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { LegalContent } from "@/components/legal/LegalContent";
import { formatLegalDate, refundPolicy } from "@/lib/legal-pages";

export const metadata: Metadata = {
  title: refundPolicy.title,
  description: refundPolicy.description,
};

export default function RefundPolicyPage() {
  return (
    <>
      <PageHeader
        eyebrow={refundPolicy.eyebrow}
        title={refundPolicy.title}
        description={refundPolicy.description}
      />
      <section className="bg-ivory py-12 sm:py-16">
        <Container className="max-w-3xl">
          <p className="mb-8 text-sm text-ink-soft/70">
            Last updated: {formatLegalDate(refundPolicy.lastUpdated)}
          </p>
          <LegalContent blocks={refundPolicy.content} />
        </Container>
      </section>
    </>
  );
}
