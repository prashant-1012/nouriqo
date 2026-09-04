import type { BlogBlock } from "@/lib/blog-posts";

export function BlogContent({ blocks }: { blocks: BlogBlock[] }) {
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
        return (
          <p key={index} className="text-base leading-relaxed text-ink-soft">
            {block.text}
          </p>
        );
      })}
    </div>
  );
}
