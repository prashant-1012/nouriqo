import type { Metadata } from "next";
import Image from "next/image";
import { LoginForm } from "@/components/admin/LoginForm";

export const metadata: Metadata = { title: "Login" };

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-dvh items-center justify-center px-6">
      <div className="w-full max-w-sm rounded-2xl border border-ink/10 bg-ivory p-8 shadow-sm">
        <div className="flex flex-col items-center text-center">
          <Image
            src="/assets/logo/nouriqo-mark.png"
            alt="Nouriqo"
            width={40}
            height={26}
            className="logo-blend h-10 w-auto object-contain"
          />
          <h1 className="mt-3 font-display text-xl text-ink">Nouriqo Admin</h1>
          <p className="mt-1 text-sm text-ink-soft">Sign in to manage the store.</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
