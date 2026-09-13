import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "../globals.css";

// A separate root layout (its own <html>/<body>) from app/(site)/layout.tsx —
// the admin panel is internal tooling, not the customer-facing marketing
// site, so it deliberately has no Navbar/Footer/CartProvider/cart drawer.
// Shares the same fonts/globals.css for consistent base typography.

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s | Nouriqo Admin" },
  robots: { index: false, follow: false },
};

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

export default function AdminRootLayout({ children }: LayoutProps<"/admin">) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full bg-beige/40 text-ink">{children}</body>
    </html>
  );
}
