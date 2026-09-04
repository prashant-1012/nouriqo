import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/lib/blog-posts";
import { formatPostDate } from "@/lib/blog-posts";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="group">
      <Link href={`/blogs/${post.slug}`} className="block">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
          <Image
            src={post.coverImage.src}
            alt={post.coverImage.alt}
            fill
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>

        <div className="mt-4">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-gold-700">
            {formatPostDate(post.date)} · {post.readTime}
          </p>
          <h3 className="mt-1.5 font-display text-xl text-ink group-hover:text-emerald-800">
            {post.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-soft">
            {post.excerpt}
          </p>
        </div>
      </Link>
    </article>
  );
}
