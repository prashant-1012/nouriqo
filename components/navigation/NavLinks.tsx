"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import clsx from "clsx";
import { navLinks, isNavLinkActive } from "@/lib/nav-links";

export function NavLinks() {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  return (
    <ul className="flex items-center gap-9">
      {navLinks.map((link) => {
        const isActive = isNavLinkActive(pathname, link.href);

        return (
          <li key={link.href} className="relative">
            <Link
              href={link.href}
              aria-current={isActive ? "page" : undefined}
              className={clsx(
                "relative inline-block py-1 text-sm font-medium tracking-wide transition-colors",
                isActive
                  ? "text-emerald-800"
                  : "text-ink-soft hover:text-emerald-800"
              )}
            >
              {link.label}
              {isActive && (
                <motion.span
                  layoutId="nav-active-underline"
                  className="absolute inset-x-0 -bottom-1 h-[2px] rounded-full bg-emerald-800"
                  transition={
                    prefersReducedMotion
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 380, damping: 32 }
                  }
                />
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
