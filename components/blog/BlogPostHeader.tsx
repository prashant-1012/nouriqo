import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { formatPostDate, type BlogPost } from "@/lib/blog-posts";

export function BlogPostHeader({ post }: { post: BlogPost }) {
  return (
    <section className="bg-cream py-12 sm:py-16">
      <Container className="max-w-3xl">
        <Link
          href="/blogs"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-800 hover:text-emerald-700"
        >
          <ArrowLeft size={16} />
          Back to Journal
        </Link>
        <p className="mt-6 text-xs font-medium uppercase tracking-[0.3em] text-gold-700">
          {formatPostDate(post.date)} · {post.readTime}
        </p>
        <h1 className="mt-3 font-display text-3xl leading-tight text-ink sm:text-4xl">
          {post.title}
        </h1>
      </Container>
    </section>
  );
}
