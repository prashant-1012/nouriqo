export type Counter = {
  icon: string;
  value: number;
  suffix: string;
  label: string;
};

/**
 * Provisional placeholder figures, not confirmed brand metrics — see
 * TODO.md and CONTENT_GUIDELINES.md. Replace with real numbers before
 * launch.
 */
export const counters: Counter[] = [
  {
    icon: "/assets/counters/counter-feedback.svg",
    value: 92,
    suffix: "%",
    label: "Positive feedback",
  },
  {
    icon: "/assets/counters/counter-customers.svg",
    value: 18,
    suffix: "K+",
    label: "Customers loved",
  },
  {
    icon: "/assets/counters/counter-followers.svg",
    value: 18,
    suffix: "K+",
    label: "Followers",
  },
  {
    icon: "/assets/counters/counter-retail-stores.svg",
    value: 180,
    suffix: "+",
    label: "Retail stores",
  },
];
