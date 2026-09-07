export type Testimonial = {
  name: string;
  role: string;
  text: string;
  image: string;
};

/**
 * Illustrative testimonials, not sourced from real named Nouriqo
 * customers — added per explicit instruction, overriding this file's
 * usual "no fabricated testimonials" rule (see CONTENT_GUIDELINES.md).
 * Content stays inside every other content rule: no invented
 * certifications, no specific health claims, only facts already
 * established elsewhere on the site (desi ghee, no maida, Since 1958,
 * gifting). Photos are user-supplied stock photography of real people
 * (public/assets/testimonials/, originals in public/assets/_source/)
 * attributed to these fictional names — see CONTENT_GUIDELINES.md.
 */
export const testimonials: Testimonial[] = [
  {
    name: "Ananya Iyer",
    role: "Home Baker",
    text: "The ghee papri tastes like the one my grandmother used to make. No maida, no shortcuts — you can tell from the first bite.",
    image: "/assets/testimonials/testimonial-ananya-iyer.jpg",
  },
  {
    name: "Rohan Malhotra",
    role: "Gifting Regular",
    text: "I've sent Nouriqo boxes for three Diwalis in a row now. Every box looks and tastes exactly as good as the last.",
    image: "/assets/testimonials/testimonial-rohan-malhotra.jpg",
  },
  {
    name: "Priya Deshmukh",
    role: "First-time Buyer",
    text: "Ordered the Kaju Badam Papri on a whim. It didn't feel like a 'healthy' sweet trying too hard — just genuinely good mithai.",
    image: "/assets/testimonials/testimonial-priya-deshmukh.jpg",
  },
  {
    name: "Arjun Nair",
    role: "Long-time Customer",
    text: "Since 1958 isn't just a line on the box. The consistency across every order is what's kept me coming back.",
    image: "/assets/testimonials/testimonial-arjun-nair.jpg",
  },
  {
    name: "Meera Krishnan",
    role: "Corporate Gifting",
    text: "Ordered in bulk for our office Diwali hampers. Packaging held up perfectly and the feedback from the team was excellent.",
    image: "/assets/testimonials/testimonial-meera-krishnan.jpg",
  },
  {
    name: "Karan Bhatia",
    role: "Home Cook",
    text: "Real desi ghee makes all the difference. You can smell it before you even open the box.",
    image: "/assets/testimonials/testimonial-karan-bhatia.jpg",
  },
  {
    name: "Sana Qureshi",
    role: "Weekend Treat",
    text: "My family finishes a box of Special Kaju Papri in two days flat. That's the only review that matters in our house.",
    image: "/assets/testimonials/testimonial-sana-qureshi.jpg",
  },
  {
    name: "Devika Rao",
    role: "Repeat Buyer",
    text: "Finally a mithai brand that skips the maida without turning it into a diet snack. Tastes like the real thing.",
    image: "/assets/testimonials/testimonial-devika-rao.jpg",
  },
  {
    name: "Vikram Chauhan",
    role: "Repeat Buyer",
    text: "Reordered within a week of the first box. Simple as that.",
    image: "/assets/testimonials/testimonial-vikram-chauhan.jpg",
  },
];
