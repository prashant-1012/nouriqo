export type LegalBlock =
  | { type: "heading"; text: string }
  | { type: "subheading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "orderedList"; items: string[] }
  /** Consecutive short lines with no gap, e.g. a contact/address block. */
  | { type: "lines"; lines: string[] };

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
 * All four pages are the client's own text, supplied 2026-09-25 and used
 * verbatim — only restructured into blocks. Edit wording only on the
 * client's instruction.
 */

export const privacyPolicy: LegalPage = {
  eyebrow: "Legal",
  title: "Privacy Policy",
  description:
    "How Nouriqo collects, uses, shares, and protects your personal information.",
  lastUpdated: "2026-09-13",
  content: [
    {
      type: "paragraph",
      text: "Nouriqo (“Nouriqo”, “we”, “us”, or “our”) respects your privacy and is committed to protecting the personal information you provide to us.",
    },
    {
      type: "paragraph",
      text: "This Privacy Policy explains how we collect, use, store, disclose, and protect information when you visit or use our website www.nouriqo.com (the “Website”), purchase our products, contact us, or otherwise interact with us through our Website.",
    },
    {
      type: "paragraph",
      text: "By accessing or using the Website, you acknowledge that you have read and understood this Privacy Policy. If you do not agree with this Policy, please do not use the Website.",
    },
    {
      type: "paragraph",
      text: "This Privacy Policy should be read together with our Terms and Conditions, available on our Website.",
    },

    { type: "heading", text: "1. Definitions" },
    { type: "paragraph", text: "For the purposes of this Privacy Policy:" },
    {
      type: "list",
      items: [
        "“User”, “You”, or “Your” means any individual who accesses, browses, or uses the Website or purchases products from us.",
        "“Nouriqo”, “We”, “Us”, or “Our” means the business operating under the brand name Nouriqo.",
        "“Website” means www.nouriqo.com, including its associated pages, features, and services.",
        "“Personal Information” means information that identifies or can reasonably be used to identify an individual, either directly or indirectly.",
      ],
    },

    { type: "heading", text: "2. Scope of this Privacy Policy" },
    {
      type: "paragraph",
      text: "This Privacy Policy applies to information collected through our Website and through your direct interactions with Nouriqo in connection with our products and services.",
    },
    {
      type: "paragraph",
      text: "This Policy does not apply to third-party websites, applications, payment gateways, social media platforms, or other services that may be accessible through links on our Website. Such third parties have their own privacy policies, and we encourage you to review them before providing your information.",
    },
    {
      type: "paragraph",
      text: "We may update this Privacy Policy from time to time to reflect changes in our business, technology, legal requirements, or the services offered through our Website.",
    },
    {
      type: "paragraph",
      text: "Any updated version will be posted on this page with a revised “Last Updated” date.",
    },

    { type: "heading", text: "3. Information We Collect" },
    {
      type: "paragraph",
      text: "Depending on how you interact with Nouriqo, we may collect the following information:",
    },
    { type: "subheading", text: "A. Information You Provide Directly" },
    {
      type: "paragraph",
      text: "When you place an order, create an account, contact us, or otherwise interact with us, we may collect information such as:",
    },
    {
      type: "list",
      items: [
        "Full name",
        "Mobile/telephone number",
        "Email address",
        "Billing address",
        "Shipping/delivery address",
        "Location information provided for delivery",
        "Order and purchase details",
        "Product preferences and enquiries",
        "Information you provide when contacting customer support",
        "Any other information you voluntarily provide to us.",
      ],
    },
    { type: "subheading", text: "B. Payment Information" },
    {
      type: "paragraph",
      text: "When you make a payment through our Website, payment transactions may be processed through third-party payment service providers.",
    },
    {
      type: "paragraph",
      text: "Depending on the payment method used, these providers may collect and process information required to complete the transaction.",
    },
    {
      type: "paragraph",
      text: "Nouriqo does not intend to store your complete debit card, credit card, UPI credentials, banking passwords, or other sensitive payment credentials on its own servers. Such information may be processed directly by the relevant payment service provider in accordance with its privacy and security practices.",
    },
    { type: "subheading", text: "C. Information Collected Automatically" },
    {
      type: "paragraph",
      text: "When you visit our Website, certain technical information may be collected automatically, including:",
    },
    {
      type: "list",
      items: [
        "IP address",
        "Browser type and version",
        "Device type",
        "Operating system",
        "Date and time of access",
        "Pages visited",
        "Website activity and interactions",
        "Referring website or source",
        "General location information derived from technical data",
      ],
    },
    {
      type: "paragraph",
      text: "This information may be used to understand how visitors use our Website, improve website functionality, maintain security, and enhance our products and services.",
    },
    { type: "subheading", text: "D. Cookies and Similar Technologies" },
    {
      type: "paragraph",
      text: "Our Website may use cookies and similar technologies to improve your browsing experience, remember preferences, understand Website usage, and support certain Website functions.",
    },
    { type: "paragraph", text: "Cookies may be used for purposes such as:" },
    {
      type: "list",
      items: [
        "Keeping the Website functioning properly",
        "Remembering preferences",
        "Understanding Website traffic and usage",
        "Improving Website performance",
        "Supporting analytics",
        "Providing relevant communications or marketing, where applicable",
      ],
    },
    {
      type: "paragraph",
      text: "You may be able to control or disable cookies through your browser settings. However, disabling certain cookies may affect the functionality of parts of our Website.",
    },

    { type: "heading", text: "4. How We Use Your Information" },
    {
      type: "paragraph",
      text: "We may use the information we collect for legitimate business purposes, including:",
    },
    {
      type: "orderedList",
      items: [
        "Processing and fulfilling orders;",
        "Arranging delivery of products;",
        "Processing payments through authorised payment service providers;",
        "Communicating with you regarding your orders;",
        "Responding to enquiries, requests, complaints, or customer support matters;",
        "Providing information about our products and services;",
        "Sending promotional or marketing communications where permitted and where you have provided the required consent;",
        "Improving our products, services, Website, and customer experience;",
        "Understanding customer preferences and Website usage;",
        "Preventing fraud, misuse, unauthorised access, and other security risks;",
        "Maintaining business and transaction records;",
        "Complying with applicable laws, regulations, legal processes, and governmental requirements; and",
        "Protecting our legal rights, property, customers, employees, and business.",
      ],
    },
    {
      type: "paragraph",
      text: "We will use personal information only for purposes that are reasonably connected with the purpose for which it was collected or otherwise permitted under applicable law.",
    },

    { type: "heading", text: "5. Sharing of Information" },
    {
      type: "paragraph",
      text: "Nouriqo respects the confidentiality of your personal information.",
    },
    {
      type: "paragraph",
      text: "We may share limited information with trusted third parties where reasonably necessary to provide our products and services or operate our business.",
    },
    { type: "paragraph", text: "These parties may include:" },
    {
      type: "list",
      items: [
        "Payment gateways and payment service providers;",
        "Logistics and delivery partners;",
        "Website hosting and technology service providers;",
        "Website analytics and performance service providers;",
        "Customer support service providers;",
        "Marketing and communication service providers, where applicable;",
        "Professional advisers, auditors, accountants, or legal advisers;",
        "Government authorities, regulators, courts, or law-enforcement agencies where required by law; and",
        "Other service providers where disclosure is reasonably necessary to operate our business or provide services to you.",
      ],
    },
    {
      type: "paragraph",
      text: "We require service providers who process information on our behalf to handle such information appropriately and, where applicable, in accordance with contractual and legal obligations.",
    },
    {
      type: "paragraph",
      text: "We do not sell or rent your personal information to third parties for their independent commercial use.",
    },

    { type: "heading", text: "6. Marketing Communications" },
    {
      type: "paragraph",
      text: "If you provide your contact details and consent to receive promotional communications, Nouriqo may contact you regarding:",
    },
    {
      type: "list",
      items: [
        "New products;",
        "Special offers;",
        "Festive promotions;",
        "Discounts;",
        "Product updates;",
        "Brand announcements; and",
        "Other information that may be relevant to your relationship with Nouriqo.",
      ],
    },
    {
      type: "paragraph",
      text: "You may opt out of promotional communications at any time by using the unsubscribe option provided in the communication or by contacting us using the details provided in the Contact Us section below.",
    },
    {
      type: "paragraph",
      text: "Please note that even if you opt out of promotional communications, we may still send essential service-related communications, such as order confirmations, delivery updates, payment notifications, or responses to your enquiries.",
    },

    { type: "heading", text: "7. Order and Delivery Information" },
    {
      type: "paragraph",
      text: "When you place an order through our Website, we may use your personal information to:",
    },
    {
      type: "list",
      items: [
        "Confirm your order;",
        "Process payment;",
        "Prepare and dispatch your products;",
        "Arrange delivery;",
        "Contact you regarding your order;",
        "Resolve delivery issues; and",
        "Provide after-sales support.",
      ],
    },
    {
      type: "paragraph",
      text: "We may provide necessary delivery information, such as your name, phone number, and delivery address, to relevant delivery or logistics partners for the purpose of fulfilling your order.",
    },

    { type: "heading", text: "8. Data Retention" },
    {
      type: "paragraph",
      text: "We retain personal information only for as long as reasonably necessary for the purposes described in this Privacy Policy, including fulfilling transactions, maintaining business and financial records, resolving disputes, enforcing agreements, preventing fraud, and complying with applicable legal or regulatory requirements.",
    },
    {
      type: "paragraph",
      text: "When personal information is no longer reasonably required, we may delete, anonymise, or securely dispose of it, subject to applicable legal requirements.",
    },

    { type: "heading", text: "9. Data Security" },
    {
      type: "paragraph",
      text: "Nouriqo takes reasonable measures to protect personal information against unauthorised access, misuse, alteration, disclosure, loss, or destruction.",
    },
    {
      type: "paragraph",
      text: "However, no method of transmitting or storing information electronically can be guaranteed to be completely secure. Therefore, while we take reasonable precautions to protect your information, we cannot guarantee absolute security of information transmitted to or through our Website.",
    },
    {
      type: "paragraph",
      text: "You are responsible for maintaining the confidentiality of any account credentials or other information used to access your account, where applicable.",
    },

    { type: "heading", text: "10. Third-Party Websites and Services" },
    {
      type: "paragraph",
      text: "Our Website may contain links to third-party websites, applications, social media platforms, payment services, delivery services, or other external services.",
    },
    {
      type: "paragraph",
      text: "Nouriqo is not responsible for the privacy practices, security, content, or policies of such third parties.",
    },
    {
      type: "paragraph",
      text: "We recommend that you review the privacy policies and terms of any third-party service before providing personal information to them.",
    },

    { type: "heading", text: "11. Children’s Privacy" },
    {
      type: "paragraph",
      text: "Our Website is intended for general use and is not specifically directed toward children.",
    },
    {
      type: "paragraph",
      text: "We do not knowingly seek to collect personal information from children where such collection is prohibited by applicable law.",
    },
    {
      type: "paragraph",
      text: "If you believe that a child has provided personal information to us without appropriate consent, please contact us so that we can take appropriate steps where required.",
    },

    { type: "heading", text: "12. Your Privacy Rights and Choices" },
    {
      type: "paragraph",
      text: "Subject to applicable law, you may have rights concerning your personal information, which may include the ability to:",
    },
    {
      type: "list",
      items: [
        "Request information about the personal data we hold about you;",
        "Request correction of inaccurate or incomplete information;",
        "Request deletion of personal information where legally permissible;",
        "Withdraw consent for certain processing activities;",
        "Opt out of promotional communications; and",
        "Raise a concern or grievance regarding the handling of your personal information.",
      ],
    },
    {
      type: "paragraph",
      text: "Requests may be submitted using the contact details provided below.",
    },
    {
      type: "paragraph",
      text: "We may need to verify your identity before processing certain requests in order to protect your personal information and prevent unauthorised requests.",
    },
    {
      type: "paragraph",
      text: "Certain information may need to be retained where required by law or where we have a legitimate reason to do so.",
    },

    { type: "heading", text: "13. Request for Deletion of Personal Information" },
    {
      type: "paragraph",
      text: "You may request deletion of your personal information by contacting us using the details below.",
    },
    {
      type: "paragraph",
      text: "Upon receiving a valid request, we will assess and process the request in accordance with applicable law.",
    },
    {
      type: "paragraph",
      text: "Please note that deletion may not always be possible where we are required to retain certain information for legal, regulatory, accounting, fraud-prevention, dispute-resolution, or other legitimate business purposes.",
    },

    { type: "heading", text: "14. Withdrawal of Consent" },
    {
      type: "paragraph",
      text: "Where we rely on your consent to process personal information, you may withdraw that consent by contacting us.",
    },
    {
      type: "paragraph",
      text: "Withdrawal of consent will not affect the lawfulness of processing carried out before the withdrawal.",
    },
    {
      type: "paragraph",
      text: "Please note that withdrawing consent may affect our ability to provide certain services or features where the relevant information is necessary for those services.",
    },

    { type: "heading", text: "15. Grievance and Privacy Concerns" },
    {
      type: "paragraph",
      text: "If you have any questions, concerns, complaints, or grievances regarding the collection or use of your personal information by Nouriqo, please contact us.",
    },
    {
      type: "paragraph",
      text: "We will make reasonable efforts to review and respond to your concern within the time period required under applicable law.",
    },
    { type: "paragraph", text: "Contact Information:" },
    {
      type: "lines",
      lines: [
        "Nouriqo",
        "Pune, Maharashtra, India",
        "Website: www.nouriqo.com",
        "Phone/WhatsApp: +91 92701 31986",
        "Email: sales1earth@gmail.com",
      ],
    },

    { type: "heading", text: "16. Changes to this Privacy Policy" },
    {
      type: "paragraph",
      text: "Nouriqo may modify or update this Privacy Policy from time to time.",
    },
    {
      type: "paragraph",
      text: "Any changes will be published on this page and will become effective from the date indicated by the updated “Last Updated” date.",
    },
    {
      type: "paragraph",
      text: "We encourage you to review this Privacy Policy periodically to remain informed about how we handle personal information.",
    },

    { type: "heading", text: "17. Contact Us" },
    {
      type: "paragraph",
      text: "For questions, requests, or concerns regarding this Privacy Policy or the handling of your personal information, please contact:",
    },
    {
      type: "lines",
      lines: [
        "Nouriqo",
        "Pune, Maharashtra, India",
        "Phone/WhatsApp: +91 92701 31986",
        "Website: www.nouriqo.com",
        "Email: sales1earth@gmail.com",
      ],
    },
  ],
};

export const termsOfService: LegalPage = {
  eyebrow: "Legal",
  title: "Terms of Service",
  description: "The terms that apply when you use this website or place an order.",
  lastUpdated: "2026-09-15",
  content: [
    { type: "paragraph", text: "Welcome to Nouriqo!" },
    {
      type: "paragraph",
      text: "These Terms of Service (“Terms”) govern your access to and use of www.nouriqo.com (the “Website”) and your purchase of products from Nouriqo.",
    },
    {
      type: "paragraph",
      text: "By accessing or using our Website or placing an order, you agree to these Terms and our Privacy Policy and Refund, Return & Replacement Policy.",
    },
    {
      type: "paragraph",
      text: "If you do not agree with these Terms, please refrain from using our Website.",
    },

    { type: "heading", text: "1. Use of the Website" },
    {
      type: "paragraph",
      text: "You agree to use the Website only for lawful purposes and in accordance with these Terms.",
    },
    { type: "paragraph", text: "You must not:" },
    {
      type: "list",
      items: [
        "Use the Website for any unlawful or fraudulent purpose;",
        "Attempt to gain unauthorised access to the Website or its systems;",
        "Interfere with the operation or security of the Website;",
        "Misuse or reproduce our content, branding, images, or other intellectual property without permission; or",
        "Impersonate another person or provide false information.",
      ],
    },

    { type: "heading", text: "2. Products and Product Information" },
    {
      type: "paragraph",
      text: "Nouriqo makes reasonable efforts to ensure that product descriptions, images, ingredients, prices, availability, and other information displayed on the Website are accurate.",
    },
    {
      type: "paragraph",
      text: "However, minor differences in product appearance, colour, texture, or packaging may occur.",
    },
    {
      type: "paragraph",
      text: "As our food products may involve natural ingredients and traditional preparation methods, minor variations between batches may occur and do not necessarily indicate a defect.",
    },
    {
      type: "paragraph",
      text: "Nouriqo reserves the right to modify product information, availability, specifications, or discontinue products at any time.",
    },

    { type: "heading", text: "3. Pricing and Taxes" },
    {
      type: "paragraph",
      text: "All prices displayed on the Website are in Indian Rupees (INR).",
    },
    {
      type: "paragraph",
      text: "Applicable taxes and shipping charges, where applicable, will be displayed during the ordering process.",
    },
    {
      type: "paragraph",
      text: "Prices and offers may be changed or withdrawn by Nouriqo at any time without prior notice.",
    },

    { type: "heading", text: "4. Orders" },
    {
      type: "paragraph",
      text: "You may place an order by selecting the products you wish to purchase, providing the required delivery and contact information, and completing the available payment process.",
    },
    {
      type: "paragraph",
      text: "An order will be considered confirmed once you receive an order confirmation from Nouriqo.",
    },
    {
      type: "paragraph",
      text: "Nouriqo reserves the right to cancel or refuse an order in circumstances such as product unavailability, pricing or listing errors, suspected fraudulent activity, incorrect information, or circumstances beyond our reasonable control.",
    },
    {
      type: "paragraph",
      text: "Any applicable cancellation or refund will be handled in accordance with our Refund, Return & Replacement Policy.",
    },

    { type: "heading", text: "5. Payment" },
    {
      type: "paragraph",
      text: "Payments may be made using the payment methods available on the Website, which may include credit/debit cards, UPI, net banking, wallets, or other supported methods.",
    },
    {
      type: "paragraph",
      text: "Payments may be processed through third-party payment service providers.",
    },
    {
      type: "paragraph",
      text: "Nouriqo does not control third-party payment systems and is not responsible for technical failures or delays caused by such providers.",
    },

    { type: "heading", text: "6. Shipping and Delivery" },
    {
      type: "paragraph",
      text: "Nouriqo will make reasonable efforts to process and deliver orders within the estimated timelines provided on the Website.",
    },
    {
      type: "paragraph",
      text: "Delivery timelines may vary depending on the delivery location, product availability, logistics partners, weather, transportation conditions, public holidays, or other circumstances beyond our reasonable control.",
    },
    {
      type: "paragraph",
      text: "For complete information, please refer to our Shipping & Delivery Policy.",
    },

    { type: "heading", text: "7. Returns, Refunds and Replacements" },
    {
      type: "paragraph",
      text: "As Nouriqo sells food products, returns are generally not accepted for reasons such as change of mind or personal preference.",
    },
    {
      type: "paragraph",
      text: "However, genuine concerns involving damaged, missing, incorrect, or spoiled products may be eligible for replacement or refund, subject to verification.",
    },
    {
      type: "paragraph",
      text: "Please refer to our Refund, Return & Replacement Policy for complete details.",
    },

    { type: "heading", text: "8. Intellectual Property" },
    {
      type: "paragraph",
      text: "All content on the Website, including the Nouriqo name, logo, trademarks, product images, photographs, text, graphics, designs, and other materials, is owned by or licensed to Nouriqo unless otherwise stated.",
    },
    {
      type: "paragraph",
      text: "You may not reproduce, copy, modify, distribute, publish, or commercially use our content without prior written permission.",
    },

    { type: "heading", text: "9. Limitation of Liability" },
    {
      type: "paragraph",
      text: "Nouriqo will make reasonable efforts to provide accurate information and reliable services through the Website.",
    },
    {
      type: "paragraph",
      text: "To the extent permitted by applicable law, Nouriqo will not be responsible for losses arising from circumstances beyond our reasonable control, including delivery delays caused by third-party logistics providers, technical failures, natural events, or other unforeseen circumstances.",
    },
    {
      type: "paragraph",
      text: "Nothing in these Terms is intended to exclude or limit any liability that cannot legally be excluded or limited under applicable law.",
    },

    { type: "heading", text: "10. Changes to These Terms" },
    {
      type: "paragraph",
      text: "Nouriqo may update these Terms from time to time.",
    },
    {
      type: "paragraph",
      text: "Any revised Terms will be published on this page with an updated “Last Updated” date.",
    },
    {
      type: "paragraph",
      text: "Your continued use of the Website after the updated Terms are published constitutes your acceptance of the revised Terms.",
    },

    { type: "heading", text: "11. Governing Law" },
    {
      type: "paragraph",
      text: "These Terms shall be governed by and interpreted in accordance with the laws of India.",
    },
    {
      type: "paragraph",
      text: "Any disputes relating to the Website or products purchased from Nouriqo shall be subject to the jurisdiction of the courts and competent authorities applicable under Indian law.",
    },

    { type: "heading", text: "12. Contact Us" },
    {
      type: "paragraph",
      text: "If you have any questions regarding these Terms, please contact us:",
    },
    {
      type: "lines",
      lines: [
        "Nouriqo",
        "Pune, Maharashtra, India",
        "Website: www.nouriqo.com",
        "Email: sales1earth@gmail.com",
        "Phone/WhatsApp: +91 92701 31986",
      ],
    },
  ],
};

export const refundPolicy: LegalPage = {
  eyebrow: "Legal",
  title: "Refund, Return & Replacement Policy",
  description:
    "What to do if your order arrives damaged, incorrect, missing items, or spoiled.",
  lastUpdated: "2026-09-15",
  content: [
    {
      type: "paragraph",
      text: "At Nouriqo, we take great care to ensure that our products are properly prepared, packed, and delivered to you in good condition. As our products are food items, returns and exchanges are generally not accepted due to hygiene, food-safety, and product-quality considerations.",
    },
    {
      type: "paragraph",
      text: "However, if you receive a product that is damaged, missing, incorrect, or spoiled, we are happy to review the matter and provide an appropriate resolution in accordance with this Policy.",
    },

    { type: "heading", text: "1. General Return and Refund Policy" },
    {
      type: "paragraph",
      text: "Once an order has been confirmed and processed, Nouriqo generally does not accept cancellation, return, or refund requests.",
    },
    {
      type: "paragraph",
      text: "As our products are food items, we cannot accept returns simply because a customer has changed their mind, ordered the wrong product, does not like the product, or no longer requires the product.",
    },
    {
      type: "paragraph",
      text: "However, exceptions may be considered for the situations described below.",
    },
    {
      type: "paragraph",
      text: "Any approved resolution may be provided in the form of a replacement, store credit, refund, or another appropriate solution, depending on the circumstances.",
    },

    { type: "heading", text: "2. Damaged Product" },
    {
      type: "paragraph",
      text: "If you receive a product that appears to have been damaged during transportation or delivery, please notify Nouriqo within 5 days from the date of delivery.",
    },
    {
      type: "paragraph",
      text: "To help us investigate and resolve the issue, please contact us at:",
    },
    {
      type: "lines",
      lines: [
        "Email: sales1earth@gmail.com",
        "Phone/WhatsApp: +91 92701 31986",
      ],
    },
    { type: "paragraph", text: "Please provide the following:" },
    {
      type: "list",
      items: [
        "Order number;",
        "Image of the invoice/order confirmation;",
        "At least 1 clear photograph of the outer packaging/box;",
        "At least 2 clear photographs of the damaged product; and",
        "A brief description of the damage.",
      ],
    },
    {
      type: "paragraph",
      text: "Where appropriate, we may request additional photographs or videos to assess the condition of the product.",
    },
    {
      type: "paragraph",
      text: "After reviewing the information provided, Nouriqo may offer a replacement, refund, or another appropriate resolution.",
    },

    { type: "heading", text: "3. Incorrect or Multiple Items Delivered" },
    {
      type: "paragraph",
      text: "If you receive an incorrect product or additional/multiple items due to an error in order fulfilment, please notify us within 5 days from the date of delivery.",
    },
    { type: "paragraph", text: "Please provide:" },
    {
      type: "list",
      items: [
        "Order number;",
        "Invoice/order confirmation;",
        "Clear photographs of the products received; and",
        "A description of the issue.",
      ],
    },
    {
      type: "paragraph",
      text: "If multiple products were ordered and only one product is affected, the resolution will generally apply only to the affected product.",
    },
    {
      type: "paragraph",
      text: "Nouriqo will review the matter and, where the error is confirmed, arrange an appropriate replacement or other suitable resolution.",
    },

    { type: "heading", text: "4. Missing Product" },
    {
      type: "paragraph",
      text: "If an item shown on your order/invoice is missing from your delivery, please notify Nouriqo within 5 days from the date of delivery.",
    },
    { type: "paragraph", text: "Please send the following information:" },
    {
      type: "list",
      items: [
        "Order number;",
        "Image of the invoice/order confirmation;",
        "1 clear photograph of the outer packaging/box; and",
        "At least 2 clear photographs of the opened package showing all products received.",
      ],
    },
    {
      type: "paragraph",
      text: "After verification, if the missing product is confirmed, Nouriqo may arrange to re-send the missing product or provide another appropriate resolution.",
    },
    {
      type: "paragraph",
      text: "Refunds for missing products will be considered based on the circumstances and applicable payment/refund procedures.",
    },

    { type: "heading", text: "5. Spoiled or Quality-Compromised Product" },
    {
      type: "paragraph",
      text: "If you believe that a product has arrived spoiled, contaminated, or otherwise unsuitable for consumption, please notify Nouriqo within 10 days from the date of delivery.",
    },
    { type: "paragraph", text: "Please contact us with:" },
    {
      type: "list",
      items: [
        "Order number;",
        "Invoice/order confirmation;",
        "Date of manufacture/packaging or batch details visible on the product;",
        "Clear photographs of the product;",
        "Clear photographs of the packaging and label; and",
        "A video, where possible, showing the condition of the product.",
      ],
    },
    {
      type: "paragraph",
      text: "Please do not consume the product if you believe it is spoiled or otherwise unsafe.",
    },
    {
      type: "paragraph",
      text: "Where appropriate, we may request that the product be retained until our investigation is completed.",
    },
    {
      type: "paragraph",
      text: "If the issue is verified, Nouriqo may provide a replacement, refund, or another appropriate resolution.",
    },

    {
      type: "heading",
      text: "6. Natural Variation in Taste, Texture, Colour and Aroma",
    },
    {
      type: "paragraph",
      text: "Nouriqo products may be prepared using natural ingredients and, where applicable, traditional or handcrafted processes.",
    },
    {
      type: "paragraph",
      text: "As a result, minor variations in taste, texture, colour, appearance, or aroma may occur between different batches.",
    },
    {
      type: "paragraph",
      text: "Such natural variations do not necessarily indicate that a product is defective or spoiled.",
    },
    {
      type: "paragraph",
      text: "Therefore, we generally do not accept return or refund requests solely because of minor variations in:",
    },
    {
      type: "list",
      items: ["Taste;", "Texture;", "Colour;", "Aroma; or", "Appearance,"],
    },
    {
      type: "paragraph",
      text: "provided that the product is otherwise fresh, safe, and meets our applicable quality standards.",
    },
    {
      type: "paragraph",
      text: "However, if you believe that the variation indicates spoilage, contamination, or a genuine quality issue, please contact us with the required information and we will review the matter.",
    },

    { type: "heading", text: "7. Products Damaged After Delivery" },
    {
      type: "paragraph",
      text: "Nouriqo will not ordinarily be responsible for damage caused after successful delivery due to improper storage, handling, exposure to unsuitable temperatures or environmental conditions, failure to follow storage instructions, or other circumstances beyond our reasonable control.",
    },
    {
      type: "paragraph",
      text: "Customers are advised to follow the storage and consumption instructions provided on the product packaging.",
    },

    { type: "heading", text: "8. Refund Processing" },
    {
      type: "paragraph",
      text: "Where a refund is approved, it will generally be processed through the original payment method used for the order, wherever technically and reasonably possible.",
    },
    {
      type: "paragraph",
      text: "The time taken for the amount to reflect in your account may depend on the payment gateway, bank, card issuer, UPI provider, or other financial institution involved.",
    },
    {
      type: "paragraph",
      text: "Nouriqo is not responsible for delays caused by banks, payment gateways, or other third-party financial service providers.",
    },

    { type: "heading", text: "9. Replacement" },
    {
      type: "paragraph",
      text: "Where a replacement is approved, Nouriqo will make reasonable efforts to dispatch the replacement product as soon as practicable, subject to product availability and delivery conditions.",
    },
    {
      type: "paragraph",
      text: "If the same product is unavailable, Nouriqo may, at its discretion and in consultation with the customer, offer an alternative product, store credit, refund, or another appropriate resolution.",
    },

    { type: "heading", text: "10. Order Cancellation" },
    {
      type: "paragraph",
      text: "Once an order has been confirmed and processing or dispatch has commenced, cancellation may not be possible.",
    },
    {
      type: "paragraph",
      text: "If you wish to cancel an order, please contact us as soon as possible at:",
    },
    {
      type: "lines",
      lines: [
        "Email: sales1earth@gmail.com",
        "Phone/WhatsApp: +91 92701 31986",
      ],
    },
    {
      type: "paragraph",
      text: "Any cancellation request will be reviewed based on the status of the order.",
    },

    {
      type: "heading",
      text: "11. How to Raise a Return, Replacement or Refund Request",
    },
    {
      type: "paragraph",
      text: "All requests relating to damaged, missing, incorrect, or spoiled products should be sent to:",
    },
    {
      type: "lines",
      lines: [
        "Nouriqo",
        "Email: sales1earth@gmail.com",
        "Phone/WhatsApp: +91 92701 31986",
        "Website: www.nouriqo.com",
        "Location: Pune, Maharashtra, India",
      ],
    },
    {
      type: "paragraph",
      text: "Please include your order number in the subject line or message and provide all relevant photographs, videos, and supporting information.",
    },
    {
      type: "paragraph",
      text: "Nouriqo aims to respond to customer complaints and requests within 24–48 hours of receiving the required information.",
    },
    {
      type: "paragraph",
      text: "Additional time may be required where an issue requires investigation or coordination with a delivery or logistics partner.",
    },

    { type: "heading", text: "12. Final Resolution" },
    {
      type: "paragraph",
      text: "Every request will be reviewed based on the information and evidence provided, the condition of the product, the nature of the complaint, and applicable laws and regulations.",
    },
    {
      type: "paragraph",
      text: "Nouriqo reserves the right to request additional information or evidence where reasonably necessary to verify a claim.",
    },
    {
      type: "paragraph",
      text: "We are committed to handling genuine product-related concerns fairly and providing an appropriate resolution wherever a valid issue is established.",
    },

    { type: "heading", text: "13. Contact Us" },
    {
      type: "paragraph",
      text: "For any questions regarding this Refund, Return & Replacement Policy, please contact:",
    },
    {
      type: "lines",
      lines: [
        "Nouriqo",
        "Pune, Maharashtra, India",
        "Website: www.nouriqo.com",
        "Email: sales1earth@gmail.com",
        "Phone/WhatsApp: +91 92701 31986",
      ],
    },
  ],
};

export const shippingPolicy: LegalPage = {
  eyebrow: "Legal",
  title: "Shipping & Delivery Policy",
  description: "How your order is packed, dispatched, and delivered.",
  lastUpdated: "2026-09-15",
  content: [
    {
      type: "paragraph",
      text: "At Nouriqo, we take care to ensure that your orders are packed securely and dispatched promptly so that our products reach you in good condition.",
    },
    {
      type: "paragraph",
      text: "Please read the following Shipping & Delivery Policy before placing your order.",
    },

    { type: "heading", text: "1. Shipping Charges" },
    {
      type: "paragraph",
      text: "Shipping charges may apply to your order depending on the delivery location, order value, promotional offers, and other applicable conditions.",
    },
    {
      type: "paragraph",
      text: "Free shipping will be available only when specifically mentioned as part of a promotional campaign, special offer, or other applicable offer on our Website.",
    },
    {
      type: "paragraph",
      text: "Any applicable shipping charges will be displayed to you before you complete your order.",
    },

    { type: "heading", text: "2. Accurate Delivery Information" },
    {
      type: "paragraph",
      text: "To ensure successful delivery, customers are required to provide a complete and accurate delivery address, including:",
    },
    {
      type: "list",
      items: [
        "Full name;",
        "Complete postal address;",
        "City and State;",
        "Correct PIN code;",
        "Valid mobile/contact number; and",
        "Email address, where applicable.",
      ],
    },
    {
      type: "paragraph",
      text: "Please carefully verify your PIN code, address, and contact number before placing your order.",
    },
    {
      type: "paragraph",
      text: "Nouriqo will not be responsible for delays or failed deliveries resulting from incorrect, incomplete, or inaccurate information provided by the customer.",
    },

    { type: "heading", text: "3. Order Processing & Dispatch" },
    {
      type: "paragraph",
      text: "Orders containing products that are in stock are generally packed and dispatched from our facility within 3 working days from the date of order confirmation.",
    },
    {
      type: "paragraph",
      text: "For products that require additional preparation, production, or are temporarily unavailable, dispatch may take up to 10 working days from the date of order confirmation.",
    },
    {
      type: "paragraph",
      text: "In such cases, we will make reasonable efforts to inform you about the expected dispatch timeline.",
    },
    {
      type: "paragraph",
      text: "Please note that dispatch time and delivery time are different. Dispatch means that the order has been handed over to the delivery/courier partner, while delivery refers to the time taken for the shipment to reach your address.",
    },

    { type: "heading", text: "4. Delivery Timeline" },
    {
      type: "paragraph",
      text: "Once your order has been dispatched, the delivery timeline will depend on your location and the courier/logistics partner handling your shipment.",
    },
    {
      type: "paragraph",
      text: "Deliveries are generally made Monday to Saturday between approximately 9:00 AM and 7:00 PM, excluding Sundays and applicable public holidays.",
    },
    {
      type: "paragraph",
      text: "Estimated delivery timelines may vary depending on the delivery location and other circumstances.",
    },

    { type: "heading", text: "5. Delays Beyond Our Control" },
    {
      type: "paragraph",
      text: "While Nouriqo makes reasonable efforts to ensure timely delivery, certain circumstances may cause delays that are beyond our reasonable control.",
    },
    { type: "paragraph", text: "These may include:" },
    {
      type: "list",
      items: [
        "Adverse weather conditions;",
        "Natural disasters;",
        "Transportation disruptions;",
        "Road closures or traffic restrictions;",
        "Strikes or labour disruptions;",
        "Courier or logistics partner delays;",
        "Public holidays;",
        "Government restrictions or regulatory requirements;",
        "Incorrect or incomplete delivery information; or",
        "Other unforeseen circumstances.",
      ],
    },
    {
      type: "paragraph",
      text: "In such situations, we will make reasonable efforts to assist you and coordinate with the relevant delivery partner.",
    },

    { type: "heading", text: "6. Order Tracking" },
    {
      type: "paragraph",
      text: "Once your order has been dispatched, we may provide you with shipment tracking information through the email address, mobile number, or other contact details provided at the time of ordering.",
    },
    {
      type: "paragraph",
      text: "You can use the tracking information to check the status of your shipment, where tracking is available.",
    },
    {
      type: "paragraph",
      text: "Please allow some time for the tracking information to become active after dispatch.",
    },

    { type: "heading", text: "7. Delivery Attempts" },
    {
      type: "paragraph",
      text: "Our delivery partners may make one or more attempts to deliver your order to the address provided.",
    },
    {
      type: "paragraph",
      text: "Please ensure that someone is available to receive the shipment and that your contact number remains reachable during the expected delivery period.",
    },
    {
      type: "paragraph",
      text: "If delivery cannot be completed because of an incorrect address, unavailable recipient, incorrect contact details, refusal to accept the shipment, or other circumstances attributable to the customer, additional delivery attempts or charges may apply.",
    },

    { type: "heading", text: "8. Delivery of Food Products" },
    {
      type: "paragraph",
      text: "As Nouriqo products are food products, we take reasonable care in packaging and dispatching orders to maintain product quality during transit.",
    },
    {
      type: "paragraph",
      text: "Customers are advised to check the product packaging and follow the storage and consumption instructions printed on the product packaging upon receiving the order.",
    },
    {
      type: "paragraph",
      text: "If you receive a product that appears damaged, spoiled, tampered with, or otherwise unsuitable for consumption, please do not consume it and contact us in accordance with our Refund, Return & Replacement Policy.",
    },

    { type: "heading", text: "9. Undelivered or Returned Shipments" },
    {
      type: "paragraph",
      text: "If an order is returned to Nouriqo because of an incorrect address, incomplete address, repeated failed delivery attempts, refusal to accept the shipment, or other customer-related reasons, we may contact you regarding re-delivery.",
    },
    {
      type: "paragraph",
      text: "Additional shipping or re-delivery charges may apply in such circumstances.",
    },

    { type: "heading", text: "10. Contact Us" },
    {
      type: "paragraph",
      text: "If you have any questions regarding your order, shipping, or delivery, please contact us:",
    },
    {
      type: "lines",
      lines: [
        "Nouriqo",
        "Pune, Maharashtra, India",
        "Website: www.nouriqo.com",
        "Email: sales1earth@gmail.com",
        "Phone/WhatsApp: +91 92701 31986",
      ],
    },
    {
      type: "paragraph",
      text: "We will make reasonable efforts to assist you with your shipping or delivery-related queries.",
    },
  ],
};
