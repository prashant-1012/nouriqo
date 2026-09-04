import Link from "next/link";
import { ReactNode } from "react";
import clsx from "clsx";

type BaseProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "inverted";
  className?: string;
};

const variantStyles: Record<NonNullable<BaseProps["variant"]>, string> = {
  primary:
    "bg-emerald-800 text-ivory hover:bg-emerald-700 focus-visible:outline-emerald-800",
  secondary:
    "border border-emerald-800/30 text-emerald-900 hover:bg-emerald-800/5 focus-visible:outline-emerald-800",
  ghost:
    "text-emerald-900 hover:text-emerald-700 underline underline-offset-4 decoration-emerald-900/30",
  inverted:
    "bg-ivory text-emerald-900 hover:bg-ivory/90 focus-visible:outline-ivory",
};

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium tracking-wide transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

export function Button({
  children,
  href,
  variant = "primary",
  className,
  ...props
}: BaseProps & { href: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <Link
      href={href}
      className={clsx(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </Link>
  );
}
