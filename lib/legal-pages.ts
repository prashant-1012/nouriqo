export type LegalBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] };

export type LegalPage = {
  eyebrow: string;
  title: string;
  description: string;
  /** ISO date string — formatted for display with formatLegalDate(). */
  lastUpdated: string;
  content: LegalBlock[];
};

export function formatLegalDate(date: string): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

/**
 * Drafted to reflect Nouriqo's actual and near-term business practices
 * (no fabricated certifications, figures, or processes) — but this is
 * not a substitute for legal review. See TODO.md before treating any
 * of these four pages as final/launch-ready.
 */

export const privacyPolicy: LegalPage = {
  eyebrow: "Legal",
  title: "Privacy Policy",
  description:
    "What information we collect through this website, and how we use it.",
  lastUpdated: "2026-09-13",
  content: [
    {
      type: "paragraph",
      text: 'Nouriqo ("we," "our," or "us") respects your privacy and is committed to protecting the personal information you share with us through this website. This Privacy Policy explains what information we collect, how we use it, and the choices you have.',
    },
    { type: "heading", text: "Information We Collect" },
    {
      type: "paragraph",
      text: "We may collect the following information when you use this website:",
    },
    {
      type: "list",
      items: [
        "Contact details you provide, such as your name, phone number, and email address, when you place an order or submit an enquiry.",
        "Delivery address, when you place an order for shipment.",
        "Order details, such as the products, quantities, and pack sizes you select.",
        "Cart information, which is stored only in your own browser (using local storage) and is not transmitted to our servers until you place an order.",
        "Payment information, which is collected and processed directly by our payment gateway partner, PayU — we do not store your card, UPI, or bank account details on our own systems.",
      ],
    },
    { type: "heading", text: "How We Use Your Information" },
    { type: "paragraph", text: "We use the information we collect to:" },
    {
      type: "list",
      items: [
        "Process and fulfil your orders, including arranging delivery.",
        "Respond to enquiries submitted through our contact form.",
        "Communicate with you about your order, including via WhatsApp where you have initiated contact that way.",
        "Improve this website and the products and services we offer.",
      ],
    },
    { type: "heading", text: "Payments" },
    {
      type: "paragraph",
      text: "Online payments made through this website are processed securely by PayU, our third-party payment gateway. PayU collects and processes your payment details directly, in accordance with its own privacy and security policies. Nouriqo does not have access to, and does not store, your complete card, UPI, or net-banking credentials.",
    },
    { type: "heading", text: "Communication via WhatsApp" },
    {
      type: "paragraph",
      text: "Some order confirmations and customer communication may take place over WhatsApp. Any information you share with us over WhatsApp is also subject to WhatsApp's own privacy policy and terms.",
    },
    { type: "heading", text: "Cookies and Tracking" },
    {
      type: "paragraph",
      text: "This website does not currently use third-party analytics, advertising, or tracking cookies. Our payment gateway, PayU, may use cookies or similar technologies as part of processing your payment securely; this is governed by PayU's own privacy policy. If we introduce additional cookies or tracking in the future, we will update this Privacy Policy accordingly.",
    },
    { type: "heading", text: "Data Sharing" },
    {
      type: "paragraph",
      text: "We do not sell or rent your personal information. We share information only where necessary to operate this website and fulfil your order, including with:",
    },
    {
      type: "list",
      items: [
        "PayU, to process online payments.",
        "Courier and logistics partners, to deliver your order.",
        "Service providers who help us operate this website, where required.",
      ],
    },
    { type: "heading", text: "Data Security" },
    {
      type: "paragraph",
      text: "We take reasonable steps to protect the information you share with us. However, no method of transmission or storage over the internet is completely secure, and we cannot guarantee absolute security.",
    },
    { type: "heading", text: "Your Rights" },
    {
      type: "paragraph",
      text: "You may contact us at any time to ask what information we hold about you, to request a correction, or to request that it be deleted, using the contact details on our Contact page.",
    },
    { type: "heading", text: "Children's Privacy" },
    {
      type: "paragraph",
      text: "This website is not directed at children, and we do not knowingly collect personal information from children.",
    },
    { type: "heading", text: "Changes to This Policy" },
    {
      type: "paragraph",
      text: 'We may update this Privacy Policy from time to time. The "Last updated" date at the top of this page reflects the most recent revision.',
    },
    { type: "heading", text: "Contact Us" },
    {
      type: "paragraph",
      text: "If you have any questions about this Privacy Policy, please reach us via the contact details on our Contact page, or by phone at +91 99606 25495.",
    },
  ],
};

