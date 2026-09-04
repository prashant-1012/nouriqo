import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { BlogPostHeader } from "@/components/blog/BlogPostHeader";
import { BlogContent } from "@/components/blog/BlogContent";
import { blogPosts, getPostBySlug } from "@/lib/blog-posts";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blogs/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: PageProps<"/blogs/[slug]">) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <BlogPostHeader post={post} />

      <article className="bg-ivory py-12 sm:py-16">
        <Container className="max-w-3xl">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl">
            <Image
              src={post.coverImage.src}
              alt={post.coverImage.alt}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              priority
              className="object-cover"
            />
          </div>

          <div className="mt-10">
            <BlogContent blocks={post.content} />
          </div>

          <div className="mt-12 border-t border-ink/10 pt-8">
            <Link
              href="/blogs"
              className="text-sm font-medium text-emerald-800 underline underline-offset-4 decoration-emerald-800/30 hover:text-emerald-700"
            >
              ← Back to Journal
            </Link>
          </div>
        </Container>
      </article>
    </>
  );
}
