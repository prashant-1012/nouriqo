"use client";

import { useState, type FormEvent } from "react";
import { Lock, Phone } from "lucide-react";
import { login } from "@/app/admin/login/actions";

const inputWrapClass =
  "mt-1.5 flex h-11 items-center gap-2 rounded-full border border-ink/15 bg-ivory pl-4 transition-colors focus-within:border-emerald-800 focus-within:ring-2 focus-within:ring-emerald-800/20";
const inputClass =
  "h-full w-full bg-transparent pr-4 text-sm text-ink outline-none placeholder:text-ink-soft/60";

export function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const form = new FormData(event.currentTarget);
    const result = await login(
      String(form.get("phone")),
      String(form.get("password"))
    );

    if (result?.error) {
      setError(result.error);
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
      <div>
        <label htmlFor="login-phone" className="text-sm font-medium text-ink">
          Phone Number
        </label>
        <div className={inputWrapClass}>
          <Phone size={18} className="shrink-0 text-ink-soft" />
          <span className="shrink-0 text-sm text-ink-soft">+91</span>
          <input
            id="login-phone"
            name="phone"
            type="tel"
            inputMode="numeric"
            pattern="[0-9]{10}"
            maxLength={10}
            title="10-digit phone number, without the country code"
            required
            autoFocus
            placeholder="10-digit number"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="login-password" className="text-sm font-medium text-ink">
          Password
        </label>
        <div className={inputWrapClass}>
          <Lock size={18} className="shrink-0 text-ink-soft" />
          <input
            id="login-password"
            name="password"
            type="password"
            required
            placeholder="Your password"
            className={inputClass}
          />
        </div>
      </div>

      {error && (
        <p role="alert" className="text-sm text-red-700">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-full bg-emerald-800 py-3 text-sm font-medium text-ivory transition-colors hover:bg-emerald-700 disabled:opacity-60"
      >
        {isSubmitting ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}
