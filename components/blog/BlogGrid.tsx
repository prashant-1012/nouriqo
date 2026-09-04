import { Container } from "@/components/layout/Container";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { BlogCard } from "@/components/blog/BlogCard";
import { getSortedPosts } from "@/lib/blog-posts";

export function BlogGrid() {
  const posts = getSortedPosts();

  return (
    <section className="bg-ivory py-20 sm:py-28">
      <Container>
        <RevealGroup className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <RevealItem key={post.slug}>
              <BlogCard post={post} />
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