export const termsOfService: LegalPage = {
  eyebrow: "Legal",
  title: "Terms of Service",
  description: "The terms that apply when you use this website or place an order.",
  lastUpdated: "2026-09-13",
  content: [
    {
      type: "paragraph",
      text: 'These Terms of Service ("Terms") govern your use of the Nouriqo website and any purchases you make through it. By using this website or placing an order, you agree to these Terms.',
    },
    { type: "heading", text: "About Nouriqo" },
    {
      type: "paragraph",
      text: 'Nouriqo is a brand offering traditional Indian sweets (mithai). References to "we," "our," or "us" in these Terms refer to Nouriqo.',
    },
    { type: "heading", text: "Use of This Website" },
    {
      type: "paragraph",
      text: "You agree to use this website only for lawful purposes, and not to misuse it in any way that could damage, disable, or impair its operation, or interfere with any other party's use of it.",
    },
    { type: "heading", text: "Products, Images, and Pricing" },
    {
      type: "list",
      items: [
        "Product images are representative and may differ slightly from the actual product received.",
        "Prices shown on this website are indicative and may change without prior notice, up until an order is confirmed.",
        "We reserve the right to correct any pricing or product information errors, and to cancel an order affected by such an error, in which case any payment received will be refunded in full.",
      ],
    },
    { type: "heading", text: "Orders and Payment" },
    {
      type: "paragraph",
      text: "When you place an order through this website, payment is processed securely by PayU, our payment gateway partner. An order is confirmed only once payment has been successfully received. We reserve the right to refuse or cancel any order, including in cases of suspected fraud, pricing errors, or unavailability of stock.",
    },
    { type: "heading", text: "Cancellations, Refunds, Shipping, and Delivery" },
    {
      type: "paragraph",
      text: "Our policies for cancelling an order, requesting a refund, and shipping timelines are set out separately in our Refund & Cancellation Policy and Shipping & Delivery Policy, which form part of these Terms.",
    },
    { type: "heading", text: "Intellectual Property" },
    {
      type: "paragraph",
      text: "All content on this website, including text, images, logos, and design, is the property of Nouriqo or its licensors and may not be copied, reproduced, or used without our prior written permission.",
    },
    { type: "heading", text: "Limitation of Liability" },
    {
      type: "paragraph",
      text: 'This website and its content are provided on an "as is" basis. To the extent permitted by law, Nouriqo is not liable for any indirect, incidental, or consequential loss arising from your use of this website or a purchase made through it. Our total liability in connection with any order is limited to the amount you paid for that order.',
    },
    { type: "heading", text: "Governing Law" },
    { type: "paragraph", text: "These Terms are governed by the laws of India." },
    { type: "heading", text: "Changes to These Terms" },
    {
      type: "paragraph",
      text: 'We may update these Terms from time to time. The "Last updated" date at the top of this page reflects the most recent revision. Continued use of this website after a change means you accept the updated Terms.',
    },
    { type: "heading", text: "Contact Us" },
    {
      type: "paragraph",
      text: "If you have any questions about these Terms, please reach us via the contact details on our Contact page, or by phone at +91 99606 25495.",
    },
  ],
};

export const refundPolicy: LegalPage = {
  eyebrow: "Legal",
  title: "Refund & Cancellation Policy",
  description: "When an order can be cancelled, and when a replacement or refund applies.",
  lastUpdated: "2026-09-13",
  content: [
    {
      type: "paragraph",
      text: "Nouriqo sweets are fresh, perishable food products. This policy explains when an order can be cancelled, and when a replacement or refund is available.",
    },
    { type: "heading", text: "Cancellations" },
    {
      type: "paragraph",
      text: "You may cancel an order by contacting us before it has been dispatched for delivery. Once an order has been shipped, it cannot be cancelled.",
    },
    { type: "heading", text: "Returns" },
    {
      type: "paragraph",
      text: "Because our products are consumable food items, we do not accept returns for reasons of personal preference (such as a change of mind about taste or quantity), for hygiene and food-safety reasons.",
    },
    { type: "heading", text: "Damaged, Incorrect, or Incomplete Orders" },
    {
      type: "paragraph",
      text: "If you receive an order that is damaged, incorrect, or missing items, please contact us within 48 hours of delivery with your order details and, where possible, a photo of the item received. We will verify the issue and arrange a replacement or refund, at our discretion.",
    },
    { type: "heading", text: "Refunds" },
    {
      type: "paragraph",
      text: "Where a refund is due, it will be issued to your original payment method via PayU. Refunds are typically processed within 5–7 business days of approval, though the time it takes to reflect in your account depends on your bank or payment provider.",
    },
    { type: "heading", text: "Contact Us" },
    {
      type: "paragraph",
      text: "To cancel an order or report an issue with a delivered order, please contact us via the contact details on our Contact page, or by phone at +91 99606 25495, as soon as possible.",
    },
  ],
};

export const shippingPolicy: LegalPage = {
  eyebrow: "Legal",
  title: "Shipping & Delivery Policy",
  description: "Where we ship, how long delivery takes, and what it costs.",
  lastUpdated: "2026-09-13",
  content: [
    {
      type: "paragraph",
      text: "This policy explains how we ship and deliver orders placed through this website.",
    },
    { type: "heading", text: "Delivery Areas" },
    { type: "paragraph", text: "We currently ship across India." },
    { type: "heading", text: "Order Processing" },
    {
      type: "paragraph",
      text: "Orders are processed and handed over to our courier partner within 1–2 business days of confirmation.",
    },
    { type: "heading", text: "Delivery Timelines" },
    {
      type: "paragraph",
      text: "Once dispatched, orders are typically delivered within 3–7 business days, depending on your location. Delivery times may vary during festive seasons or due to circumstances beyond our control, such as courier delays or local disruptions.",
    },
    { type: "heading", text: "Shipping Charges" },
    {
      type: "paragraph",
      text: "Shipping charges are calculated at checkout based on your delivery location and are borne by the customer.",
    },
    { type: "heading", text: "Delivery Address" },
    {
      type: "paragraph",
      text: "Please ensure your delivery address and contact number are accurate and complete at the time of ordering. Nouriqo is not responsible for delays or failed deliveries caused by incorrect or incomplete address information provided by the customer.",
    },
    { type: "heading", text: "Order Updates" },
    {
      type: "paragraph",
      text: "We will share order and delivery updates via WhatsApp and/or email, using the contact details you provide at checkout.",
    },
    { type: "heading", text: "Contact Us" },
    {
      type: "paragraph",
      text: "If you have any questions about the shipping or delivery of your order, please reach us via the contact details on our Contact page, or by phone at +91 99606 25495.",
    },
  ],
};
