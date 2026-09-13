import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your Nouriqo order.",
};

export default function CheckoutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Checkout"
        title="Checkout"
        description="Enter your delivery details to complete your order."
      />
      <section className="bg-ivory py-12 sm:py-16">
        <Container>
          <CheckoutForm />
        </Container>
      </section>
    </>
  );
}
