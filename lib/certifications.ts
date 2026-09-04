export type Certification = {
  logo: string;
  name: string;
};

/**
 * PLACEHOLDER LOGOS — DESIGN REFERENCE ONLY. Nouriqo has not confirmed
 * holding any of these certifications/registrations. Do not treat this
 * list as verified, and do not ship it to a live/client-facing build
 * without real, confirmed credentials — see TODO.md and
 * CONTENT_GUIDELINES.md ("What We Do NOT Claim Without Confirmation").
 * FSSAI in particular is a legal registration that must show a real
 * license number if displayed for real.
 */
export const certifications: Certification[] = [
  { logo: "/assets/certifications/cert-india-organic.png", name: "India Organic" },
  { logo: "/assets/certifications/cert-fda.png", name: "FDA" },
  { logo: "/assets/certifications/cert-usoca.png", name: "USOCA" },
  { logo: "/assets/certifications/cert-fssai.png", name: "FSSAI" },
  { logo: "/assets/certifications/cert-organic-seal.png", name: "Organic certification seal" },
];
