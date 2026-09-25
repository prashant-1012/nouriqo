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

        if (block.type === "subheading") {
          return (
            <h3
              key={index}
              className="font-display text-xl text-ink sm:text-2xl"
            >
              {block.text}
            </h3>
          );
        }

        if (block.type === "list" || block.type === "orderedList") {
          const List = block.type === "list" ? "ul" : "ol";
          return (
            <List
              key={index}
              className={`${block.type === "list" ? "list-disc" : "list-decimal"} space-y-2 pl-5 text-base leading-relaxed text-ink-soft`}
            >
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex}>{item}</li>
              ))}
            </List>
          );
        }

        if (block.type === "lines") {
          return (
            <p key={index} className="text-base leading-relaxed text-ink-soft">
              {block.lines.map((line, lineIndex) => (
                <span key={lineIndex} className="block">
                  {line}
                </span>
              ))}
            </p>
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
