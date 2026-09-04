import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { ContactInfo } from "@/components/sections/ContactInfo";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Nouriqo.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Get in touch"
        description="Have a question about an order, bulk gifting, or anything else? We'd love to hear from you."
      />
      <ContactInfo />
    </>
  );
}
