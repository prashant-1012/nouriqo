export type Product = {
  slug: string;
  name: string;
  variant: string;
  tagline: string;
  description: string;
  weight: string;
  attributes: string[];
  image: {
    src: string;
    alt: string;
  };
  accent: "gold" | "lilac" | "rose";
};

export const products: Product[] = [
  {
    slug: "classic-ghee-papri",
    name: "Special Ghee Papri",
    variant: "Classic Delicious",
    tagline: "Since 1958",
    description:
      "Our original recipe — layers of papri slow-cooked in desi ghee and finished with almonds and pistachios.",
    weight: "500 gram",
    attributes: ["No Maida", "No Artificial Color", "No Preservatives"],
    image: {
      src: "/assets/products/classic-ghee-papri.jpg",
      alt: "Nouriqo Special Ghee Papri box, Classic Delicious variant, with a bowl of papri sweets topped with almonds and pistachios",
    },
    accent: "gold",
  },
  {
    slug: "kaju-badam-papri",
    name: "Kaju Badam Papri",
    variant: "Cashew & Almond",
    tagline: "Since 1958",
    description:
      "A velvety delicacy layered generously with cashews and almonds for a richer, nuttier bite.",
    weight: "500 gram",
    attributes: ["No Maida", "No Artificial Color", "No Preservatives"],
    image: {
      src: "/assets/products/kaju-badam-papri.jpg",
      alt: "Nouriqo Kaju Badam Papri box with cashew and almond papri sweets served on a decorative brass plate",
    },
    accent: "lilac",
  },
  {
    slug: "special-kaju-papri",
    name: "Special Kaju Papri",
    variant: "Classic Delicious",
    tagline: "Since 1958",
    description:
      "Our signature cashew papri, finished with pistachio and a touch of rose for a lighter, fragrant finish.",
    weight: "500 gram",
    attributes: ["No Maida", "No Artificial Color", "No Preservatives"],
    image: {
      src: "/assets/products/special-kaju-papri.jpg",
      alt: "Nouriqo Special Kaju Papri box with cashew papri sweets served on a wooden tray",
    },
    accent: "rose",
  },
];
