import clsx from "clsx";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "dark",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <p
          className={clsx(
            "mb-3 text-xs font-medium uppercase tracking-[0.25em]",
            tone === "dark" ? "text-gold-700" : "text-gold-400"
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={clsx(
          "font-display text-3xl leading-tight sm:text-4xl lg:text-[2.75rem]",
          tone === "dark" ? "text-ink" : "text-ivory"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={clsx(
            "mt-4 text-base leading-relaxed sm:text-lg",
            tone === "dark" ? "text-ink-soft" : "text-ivory/80"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
