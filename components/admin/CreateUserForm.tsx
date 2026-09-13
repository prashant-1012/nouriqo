"use client";

import { useState, type FormEvent } from "react";
import { createAdminUser } from "@/app/admin/(protected)/users/actions";

const inputWrapClass =
  "mt-1.5 flex h-11 items-center rounded-lg border border-ink/15 px-3.5 transition-colors focus-within:border-emerald-800 focus-within:ring-2 focus-within:ring-emerald-800/20";
const inputClass = "h-full w-full bg-transparent text-sm text-ink outline-none";
const labelClass = "text-sm font-medium text-ink";

export function CreateUserForm() {
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);
    const form = new FormData(event.currentTarget);

    const result = await createAdminUser({
      name: String(form.get("name")).trim(),
      phone: String(form.get("phone")).trim(),
      password: String(form.get("password")),
      role: form.get("role") === "SUPER_ADMIN" ? "SUPER_ADMIN" : "ADMIN_MANAGER",
    });

    if (result?.error) {
      setError(result.error);
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md space-y-4 rounded-2xl border border-ink/10 bg-ivory p-5">
      <p className="font-display text-lg text-ink">Add User</p>

      <div>
        <label htmlFor="cu-name" className={labelClass}>Name</label>
        <div className={inputWrapClass}>
          <input id="cu-name" name="name" required className={inputClass} />
        </div>
      </div>
      <div>
        <label htmlFor="cu-phone" className={labelClass}>Phone Number</label>
        <div className={inputWrapClass}>
          <span className="shrink-0 text-sm text-ink-soft">+91</span>
          <input
            id="cu-phone"
            name="phone"
            type="tel"
            inputMode="numeric"
            pattern="[0-9]{10}"
            maxLength={10}
            title="10-digit phone number, without the country code"
            required
            className={inputClass}
          />
        </div>
      </div>
      <div>
        <label htmlFor="cu-password" className={labelClass}>Password</label>
        <div className={inputWrapClass}>
          <input id="cu-password" name="password" type="password" required minLength={8} className={inputClass} />
        </div>
      </div>
      <div>
        <label htmlFor="cu-role" className={labelClass}>Role</label>
        <div className={inputWrapClass}>
          <select id="cu-role" name="role" defaultValue="ADMIN_MANAGER" className={inputClass}>
            <option value="ADMIN_MANAGER">Admin / Manager</option>
            <option value="SUPER_ADMIN">Super Admin</option>
          </select>
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
        className="w-full rounded-full bg-emerald-800 py-2.5 text-sm font-medium text-ivory transition-colors hover:bg-emerald-700 disabled:opacity-60"
      >
        {isSubmitting ? "Creating..." : "Create User"}
      </button>
    </form>
  );
}
