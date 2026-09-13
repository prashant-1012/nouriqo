import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { LegalContent } from "@/components/legal/LegalContent";
import { formatLegalDate, privacyPolicy } from "@/lib/legal-pages";

export const metadata: Metadata = {
  title: privacyPolicy.title,
  description: privacyPolicy.description,
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHeader
        eyebrow={privacyPolicy.eyebrow}
        title={privacyPolicy.title}
        description={privacyPolicy.description}
      />
      <section className="bg-ivory py-12 sm:py-16">
        <Container className="max-w-3xl">
          <p className="mb-8 text-sm text-ink-soft/70">
            Last updated: {formatLegalDate(privacyPolicy.lastUpdated)}
          </p>
          <LegalContent blocks={privacyPolicy.content} />
        </Container>
      </section>
    </>
  );
}
