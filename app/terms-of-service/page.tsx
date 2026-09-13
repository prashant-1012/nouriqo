import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { LegalContent } from "@/components/legal/LegalContent";
import { formatLegalDate, termsOfService } from "@/lib/legal-pages";

export const metadata: Metadata = {
  title: termsOfService.title,
  description: termsOfService.description,
};

export default function TermsOfServicePage() {
  return (
    <>
      <PageHeader
        eyebrow={termsOfService.eyebrow}
        title={termsOfService.title}
        description={termsOfService.description}
      />
      <section className="bg-ivory py-12 sm:py-16">
        <Container className="max-w-3xl">
          <p className="mb-8 text-sm text-ink-soft/70">
            Last updated: {formatLegalDate(termsOfService.lastUpdated)}
          </p>
          <LegalContent blocks={termsOfService.content} />
        </Container>
      </section>
    </>
  );
}
