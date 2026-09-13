import type { LegalBlock } from "@/lib/legal-pages";

export function LegalContent({ blocks }: { blocks: LegalBlock[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((block, index) => {
        if (block.type === "heading") {
          return (
            <h2
              key={index}
              className="pt-2 font-display text-2xl text-ink sm:text-3xl"
            >
              {block.text}
            </h2>
          );
        }

        if (block.type === "list") {
          return (
            <ul
              key={index}
              className="list-disc space-y-2 pl-5 text-base leading-relaxed text-ink-soft"
            >
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex}>{item}</li>
              ))}
            </ul>
          );
        }

        return (
          <p key={index} className="text-base leading-relaxed text-ink-soft">
            {block.text}
          </p>
        );
      })}
    </div>
  );
}
