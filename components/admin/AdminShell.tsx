"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, ClipboardList, Users, LogOut } from "lucide-react";
import clsx from "clsx";
import type { AdminUser } from "@/generated/prisma/client";
import { logout } from "@/app/admin/(protected)/actions";

const baseNavItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/orders", label: "Orders", icon: ClipboardList },
];

function isActive(pathname: string, href: string) {
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AdminShell({
  admin,
  children,
}: {
  admin: AdminUser;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const items =
    admin.role === "SUPER_ADMIN"
      ? [...baseNavItems, { href: "/admin/users", label: "Users", icon: Users }]
      : baseNavItems;

  return (
    <div className="flex min-h-dvh flex-col lg:flex-row">
      <aside className="flex shrink-0 flex-col border-b border-ink/10 bg-ivory lg:w-60 lg:border-b-0 lg:border-r">
        <div className="p-5">
          <p className="font-display text-lg text-ink">Nouriqo Admin</p>
          <p className="mt-0.5 text-xs text-ink-soft">
            {admin.name} &middot; {admin.role === "SUPER_ADMIN" ? "Super Admin" : "Admin"}
          </p>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-3 pb-3 lg:flex-1 lg:flex-col lg:overflow-visible">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors lg:rounded-lg",
                  isActive(pathname, item.href)
                    ? "bg-emerald-800 text-ivory"
                    : "text-ink-soft hover:bg-ink/5"
                )}
              >
                <Icon size={16} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <form action={logout} className="p-3">
          <button
            type="submit"
            className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-ink-soft hover:bg-ink/5"
          >
            <LogOut size={16} /> Log Out
          </button>
        </form>
      </aside>
      <main className="min-w-0 flex-1 overflow-x-hidden p-6 sm:p-8">{children}</main>
    </div>
  );
}
