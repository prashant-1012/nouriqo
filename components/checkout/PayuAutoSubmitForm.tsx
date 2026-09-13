"use client";

import { useEffect, useRef } from "react";

export type PayuFormFields = Record<string, string>;

export function PayuAutoSubmitForm({
  action,
  fields,
}: {
  action: string;
  fields: PayuFormFields;
}) {
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    formRef.current?.submit();
  }, []);

  return (
    <div className="flex flex-col items-center gap-4 py-24 text-center">
      <p className="text-sm text-ink-soft">Redirecting you to PayU to complete payment&hellip;</p>
      <form ref={formRef} action={action} method="post">
        {Object.entries(fields).map(([name, value]) => (
          <input key={name} type="hidden" name={name} value={value} />
        ))}
        <noscript>
          <button
            type="submit"
            className="rounded-full bg-emerald-800 px-7 py-3 text-sm font-medium text-ivory hover:bg-emerald-700"
          >
            Continue to PayU
          </button>
        </noscript>
      </form>
    </div>
  );
}
