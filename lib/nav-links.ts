export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/sweets" },
  { label: "About", href: "/story" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact Us", href: "/contact" },
];

export function isNavLinkActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
