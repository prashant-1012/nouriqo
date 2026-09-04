import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://www.nouriqo.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Nouriqo — Traditional Indian Sweets, Thoughtfully Made",
    template: "%s | Nouriqo",
  },
  description:
    "Nouriqo crafts traditional Indian sweets with real desi ghee, real dry fruits, and nothing artificial — premium mithai made for everyday celebration and gifting.",
  keywords: [
    "Nouriqo",
    "Indian sweets",
    "mithai",
    "ghee papri",
    "premium Indian sweets",
    "Indian gifting sweets",
  ],
  openGraph: {
    title: "Nouriqo — Traditional Indian Sweets, Thoughtfully Made",
    description:
      "Real desi ghee, real dry fruits, nothing artificial. Discover Nouriqo's traditional Indian sweets.",
    url: siteUrl,
    siteName: "Nouriqo",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nouriqo — Traditional Indian Sweets, Thoughtfully Made",
    description:
      "Real desi ghee, real dry fruits, nothing artificial. Discover Nouriqo's traditional Indian sweets.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ivory text-ink">
        {children}
      </body>
    </html>
  );
}
