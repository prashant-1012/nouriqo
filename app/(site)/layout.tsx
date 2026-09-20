import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/footer/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { CartProvider } from "@/lib/cart-context";
import { getProducts } from "@/lib/products-db";
import "../globals.css";

// Every route reads through this layout, and several (Home, /sweets, the
// cart drawer via CartProvider) depend on getProducts()'s live database
// read. A plain Prisma call — unlike fetch() — doesn't opt a route into
// dynamic rendering on its own, so without this the product catalog would
// freeze at build time and admin edits (once Phase 4 ships) would need a
// redeploy to show up. ISR keeps pages fast while staying reasonably fresh.
export const revalidate = 60;

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
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const products = await getProducts();

  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ivory text-ink">
        <CartProvider products={products}>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
