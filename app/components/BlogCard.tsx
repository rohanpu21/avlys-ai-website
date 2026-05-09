import Link from "next/link";
import type { BlogPost } from "../data/blog-posts";

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard = ({ post }: BlogCardProps) => {
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block border border-[var(--border-subtle)] p-6 transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--surface-hover)]"
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--muted-strong)] border border-[var(--border-subtle)] px-2 py-0.5">
            {post.category}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--muted-strong)]">
            {post.readTime} min read
          </span>
        </div>

        <h2 className="text-base font-medium leading-snug text-[var(--foreground)] transition-opacity group-hover:opacity-80 sm:text-lg">
          {post.title}
        </h2>

        <p className="text-sm leading-6 text-[var(--muted)] line-clamp-3">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between pt-2 border-t border-[var(--border-subtle)]">
          <span className="text-xs text-[var(--muted-strong)]">{formattedDate}</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted-strong)] transition-opacity group-hover:opacity-100 opacity-60">
            Read →
          </span>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
