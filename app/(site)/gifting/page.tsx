import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Gifting } from "@/components/sections/Gifting";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata: Metadata = {
  title: "Gifting",
  description:
    "Nouriqo sweets, packed for gifting — thoughtful, traditional, and finished with care.",
};

export default function GiftingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Gifting"
        title="Gifting"
        description="A box of Nouriqo says more than words can."
      />
      <Gifting />
      <FinalCta />
    </>
  );
}
